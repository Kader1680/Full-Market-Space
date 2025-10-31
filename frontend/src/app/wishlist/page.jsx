"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
export default function WishlistPage() {
  
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { user } = useAuth();
  const API_URL = "http://127.0.0.1:8000/api";


  // ✅ Fetch favorites on page load
  useEffect(() => {
    if (!token) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${API_URL}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setFavorites(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching favorites:", error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  const removeFavorite = async (productId) => {
    try {
      await fetch(`${API_URL}/favorites`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify({
            product_id: productId,
            user_id: user.id
        }),
        });

    
      setFavorites(favorites.filter((p) => p.id !== productId));
    } catch (error) {
      console.log("Error removing favorite:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-xl text-gray-300">Loading...</div>
    );
  }

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Wishlist </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">You have no favorite products.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-[#1a1f2c] p-4 rounded-lg shadow-md"
            >
              <Link href={`/products/${product.id}`}>
                <img
                  src={`http://127.0.0.1:8000/storage/${product.image}`}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-400">${product.price}</p>
              </Link>

              <button
                onClick={() => removeFavorite(product.id)}
                className="mt-3 text-red-500 hover:text-red-700 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faHeart} />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
