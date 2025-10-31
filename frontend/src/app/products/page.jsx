"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const API_URL = "http://localhost:8000/api";

  // ✅ Fetch products
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Fetch favorite list
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    fetch(`${API_URL}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFavorites(data.map((p) => p.product_id)))
      .catch((err) => console.log("Error favorites:", err));
  }, [user]);

  // ✅ Toggle favorite
  const toggleFavorite = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const isFavorited = favorites.includes(productId);

    try {
      const res = await fetch(`${API_URL}/favorites`, {
        method: isFavorited ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          user_id: user.id,
        }),
      });

      if (res.ok) {
        setFavorites((prev) =>
          isFavorited
            ? prev.filter((id) => id !== productId)
            : [...prev, productId]
        );
      }
    } catch (error) {
      console.log("Error toggling favorite:", error);
    }
  };

  // ✅ Add to Cart
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login first.");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });

      const data = await res.json();

      setMessage(res.ok ? "Product added to cart!" : data.message);
    } catch (error) {
      setMessage("Server error.");
    }

    setLoading(false);

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">
        Premium Threads
      </h2>

      {message && (
        <div className="mb-4 text-center text-sm text-blue-600 font-medium">
          {message}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.length > 0 ? (
          products.map((p) => {
            const isFavorited = favorites.includes(p.id);

            return (
              <div
                key={p.id}
                className="
                  relative bg-white flex flex-col rounded-md overflow-hidden 
                  shadow-sm hover:shadow-lg transition-all duration-300 
                  hover:-translate-y-1
                "
              >
                <Link href={`/products/${p.id}`}>
                  <img
                    src={`http://127.0.0.1:8000/storage/${p.image}`}
                    alt={p.name}
                    className="w-full aspect-[18/24] object-cover"
                  />
                </Link>

                {/* ✅ Favorite heart button */}
                <button
                  onClick={() => toggleFavorite(p.id)}
                  className="
                    absolute top-3 right-3 w-9 h-9 rounded-full 
                    bg-white shadow-md flex items-center justify-center
                    transition-all duration-200
                    hover:scale-110 hover:shadow-lg active:scale-90
                  "
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`
                      text-xl transition-colors duration-200
                      ${isFavorited ? "text-red-600" : "text-gray-400 hover:text-red-500"}
                    `}
                  />
                </button>

                <div className="p-4">
                  <h5 className="text-sm sm:text-base font-semibold text-slate-900">
                    {p.name}
                  </h5>
                  <p className="text-xs text-gray-500 mt-1">{p.description}</p>
                  <h6 className="text-sm mt-2 font-bold">${p.price}</h6>
                </div>

                <div className="min-h-[50px] p-4 !pt-0">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(p.id)}
                    disabled={loading}
                    className={`
                      absolute left-0 right-0 bottom-3 max-w-[88%] mx-auto 
                      text-sm px-2 py-2 font-medium rounded-sm text-white
                      transition-all duration-200
                      ${loading
                        ? "bg-gray-400"
                        : "bg-black hover:bg-gray-800 active:scale-95"}
                    `}
                  >
                    {loading ? "Adding..." : "Add to cart"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No products available yet.
          </p>
        )}
      </div>
    </div>
  );
}
