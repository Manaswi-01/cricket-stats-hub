import { notFound } from 'next/navigation';
import { getMatchById, getMatches } from '@/lib/cricketApi';
import { getTeamById } from '@/lib/cricketApi';
import MatchSchema from '@/components/schemas/MatchSchema';
import { FaTrophy, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

// Generate static params
export async function generateStaticParams() {
  const matches = await getMatches();
  return matches.map((match) => ({
    id: match.id,
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { id } = await params;

  // Fetch match directly from API function
  const match = await getMatchById(id);

  if (!match) {
    return {
      title: 'Match Not Found | CricketStats Hub',
    };
  }

  return {
    title: `${match.title} - Match Summary & Scorecard | CricketStats Hub`,
    description: `${match.title} played on ${match.date} at ${match.venue}. ${match.description} View complete scorecard, highlights, and match statistics.`,
    keywords: `${match.team1} vs ${match.team2}, ${match.title}, cricket match, scorecard, ${match.venue}, ${match.format}`,
    openGraph: {
      title: `${match.title} - Match Summary`,
      description: match.description,
      type: 'article',
      images: [
        {
          url: match.imageUrl || '/images/default-match.jpg',
          width: 1200,
          height: 630,
          alt: match.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: match.title,
      description: `${match.format} at ${match.venue}`,
      images: [match.imageUrl || '/images/default-match.jpg'],
    },
    alternates: {
      canonical: `/matches/${id}`,
    },
  };
}

export default async function MatchPage({ params }) {
  const { id } = await params;

  // Fetch match directly from API function
  const match = await getMatchById(id);

  if (!match) {
    notFound();
  }

  const team1 = await getTeamById(match.team1);
  const team2 = await getTeamById(match.team2);
  const winningTeam = await getTeamById(match.winner);

  return (
    <>
      {/* JSON-LD Schema */}
      <MatchSchema match={match} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex justify-center items-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-2">{getTeamFlag(match.team1)}</div>
                  <p className="text-2xl font-bold">{team1?.name || match.team1}</p>
                </div>
                <div className="text-4xl font-bold">VS</div>
                <div className="text-center">
                  <div className="text-6xl mb-2">{getTeamFlag(match.team2)}</div>
                  <p className="text-2xl font-bold">{team2?.name || match.team2}</p>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{match.title}</h1>

              <div className="flex flex-wrap justify-center gap-6 text-lg">
                <div className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg">
                  <FaCalendar />
                  <span>{new Date(match.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-lg">
                  <FaMapMarkerAlt />
                  <span>{match.venue}</span>
                </div>
                <div className="bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold shadow-lg">
                  <span className="font-bold">{match.format}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Result Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-center py-8 rounded-xl shadow-lg mb-8">
                <FaTrophy className="text-6xl mx-auto mb-4 text-yellow-900" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Match Winner</h2>
                <div className="text-5xl mb-2">{getTeamFlag(match.winner)}</div>
                <p className="text-4xl font-bold text-gray-900">{winningTeam?.name || match.winner}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Scorecard Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Scorecard</h2>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team 1 Score */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${getTeamGradient(match.team1)} text-white p-4`}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{getTeamFlag(match.team1)}</span>
                    <h3 className="text-2xl font-bold">{team1?.name || match.team1}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-5xl font-bold text-blue-600 mb-2">
                      {match.scorecard[match.team1].runs}/{match.scorecard[match.team1].wickets}
                    </p>
                    <p className="text-gray-600">({match.scorecard[match.team1].overs} overs)</p>
                  </div>

                  <div className="space-y-4">
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Top Scorer</h4>
                      <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                        <span className="font-medium">{match.scorecard[match.team1].topScorer.name}</span>
                        <span className="text-2xl font-bold text-green-600">
                          {match.scorecard[match.team1].topScorer.runs}
                        </span>
                      </div>
                    </div>

                    {match.scorecard[match.team1].topBowler && (
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Top Bowler</h4>
                        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                          <span className="font-medium">{match.scorecard[match.team1].topBowler.name}</span>
                          <span className="text-2xl font-bold text-blue-600">
                            {match.scorecard[match.team1].topBowler.wickets} wkts
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Team 2 Score */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${getTeamGradient(match.team2)} text-white p-4`}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{getTeamFlag(match.team2)}</span>
                    <h3 className="text-2xl font-bold">{team2?.name || match.team2}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-5xl font-bold text-blue-600 mb-2">
                      {match.scorecard[match.team2].runs}/{match.scorecard[match.team2].wickets}
                    </p>
                    <p className="text-gray-600">({match.scorecard[match.team2].overs} overs)</p>
                  </div>

                  <div className="space-y-4">
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Top Scorer</h4>
                      <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                        <span className="font-medium">{match.scorecard[match.team2].topScorer.name}</span>
                        <span className="text-2xl font-bold text-green-600">
                          {match.scorecard[match.team2].topScorer.runs}
                        </span>
                      </div>
                    </div>

                    {match.scorecard[match.team2].topBowler && (
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Top Bowler</h4>
                        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                          <span className="font-medium">{match.scorecard[match.team2].topBowler.name}</span>
                          <span className="text-2xl font-bold text-blue-600">
                            {match.scorecard[match.team2].topBowler.wickets} wkts
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Match Summary */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Match Summary</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {match.description}
              </p>

              <h3 className="text-2xl font-bold mb-4">Match Highlights</h3>
              <ul className="space-y-3">
                {match.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function getTeamGradient(teamId) {
  const gradients = {
    india: 'from-orange-500 to-blue-600',
    australia: 'from-yellow-400 to-green-600',
    england: 'from-blue-600 to-red-600',
    pakistan: 'from-green-600 to-emerald-700',
    'new-zealand': 'from-gray-800 to-gray-600',
    'south-africa': 'from-green-700 to-yellow-500',
  };
  return gradients[teamId] || 'from-gray-500 to-gray-700';
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