<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Region;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Counter for unique avatar images.
     */
    protected static int $avatarCounter = 1;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'avatar' => 'https://i.pravatar.cc/150?img='.static::$avatarCounter++,
            'country_id' => null,
            'region_id' => null,
            'total_km' => fake()->randomFloat(2, 0, 500),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Assign user to a random country and region.
     */
    public function withLocation(): static
    {
        return $this->state(function (array $attributes) {
            $region = Region::query()->inRandomOrder()->first();

            if (! $region) {
                return $attributes;
            }

            return [
                'country_id' => $region->country_id,
                'region_id' => $region->id,
            ];
        });
    }

    /**
     * Assign user to a specific country and optionally region.
     */
    public function inCountry(Country $country, ?Region $region = null): static
    {
        return $this->state(function (array $attributes) use ($country, $region) {
            $regionId = $region?->id ?? Region::query()
                ->where('country_id', $country->id)
                ->inRandomOrder()
                ->first()
                ?->id;

            return [
                'country_id' => $country->id,
                'region_id' => $regionId,
            ];
        });
    }

    /**
     * Create an elite athlete (4000-6000 km).
     */
    public function elite(): static
    {
        return $this->state(fn (array $attributes) => [
            'total_km' => fake()->randomFloat(2, 4000, 6000),
        ]);
    }

    /**
     * Create an advanced athlete (2500-4000 km).
     */
    public function advanced(): static
    {
        return $this->state(fn (array $attributes) => [
            'total_km' => fake()->randomFloat(2, 2500, 4000),
        ]);
    }

    /**
     * Create an intermediate athlete (1000-2500 km).
     */
    public function intermediate(): static
    {
        return $this->state(fn (array $attributes) => [
            'total_km' => fake()->randomFloat(2, 1000, 2500),
        ]);
    }

    /**
     * Create an active athlete (250-1000 km).
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'total_km' => fake()->randomFloat(2, 250, 1000),
        ]);
    }

    /**
     * Create a beginner athlete (0-250 km).
     */
    public function beginner(): static
    {
        return $this->state(fn (array $attributes) => [
            'total_km' => fake()->randomFloat(2, 0, 250),
        ]);
    }
}
