import Link from 'next/link';
import { FaTrophy } from 'react-icons/fa';

export default function TeamCard({ team }) {
  return (
    <Link href={`/teams/${team.id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer card-hover animate-scale-in">
        {/* Header with consistent blue gradient */}
        <div className="relative h-52 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full transform translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full transform -translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          <div className="text-white text-center z-10">
            {/* Team initials instead of emoji */}
            <div className="text-8xl font-black mb-2 group-hover:scale-110 transition-transform duration-300 tracking-wider">
              {getTeamInitials(team.id)}
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">{team.name}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Rankings Grid - All in blue tones */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center border border-blue-200">
              <p className="text-2xl font-extrabold text-blue-700">#{team.ranking.test}</p>
              <p className="text-xs text-gray-600 font-semibold mt-1">Test</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center border border-blue-200">
              <p className="text-2xl font-extrabold text-blue-700">#{team.ranking.odi}</p>
              <p className="text-xs text-gray-600 font-semibold mt-1">ODI</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center border border-blue-200">
              <p className="text-2xl font-extrabold text-blue-700">#{team.ranking.t20}</p>
              <p className="text-xs text-gray-600 font-semibold mt-1">T20</p>
            </div>
          </div>

          {/* Team Info */}
          <div className="space-y-3 mb-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-600 text-sm font-medium">Captain</span>
              <span className="font-bold text-gray-900">{team.captain}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-600 text-sm font-medium">Coach</span>
              <span className="font-bold text-gray-900">{team.coach}</span>
            </div>
          </div>

          {/* World Cups Badge */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-4 rounded-lg flex items-center justify-between">
            <span className="text-gray-700 font-semibold">World Cups</span>
            <div className="flex items-center gap-2">
              <FaTrophy className="text-yellow-600 text-2xl" />
              <span className="font-extrabold text-3xl text-blue-800">{team.stats.worldCupWins}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Get team initials for display
function getTeamInitials(teamId) {
  const initials = {
    india: 'IND',
    australia: 'AUS',
    england: 'ENG',
    pakistan: 'PAK',
    'new-zealand': 'NZ',
    'south-africa': 'SA',
  };
  return initials[teamId] || 'INT';
}