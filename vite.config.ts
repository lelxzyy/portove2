import vue from '@vitejs/plugin-vue';
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

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return {
    plugins: [vue(), githubApiPlugin()],
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
