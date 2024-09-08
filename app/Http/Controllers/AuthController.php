<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\AdminUserRoles;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        $credentials = [
            'fldEmail'    => $request->input('email'),
            'fldPassword' => $request->input('password')
        ];
        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Wrong username or password',
            ], 401);
        }

        $user = Auth::user();
        session(['loginUserDetails' => [
            'name'     => $user->fldName,
            'userRole' => $user->fldRole
        ]]);
        $this->respondWithToken($token);
        
        // Retrieving the session immediately after setting
        $userSessionDetails = session('loginUserDetails');
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }

    public function register(Request $request){
        $request->validate([
            'formData.name' => 'required|string|max:255',
            'formData.email' => 'required|string|email|max:255|unique:tbladminUsers,fldEmail',
            'formData.password' => 'required|string|min:6',
            'formData.role' => 'required|numeric',
        ]);
        $formData = $request->input('formData');
        $user = User::create([
            'fldName' => $formData['name'],
            'fldEmail' => $formData['email'],
            'fldPassword' => Hash::make($formData['password']),
            'fldCreatedAt' => now(),
            'fldUpdatedAt' => now(),
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }
}