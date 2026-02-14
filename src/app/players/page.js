import PlayerCard from '@/components/PlayerCard';
import { getAllPlayers } from '@/lib/cricketApi';

export const metadata = {
    title: 'Cricket Players - Stats, Profiles & Career Records | CricketStats Hub',
    description: 'Browse comprehensive cricket player statistics, profiles, and career records. View batting averages, centuries, wickets, and achievements of top international cricket players.',
    keywords: 'cricket players, player stats, batting average, cricket profiles, international cricket, player records, cricket careers',
    openGraph: {
        title: 'Cricket Players Directory - Complete Stats & Profiles',
        description: 'Explore detailed statistics and profiles of international cricket players.',
        type: 'website',
    },
};

export default async function PlayersPage() {
    // Fetch all players directly from API function
    const players = await getAllPlayers();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Cricket Players</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Explore detailed statistics, profiles, and career achievements of top international cricket players
                    </p>
                </div>
            </section>

            {/* Players Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {players.map((player) => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
