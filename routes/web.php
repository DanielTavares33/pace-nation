<?php

use App\Http\Controllers\LeaderboardController;
use App\Http\Resources\LeaderboardUserResource;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $topUsers = User::query()
        ->with(['country', 'region'])
        ->leaderboard()
        ->limit(5)
        ->get()
        ->map(fn (User $user, int $index) => new LeaderboardUserResource($user, $index + 1));

    return Inertia::render('welcome', [
        'topUsers' => $topUsers,
    ]);
})->name('home');

Route::get('/leaderboard', LeaderboardController::class)->name('leaderboard');
