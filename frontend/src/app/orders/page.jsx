"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8000/api/orders", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
        setMessage("Error fetching orders");
      }
      setLoading(false);
    };

    fetchOrders();
  }, [token]);

  if (!token) return <p className="text-center mt-10">Please login to view your orders.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">📦 My Orders</h1>

      {message && <p className="text-sm text-red-500 mb-4 text-center">{message}</p>}

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-900">{order.order_number}</span>
                <span className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-600">Total: ${order.total}</span>
               <span
                className={`text-sm font-medium ${
                  order.status === 'pending' ? 'text-orange-500' : 'text-green-600'
                }`}
              >
                {order.status}
              </span>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
