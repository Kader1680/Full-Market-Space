<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
  
   public function addToCart(Request $request)
{
    $request->validate([
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1',
    ]);

    $user = auth()->user();

    $cart = Cart::firstOrCreate(['user_id' => $user->id]);

    $cartItem = $cart->items()->updateOrCreate(
        ['product_id' => $request->product_id],
        ['quantity' => DB::raw('quantity + ' . $request->quantity), 'price' => Product::find($request->product_id)->price]
    );

    return response()->json([
        'message' => 'Product added to cart successfully',
        'item' => $cartItem
    ], 200);
}




   
    public function add(Request $request) {
        $user = auth('api')->user();
        $request->validate([
            'product_id'=>'required|exists:products,id',
            'quantity'=>'required|integer|min:1',
        ]);
        $cart = $user->cart()->firstOrCreate(['user_id'=>$user->id]);
        $product = Product::findOrFail($request->product_id);
        $price = $product->price;

        $item = $cart->items()->where('product_id',$product->id)->first();
        if ($item) {
            $item->quantity += $request->quantity;
            $item->price = $price;
            $item->save();
        } else {
            $cart->items()->create([
                'product_id'=>$product->id,
                'quantity'=>$request->quantity,
                'price'=>$price,
            ]);
        }
        return response()->json($cart->load('items.product'));
    }
 
    public function remove($itemId) {
        $user = auth('api')->user();
        $item = CartItem::findOrFail($itemId);
        if ($item->cart->user_id !== $user->id) 
            return response()->json(['message'=>'Forbidden'],403);

        $item->delete();
        return response()->json(['message'=>'Removed']);
    }


    // clear
    public function clear() {
        $user = auth('api')->user();
        $cart = $user->cart;
        if ($cart) $cart->items()->delete();
        return response()->json(['message'=>'Cart cleared']);
    }


    public function update(Request $request, $id)
{
    $user = auth('api')->user();
    $item = CartItem::findOrFail($id);
    if ($item->cart->user_id !== $user->id) {
        return response()->json(['message' => 'Forbidden'], 403);
    }

    $request->validate([
        'quantity' => 'required|integer|min:1'
    ]);

    $item->update(['quantity' => $request->quantity]);

    return response()->json($item->load('product'));
}


    public function getCart()
    {
        try {
            $user = auth()->user();

            $cart = Cart::where('user_id', $user->id)
                ->with(['items.product'])
                ->first();

            if (!$cart) {
                return response()->json(['items' => []], 200);
            }

            return response()->json($cart, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


}
