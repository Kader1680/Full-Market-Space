"use client";

import { useState } from "react";
import Filter from "../components/Filter";

const products = [
  { id: 1, name: "Lexicon Luxe", price: 10, img: "https://readymadeui.com/images/product1.webp" },
  { id: 2, name: "Adjective Attire", price: 12, img: "https://readymadeui.com/images/product2.webp" },
  { id: 3, name: "ThreadCraft Vibes", price: 14, img: "https://readymadeui.com/images/product3.webp" },
  { id: 4, name: "Minimalist Wear", price: 20, img: "https://readymadeui.com/images/product4.webp" },
  { id: 5, name: "Casual Fit Tee", price: 25, img: "https://readymadeui.com/images/product5.webp" },
  { id: 6, name: "Urban Jacket", price: 30, img: "https://readymadeui.com/images/product6.webp" },
];

export default function ProductsPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart 🛒`);
  };

  return (
    <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl flex gap-6">
      {/* Sidebar filter */}
      <Filter />

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {products.map((product) => (
          <div key={product.id} className="bg-white flex flex-col rounded-md overflow-hidden shadow-md hover:scale-[1.02] transition-all relative">
            <img src={product.img} alt={product.name} className="w-full aspect-[18/24] object-cover" />
            <div className="p-4 flex-1 flex flex-col">
              <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                {product.name}
              </h5>
              <div className="mt-2 flex items-center justify-between">
                <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                  ${product.price}
                </h6>
              </div>
            </div>
            <div className="p-4 pt-0">
              <button
                onClick={() => addToCart(product)}
                className="cursor-pointer w-full text-sm px-2 py-2 font-medium bg-blue-600 hover:bg-blue-700 text-white tracking-wide rounded-md"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
