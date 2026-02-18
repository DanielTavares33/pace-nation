<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LeaderboardController extends Controller
{
    /**
     * Display the leaderboard page.
     */
    public function __invoke(): Response
    {
        return Inertia::render('leaderboard');
    }
}
