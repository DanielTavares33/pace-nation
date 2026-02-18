import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type LeaderboardPaginationProps = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
    onPageChange: (page: number) => void;
};

export function LeaderboardPagination({ currentPage, totalPages, totalItems, perPage, onPageChange }: LeaderboardPaginationProps) {
    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, totalItems);

    // Generate page numbers to display
    const getPageNumbers = (): (number | 'ellipsis')[] => {
        const pages: (number | 'ellipsis')[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('ellipsis');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('ellipsis');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div
            className={cn(
                'animate-fade-in-up flex flex-col items-center justify-between gap-4 sm:flex-row',
                'rounded-xl border border-border bg-card p-4',
            )}
        >
            {/* Results info */}
            <span className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{startItem}</span> to{' '}
                <span className="font-medium text-foreground">{endItem}</span> of <span className="font-medium text-foreground">{totalItems}</span>{' '}
                athletes
            </span>

            {/* Pagination controls */}
            <div className="flex items-center gap-1">
                {/* Previous button */}
                <Button variant="ghost" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="h-9 w-9">
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers */}
                {getPageNumbers().map((page, index) =>
                    page === 'ellipsis' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                            ...
                        </span>
                    ) : (
                        <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'ghost'}
                            size="icon"
                            onClick={() => onPageChange(page)}
                            className={cn(
                                'h-9 w-9',
                                currentPage === page && 'bg-[var(--strava-orange)] text-white hover:bg-[var(--strava-orange-dark)]',
                            )}
                        >
                            {page}
                        </Button>
                    ),
                )}

                {/* Next button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-9 w-9"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
