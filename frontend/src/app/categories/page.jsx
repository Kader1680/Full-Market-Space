"use client";

import { useState, useEffect } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
     
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="p-4 border rounded shadow">
           <img
            src={cat.image ? `http://127.0.0.1:8000/storage/${cat.image}` : "/placeholder.png"}
            alt={cat.name}
          />

            <h2 className="font-semibold text-lg">{cat.name}</h2>
            <p className="text-gray-600">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
