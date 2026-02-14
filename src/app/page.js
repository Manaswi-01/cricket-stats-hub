import Link from 'next/link';
import { getAllPlayers, getAllTeams, getMatches } from '@/lib/cricketApi';
import PlayerCard from '@/components/PlayerCard';
import TeamCard from '@/components/TeamCard';
import MatchCard from '@/components/MatchCard';
import { FaTrophy, FaUsers, FaChartLine } from 'react-icons/fa';
import OrganizationSchema from '@/components/schemas/OrganizationSchema';

export const metadata = {
    title: 'Cricket Stats Hub - Live Player Stats, Team Rankings & Match Scores',
    description: 'Your ultimate destination for cricket statistics. View live player stats, ICC team rankings, match scorecards, and comprehensive cricket data. Updated daily with the latest cricket news and insights.',
    keywords: 'cricket stats, player statistics, team rankings, ICC rankings, match scores, cricket data, live cricket, cricket news, cricket players',
    openGraph: {
        title: 'Cricket Stats Hub - Live Cricket Statistics & Rankings',
        description: 'Comprehensive cricket statistics, player profiles, team rankings, and live match scores.',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Cricket Stats Hub',
            },
        ],
    },
};

export default async function HomePage() {
    // Fetch data directly from API functions (no HTTP needed for SSR)
    const allPlayers = await getAllPlayers();
    const allTeams = await getAllTeams();
    const allMatches = await getMatches();

    // Get featured content
    const featuredPlayers = allPlayers.slice(0, 6);
    const featuredTeams = allTeams.slice(0, 3);
    const recentMatches = allMatches.slice(0, 3);

    return (
        <>
            <OrganizationSchema />

            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Cricket Statistics Hub
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Comprehensive cricket statistics, player profiles, team rankings, and live match analysis
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/players">
                                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                    View Players
                                </button>
                            </Link>
                            <Link href="/teams">
                                <button className="bg-blue-500 bg-opacity-30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-50 transition-colors border-2 border-white">
                                    Team Rankings
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Stats Overview */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                <FaTrophy className="text-5xl text-blue-600 mx-auto mb-4" />
                                <p className="text-4xl font-bold text-blue-600 mb-2">{allPlayers.length}</p>
                                <p className="text-gray-700 font-medium">Players</p>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                                <FaChartLine className="text-5xl text-green-600 mx-auto mb-4" />
                                <p className="text-4xl font-bold text-green-600 mb-2">{allTeams.length}</p>
                                <p className="text-gray-700 font-medium">International Teams</p>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                <FaFire className="text-5xl text-purple-600 mx-auto mb-4" />
                                <p className="text-4xl font-bold text-purple-600 mb-2">{allMatches.length}</p>
                                <p className="text-gray-700 font-medium">Matches Available</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Players */}
                <section id="players" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Featured Players</h2>
                            <p className="text-xl text-gray-600">
                                Explore profiles of the world's top cricket players
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredPlayers.map((player) => (
                                <PlayerCard key={player.id} player={player} />
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link href="/players">
                                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                    View All Players ({allPlayers.length})
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* International Teams */}
                <section id="teams" className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">International Teams</h2>
                            <p className="text-xl text-gray-600">
                                Discover team statistics, rankings, and squad details
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredTeams.map((team) => (
                                <TeamCard key={team.id} team={team} />
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link href="/teams">
                                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                    View All Teams ({allTeams.length})
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Recent Matches */}
                <section id="matches" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Recent Matches</h2>
                            <p className="text-xl text-gray-600">
                                View detailed scorecards and match highlights
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recentMatches.map((match) => (
                                <MatchCard key={match.id} match={match} />
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link href="/matches">
                                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                                    View All Matches ({allMatches.length})
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
