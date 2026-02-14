import MatchCard from '@/components/MatchCard';

// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Cricket Match Scorecards & Results - Recent Matches | CricketStats Hub',
    description: 'View complete cricket match scorecards, results, and highlights. Coverage of Test matches, ODIs, and T20Is with detailed statistics and analysis.',
    openGraph: {
        title: 'Cricket Match Scorecards & Results',
        description: 'Detailed match scorecards and cricket match results',
        type: 'website',
    },
};

export default async function MatchesPage() {
    // Fetch all matches from API with SSR
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/matches`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const { data: matches } = await res.json();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Cricket Matches</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Explore detailed match scorecards, results, and highlights from recent international cricket matches
                    </p>
                </div>
            </section>

            {/* Matches Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {matches.map((match) => (
                            <MatchCard key={match.id} match={match} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
