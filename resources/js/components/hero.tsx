import { MapPin, Trophy } from 'lucide-react';

import { cn } from '@/lib/utils';

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 -z-10">
                {/* Gradient Orb */}
                <div className={cn('absolute -top-40 -right-40 h-96 w-96 rounded-full', 'bg-[var(--strava-orange)] opacity-10 blur-3xl')} />
                <div className={cn('absolute -bottom-20 -left-20 h-72 w-72 rounded-full', 'bg-[var(--strava-orange)] opacity-5 blur-3xl')} />
                {/* Diagonal Stripes */}
                <div className="diagonal-stripes absolute top-0 right-0 h-full w-1/3 opacity-30" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    {/* Badge */}
                    <div
                        className={cn(
                            'animate-fade-in-down mb-6 inline-flex items-center gap-2 rounded-full',
                            'border border-[var(--strava-orange)]/20 bg-[var(--strava-orange)]/10 px-4 py-2',
                            'text-sm font-medium text-[var(--strava-orange)]',
                        )}
                    >
                        <Trophy className="h-4 w-4" />
                        <span>Compete with athletes in your region</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="animate-fade-in-up animation-delay-100">
                        <span className="hero-title block text-foreground">FIND YOUR</span>
                        <span className="hero-title hero-accent block">PACE</span>
                    </h1>

                    {/* Subtitle */}
                    <p className={cn('animate-fade-in-up animation-delay-300 mt-8 max-w-2xl', 'text-lg text-muted-foreground sm:text-xl')}>
                        Discover where you stand among Strava athletes in your country and region. Track your progress, climb the rankings, and push
                        your limits.
                    </p>

                    {/* Stats Row */}
                    <div
                        className={cn(
                            'animate-fade-in-up animation-delay-500 mt-12 grid grid-cols-3 gap-8',
                            'rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm',
                            'sm:gap-16 sm:px-12',
                        )}
                    >
                        <div className="text-center">
                            <div className="font-display text-3xl text-[var(--strava-orange)] sm:text-4xl">50K+</div>
                            <div className="mt-1 text-sm text-muted-foreground">Athletes</div>
                        </div>
                        <div className="text-center">
                            <div className="font-display text-3xl text-[var(--strava-orange)] sm:text-4xl">120+</div>
                            <div className="mt-1 text-sm text-muted-foreground">Countries</div>
                        </div>
                        <div className="text-center">
                            <div className="font-display text-3xl text-[var(--strava-orange)] sm:text-4xl">1M+</div>
                            <div className="mt-1 text-sm text-muted-foreground">KM Tracked</div>
                        </div>
                    </div>

                    {/* Filter Pills (Visual placeholder) */}
                    <div className="animate-fade-in-up animation-delay-700 mt-10 flex flex-wrap items-center justify-center gap-3">
                        <span className="text-sm text-muted-foreground">Filter by:</span>
                        <button
                            className={cn(
                                'inline-flex items-center gap-2 rounded-full px-4 py-2',
                                'border border-[var(--strava-orange)] bg-[var(--strava-orange)]/10',
                                'text-sm font-medium text-[var(--strava-orange)]',
                                'transition-all hover:bg-[var(--strava-orange)] hover:text-white',
                            )}
                        >
                            <MapPin className="h-4 w-4" />
                            Country
                        </button>
                        <button
                            className={cn(
                                'inline-flex items-center gap-2 rounded-full px-4 py-2',
                                'border border-border bg-secondary',
                                'text-sm font-medium text-secondary-foreground',
                                'transition-all hover:border-[var(--strava-orange)] hover:text-[var(--strava-orange)]',
                            )}
                        >
                            Regions
                        </button>
                        <button
                            className={cn(
                                'inline-flex items-center gap-2 rounded-full px-4 py-2',
                                'border border-border bg-secondary',
                                'text-sm font-medium text-secondary-foreground',
                                'transition-all hover:border-[var(--strava-orange)] hover:text-[var(--strava-orange)]',
                            )}
                        >
                            And More...
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
