import { Activity, Github, Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-8">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div
                            className={cn(
                                'flex h-8 w-8 items-center justify-center rounded-lg',
                                'bg-gradient-to-br from-[var(--strava-orange)] to-[var(--strava-orange-dark)]',
                            )}
                        >
                            <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="font-display text-lg tracking-wide text-foreground">PACE NATION</span>
                    </div>

                    {/* Powered by Strava */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Powered by</span>
                        <a
                            href="https://www.strava.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                'inline-flex items-center gap-1.5 font-semibold',
                                'text-[var(--strava-orange)] transition-opacity hover:opacity-80',
                            )}
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7.006 13.828h4.169" />
                            </svg>
                            Strava
                        </a>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <a href="#" className="transition-colors hover:text-foreground">
                            Privacy Policy
                        </a>
                        <span className="text-border">•</span>
                        <a href="#" className="transition-colors hover:text-foreground">
                            Terms of Service
                        </a>
                        <span className="text-border">•</span>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                        >
                            <Github className="h-4 w-4" />
                            GitHub
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>© {currentYear} Pace Nation. Made with</span>
                        <Heart className="h-3 w-3 fill-[var(--strava-orange)] text-[var(--strava-orange)]" />
                        <span>for athletes everywhere.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
