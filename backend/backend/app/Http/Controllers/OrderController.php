<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Str;
use DB;
use Illuminate\Support\Facades\DB as FacadesDB;

class OrderController extends Controller
{
    // place order from cart
    public function store(Request $request) {
        $user = auth('api')->user();
        $cart = $user->cart()->with('items.product')->first();
        if (!$cart || $cart->items->isEmpty()) return response()->json(['message'=>'Cart empty'],400);

        $request->validate(['shipping_address'=>'required|array']);

        FacadesDB::beginTransaction();
        try {
            $subtotal = 0;
            foreach ($cart->items as $it) {
                $subtotal += $it->product->price * $it->quantity;
            }

            $total = $subtotal; // no tax/shipping for MVP

            $order = Order::create([
                'order_number' => strtoupper('ORD-'.Str::random(8)),
                'user_id' => $user->id,
                'subtotal' => $subtotal,
                'total' => $total,
                'shipping_address' => $request->shipping_address,
                'status' => 'pending',
            ]);

            foreach ($cart->items as $it) {
                $order->items()->create([
                    'product_id'=>$it->product_id,
                    'product_name'=>$it->product->name,
                    'quantity'=>$it->quantity,
                    'price'=>$it->price,
                    'total'=> $it->price * $it->quantity,
                ]);
            }

            $cart->items()->delete();
            DB::commit();
            return response()->json($order->load('items'),201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message'=>'Order failed','error'=>$e->getMessage()],500);
        }
    }

    // list user orders
    public function index() {
        $user = auth('api')->user();
        $orders = $user->orders()->with('items')->orderBy('created_at','desc')->get();
        return response()->json($orders);
    }

    // show order
    public function show($id) {
        $order = Order::with('items')->findOrFail($id);
        $user = auth('api')->user();
        if ($order->user_id !== $user->id) return response()->json(['message'=>'Forbidden'],403);
        return response()->json($order);
    }
}
