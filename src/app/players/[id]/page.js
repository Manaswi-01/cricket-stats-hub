import { notFound } from 'next/navigation';
import { getAllPlayerIds } from '@/data/players';
import StatsChart from '@/components/StatsChart';
import PlayerSchema from '@/components/schemas/PlayerSchema';
import { FaTrophy, FaMedal } from 'react-icons/fa';

// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Generate static params for all players
export async function generateStaticParams() {
  const playerIds = getAllPlayerIds();
  return playerIds.map((id) => ({
    id: id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;

  // Fetch player data from API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const res = await fetch(`${baseUrl}/api/players/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return {
      title: 'Player Not Found | CricketStats Hub',
    };
  }

  const { data: player } = await res.json();

  return {
    title: `${player.name} Stats, Profile & Career Statistics | CricketStats Hub`,
    description: `Complete ${player.name} cricket statistics: batting average ${player.stats.average}, ${player.stats.runs} runs, ${player.stats.centuries} centuries. View career stats, achievements & profile.`,
    keywords: `${player.name}, ${player.name} stats, ${player.country} cricket, ${player.role}, cricket statistics, ${player.name} centuries, ${player.name} batting average`,
    openGraph: {
      title: `${player.name} - Cricket Player Stats & Profile`,
      description: `${player.stats.runs} runs, ${player.stats.centuries} centuries, ${player.stats.average} avg. ${player.bio}`,
      type: 'profile',
      images: [
        {
          url: player.imageUrl || '/images/default-player.jpg',
          width: 1200,
          height: 630,
          alt: `${player.name} Cricket Profile Picture`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${player.name} Cricket Stats & Profile`,
      description: `${player.stats.runs} runs, ${player.stats.centuries} centuries, ${player.stats.average} average`,
      images: [player.imageUrl || '/images/default-player.jpg'],
    },
    alternates: {
      canonical: `/players/${id}`,
    },
  };
}

export default async function PlayerPage({ params }) {
  const { id } = await params;

  // Fetch player data from API with SSR
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const res = await fetch(`${baseUrl}/api/players/${id}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!res.ok) {
    notFound();
  }

  const { data: player } = await res.json();

  // Prepare chart data
  const statsData = [
    { name: 'Matches', value: player.stats.matches },
    { name: 'Centuries', value: player.stats.centuries },
    { name: 'Fifties', value: player.stats.fifties },
  ];

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <PlayerSchema player={player} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-8xl">
                🏏
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-bold mb-2">{player.name}</h1>
                <p className="text-2xl text-blue-100 mb-4">{player.country} • {player.role}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <span className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg">
                    {player.battingStyle}
                  </span>
                  <span className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg">
                    {player.bowlingStyle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Career Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border border-blue-200">
                <p className="text-4xl font-bold text-blue-700 mb-2">{player.stats.matches}</p>
                <p className="text-gray-700 font-medium">Matches</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border border-blue-200">
                <p className="text-4xl font-bold text-blue-700 mb-2">{player.stats.runs}</p>
                <p className="text-gray-700 font-medium">Total Runs</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border border-blue-200">
                <p className="text-4xl font-bold text-blue-700 mb-2">{player.stats.average}</p>
                <p className="text-gray-700 font-medium">Average</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border border-blue-200">
                <p className="text-4xl font-bold text-blue-700 mb-2">{player.stats.strikeRate}</p>
                <p className="text-gray-700 font-medium">Strike Rate</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border border-blue-200">
                <p className="text-4xl font-bold text-blue-700 mb-2">{player.stats.centuries}</p>
                <p className="text-gray-700 font-medium">Centuries</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border border-blue-200">
                <p className="text-4xl font-bold text-blue-700 mb-2">{player.stats.fifties}</p>
                <p className="text-gray-700 font-medium">Half Centuries</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border border-blue-200">
                <p className="text-4xl font-bold text-blue-700 mb-2">{player.stats.highestScore}</p>
                <p className="text-gray-700 font-medium">Highest Score</p>
              </div>

            </div>

            {/* Bowling Stats (if applicable) */}
            {player.stats.wickets && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl text-center">
                  <p className="text-4xl font-bold text-teal-600 mb-2">{player.stats.wickets}</p>
                  <p className="text-gray-700 font-medium">Wickets</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-xl text-center">
                  <p className="text-4xl font-bold text-cyan-600 mb-2">{player.stats.bowlingAverage}</p>
                  <p className="text-gray-700 font-medium">Bowling Avg</p>
                </div>
                <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-6 rounded-xl text-center">
                  <p className="text-4xl font-bold text-sky-600 mb-2">{player.stats.economy}</p>
                  <p className="text-gray-700 font-medium">Economy</p>
                </div>
                <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-6 rounded-xl text-center">
                  <p className="text-4xl font-bold text-violet-600 mb-2">{player.stats.bestBowling}</p>
                  <p className="text-gray-700 font-medium">Best Figures</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Biography */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">About {player.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{player.bio}</p>

              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaMedal className="text-yellow-500" />
                Career Achievements
              </h3>
              <ul className="space-y-3">
                {player.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Stats Chart */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <StatsChart
                data={statsData}
                title={`${player.name} - Performance Overview`}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}