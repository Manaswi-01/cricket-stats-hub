import MatchesClient from './MatchesClient';
import { getMatches } from '@/lib/cricketApi';

export const metadata = {
    title: 'Cricket Matches - Live Scores, Scorecards & Results | CricketStats Hub',
    description: 'View cricket match scorecards, results, and highlights from Test, ODI, and T20 matches. Search matches by teams, venue, or filter by format.',
    keywords: 'cricket matches, live scores, scorecard, match results, Test matches, ODI matches, T20 matches, cricket highlights',
    openGraph: {
        title: 'Cricket Matches - Scorecards & Results',
        description: 'Complete cricket match scorecards and results from all formats.',
        type: 'website',
    },
};

export default async function MatchesPage() {
    // Fetch all matches directly from API function (SSR for SEO)
    const matches = await getMatches();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Cricket Matches</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Browse match scorecards, results, and highlights from international cricket matches across all formats
                    </p>
                </div>
            </section>

            {/* Matches Grid with Client-Side Features */}
            <section id="main-content" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <MatchesClient initialMatches={matches} />
                </div>
            </section>
        </div>
    );
}
