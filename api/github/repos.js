export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token) {
    return Response.json(
      { error: 'GITHUB_TOKEN belum dikonfigurasi' },
      { status: 500 },
    );
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

    return new Response(body, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return Response.json(
      { error: 'Tidak dapat terhubung ke GitHub' },
      { status: 502 },
    );
  }
}
