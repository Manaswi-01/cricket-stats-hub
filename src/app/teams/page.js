import TeamsClient from './TeamsClient';
import { getAllTeams } from '@/lib/cricketApi';

export const metadata = {
    title: 'Cricket Teams - ICC Rankings, Stats & Squad Info | CricketStats Hub',
    description: 'View ICC cricket team rankings, statistics, and squad information for all international teams. Compare Test, ODI, and T20 rankings. Filter and search teams.',
    keywords: 'cricket teams, ICC rankings, team stats, Test rankings, ODI rankings, T20 rankings, cricket squad, international teams',
    openGraph: {
        title: 'International Cricket Teams - Rankings & Stats',
        description: 'Complete cricket team rankings and statistics for all international teams.',
        type: 'website',
    },
};

export default async function TeamsPage() {
    // Fetch all teams directly from API function (SSR for SEO)
    const teams = await getAllTeams();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Cricket Teams</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        View ICC rankings, team statistics, and squad information for all international cricket teams
                    </p>
                </div>
            </section>

            {/* Teams Grid with Client-Side Features */}
            <section id="main-content" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <TeamsClient initialTeams={teams} />
                </div>
            </section>
        </div>
    );
}
