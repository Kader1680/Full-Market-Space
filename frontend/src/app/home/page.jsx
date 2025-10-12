"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
//   const [topSelling, setTopSelling] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products");
        const data = await res.json();
        console.log(data.data);
        // ✅ Assuming your backend returns an array like [{id, name, price, image}]
        setNewArrivals(data.data)
        // setTopSelling(data.data )
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="bg-white text-black">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center max-w-6xl mx-auto px-6 py-12">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-gray-600">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-md font-semibold">
            Shop Now
          </button>
        </div>
        <div className="flex-1">
          <img
            src="/hero-model.png"
            alt="Hero"
            className="w-full rounded-xl object-cover"
          />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center">
          NEW ARRIVALS
        </h2>

        {newArrivals.length === 0 ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-3 hover:shadow-md transition"
              >
                <img
                
                src={`http://127.0.0.1:8000/storage/${item.image}`}
                  alt={item.name}
                  className="w-full h-56 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Top Selling */}
      {/* <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center">
          TOP SELLING
        </h2>

        {topSelling.length === 0 ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topSelling.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-3 hover:shadow-md transition"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-full h-56 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            ))}
          </div>
        )}
      </section> */}

      {/* Browse by Dress Style */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center">
          BROWSE BY DRESS STYLE
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Casual", "Formal", "Party", "Gym"].map((style) => (
            <div
              key={style}
              className="bg-gray-100 rounded-xl flex items-center justify-center h-32 font-semibold hover:bg-gray-200 cursor-pointer"
            >
              {style}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
