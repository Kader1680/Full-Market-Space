<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);



Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile',      [AuthController::class, 'profile']);
});



Route::get('/products', [ProductController::class,'index']);



// Public product routes

Route::middleware(['auth:api', 'admin'])->group(function () {

    Route::post('/product', [ProductController::class,'store']);
    Route::get('/products/{id}', [ProductController::class,'show']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});



Route::middleware('auth:api')->group(function () {
    Route::get('/cart', [CartController::class, 'getCart']);
    Route::post('/cart', [CartController::class, 'addToCart']);
    Route::delete('/cart/{id}', [CartController::class, 'remove']);
    
    Route::get('/orders', [OrderController::class, 'index']);   // list orders
    Route::get('/orders/{id}', [OrderController::class, 'show']); // show specific order
    Route::post('/orders', [OrderController::class, 'store']);   // pl
});


