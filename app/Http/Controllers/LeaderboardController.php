<?php

namespace App\Http\Controllers;

use App\Http\Resources\CountryResource;
use App\Http\Resources\LeaderboardUserResource;
use App\Models\Country;
use App\Models\Region;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeaderboardController extends Controller
{
    private const ITEMS_PER_PAGE = 10;

    /**
     * Display the leaderboard page.
     */
    public function __invoke(Request $request): Response
    {
        $filters = $this->getFilters($request);

        // Build the query with filters
        $query = User::query()
            ->with(['country', 'region'])
            ->leaderboard();

        $this->applyFilters($query, $filters);

        // Get paginated results
        $paginator = $query->paginate(self::ITEMS_PER_PAGE);

        // Calculate rank based on pagination offset
        $startRank = ($paginator->currentPage() - 1) * self::ITEMS_PER_PAGE;

        $users = $paginator->getCollection()->map(function (User $user, int $index) use ($startRank) {
            return new LeaderboardUserResource($user, $startRank + $index + 1);
        });

        // Get countries that have users for the filter dropdown
        $countries = Country::query()
            ->whereHas('users')
            ->with(['regions' => fn ($q) => $q->whereHas('users')])
            ->orderBy('name')
            ->get();

        // Get regions for the selected country (if any)
        $regions = [];
        if ($filters['country'] !== 'all') {
            $regions = Region::query()
                ->whereHas('country', fn ($q) => $q->where('code', $filters['country']))
                ->whereHas('users')
                ->orderBy('name')
                ->pluck('name')
                ->toArray();
        }

        return Inertia::render('leaderboard', [
            'users' => $users,
            'countries' => CountryResource::collection($countries),
            'regions' => $regions,
            'filters' => $filters,
            'pagination' => [
                'currentPage' => $paginator->currentPage(),
                'totalPages' => $paginator->lastPage(),
                'totalItems' => $paginator->total(),
                'perPage' => $paginator->perPage(),
            ],
        ]);
    }

    /**
     * Extract filters from request.
     *
     * @return array{country: string, region: string, kmRange: string, search: string}
     */
    private function getFilters(Request $request): array
    {
        return [
            'country' => $request->input('country', 'all'),
            'region' => $request->input('region', 'all'),
            'kmRange' => $request->input('kmRange', 'all'),
            'search' => $request->input('search', ''),
        ];
    }

    /**
     * Apply filters to the query.
     *
     * @param  Builder<User>  $query
     * @param  array{country: string, region: string, kmRange: string, search: string}  $filters
     */
    private function applyFilters(Builder $query, array $filters): void
    {
        // Filter by country
        if ($filters['country'] !== 'all') {
            $query->whereHas('country', fn ($q) => $q->where('code', $filters['country']));
        }

        // Filter by region
        if ($filters['region'] !== 'all') {
            $query->whereHas('region', fn ($q) => $q->where('name', $filters['region']));
        }

        // Filter by KM range
        $this->applyKmRangeFilter($query, $filters['kmRange']);

        // Filter by search term
        if ($filters['search'] !== '') {
            $query->where('name', 'like', '%'.$filters['search'].'%');
        }
    }

    /**
     * Apply KM range filter to the query.
     *
     * @param  Builder<User>  $query
     */
    private function applyKmRangeFilter(Builder $query, string $kmRange): void
    {
        $ranges = [
            '0-50' => [0, 50],
            '50-100' => [50, 100],
            '100-500' => [100, 500],
            '500-1000' => [500, 1000],
            '1000-2500' => [1000, 2500],
            '2500+' => [2500, null],
        ];

        if (! isset($ranges[$kmRange])) {
            return;
        }

        [$min, $max] = $ranges[$kmRange];

        $query->where('total_km', '>=', $min);

        if ($max !== null) {
            $query->where('total_km', '<', $max);
        }
    }
}
