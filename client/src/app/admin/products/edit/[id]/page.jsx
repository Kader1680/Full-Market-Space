"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch product
  useEffect(() => {
    if (!token) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setName(data.name);
        setPrice(data.price);
        setStock(data.stock);
      } catch (err) {
        console.error(err);
        setMessage("Error loading product");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update product");
      alert("Product updated successfully!");
      router.push("/products"); // go back to products page
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (message) return <p className="text-center mt-10">{message}</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />
          {product.image && (
            <img
              src={`http://127.0.0.1:8000/storage/${product.image}`}
              alt={product.name}
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
