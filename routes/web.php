<?php

use App\Http\Controllers\LeaderboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/leaderboard', LeaderboardController::class)->name('leaderboard');
