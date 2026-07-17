import express from 'express';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const root = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: '20kb' }));

app.post('/api/ai/chat', async (req, res) => {
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY belum dikonfigurasi' });
  }

  const messages = (Array.isArray(req.body?.messages) ? req.body.messages : [])
    .filter((message) => ['user', 'assistant'].includes(message?.role))
    .filter((message) => typeof message.content === 'string')
    .slice(-10)
    .map((message) => ({ role: message.role, content: message.content.trim().slice(0, 2000) }))
    .filter((message) => message.content);

  if (!messages.length || messages.at(-1).role !== 'user') {
    return res.status(400).json({ error: 'Pesan tidak valid' });
  }

  try {
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
    res.json({ message: completion.choices[0]?.message?.content || '' });
  } catch (error) {
    const status = error?.status === 429 ? 429 : 500;
    res.status(status).json({ error: status === 429 ? 'Batas penggunaan AI sedang tercapai. Coba lagi sebentar.' : 'AI gagal merespons. Silakan coba lagi.' });
  }
});

app.get('/api/github/repos', async (_req, res) => {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN belum dikonfigurasi' });
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
    res.status(response.status).type('json').send(body);
  } catch {
    res.status(502).json({ error: 'Tidak dapat terhubung ke GitHub' });
  }
});

app.use(express.static(path.join(root, 'dist')));
app.get('*', (_req, res) => res.sendFile(path.join(root, 'dist', 'index.html')));

app.listen(port, () => {
  console.log(`Portfolio server berjalan di http://localhost:${port}`);
});
