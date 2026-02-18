import { Head } from '@inertiajs/react';

import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Leaderboard } from '@/components/leaderboard';
import { Navbar } from '@/components/navbar';

export default function Welcome() {
    return (
        <>
            <Head title="Home - Regional Strava Leaderboards" />

            <div className="min-h-screen bg-background">
                <Navbar />

                <main>
                    <Hero />
                    <Leaderboard />
                </main>

                <Footer />
            </div>
        </>
    );
}
