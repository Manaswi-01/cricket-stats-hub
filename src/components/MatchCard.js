import Link from 'next/link';

export default function MatchCard({ match }) {
    return (
        <Link href={`/matches/${match.id}`}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer card-hover animate-fade-in">
                {/* Header with consistent blue gradient */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                            {match.format}
                        </span>
                        <span className="text-sm opacity-90">
                            {new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold mt-2 leading-tight">{match.title}</h3>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Venue */}
                    <div className="flex items-center gap-2 mb-4 text-gray-600">
                        <span className="text-xl">📍</span>
                        <span className="text-sm font-medium">{match.venue}</span>
                    </div>

                    {/* Winner Badge */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Winner</p>
                        <p className="text-2xl font-extrabold text-blue-900 capitalize">{match.winner}</p>
                    </div>

                    {/* View Details */}
                    <div className="mt-5 flex items-center justify-between text-blue-700 font-semibold group/link">
                        <span className="group-hover/link:text-blue-800 transition-colors">View Scorecard</span>
                        <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
