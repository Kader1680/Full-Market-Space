"use client";

import { use } from "react";
import { useState, useEffect } from "react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:8000/api/categories"; // Laravel API

  // Fetch categories
  const fetchCategories = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submit
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("description", form.description);
  if (form.imageFile) {
    formData.append("image", form.imageFile);
  }

  const method = editingId ? "POST" : "POST"; // Laravel can use POST for both with route change
  const url = editingId ? `${API_URL}/${editingId}` : API_URL;

  await fetch(url, {
    method: editingId ? "POST" : "POST",
    body: formData,
  });

  setForm({ name: "", description: "", image: "", imageFile: null });
  setEditingId(null);
  fetchCategories();
};

  // Handle edit
  const handleEdit = (cat) => {
    setForm({ name: cat.name, description: cat.description, image: cat.image });
    setEditingId(cat.id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchCategories();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin: Categories</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold text-xl mb-4">{editingId ? "Edit" : "Add"} Category</h2>
        <div className="mb-3">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
       <div className="mb-3">
        <label className="block mb-1">Image</label>
        <input
            type="file"
            accept="image/*"
            onChange={(e) =>
            setForm({ ...form, imageFile: e.target.files[0] })
            }
            className="w-full"
        />
        {form.image && !form.imageFile && (
            <img src={form.image} className="h-24 mt-2 rounded" alt="Preview" />
        )}
        {form.imageFile && (
            <img
            src={URL.createObjectURL(form.imageFile)}
            className="h-24 mt-2 rounded"
            alt="Preview"
            />
        )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add"} Category
        </button>
        {editingId && (
          <button
            type="button"
            className="ml-2 px-4 py-2 rounded border hover:bg-gray-200"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", description: "", image: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Category List */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="p-4 border rounded shadow relative">
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="h-32 w-full object-cover mb-2 rounded"
              />
            )}
            <h2 className="font-semibold text-lg">{cat.name}</h2>
            <p className="text-gray-600">{cat.description}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(cat)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
