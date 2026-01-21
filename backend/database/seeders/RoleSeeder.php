<?php

namespace Database\Seeders;

use App\Features\Roles\Enums\Roles;
use App\Http\Enums\Guards;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // gets all permissions via Gate::before rule; see AuthServiceProvider
        Role::create(['name' => Roles::Sales->value(), 'guard_name' => Guards::API->value()]);
        Role::create(['name' => Roles::Service->value(), 'guard_name' => Guards::API->value()]);

    }
}
