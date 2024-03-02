<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Middleware\IsAdmin;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::group([
    "middleware" => ["auth:api"]
], function () {

    Route::get("profile", [AuthController::class, "profile"]);
    Route::get("logout", [AuthController::class, "logout"]);

    // Favorite Products
    Route::post('/products/{id}/favorite', [ProductsController::class, 'toggleFavorite']);
    Route::get('user/favorite-products', [AuthController::class, 'favorites']);

});

// Admin Routes
Route::group([
    "middleware" => ["auth:api", IsAdmin::class]
], function () {

    // Products
    Route::post('/products', [ProductsController::class, 'store']);
    Route::put('/products/{id}', [ProductsController::class, 'update']);
    Route::delete('/products/{id}', [ProductsController::class, 'destroy']);
    Route::post('/products/{id}/categories', [ProductsController::class, 'updateCategory']);

    // Categories
    Route::post('/categories', [CategoriesController::class, 'store']);
    Route::put('/categories/{id}', [CategoriesController::class, 'update']);
    Route::delete('/categories/{id}', [CategoriesController::class, 'destroy']);
    Route::post('/categories/{id}/products', [CategoriesController::class, 'updateProduct']);

});

// Products
Route::get('/products', [ProductsController::class, 'index']);
Route::post('/products/filtered', [ProductsController::class, 'allFiltered']);
Route::get('/products/{id}', [ProductsController::class, 'show']);

// Categories
Route::get('/categories', [CategoriesController::class, 'index']);
Route::get('/categories/{id}', [CategoriesController::class, 'show']);
