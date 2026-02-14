'use client';

import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchBar({
    onSearch,
    placeholder = "Search...",
    className = ""
}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (value) => {
        setSearchTerm(value);
        // Debounce search to avoid excessive filtering
        const timeoutId = setTimeout(() => {
            onSearch(value);
        }, 300);
        return () => clearTimeout(timeoutId);
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <FaSearch
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    aria-hidden="true"
                />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    aria-label={placeholder}
                />
                {searchTerm && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Clear search"
                    >
                        <FaTimes />
                    </button>
                )}
            </div>
        </div>
    );
}
