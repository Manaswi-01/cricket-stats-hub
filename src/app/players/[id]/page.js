import { notFound } from 'next/navigation';
import { getPlayerById, getAllPlayers } from '@/lib/cricketApi';
import PlayerSchema from '@/components/schemas/PlayerSchema';
import { FaTrophy, FaMedal } from 'react-icons/fa';

// Generate static params for all players
export async function generateStaticParams() {
  const players = await getAllPlayers();
  return players.map((player) => ({
    id: player.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;

  // Fetch player data directly from API function
  const player = await getPlayerById(id);

  if (!player) {
    return {
      title: 'Player Not Found | CricketStats Hub',
    };
  }

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

  // Fetch player data directly from API function
  const player = await getPlayerById(id);

  if (!player) {
    notFound();
  }

  // Get initials for display
  const initials = player.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {/* JSON-LD Schema */}
      <PlayerSchema player={player} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Player Image/Icon */}
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl">
                {initials}
              </div>

              {/* Player Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-black mb-4">{player.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                  <span className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg">{player.country}</span>
                  <span className="bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-lg">{player.role}</span>
                </div>
                <p className="text-xl text-blue-100 max-w-2xl">{player.bio}</p>
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
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Bowling Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div className="bg-white p-6 rounded-xl text-center shadow-md">
                    <p className="text-4xl font-bold text-blue-600 mb-2">{player.stats.wickets}</p>
                    <p className="text-gray-700">Wickets</p>
                  </div>
                  {player.stats.bowlingAverage && (
                    <div className="bg-white p-6 rounded-xl text-center shadow-md">
                      <p className="text-4xl font-bold text-green-600 mb-2">{player.stats.bowlingAverage}</p>
                      <p className="text-gray-700">Bowling Average</p>
                    </div>
                  )}
                  {player.stats.economy && (
                    <div className="bg-white p-6 rounded-xl text-center shadow-md">
                      <p className="text-4xl font-bold text-purple-600 mb-2">{player.stats.economy}</p>
                      <p className="text-gray-700">Economy</p>
                    </div>
                  )}
                  {player.stats.bestBowling && (
                    <div className="bg-white p-6 rounded-xl text-center shadow-md">
                      <p className="text-4xl font-bold text-orange-600 mb-2">{player.stats.bestBowling}</p>
                      <p className="text-gray-700">Best Bowling</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Achievements */}
        {player.achievements && player.achievements.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Major Achievements</h2>
              <div className="grid gap-4 max-w-3xl mx-auto">
                {player.achievements.map((achievement, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                    <FaTrophy className="text-3xl text-yellow-500" />
                    <p className="text-lg font-medium text-gray-800">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}