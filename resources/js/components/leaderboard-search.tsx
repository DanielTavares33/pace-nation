import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type LeaderboardSearchProps = {
    value: string;
    onChange: (value: string) => void;
    totalResults: number;
};

export function LeaderboardSearch({ value, onChange, totalResults }: LeaderboardSearchProps) {
    const [localValue, setLocalValue] = useState(value);

    // Debounce the search input
    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(localValue);
        }, 300);

        return () => clearTimeout(timer);
    }, [localValue, onChange]);

    // Sync with external value changes
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return (
        <div className="animate-fade-in-up animation-delay-100 flex items-center gap-4">
            <div className="relative max-w-md flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search athletes by name..."
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    className={cn(
                        'h-11 pr-10 pl-10',
                        'border-border bg-card',
                        'placeholder:text-muted-foreground',
                        'focus:border-[var(--strava-orange)] focus:ring-[var(--strava-orange)]',
                    )}
                />
                {localValue && (
                    <button
                        onClick={() => {
                            setLocalValue('');
                            onChange('');
                        }}
                        className={cn(
                            'absolute top-1/2 right-3 -translate-y-1/2',
                            'rounded-full p-1',
                            'text-muted-foreground hover:bg-muted hover:text-foreground',
                            'transition-colors',
                        )}
                    >
                        <X className="h-3 w-3" />
                    </button>
                )}
            </div>
            <span className="text-sm whitespace-nowrap text-muted-foreground">
                {totalResults} {totalResults === 1 ? 'athlete' : 'athletes'} found
            </span>
        </div>
    );
}
