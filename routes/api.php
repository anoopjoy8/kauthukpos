<?php
use App\Http\Middleware\EnsureTokenIsValid;
use App\Http\Middleware\AdminUserPass;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AdminUserController;

Route::middleware([EnsureTokenIsValid::class])->group(function () {
    Route::get('adminusers', [AdminUserController::class, 'getAllAdminUsers']);
    Route::get('adminuserroles', [AdminUserController::class, 'getAdminUserRoles']);
});
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    // Other protected routes...
});
Route::apiResource('posts', PostController::class);