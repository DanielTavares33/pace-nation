import { Globe, MapPin, Ruler } from 'lucide-react';

import { getAvailableCountries, getRegionsForCountry } from '@/data/mock-leaderboard';
import { cn } from '@/lib/utils';
import { getCountryFlag, KM_RANGES, type LeaderboardFilters } from '@/types/leaderboard';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type LeaderboardFiltersProps = {
    filters: LeaderboardFilters;
    onFiltersChange: (filters: LeaderboardFilters) => void;
};

export function LeaderboardFiltersBar({ filters, onFiltersChange }: LeaderboardFiltersProps) {
    const countries = getAvailableCountries();
    const regions = filters.country && filters.country !== 'all' ? getRegionsForCountry(filters.country) : [];

    const handleCountryChange = (value: string) => {
        onFiltersChange({
            ...filters,
            country: value,
            region: 'all', // Reset region when country changes
        });
    };

    const handleRegionChange = (value: string) => {
        onFiltersChange({
            ...filters,
            region: value,
        });
    };

    const handleKmRangeChange = (value: string) => {
        onFiltersChange({
            ...filters,
            kmRange: value,
        });
    };

    return (
        <div className={cn('animate-fade-in-up flex flex-wrap items-center gap-3', 'rounded-xl border border-border bg-card p-4')}>
            {/* Country Filter */}
            <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <Select value={filters.country} onValueChange={handleCountryChange}>
                    <SelectTrigger className="w-[180px] border-border bg-background">
                        <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                                <span className="flex items-center gap-2">
                                    <span>{getCountryFlag(country.code)}</span>
                                    <span>{country.name}</span>
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Select
                    value={filters.region}
                    onValueChange={handleRegionChange}
                    disabled={!filters.country || filters.country === 'all' || regions.length === 0}
                >
                    <SelectTrigger className="w-[180px] border-border bg-background">
                        <SelectValue placeholder="All Regions" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                                {region}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* KM Range Filter */}
            <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                <Select value={filters.kmRange} onValueChange={handleKmRangeChange}>
                    <SelectTrigger className="w-[180px] border-border bg-background">
                        <SelectValue placeholder="All Distances" />
                    </SelectTrigger>
                    <SelectContent>
                        {KM_RANGES.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                                {range.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Active Filters Count */}
            {(filters.country !== 'all' || filters.region !== 'all' || filters.kmRange !== 'all') && (
                <button
                    onClick={() =>
                        onFiltersChange({
                            country: 'all',
                            region: 'all',
                            kmRange: 'all',
                            search: filters.search,
                        })
                    }
                    className={cn('ml-auto text-sm font-medium', 'text-[var(--strava-orange)] hover:underline', 'transition-colors')}
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}
