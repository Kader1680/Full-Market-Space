"use client";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🔹 Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/cart", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Non-JSON Response:", text);
          // throw new Error("Failed to fetch cart");
        }

        const data = await res.json();
        console.log("Fetched cart:", data);
        setCart(data.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (token) fetchCart();
  }, [token]);


  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (res.ok) {
        setCart((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch {
      setMessage("Error updating quantity.");
    }
    setLoading(false);
  };


  const handleRemove = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setCart((prev) => prev.filter((item) => item.id !== id));
        setMessage("Item removed from cart.");
      } else {
        setMessage("Failed to remove item.");
      }
    } catch {
      setMessage("Error removing item.");
    }
    setLoading(false);
    setTimeout(() => setMessage(""), 2500);
  };

  // 🔹 Clear entire cart
  const handleClearCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/cart/clear", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setCart([]);
        setMessage("🧹 Cart cleared successfully.");
      }
    } catch {
      setMessage("Error clearing cart.");
    }
    setLoading(false);
    setTimeout(() => setMessage(""), 2500);
  };

  // 🔹 Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );



  const handlePlaceOrder = async () => {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:8000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shipping_address: {
          street: "Test Street 123",
          city: "Alger",
          country: "Algeria",
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setCart([]); // clear cart locally
      setMessage("✅ Order placed successfully!");
      console.log("Order created:", data);
    } else {
      const err = await res.json();
      setMessage(err.message || "Failed to place order");
    }
  } catch (e) {
    setMessage("Error placing order");
  }
  setLoading(false);
  setTimeout(() => setMessage(""), 3000);
};


  return (
    <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4">
      {/* 🔹 Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          🛒 Shopping Cart
        </h1>
        {cart.length > 0 && (
          <button
            onClick={handleClearCart}
            disabled={loading}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Clear Cart
          </button>
        )}
      </div>

      {message && (
        <p className="text-sm text-blue-600 font-medium text-center mb-4">
          {message}
        </p>
      )}

      <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8">
        {/* 🔹 Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200"
              >
                <div className="flex gap-6 sm:gap-4 max-sm:flex-col">
                  <div className="w-24 h-24 shrink-0">
                    <img
                      src={`http://127.0.0.1:8000/storage/${item.product.image}`}
                      alt={item.product.name}
                      className="object-contain w-full h-full rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ${item.product.price}
                    </p>

                    <div className="flex items-center gap-3 mt-auto">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={loading}
                        className="w-[20px] h-[20px] bg-slate-400 text-white rounded-full text-xs flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={loading}
                        className="w-[20px] h-[20px] bg-slate-800 text-white rounded-full text-xs flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ml-auto flex flex-col justify-between text-right">
                  <p className="text-sm font-medium text-slate-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    disabled={loading}
                    className="text-sm text-red-500 hover:underline font-medium mt-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center mt-10">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* 🔹 Summary Section */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-md p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4 text-slate-900">Summary</h2>

          <p className="flex justify-between text-sm mb-3">
            <span>Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </p>

          <hr className="my-3" />

        <button
        onClick={handlePlaceOrder}
        className={`w-full mt-3 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition ${
            loading && "opacity-70 cursor-not-allowed"
        }`}
        disabled={loading || cart.length === 0}
        >
        Place Order
        </button>
            
        </div>
      </div>
    </div>
  );
}
