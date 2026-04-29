import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'Traxxouu';
    const headers = { 'Accept': 'application/vnd.github+json' };

    // Fetch user data + repos en parallèle
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) throw new Error('Erreur GitHub API');

    const userData = await userRes.json();

    // Compter le total de stars reçues sur tous les repos
    let totalStars = 0;
    if (reposRes.ok) {
      const repos = await reposRes.json();
      totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0);
    }

    return NextResponse.json({
      followers: userData.followers,
      public_repos: userData.public_repos,
      total_stars: totalStars,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des stats GitHub:', error);
    return NextResponse.json(
      { error: 'Impossible de récupérer les stats GitHub' },
      { status: 500 }
    );
  }
}
