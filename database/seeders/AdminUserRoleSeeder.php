<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AdminUserRoles;
class AdminUserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AdminUserRoles::insert([
            [
                'fldRoleTitle' => 'Super Admin',
                'fldStatus' => 1,
                'fldCreatedAt' => date("Y-m-d H:i:s"),
                'fldUpdatedAt' => date("Y-m-d H:i:s")
            ],
            [
                'fldRoleTitle' => 'Basic Admin',
                'fldStatus' => 1,
                'fldCreatedAt' => date("Y-m-d H:i:s"),
                'fldUpdatedAt' => date("Y-m-d H:i:s")
            ]
        ]);
    }
}
