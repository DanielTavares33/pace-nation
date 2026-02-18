import { Head } from '@inertiajs/react';

import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Leaderboard } from '@/components/leaderboard';
import { Navbar } from '@/components/navbar';
import type { LeaderboardUser } from '@/types/leaderboard';

type WelcomeProps = {
    topUsers: LeaderboardUser[];
};

export default function Welcome({ topUsers }: WelcomeProps) {
    return (
        <>
            <Head title="Home - Regional Strava Leaderboards" />

            <div className="min-h-screen bg-background">
                <Navbar />

                <main>
                    <Hero />
                    <Leaderboard users={topUsers} />
                </main>

                <Footer />
            </div>
        </>
    );
}
