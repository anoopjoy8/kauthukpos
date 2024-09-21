<?php
use App\Http\Middleware\EnsureTokenIsValid;
use App\Http\Middleware\AdminUserPass;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\ProductController;

Route::middleware([EnsureTokenIsValid::class])->group(function () {
    Route::get('adminusers', [AdminUserController::class, 'getAllAdminUsers']);
    Route::get('adminuserroles', [AdminUserController::class, 'getAdminUserRoles']);
    Route::get('products', [ProductController::class, 'getAllProducts']);
    Route::get('product-categories', [ProductController::class, 'getAllProductCategories']);
    Route::get('product-sub-categories/{category}', [ProductController::class, 'getProductSubCategory']);
    Route::post('add-product', [productController::class, 'addNewProduct']);
    Route::get('edit-product/{productID}', [ProductController::class, 'editProductData']);
    Route::post('update-product', [productController::class, 'updateProduct']);
});
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    // Other protected routes...
});
Route::apiResource('posts', PostController::class);