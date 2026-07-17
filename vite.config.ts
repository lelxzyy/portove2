import vue from '@vitejs/plugin-vue';
import Groq from 'groq-sdk';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

function githubApiPlugin() {
  return {
    name: 'github-api',
    configureServer(server) {
      server.middlewares.use('/api/github/repos', async (_req, res) => {
        const token = process.env.GITHUB_TOKEN;
        const username = process.env.GITHUB_USERNAME;

        if (!token) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'GITHUB_TOKEN belum dikonfigurasi' }));
          return;
        }

        try {
          const endpoint = username
            ? `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
            : 'https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner';
          const response = await fetch(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28',
              'User-Agent': 'portfolio-website',
            },
          });

          const body = await response.text();
          res.statusCode = response.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(body);
        } catch {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Tidak dapat terhubung ke GitHub' }));
        }
      });
    },
  };
}

function aiApiPlugin() {
  return {
    name: 'groq-ai-api',
    configureServer(server) {
      server.middlewares.use('/api/ai/chat', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method tidak didukung' }));
          return;
        }

        if (!process.env.GROQ_API_KEY) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'GROQ_API_KEY belum dikonfigurasi' }));
          return;
        }

        try {
          let rawBody = '';
          for await (const chunk of req) rawBody += chunk;
          const body = JSON.parse(rawBody || '{}');
          const messages = (Array.isArray(body.messages) ? body.messages : [])
            .filter((message) => ['user', 'assistant'].includes(message?.role))
            .filter((message) => typeof message.content === 'string')
            .slice(-10)
            .map((message) => ({ role: message.role, content: message.content.trim().slice(0, 2000) }))
            .filter((message) => message.content);

          if (!messages.length || messages.at(-1).role !== 'user') {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Pesan tidak valid' }));
            return;
          }

          const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
          const completion = await groq.chat.completions.create({
            model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: 'Kamu adalah asisten AI ramah dan ringkas di website portfolio Dalil Aminudin (lelxzyy), seorang developer web dan IoT. Jangan mengarang fakta tentang Dalil.' },
              ...messages,
            ],
            temperature: 0.5,
            max_completion_tokens: 500,
          });
          res.end(JSON.stringify({ message: completion.choices[0]?.message?.content || '' }));
        } catch (error) {
          res.statusCode = error?.status === 429 ? 429 : 500;
          res.end(JSON.stringify({ error: res.statusCode === 429 ? 'Batas penggunaan AI sedang tercapai. Coba lagi sebentar.' : 'AI gagal merespons. Silakan coba lagi.' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return {
    plugins: [vue(), githubApiPlugin(), aiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
