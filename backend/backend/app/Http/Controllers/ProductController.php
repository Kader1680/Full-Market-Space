<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
   
   public function index() {
    $products = Product::with('category')->active()->paginate(12);
    
   
    $products->getCollection()->transform(function ($product) {
        if ($product->image) {
            $product->image_url = asset('storage/' . $product->image);
        }
        return $product;
    });

    return response()->json($products);
}

    public function show($id) {
        $product = Product::findOrFail($id);
        // provide full image URL if exists
        if ($product->image) {
            $product->image_url = asset('storage/' . $product->image);
        }
        return response()->json($product);
    }

    
    public function store(Request $request) {
    
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'active' => 'boolean',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $product = new Product($request->all());

        if ($request->hasFile('image')) {
            $product->image = $request->file('image')->store('products', 'public');
        }

        $product->save();

        return response()->json($product, 201);
    }

  
    public function update(Request $request, $id) {
        $product = Product::findOrFail($id);
        $this->validate($request, [
            'name'=>'sometimes|string|max:255',
            'price'=>'sometimes|numeric|min:0',
            'stock'=>'sometimes|integer|min:0',
            'image'=>'nullable|image|max:5120',
        ]);
        $product->fill($request->only(['name','description','price','stock','active']));
        if ($request->hasFile('image')) {
            // delete old
            if ($product->image) Storage::disk('public')->delete($product->image);
            $product->image = $request->file('image')->store('products','public');
        }
        $product->save();
        if ($product->image) $product->image_url = asset('storage/'.$product->image);
        return response()->json($product);
    }

    // delete (protected)
    public function destroy($id) {
        $product = Product::findOrFail($id);
        if ($product->image) Storage::disk('public')->delete($product->image);
        $product->delete();
        return response()->json(['message'=>'Deleted']);
    }
}
