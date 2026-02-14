import Link from 'next/link';
import { GiCricketBat } from 'react-icons/gi';
import { MdSportsCricket } from 'react-icons/md';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-xl sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition-opacity duration-300">
            <GiCricketBat className="text-3xl" />
            <span className="font-extrabold tracking-tight">CricketStats</span>
            <MdSportsCricket className="text-2xl" />
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="relative group px-1">
              <span className="font-semibold">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/players" className="relative group px-1">
              <span className="font-semibold">Players</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/teams" className="relative group px-1">
              <span className="font-semibold">Teams</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/matches" className="relative group px-1">
              <span className="font-semibold">Matches</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}