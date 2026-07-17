<div align="center">
</div>

# Portfolio

This contains everything you need to run your app locally.


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Salin `.env.example` menjadi `.env.local`, lalu isi `GITHUB_TOKEN`. Gunakan
   fine-grained personal access token dengan akses seminimal mungkin. Jangan
   memakai nama `VITE_GITHUB_TOKEN`, karena variabel berawalan `VITE_` akan
   dimasukkan ke bundle browser.
3. Run the app:
   `npm run dev`

## Production

Build lalu jalankan server yang menjaga token tetap berada di backend:

```bash
npm run build
npm start
```

Atur `GITHUB_TOKEN` (dan opsional `GITHUB_USERNAME`) sebagai environment variable
di platform deployment. Jangan commit file `.env.local`.

## Deploy ke Vercel

1. Push repository ini ke GitHub.
2. Di Vercel pilih **Add New > Project**, lalu import repository tersebut.
3. Vercel akan mendeteksi Vite. Gunakan Build Command `npm run build` dan Output
   Directory `dist` (biasanya terisi otomatis).
4. Di **Project Settings > Environment Variables**, tambahkan `GITHUB_TOKEN` dan
   `GITHUB_USERNAME`. Aktifkan untuk Production dan Preview sesuai kebutuhan.
5. Deploy atau lakukan Redeploy setelah environment variable ditambahkan.

Endpoint `api/github/repos.js` otomatis dijalankan sebagai Vercel Function. Token
tidak memerlukan awalan `VITE_` dan tidak pernah dikirim ke bundle frontend.
# portove2
