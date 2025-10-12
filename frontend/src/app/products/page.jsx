"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

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
           "Accept": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Product added to cart successfully!");
      } else {
        setMessage(data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("Error connecting to server.");
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
          products.map((p) => (
            <div
              key={p.id}
              className="bg-white flex flex-col rounded-sm overflow-hidden shadow-md hover:scale-[1.01] transition-all relative"
            >
              <div className="w-full">
                <img
                  src={`http://127.0.0.1:8000/storage/${p.image}`}
                  alt={p.name}
                  className="w-full aspect-[18/24] object-cover object-top"
                />
              </div>
              <div className="p-4">
                <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                  {p.name}
                </h5>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-2 flex items-center flex-wrap gap-2">
                  <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                    ${p.price}
                  </h6>
                  <div
                    className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                    title="Wishlist"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      className="fill-slate-800 inline-block"
                      viewBox="0 0 64 64"
                    >
                      <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="min-h-[50px] p-4 !pt-0">
                <button
                  type="button"
                  onClick={() => handleAddToCart(p.id)}
                  disabled={loading}
                  className={`absolute left-0 right-0 bottom-3 cursor-pointer max-w-[88%] mx-auto text-sm px-2 py-2 font-medium w-full rounded-sm text-white tracking-wide outline-none border-none ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-black-300"
                  }`}
                >
                  {loading ? "Adding..." : "Add to cart"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No products available yet.
          </p>
        )}
      </div>
    </div>
  );
}
