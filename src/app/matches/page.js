import MatchCard from '@/components/MatchCard';
import { getMatches } from '@/lib/cricketApi';

// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Cricket Matches - Live Scores & Match Results | CricketStats Hub',
    description: 'View recent cricket match results, scorecards, and highlights. Get detailed information about international cricket matches including Test, ODI, and T20 fixtures.',
    keywords: 'cricket matches, live scores, match results, scorecards, cricket highlights, cricket fixtures, international cricket',
    openGraph: {
        title: 'Cricket Matches - Recent Results & Scorecards',
        description: 'Browse recent cricket match results and detailed scorecards.',
        type: 'website',
    },
};

export default async function MatchesPage() {
    // Fetch all matches directly from API function
    const matches = await getMatches();

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
