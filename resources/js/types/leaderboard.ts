export type LeaderboardUser = {
    rank: number;
    name: string;
    profileImage: string;
    totalKm: number;
    countryCode: string;
    countryName: string;
    region?: string;
};

export type KmRange = {
    label: string;
    min: number | null;
    max: number | null;
    value: string;
};

export type LeaderboardFilters = {
    country: string;
    region: string;
    kmRange: string;
    search: string;
};

export type Country = {
    code: string;
    name: string;
    regions: string[];
};

/**
 * Available KM range filter options
 */
export const KM_RANGES: KmRange[] = [
    { label: 'All distances', min: null, max: null, value: 'all' },
    { label: '0 - 50 km', min: 0, max: 50, value: '0-50' },
    { label: '50 - 100 km', min: 50, max: 100, value: '50-100' },
    { label: '100 - 500 km', min: 100, max: 500, value: '100-500' },
    { label: '500 - 1,000 km', min: 500, max: 1000, value: '500-1000' },
    { label: '1,000 - 2,500 km', min: 1000, max: 2500, value: '1000-2500' },
    { label: '2,500+ km', min: 2500, max: null, value: '2500+' },
];

/**
 * Maps ISO 3166-1 alpha-2 country codes to emoji flags
 */
export function getCountryFlag(countryCode: string): string {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

/**
 * Formats distance in kilometers with appropriate suffix
 */
export function formatDistance(km: number): string {
    if (km >= 1000) {
        return `${(km / 1000).toFixed(1)}k`;
    }
    return km.toLocaleString();
}

/**
 * Filters users based on the provided filters
 */
export function filterUsers(users: LeaderboardUser[], filters: LeaderboardFilters): LeaderboardUser[] {
    let filtered = [...users];

    // Filter by country
    if (filters.country && filters.country !== 'all') {
        filtered = filtered.filter((user) => user.countryCode === filters.country);
    }

    // Filter by region
    if (filters.region && filters.region !== 'all') {
        filtered = filtered.filter((user) => user.region === filters.region);
    }

    // Filter by KM range
    if (filters.kmRange && filters.kmRange !== 'all') {
        const range = KM_RANGES.find((r) => r.value === filters.kmRange);
        if (range) {
            filtered = filtered.filter((user) => {
                if (range.min !== null && user.totalKm < range.min) return false;
                if (range.max !== null && user.totalKm >= range.max) return false;
                return true;
            });
        }
    }

    // Filter by search term
    if (filters.search && filters.search.trim() !== '') {
        const searchLower = filters.search.toLowerCase().trim();
        filtered = filtered.filter((user) => user.name.toLowerCase().includes(searchLower));
    }

    return filtered;
}

/**
 * Paginates an array of users
 */
export function paginateUsers(
    users: LeaderboardUser[],
    page: number,
    perPage: number,
): {
    data: LeaderboardUser[];
    totalPages: number;
    totalItems: number;
    currentPage: number;
} {
    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const currentPage = Math.min(Math.max(1, page), totalPages || 1);
    const startIndex = (currentPage - 1) * perPage;
    const data = users.slice(startIndex, startIndex + perPage);

    return {
        data,
        totalPages,
        totalItems,
        currentPage,
    };
}
