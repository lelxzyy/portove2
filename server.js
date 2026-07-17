import express from 'express';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const root = path.dirname(fileURLToPath(import.meta.url));

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
