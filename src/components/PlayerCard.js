import Link from 'next/link';
import { FaTrophy, FaChartLine } from 'react-icons/fa';

export default function PlayerCard({ player }) {
  return (
    <Link href={`/players/${player.id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer card-hover animate-slide-up">
        {/* Header with consistent blue gradient */}
        <div className="relative h-56 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
          {/* Animated background circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>

          <div className="text-white text-center z-10">
            {/* Player initials instead of emoji */}
            <div className="text-8xl font-black mb-2 group-hover:scale-110 transition-transform duration-300 tracking-wider">
              {getPlayerInitials(player.name)}
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">{player.name}</h3>
            <p className="text-blue-100 font-medium mt-1">{player.country}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Role and Style */}
          <div className="flex items-center justify-between mb-5">
            <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
              {player.role}
            </span>
            <span className="text-gray-500 text-sm font-medium">{player.battingStyle}</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center bg-blue-50 rounded-lg py-3 border border-blue-100">
              <p className="text-3xl font-extrabold text-blue-700">{player.stats.matches}</p>
              <p className="text-xs text-gray-600 font-medium mt-1">Matches</p>
            </div>
            <div className="text-center bg-blue-50 rounded-lg py-3 border border-blue-100">
              <p className="text-3xl font-extrabold text-blue-700">{player.stats.runs}</p>
              <p className="text-xs text-gray-600 font-medium mt-1">Runs</p>
            </div>
            <div className="text-center bg-blue-50 rounded-lg py-3 border border-blue-100">
              <p className="text-3xl font-extrabold text-blue-700">{player.stats.average}</p>
              <p className="text-xs text-gray-600 font-medium mt-1">Average</p>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaTrophy className="text-yellow-600 text-lg" />
              <span>{player.stats.centuries} Centuries</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaChartLine className="text-blue-600 text-lg" />
              <span>SR: {player.stats.strikeRate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Get player initials (first letters of first and last name)
function getPlayerInitials(name) {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return parts[0][0] + parts[parts.length - 1][0];
  }
  return name.substring(0, 2).toUpperCase();
}