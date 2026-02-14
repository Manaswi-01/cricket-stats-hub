'use client';

import { useState, useMemo } from 'react';
import TeamCard from '@/components/TeamCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';

export default function TeamsClient({ initialTeams }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({});

    // Define available filters
    const filterConfig = [
        {
            key: 'rankingFilter',
            label: 'Ranking',
            options: [
                { value: 'top5', label: 'Top 5' },
                { value: 'top10', label: 'Top 10' },
            ]
        },
    ];

    // Apply search and filters
    const filteredTeams = useMemo(() => {
        let result = initialTeams;

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(team =>
                team.name.toLowerCase().includes(term) ||
                team.fullName.toLowerCase().includes(term)
            );
        }

        // Apply ranking filter
        if (filters.rankingFilter) {
            const maxRank = filters.rankingFilter === 'top5' ? 5 : 10;
            result = result.filter(team =>
                team.ranking.test <= maxRank ||
                team.ranking.odi <= maxRank ||
                team.ranking.t20 <= maxRank
            );
        }

        return result;
    }, [initialTeams, searchTerm, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div className="space-y-8">
            {/* Search */}
            <SearchBar
                onSearch={handleSearch}
                placeholder="Search teams by name..."
            />

            {/* Filters */}
            <FilterBar
                filters={filterConfig}
                activeFilters={filters}
                onFilterChange={handleFilterChange}
            />

            {/* Results count */}
            <div className="text-gray-600">
                {filteredTeams.length === initialTeams.length ? (
                    <p>Showing all {filteredTeams.length} teams</p>
                ) : (
                    <p>Found {filteredTeams.length} team{filteredTeams.length !== 1 ? 's' : ''} matching your criteria</p>
                )}
            </div>

            {/* Teams grid */}
            {filteredTeams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTeams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">No teams found matching your search criteria.</p>
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
        </div>
    );
}
