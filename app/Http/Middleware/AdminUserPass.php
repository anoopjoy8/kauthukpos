<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;  // Correct import statement

class AdminUserPass
{
    public function handle(Request $request, Closure $next)
    {
        $userSessionDetails = session('loginUserDetails');

        if (!$userSessionDetails) {
            return response()->json([
                'status' => 'error',
                'message' => 'User session not found.',
            ], 401);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User session found.',
            ], 401);
        }

        $request->merge(['userSessionDetails' => $userSessionDetails]);

        return $next($request);
    }
}
