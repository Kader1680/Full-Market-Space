<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{

    public function index($productId)
    {
        $reviews = Review::with('user:id,name')
            ->where('product_id', $productId)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reviews
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required',
            'user_id' => 'required',
            'text' => 'required|string|max:1000',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        // $user = Auth::user();

        // if (!$user) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Unauthorized. Please login first.',
        //     ], 401);
        // }

         
        // $hasConfirmedOrder = Order::where('user_id', $user->id)
        //     ->where('status', 'confirmed')
        //     ->whereHas('item', function ($query) use ($request) {
        //         $query->where('product_id', $request->product_id);
        //     })
        //     ->exists();

        // if (!$hasConfirmedOrder) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'You can only review products after your order is confirmed.'
        //     ], 403);
        // }

        $review = Review::create([
            'product_id' => $validated['product_id'],
            'user_id' =>  $validated['user_id'],
            'text' => $validated['text'],
            'rating' => $validated['rating'] ?? null,
        ]);

        
        $review->load('user:id,name');

        return response()->json([
            'success' => true,
            'message' => 'Review added successfully!',
            'data' => $review
        ], 201);
    }
}
