import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Medal, Users } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Footer } from '@/components/footer';
import { LeaderboardFiltersBar } from '@/components/leaderboard-filters';
import { LeaderboardItem } from '@/components/leaderboard-item';
import { LeaderboardPagination } from '@/components/leaderboard-pagination';
import { LeaderboardSearch } from '@/components/leaderboard-search';
import { Navbar } from '@/components/navbar';
import { MOCK_USERS } from '@/data/mock-leaderboard';
import { cn } from '@/lib/utils';
import { filterUsers, type LeaderboardFilters, paginateUsers } from '@/types/leaderboard';

const ITEMS_PER_PAGE = 10;

export default function LeaderboardPage() {
    const [filters, setFilters] = useState<LeaderboardFilters>({
        country: 'all',
        region: 'all',
        kmRange: 'all',
        search: '',
    });
    const [currentPage, setCurrentPage] = useState(1);

    // Filter and paginate users
    const filteredUsers = useMemo(() => {
        return filterUsers(MOCK_USERS, filters);
    }, [filters]);

    const paginatedData = useMemo(() => {
        return paginateUsers(filteredUsers, currentPage, ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    // Reset to page 1 when filters change
    const handleFiltersChange = (newFilters: LeaderboardFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleSearchChange = (search: string) => {
        setFilters((prev) => ({ ...prev, search }));
        setCurrentPage(1);
    };

    return (
        <>
            <Head title="Leaderboard - All Athletes" />

            <div className="min-h-screen bg-background">
                <Navbar />

                <main className="pt-24 pb-16">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        {/* Page Header */}
                        <div className="animate-fade-in-down mb-8">
                            {/* Back Link */}
                            <Link
                                href="/"
                                className={cn(
                                    'mb-4 inline-flex items-center gap-2',
                                    'text-sm text-muted-foreground hover:text-foreground',
                                    'transition-colors',
                                )}
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Link>

                            <div className="flex items-center gap-4">
                                <div
                                    className={cn(
                                        'flex h-14 w-14 items-center justify-center rounded-2xl',
                                        'bg-gradient-to-br from-[var(--strava-orange)] to-[var(--strava-orange-dark)]',
                                        'shadow-[var(--strava-orange-glow)] shadow-lg',
                                    )}
                                >
                                    <Medal className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <h1 className="font-display text-4xl tracking-wide text-foreground">LEADERBOARD</h1>
                                    <p className="text-muted-foreground">Discover top athletes from around the world</p>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="mb-6 space-y-4">
                            <LeaderboardFiltersBar filters={filters} onFiltersChange={handleFiltersChange} />
                            <LeaderboardSearch value={filters.search} onChange={handleSearchChange} totalResults={filteredUsers.length} />
                        </div>

                        {/* Leaderboard */}
                        <div className={cn('card-glow mb-6 overflow-hidden rounded-2xl', 'border border-border bg-card')}>
                            {/* Header Row */}
                            <div
                                className={cn(
                                    'flex items-center gap-4 border-b border-border bg-muted/50 px-4 py-3',
                                    'text-xs font-semibold tracking-wider text-muted-foreground uppercase',
                                )}
                            >
                                <span className="min-w-[3rem] text-center">Rank</span>
                                <span className="ml-12">Athlete</span>
                                <span className="ml-auto">Distance</span>
                            </div>

                            {/* List */}
                            {paginatedData.data.length > 0 ? (
                                <div className="divide-y divide-border/50">
                                    {paginatedData.data.map((user, index) => (
                                        <LeaderboardItem key={user.rank} user={user} animationDelay={50 + index * 30} />
                                    ))}
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="flex flex-col items-center justify-center px-4 py-16">
                                    <div className={cn('flex h-16 w-16 items-center justify-center rounded-full', 'mb-4 bg-muted')}>
                                        <Users className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="mb-1 text-lg font-semibold text-foreground">No athletes found</h3>
                                    <p className="max-w-sm text-center text-sm text-muted-foreground">
                                        Try adjusting your filters or search term to find athletes.
                                    </p>
                                    <button
                                        onClick={() =>
                                            handleFiltersChange({
                                                country: 'all',
                                                region: 'all',
                                                kmRange: 'all',
                                                search: '',
                                            })
                                        }
                                        className={cn('mt-4 text-sm font-medium', 'text-[var(--strava-orange)] hover:underline')}
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {paginatedData.totalPages > 1 && (
                            <LeaderboardPagination
                                currentPage={paginatedData.currentPage}
                                totalPages={paginatedData.totalPages}
                                totalItems={paginatedData.totalItems}
                                perPage={ITEMS_PER_PAGE}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
