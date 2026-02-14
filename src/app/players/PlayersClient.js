'use client';

import { useState, useMemo } from 'react';
import PlayerCard from '@/components/PlayerCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import Pagination from '@/components/Pagination';

export default function PlayersClient({ initialPlayers }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    // Define available filters
    const filterConfig = [
        {
            key: 'role',
            label: 'Role',
            options: [
                { value: 'Batsman', label: 'Batsman' },
                { value: 'Bowler', label: 'Bowler' },
                { value: 'All-rounder', label: 'All-rounder' },
                { value: 'Wicket-keeper', label: 'Wicket-keeper' },
            ]
        },
        {
            key: 'country',
            label: 'Country',
            options: [
                { value: 'India', label: 'India' },
                { value: 'Australia', label: 'Australia' },
                { value: 'England', label: 'England' },
                { value: 'Pakistan', label: 'Pakistan' },
                { value: 'New Zealand', label: 'New Zealand' },
                { value: 'South Africa', label: 'South Africa' },
            ]
        },
    ];

    // Apply search and filters
    const filteredPlayers = useMemo(() => {
        let result = initialPlayers;

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(player =>
                player.name.toLowerCase().includes(term) ||
                player.country.toLowerCase().includes(term) ||
                player.role.toLowerCase().includes(term)
            );
        }

        // Apply filters
        Object.entries(filters).forEach(([key, value]) => {
            result = result.filter(player => player[key] === value);
        });

        return result;
    }, [initialPlayers, searchTerm, filters]);

    // Pagination
    const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPlayers = filteredPlayers.slice(startIndex, startIndex + itemsPerPage);

    // Reset to page 1 when filters change
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (items) => {
        setItemsPerPage(items);
        setCurrentPage(1);
    };

    return (
        <div className="space-y-8">
            {/* Search */}
            <SearchBar
                onSearch={handleSearch}
                placeholder="Search players by name, country, or role..."
            />

            {/* Filters */}
            <FilterBar
                filters={filterConfig}
                activeFilters={filters}
                onFilterChange={handleFilterChange}
            />

            {/* Results count */}
            <div className="text-gray-600">
                {filteredPlayers.length === initialPlayers.length ? (
                    <p>Showing all {filteredPlayers.length} players</p>
                ) : (
                    <p>Found {filteredPlayers.length} player{filteredPlayers.length !== 1 ? 's' : ''} matching your criteria</p>
                )}
            </div>

            {/* Players grid */}
            {paginatedPlayers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedPlayers.map((player) => (
                        <PlayerCard key={player.id} player={player} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">No players found matching your search criteria.</p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setFilters({});
                        }}
                        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Clear all filters
                    </button>
                </div>
            )}

            {/* Pagination */}
            {filteredPlayers.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredPlayers.length}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            )}
        </div>
    );
}
