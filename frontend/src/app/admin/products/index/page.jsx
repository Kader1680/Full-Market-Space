"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchProducts = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:8000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data.data || []);
      console.log(data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setMessage("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  // Delete product
  const handleDelete = async (id) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      alert("Product deleted successfully!");
      fetchProducts(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (message) return <p className="text-center mt-10">{message}</p>;
  if (!products.length)
    return <p className="text-center mt-10">No products found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Products Management</h2>
      <Link
  href="/admin/products/store"
  className="fixed bottom-8 right-8 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition"
>
  <FontAwesomeIcon icon={faPlus} />
  <span className="font-medium">Add Product</span>
</Link>

      <div className="mt-10 overflow-x-auto hidden lg:block">
        <table className="min-w-full bg-white shadow rounded-lg border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">#</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Image</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Category</th>

              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Price</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">date</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 border-b">{idx + 1}</td>
                <td className="px-6 py-4 border-b">
                  <img
                    src={`http://127.0.0.1:8000/storage/${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 border-b">{product.name}</td>
                <td className="px-6 py-4 border-b bg-info">
                  {product.category_id ? product.category.name : "No Category"}
                </td>

                <td className="px-6 py-4 border-b">
                  {new Date(product.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>



                <td className="px-6 py-4 border-b">${product.price}</td>
                <td className="px-6 py-4 border-b space-x-2">
                  <button
                    onClick={() => router.push(`/products/edit/${product.id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 lg:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={`http://127.0.0.1:8000/storage/${product.image}`}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/admin/products/edit/${product.id}`)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
