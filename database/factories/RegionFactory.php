<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Region;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Region>
 */
class RegionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'country_id' => Country::factory(),
            'name' => fake()->city(),
        ];
    }

    /**
     * Assign region to a specific country.
     */
    public function forCountry(Country $country): static
    {
        return $this->state(fn (array $attributes) => [
            'country_id' => $country->id,
        ]);
    }
}
