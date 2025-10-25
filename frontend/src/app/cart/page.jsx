"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

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

        if (!res.ok) return;

        const data = await res.json();
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
        setCart([]);
        setMessage("✅ Order placed successfully!");
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
    <div className="min-h-screen bg-[#131722] text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-blue-500" />
            Shopping Cart
          </h1>

          {cart.length > 0 && (
            <button
              onClick={handleClearCart}
              disabled={loading}
              className="text-sm font-medium text-red-400 hover:text-red-500"
            >
              Clear Cart
            </button>
          )}
        </div>

        {message && (
          <p className="text-sm text-blue-400 font-medium text-center mb-4">
            {message}
          </p>
        )}

        {/* If cart empty */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-6xl text-gray-500 mb-4"
            />
            <p className="text-gray-400 mb-6 text-lg">
              Your cart is empty.
            </p>
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-all"
            >
              Start Shopping Now
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-[#1b1f2b] px-4 py-5 rounded-md shadow-md border border-gray-700"
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.product.image}`}
                    alt={item.product.name}
                    className="w-24 h-24 object-contain rounded-md bg-white"
                  />

                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        ${item.product.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={loading}
                        className="w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>

                      <span className="font-semibold">{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={loading}
                        className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col justify-between text-right">
                    <p className="font-semibold text-blue-400">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={loading}
                      className="text-red-400 hover:text-red-500 mt-3"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-[#1b1f2b] p-6 rounded-md shadow-md border border-gray-700 h-fit">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Summary
              </h2>

              <div className="flex justify-between mb-3 text-gray-300">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <hr className="border-gray-600 my-3" />

              <button
                onClick={handlePlaceOrder}
                disabled={loading || cart.length === 0}
                className={`w-full mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${
                  loading && "opacity-70 cursor-not-allowed"
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
