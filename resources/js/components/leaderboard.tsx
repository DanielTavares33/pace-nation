import { Link } from '@inertiajs/react';
import { ArrowRight, Medal } from 'lucide-react';

import { LeaderboardItem } from '@/components/leaderboard-item';
import { Button } from '@/components/ui/button';
import { MOCK_USERS } from '@/data/mock-leaderboard';
import { cn } from '@/lib/utils';

const PREVIEW_COUNT = 5;

export function Leaderboard() {
    const displayedUsers = MOCK_USERS.slice(0, PREVIEW_COUNT);

    return (
        <section className="py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="animate-fade-in-up mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className={cn(
                                'flex h-10 w-10 items-center justify-center rounded-lg',
                                'bg-gradient-to-br from-[var(--strava-orange)] to-[var(--strava-orange-dark)]',
                            )}
                        >
                            <Medal className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl tracking-wide text-foreground">TOP ATHLETES</h2>
                            <p className="text-sm text-muted-foreground">Updated in real-time</p>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Card */}
                <div className={cn('card-glow overflow-hidden rounded-2xl', 'border border-border bg-card')}>
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
                    <div className="divide-y divide-border/50">
                        {displayedUsers.map((user, index) => (
                            <LeaderboardItem key={user.rank} user={user} animationDelay={100 + index * 30} />
                        ))}
                    </div>

                    {/* See More Button */}
                    <div className="border-t border-border/50 bg-muted/30 p-4">
                        <Button
                            variant="ghost"
                            className={cn(
                                'w-full gap-2 font-semibold',
                                'text-[var(--strava-orange)] hover:bg-[var(--strava-orange)]/10 hover:text-[var(--strava-orange)]',
                                'transition-all duration-300',
                            )}
                            asChild
                        >
                            <Link href="/leaderboard">
                                <span>See all athletes</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
