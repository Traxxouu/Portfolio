import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'Traxxouu'; // Ton username GitHub
    
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
      },
      next: { revalidate: 3600 } // Cache pendant 1 heure
    });

    if (!response.ok) {
      throw new Error('Erreur GitHub API');
    }

    const data = await response.json();

    return NextResponse.json({
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
      avatar_url: data.avatar_url,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des stats GitHub:', error);
    return NextResponse.json(
      { error: 'Impossible de récupérer les stats GitHub' },
      { status: 500 }
    );
  }
}