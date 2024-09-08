<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\AdminUserRoles;

class AdminUserController extends Controller
{
    public function getAllAdminUsers()
    {
        try {
            $adminUserRoles = new AdminUserRoles();
            $adminUsers = $adminUserRoles->getAlladminUsers();

            // You might want to transform $adminUsers here if needed

            return response()->json([
                'success' => true,
                'data' => $adminUsers
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => "An error occurred while fetching Data"
            ], 500);
        }
    }

    public function getAdminUserRoles()
    {
        try {
            $adminUserRoles = new AdminUserRoles();
            $getAlladminUserRoles = $adminUserRoles->getAlladminUserRoles();

            // You might want to transform $adminUsers here if needed

            return response()->json([
                'success' => true,
                'data' => $getAlladminUserRoles
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'An error occurred while fetching admin users roles'
            ], 500);
        }
    }
}