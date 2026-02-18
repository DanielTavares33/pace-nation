<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar')->nullable()->after('email');
            $table->foreignId('country_id')->nullable()->constrained()->nullOnDelete()->after('avatar');
            $table->foreignId('region_id')->nullable()->constrained()->nullOnDelete()->after('country_id');
            $table->decimal('total_km', 10, 2)->default(0)->after('region_id');

            $table->index('total_km');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['country_id']);
            $table->dropForeign(['region_id']);
            $table->dropIndex(['total_km']);
            $table->dropColumn(['avatar', 'country_id', 'region_id', 'total_km']);
        });
    }
};
