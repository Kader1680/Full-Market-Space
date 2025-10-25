"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  // Sample product data - replace with API call later
  const [products] = useState([
    {
      id: 1,
      name: "New Featured Wireless Mouse 2.4G",
      price: 299.99,
      originalPrice: 399.99,
      image: "/product1.jpg",
      rating: 4.5,
      reviews: 4,
      discount: 25,
      badge: "HOT"
    },
    {
      id: 2,
      name: "EarPods Silicone Compatible Ring Case",
      price: 35.00,
      originalPrice: 125.00,
      image: "/product2.jpg",
      rating: 5,
      reviews: 3,
      discount: null,
      badge: null
    },
    {
      id: 3,
      name: 'The tech is just so crazy these days',
      price: 155.00,
      originalPrice: null,
      image: "/product3.jpg",
      rating: 4,
      reviews: 4,
      discount: null,
      badge: null
    },
    {
      id: 4,
      name: "Samsung 49WH94 Series Monitor 49 inch",
      price: 155.00,
      originalPrice: null,
      image: "/product4.jpg",
      rating: 4,
      reviews: 4,
      discount: null,
      badge: "25%"
    },
    {
      id: 5,
      name: "Ultra Fixed Load Working Headphones",
      price: 133.00,
      originalPrice: 155.00,
      image: "/product5.jpg",
      rating: 4,
      reviews: 7,
      discount: 25,
      badge: "25%"
    },
    {
      id: 6,
      name: "Portable Gadsle Surf 3k+ AirPods",
      price: 75.00,
      originalPrice: null,
      image: "/product6.jpg",
      rating: 4,
      reviews: 1,
      discount: null,
      badge: "BEST DEALS"
    },
  ]);

  const categories = [
    { name: "Apple iPad", icon: "📱", image: "/cat1.jpg" },
    { name: "Earbuds Boat", icon: "🎧", image: "/cat2.jpg" },
    { name: "Smart Watch", icon: "⌚", image: "/cat3.jpg" },
    { name: "Camera Speakers", icon: "📷", image: "/cat4.jpg" },
    { name: "Game Controller", icon: "🎮", image: "/cat5.jpg" },
    { name: "Wireless Printer", icon: "🖨️", image: "/cat6.jpg" },
    { name: "Headphones", icon: "🎧", image: "/cat7.jpg" },
    { name: "Android TV", icon: "📺", image: "/cat8.jpg" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Lowrence Neice",
      role: "Creative Director",
      image: "/user1.jpg",
      text: "Reliable product consistently delivers."
    },
    {
      id: 2,
      name: "Angelin Wact",
      role: "Product Designer",
      image: "/user2.jpg",
      text: "Easy to use and exactly what I needed."
    },
    {
      id: 3,
      name: "Melanie Reshard",
      role: "Marketing Manager",
      image: "/user3.jpg",
      text: "Impressive quality, durable and stylish."
    }
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-100 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="space-y-6 text-center md:text-left order-2 md:order-1">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium">
                Flat 20% Discount
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                JBL Tune 510 Ear Wireless Headphones
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-blue-600">
                From $149.99
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-colors">
                SHOP NOW
              </button>
            </div>

            {/* Hero Image - User provides their own */}
            <div className="order-1 md:order-2">
              <img
                src="/hero-model.png"
                alt="JBL Wireless Headphones"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <p className="text-sm text-center font-medium text-gray-700">
                {category.name}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Popular Products</h2>
          <div className="flex space-x-4 text-sm">
            <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
              ELECTRONICS
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              GADGETS
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              SMART DEVICES
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-shadow relative"
            >
              {product.badge && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.badge}
                </span>
              )}
              <div className="bg-gray-100 rounded-lg mb-3 h-32 flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 rounded-lg"></div>
              </div>
              <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 h-10">
                {product.name}
              </h3>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 text-xs">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-xs text-gray-500 ml-1">
                  ({product.reviews})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-semibold mb-1">Free Shipping</h3>
              <p className="text-xs opacity-90">Free on all Orders Over $100</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">↩️</div>
              <h3 className="font-semibold mb-1">30 Days Returns</h3>
              <p className="text-xs opacity-90">Full Refund for Faulty Product</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold mb-1">Secured Payment</h3>
              <p className="text-xs opacity-90">With Payment Card System</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🎁</div>
              <h3 className="font-semibold mb-1">Special Gifts</h3>
              <p className="text-xs opacity-90">Rewards on all Occasions</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">💧</div>
              <h3 className="font-semibold mb-1">Water Resistant</h3>
              <p className="text-xs opacity-90">The Smart Watch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Latest Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-shadow"
            >
              <div className="bg-gray-100 rounded-lg mb-3 h-32 flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 rounded-lg"></div>
              </div>
              <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 h-10">
                {product.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deal of The Day */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Deal of The Day</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="border-2 border-blue-500 rounded-lg p-6 relative"
            >
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
                25%
              </span>
              <div className="bg-gray-100 rounded-lg mb-4 h-40 flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400 text-sm">
                  {"★".repeat(Math.floor(product.rating))}
                </div>
                <span className="text-sm text-gray-500 ml-1">
                  ({product.reviews})
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-blue-600 font-bold text-xl">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex space-x-2 text-center mb-4">
                <div className="bg-red-500 text-white rounded px-3 py-2 flex-1">
                  <div className="font-bold">242</div>
                  <div className="text-xs">DAYS</div>
                </div>
                <div className="bg-red-500 text-white rounded px-3 py-2 flex-1">
                  <div className="font-bold">13</div>
                  <div className="text-xs">HOURS</div>
                </div>
                <div className="bg-red-500 text-white rounded px-3 py-2 flex-1">
                  <div className="font-bold">27</div>
                  <div className="text-xs">MINS</div>
                </div>
                <div className="bg-red-500 text-white rounded px-3 py-2 flex-1">
                  <div className="font-bold">52</div>
                  <div className="text-xs">SEC</div>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-colors">
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products with Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Featured Product Card */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Redmi<br />10 Prime<br />Phone</h3>
              <p className="text-3xl font-bold mb-4">$159.00</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold transition-colors">
                SHOP NOW
              </button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
              <div className="w-full h-full bg-purple-600 rounded-l-full"></div>
            </div>
          </div>

          {/* Small Product Cards */}
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-shadow"
              >
                <div className="bg-gray-100 rounded-lg mb-2 h-24 flex items-center justify-center">
                  <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                </div>
                <h3 className="text-xs font-medium text-gray-800 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <span className="text-blue-600 font-bold text-sm">
                  ${product.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Zebronics Zeb Max<br />Wireless Controller</h3>
              <p className="text-xl mb-4">From $88.00</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold transition-colors">
                SHOP NOW
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Apple iPod Pro M4<br />With Matte Glass</h3>
              <p className="text-xl mb-4">$344.00</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold transition-colors">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Best Selling Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {products.concat(products).slice(0, 7).map((product, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-shadow relative"
            >
              {idx % 3 === 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  25%
                </span>
              )}
              <div className="bg-gray-100 rounded-lg mb-3 h-28 flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 rounded-lg"></div>
              </div>
              <h3 className="text-xs font-medium text-gray-800 mb-1 line-clamp-2 h-8">
                {product.name}
              </h3>
              <div className="flex items-center mb-1">
                <div className="flex text-yellow-400 text-xs">
                  {"★".repeat(Math.floor(product.rating))}
                </div>
                <span className="text-xs text-gray-500 ml-1">
                  ({product.reviews})
                </span>
              </div>
              <span className="text-blue-600 font-bold text-sm">
                ${product.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}