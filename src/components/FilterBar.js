'use client';

import { FaFilter, FaTimes } from 'react-icons/fa';

export default function FilterBar({
    filters = [],
    activeFilters = {},
    onFilterChange,
    className = ""
}) {
    const handleFilterChange = (filterKey, value) => {
        const newFilters = { ...activeFilters };

        if (value === 'all' || value === '') {
            delete newFilters[filterKey];
        } else {
            newFilters[filterKey] = value;
        }

        onFilterChange(newFilters);
    };

    const handleClearAll = () => {
        onFilterChange({});
    };

    const hasActiveFilters = Object.keys(activeFilters).length > 0;

    return (
        <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FaFilter className="text-blue-600" aria-hidden="true" />
                    <h3 className="font-semibold text-gray-700">Filters</h3>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={handleClearAll}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
                        aria-label="Clear all filters"
                    >
                        <FaTimes className="text-xs" />
                        Clear All
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filters.map((filter) => (
                    <div key={filter.key} className="flex flex-col">
                        <label
                            htmlFor={`filter-${filter.key}`}
                            className="text-sm font-medium text-gray-700 mb-2"
                        >
                            {filter.label}
                        </label>
                        <select
                            id={`filter-${filter.key}`}
                            value={activeFilters[filter.key] || 'all'}
                            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                            aria-label={`Filter by ${filter.label}`}
                        >
                            <option value="all">All {filter.label}</option>
                            {filter.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Active filters: {' '}
                        <span className="font-medium">
                            {Object.entries(activeFilters).map(([key, value]) => {
                                const filter = filters.find(f => f.key === key);
                                const option = filter?.options.find(o => o.value === value);
                                return option?.label || value;
                            }).join(', ')}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}
