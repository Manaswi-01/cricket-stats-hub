'use client';

import { useState, useMemo } from 'react';
import MatchCard from '@/components/MatchCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import Pagination from '@/components/Pagination';

export default function MatchesClient({ initialMatches }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    // Define available filters
    const filterConfig = [
        {
            key: 'format',
            label: 'Format',
            options: [
                { value: 'Test', label: 'Test' },
                { value: 'ODI', label: 'ODI' },
                { value: 'T20', label: 'T20' },
            ]
        },
    ];

    // Apply search and filters
    const filteredMatches = useMemo(() => {
        let result = initialMatches;

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(match =>
                match.title.toLowerCase().includes(term) ||
                match.team1.toLowerCase().includes(term) ||
                match.team2.toLowerCase().includes(term) ||
                match.venue.toLowerCase().includes(term)
            );
        }

        // Apply format filter
        if (filters.format) {
            result = result.filter(match => match.format === filters.format);
        }

        return result;
    }, [initialMatches, searchTerm, filters]);

    // Pagination
    const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMatches = filteredMatches.slice(startIndex, startIndex + itemsPerPage);

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
                placeholder="Search matches by teams, venue, or title..."
            />

            {/* Filters */}
            <FilterBar
                filters={filterConfig}
                activeFilters={filters}
                onFilterChange={handleFilterChange}
            />

            {/* Results count */}
            <div className="text-gray-600">
                {filteredMatches.length === initialMatches.length ? (
                    <p>Showing all {filteredMatches.length} matches</p>
                ) : (
                    <p>Found {filteredMatches.length} match{filteredMatches.length !== 1 ? 'es' : ''} matching your criteria</p>
                )}
            </div>

            {/* Matches grid */}
            {paginatedMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedMatches.map((match) => (
                        <MatchCard key={match.id} match={match} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">No matches found matching your search criteria.</p>
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
            {filteredMatches.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredMatches.length}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            )}
        </div>
    );
}
