<?php

namespace Database\Seeders;

use App\Models\Region;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create the test user first
        $this->createTestUser();

        // Create 200 users with realistic distribution
        $this->createEliteUsers(8);
        $this->createAdvancedUsers(22);
        $this->createIntermediateUsers(50);
        $this->createActiveUsers(70);
        $this->createBeginnerUsers(50);
    }

    /**
     * Create the test user with known credentials.
     */
    private function createTestUser(): void
    {
        $portugal = Region::query()
            ->whereHas('country', fn ($query) => $query->where('code', 'PT'))
            ->where('name', 'Lisboa')
            ->first();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'avatar' => 'https://i.pravatar.cc/150?img=70',
            'country_id' => $portugal?->country_id,
            'region_id' => $portugal?->id,
            'total_km' => 1500.00,
        ]);
    }

    /**
     * Create elite athletes (4000-6000 km).
     */
    private function createEliteUsers(int $count): void
    {
        $this->createUsersWithState($count, 'elite');
    }

    /**
     * Create advanced athletes (2500-4000 km).
     */
    private function createAdvancedUsers(int $count): void
    {
        $this->createUsersWithState($count, 'advanced');
    }

    /**
     * Create intermediate athletes (1000-2500 km).
     */
    private function createIntermediateUsers(int $count): void
    {
        $this->createUsersWithState($count, 'intermediate');
    }

    /**
     * Create active athletes (250-1000 km).
     */
    private function createActiveUsers(int $count): void
    {
        $this->createUsersWithState($count, 'active');
    }

    /**
     * Create beginner athletes (0-250 km).
     */
    private function createBeginnerUsers(int $count): void
    {
        $this->createUsersWithState($count, 'beginner');
    }

    /**
     * Create users with a specific factory state.
     */
    private function createUsersWithState(int $count, string $state): void
    {
        $regions = Region::query()->with('country')->get();

        if ($regions->isEmpty()) {
            User::factory()->count($count)->{$state}()->create();

            return;
        }

        for ($i = 0; $i < $count; $i++) {
            $region = $regions->random();

            User::factory()->{$state}()->create([
                'country_id' => $region->country_id,
                'region_id' => $region->id,
            ]);
        }
    }
}
