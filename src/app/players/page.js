import PlayerCard from '@/components/PlayerCard';

// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Cricket Players Stats & Profiles - All Players | CricketStats Hub',
    description: 'Browse comprehensive cricket player statistics and profiles. View detailed stats, career achievements, and performance analysis for top international cricket players.',
    openGraph: {
        title: 'Cricket Players - Stats & Profiles',
        description: 'Comprehensive cricket player statistics and profiles',
        type: 'website',
    },
};

export default async function PlayersPage() {
    // Fetch all players from API with SSR
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const res = await fetch(`${baseUrl}/api/players`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const { data: players } = await res.json();

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
