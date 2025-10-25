<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;

class DashbaordController extends Controller
{
    
    public function latest()
    {
        $produsts = Product::latest()->take(1)->get();
        $orders = Order::with(["items", "user"])->latest()->take(1)->get();
        $transactions = Payment::latest()->take(1)->get();
        return response()->json([
            'produsts' => $produsts,
            'orders' => $orders,
            'transactions' => $transactions,
        ], 200);
    }
}
