<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin User
 */
class LeaderboardUserResource extends JsonResource
{
    /**
     * Create a new resource instance.
     */
    public function __construct(
        mixed $resource,
        protected int $rank = 0,
    ) {
        parent::__construct($resource);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'rank' => $this->rank,
            'name' => $this->name,
            'profileImage' => $this->avatar ?? 'https://i.pravatar.cc/150?img=0',
            'totalKm' => (float) $this->total_km,
            'countryCode' => $this->country?->code ?? '',
            'countryName' => $this->country?->name ?? '',
            'region' => $this->region?->name,
        ];
    }
}
