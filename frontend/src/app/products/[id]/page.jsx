"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductsPageid() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProduct(data.data || data || null);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login to add items to your cart.");
      router.push("/login");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });

      const data = await res.json();
      setMessage(
        res.ok
          ? "Product added to cart successfully!"
          : data.message || "Failed to add product to cart."
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("Error connecting to server.");
    }

    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="p-4 mx-auto max-w-6xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
        Product Details
      </h2>

      {message && (
        <div className="mb-4 text-center text-sm text-blue-600 font-medium">
          {message}
        </div>
      )}

      {!product ? (
        <p className="text-gray-600 text-center">Loading product...</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-md overflow-hidden p-6">
          {/* Image Section */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={`http://127.0.0.1:8000/storage/${product.image}`}
              alt={product.name}
              className="w-full max-w-md aspect-[1/1] object-cover rounded-md"
              onError={(e) => (e.target.src = "/placeholder.png")}
            />
          </div>

          {/* Info Section */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">
              {product.name}
            </h3>
            <p className="text-gray-600 text-base mb-4 leading-relaxed">
              {product.description}
            </p>
            <h4 className="text-2xl font-bold text-slate-900 mb-6">
              ${product.price}
            </h4>

            <button
              type="button"
              onClick={() => handleAddToCart(product.id)}
              disabled={loading}
              className={`text-sm sm:text-base px-6 py-3 font-medium rounded-md text-white transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
