import { Link } from '@inertiajs/react';
import { Activity } from 'lucide-react';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
    return (
        <nav className="navbar-glass fixed top-0 right-0 left-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and Brand */}
                    <Link href="/" className="group flex items-center gap-3">
                        <div
                            className={cn(
                                'flex h-10 w-10 items-center justify-center rounded-xl',
                                'bg-gradient-to-br from-[var(--strava-orange)] to-[var(--strava-orange-dark)]',
                                'shadow-[var(--strava-orange-glow)] shadow-lg',
                                'transition-transform duration-300 group-hover:scale-110',
                            )}
                        >
                            <Activity className="h-6 w-6 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display text-xl leading-none tracking-wide text-foreground">PACE NATION</span>
                            <span className="text-xs text-muted-foreground">Regional Leaderboards</span>
                        </div>
                    </Link>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        <Button className="strava-btn h-10 rounded-full px-6 text-white" asChild>
                            <a href="/auth/strava" className="flex items-center gap-2">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7.006 13.828h4.169" />
                                </svg>
                                <span className="hidden font-medium sm:inline">Connect with Strava</span>
                                <span className="font-medium sm:hidden">Connect</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
