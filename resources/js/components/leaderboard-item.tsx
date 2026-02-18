import { TrendingUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { formatDistance, getCountryFlag, type LeaderboardUser } from '@/types';

type LeaderboardItemProps = {
    user: LeaderboardUser;
    animationDelay?: number;
};

export function LeaderboardItem({ user, animationDelay = 0 }: LeaderboardItemProps) {
    const isTopThree = user.rank <= 3;
    const rankClass = user.rank === 1 ? 'rank-1' : user.rank === 2 ? 'rank-2' : user.rank === 3 ? 'rank-3' : '';

    return (
        <div
            className={cn(
                'leaderboard-row animate-fade-in-up group relative flex items-center gap-4 rounded-xl p-4',
                'border border-transparent',
                isTopThree && 'top-3-glow border-[var(--strava-orange)]/20 bg-[var(--strava-orange)]/5',
            )}
            style={{ animationDelay: `${animationDelay}ms` }}
        >
            {/* Rank */}
            <div className={cn('rank-badge', rankClass)}>
                {isTopThree ? (
                    <span className="relative">
                        {user.rank}
                        {user.rank === 1 && <span className="absolute -top-1 -right-2 text-xs">👑</span>}
                    </span>
                ) : (
                    <span className="text-muted-foreground">{user.rank}</span>
                )}
            </div>

            {/* Profile Image */}
            <div
                className={cn(
                    'relative h-12 w-12 overflow-hidden rounded-full',
                    'ring-2 ring-border transition-all duration-300',
                    'group-hover:ring-[var(--strava-orange)]',
                    isTopThree && 'ring-[var(--strava-orange)]/50',
                )}
            >
                <img src={user.profileImage} alt={user.name} className="h-full w-full object-cover" loading="lazy" />
            </div>

            {/* Name and Country */}
            <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-semibold text-foreground">{user.name}</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <span className="text-base">{getCountryFlag(user.countryCode)}</span>
                    <span className="truncate">{user.countryName}</span>
                </span>
            </div>

            {/* Distance */}
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                    <TrendingUp className={cn('h-4 w-4', isTopThree ? 'text-[var(--strava-orange)]' : 'text-muted-foreground')} />
                    <span className={cn('font-display text-2xl', isTopThree ? 'text-[var(--strava-orange)]' : 'text-foreground')}>
                        {formatDistance(user.totalKm)}
                    </span>
                </div>
                <span className="text-xs text-muted-foreground">km total</span>
            </div>
        </div>
    );
}
