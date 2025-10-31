<?php

namespace App\Http\Controllers;

use App\Models\FavoriteProduct;
use Illuminate\Http\Request;
use App\Models\Product;

class FavoriteController extends Controller
{
     
    public function addToFavorite(Request $request)
{
    $request->validate([
        'user_id' => 'required|integer|exists:users,id',
        'product_id' => 'required|integer|exists:products,id',
    ]);

    $userId = $request->user_id;
    $productId = $request->product_id;

    // Check if already exists
    $exists = FavoriteProduct::where('user_id', $userId)
        ->where('product_id', $productId)
        ->exists();

    if ($exists) {
        return response()->json(['message' => 'Already in favorites'], 409);
    }

    // Insert
    FavoriteProduct::create([
        'user_id' => $userId,
        'product_id' => $productId,
    ]);

    return response()->json(['message' => 'Added to favorites successfully'], 201);
}

  
   public function removeFromFavorite(Request $request)
{
    $user_id = $request->user_id;
    $product_id = $request->product_id;

    $favorite = FavoriteProduct::where('user_id', $user_id)
                        ->where('product_id', $product_id)
                        ->first();

    if (!$favorite) {
        return response()->json(['message' => 'Not in favorites'], 404);
    }

    $favorite->delete();

    return response()->json(['message' => 'Removed from favorites']);
}

   
    public function getFavorites()
    {
        $user = auth()->user();  

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json($user->favoriteProducts()->get());
    }
}
