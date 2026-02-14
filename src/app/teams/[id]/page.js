import { notFound } from 'next/navigation';
import { getTeamById, getAllTeams } from '@/lib/cricketApi';
import { getPlayerById } from '@/data/players';
import TeamSchema from '@/components/schemas/TeamSchema';
import PlayerCard from '@/components/PlayerCard';
import { FaTrophy, FaMedal } from 'react-icons/fa';

// Generate static params
export async function generateStaticParams() {
  const teams = await getAllTeams();
  return teams.map((team) => ({
    id: team.id,
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { id } = await params;

  // Fetch from API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const res = await fetch(`${baseUrl}/api/teams/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return {
      title: 'Team Not Found | CricketStats Hub',
    };
  }

  const { data: team } = await res.json();

  return {
    title: `${team.name} Cricket Team Stats - Rankings, Players & Records | CricketStats Hub`,
    description: `${team.name} cricket team statistics, world rankings (Test #${team.ranking.test}, ODI #${team.ranking.odi}, T20 #${team.ranking.t20}), ${team.stats.worldCupWins} World Cup wins. Complete team profile and performance analysis.`,
    keywords: `${team.name} cricket, ${team.name} team stats, ${team.name} rankings, ${team.name} players, cricket team rankings, ${team.captain}`,
    openGraph: {
      title: `${team.name} Cricket Team - Stats & Rankings`,
      description: team.description,
      type: 'website',
      images: [
        {
          url: team.imageUrl || '/images/default-team.jpg',
          width: 1200,
          height: 630,
          alt: `${team.name} Cricket Team`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${team.name} Cricket Team Rankings & Stats`,
      description: `Test #${team.ranking.test}, ODI #${team.ranking.odi}, T20 #${team.ranking.t20}`,
      images: [team.imageUrl || '/images/default-team.jpg'],
    },
    alternates: {
      canonical: `/teams/${id}`,
    },
  };
}

export default async function TeamPage({ params }) {
  const { id } = await params;

  // Fetch team data from API with SSR
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const res = await fetch(`${baseUrl}/api/teams/${id}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!res.ok) {
    notFound();
  }

  const { data: team } = await res.json();

  // Get top players
  const topPlayers = team.topPlayers.map(playerId => getPlayerById(playerId)).filter(Boolean);

  return (
    <>
      {/* JSON-LD Schema */}
      <TeamSchema team={team} />

      <div className="min-h-screen">
        {/* Hero */}
        <section className={`bg-gradient-to-br ${getTeamGradient(team.id)} text-white py-16`}>
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="text-9xl mb-4">{getTeamFlag(team.id)}</div>
              <h1 className="text-5xl font-bold mb-2">{team.fullName}</h1>
              <p className="text-2xl text-opacity-90 mb-6">Founded {team.founded}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-sm font-medium opacity-90">Captain</p>
                  <p className="text-xl font-bold">{team.captain}</p>
                </div>
                <div className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-sm font-medium opacity-90">Coach</p>
                  <p className="text-xl font-bold">{team.coach}</p>
                </div>
                <div className="bg-blue-800 text-white px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-sm font-medium opacity-90">World Cups</p>
                  <p className="text-xl font-bold">{team.stats.worldCupWins}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rankings */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">ICC Rankings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center border border-blue-200">
                <FaMedal className="text-5xl text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700 mb-2">Test Ranking</p>
                <p className="text-5xl font-bold text-blue-700">#{team.ranking.test}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center border border-blue-200">
                <FaMedal className="text-5xl text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700 mb-2">ODI Ranking</p>
                <p className="text-5xl font-bold text-blue-700">#{team.ranking.odi}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center border border-blue-200">
                <FaMedal className="text-5xl text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700 mb-2">T20 Ranking</p>
                <p className="text-5xl font-bold text-blue-700">#{team.ranking.t20}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Team Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl text-center shadow-md">
                <p className="text-4xl font-bold text-blue-600 mb-2">{team.stats.testWins}</p>
                <p className="text-gray-700">Test Wins</p>
              </div>
              <div className="bg-white p-6 rounded-xl text-center shadow-md">
                <p className="text-4xl font-bold text-blue-600 mb-2">{team.stats.odiWins}</p>
                <p className="text-gray-700">ODI Wins</p>
              </div>
              <div className="bg-white p-6 rounded-xl text-center shadow-md">
                <p className="text-4xl font-bold text-blue-600 mb-2">{team.stats.t20Wins}</p>
                <p className="text-gray-700">T20 Wins</p>
              </div>
              <div className="bg-white p-6 rounded-xl text-center shadow-md">
                <p className="text-4xl font-bold text-blue-600 mb-2">{team.stats.worldCupWins}</p>
                <p className="text-gray-700">World Cups</p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">About {team.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{team.description}</p>

              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaTrophy className="text-yellow-500" />
                Major Achievements
              </h3>
              <ul className="space-y-3">
                {team.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Top Players */}
        {topPlayers.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Star Players</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {topPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function getTeamGradient(teamId) {
  // All teams now use consistent blue gradient
  return 'from-blue-700 to-blue-900';
}

function getTeamFlag(teamId) {
  const flags = {
    india: '🇮🇳',
    australia: '🇦🇺',
    england: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    pakistan: '🇵🇰',
    'new-zealand': '🇳🇿',
    'south-africa': '🇿🇦',
  };
  return flags[teamId] || '🏏';
}