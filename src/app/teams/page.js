import TeamCard from '@/components/TeamCard';

// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Cricket Team Rankings & Stats - International Teams | CricketStats Hub',
    description: 'View current ICC cricket team rankings, statistics, and squad details for all international cricket teams. Test, ODI, and T20 rankings updated regularly.',
    openGraph: {
        title: 'Cricket Team Rankings & Statistics',
        description: 'Current ICC rankings and team statistics for international cricket',
        type: 'website',
    },
};

export default async function TeamsPage() {
    // Fetch all teams from API with SSR
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const res = await fetch(`${baseUrl}/api/teams`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const { data: teams } = await res.json();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">International Cricket Teams</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Discover team statistics, ICC rankings, squad details, and achievements of top cricket nations
                    </p>
                </div>
            </section>

            {/* Teams Grid */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teams.map((team) => (
                            <TeamCard key={team.id} team={team} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
