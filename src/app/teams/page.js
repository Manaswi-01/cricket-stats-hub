import { getAllTeams } from '@/lib/cricketApi';
import TeamCard from '@/components/TeamCard';

export const metadata = {
    title: 'Cricket Teams - ICC Rankings & Team Stats | CricketStats Hub',
    description: 'View ICC cricket team rankings, statistics, and profiles for Test, ODI, and T20 formats. Explore team records, achievements, and current world standings.',
    keywords: 'cricket teams, ICC rankings, team stats, Test cricket, ODI cricket, T20 cricket, world rankings, cricket nations',
    openGraph: {
        title: 'Cricket Teams & ICC Rankings - Complete Team Stats',
        description: 'ICC team rankings and comprehensive statistics for international cricket teams.',
        type: 'website',
    },
};

export default async function TeamsPage() {
    // Fetch all teams directly from API function
    const teams = await getAllTeams();

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
