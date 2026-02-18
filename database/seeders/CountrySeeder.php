<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = $this->getCountries();

        foreach ($countries as $country) {
            Country::query()->create($country);
        }
    }

    /**
     * Get the list of countries to seed.
     *
     * @return array<int, array{code: string, name: string}>
     */
    private function getCountries(): array
    {
        return [
            // Europe
            ['code' => 'PT', 'name' => 'Portugal'],
            ['code' => 'GB', 'name' => 'United Kingdom'],
            ['code' => 'DE', 'name' => 'Germany'],
            ['code' => 'ES', 'name' => 'Spain'],
            ['code' => 'FR', 'name' => 'France'],
            ['code' => 'IT', 'name' => 'Italy'],
            ['code' => 'SE', 'name' => 'Sweden'],
            ['code' => 'NL', 'name' => 'Netherlands'],
            ['code' => 'IE', 'name' => 'Ireland'],
            ['code' => 'PL', 'name' => 'Poland'],
            ['code' => 'NO', 'name' => 'Norway'],
            ['code' => 'AT', 'name' => 'Austria'],
            ['code' => 'CH', 'name' => 'Switzerland'],
            ['code' => 'BE', 'name' => 'Belgium'],
            ['code' => 'UA', 'name' => 'Ukraine'],
            ['code' => 'DK', 'name' => 'Denmark'],
            ['code' => 'FI', 'name' => 'Finland'],
            ['code' => 'HR', 'name' => 'Croatia'],

            // Americas
            ['code' => 'US', 'name' => 'United States'],
            ['code' => 'CA', 'name' => 'Canada'],
            ['code' => 'BR', 'name' => 'Brazil'],
            ['code' => 'MX', 'name' => 'Mexico'],
            ['code' => 'AR', 'name' => 'Argentina'],
            ['code' => 'CL', 'name' => 'Chile'],
            ['code' => 'CO', 'name' => 'Colombia'],

            // Asia-Pacific
            ['code' => 'JP', 'name' => 'Japan'],
            ['code' => 'KR', 'name' => 'South Korea'],
            ['code' => 'AU', 'name' => 'Australia'],
            ['code' => 'NZ', 'name' => 'New Zealand'],
            ['code' => 'SG', 'name' => 'Singapore'],
            ['code' => 'IL', 'name' => 'Israel'],
            ['code' => 'RU', 'name' => 'Russia'],

            // Africa
            ['code' => 'ZA', 'name' => 'South Africa'],
        ];
    }
}
