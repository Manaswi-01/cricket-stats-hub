'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiCricketBat } from 'react-icons/gi';
import { MdSportsCricket } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/players', label: 'Players' },
    { href: '/teams', label: 'Teams' },
    { href: '/matches', label: 'Matches' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-xl sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-5" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 rounded-lg px-2"
            aria-label="CricketStats Hub Home"
          >
            <GiCricketBat className="text-3xl" aria-hidden="true" />
            <span className="font-extrabold tracking-tight">CricketStats</span>
            <MdSportsCricket className="text-2xl" aria-hidden="true" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center" role="menubar">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group px-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 rounded"
                aria-current={pathname === item.href ? 'page' : undefined}
                role="menuitem"
              >
                <span className={`font-semibold ${pathname === item.href ? 'text-yellow-300' : ''}`}>
                  {item.label}
                </span>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mt-4 pb-4 space-y-2"
            role="menu"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white ${pathname === item.href
                    ? 'bg-white bg-opacity-20 font-semibold text-yellow-300'
                    : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                aria-current={pathname === item.href ? 'page' : undefined}
                role="menuitem"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}