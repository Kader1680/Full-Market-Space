<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StripeController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// public product listing
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);

// protected
Route::middleware('auth:sanctum')->group(function(){
  Route::post('logout', [AuthController::class, 'logout']);

  // orders & checkout
  Route::post('create-checkout-session', [StripeController::class, 'createCheckoutSession']);
  Route::post('webhook', [StripeController::class, 'webhook']); // webhook can be public but secure by signature

  Route::get('orders', [OrderController::class, 'index']);
  Route::get('orders/{id}', [OrderController::class, 'show']);

  // admin routes
  Route::middleware('is_admin')->group(function(){
    Route::apiResource('products', ProductController::class)->except(['index','show']);
    // admin order management
  });
});
