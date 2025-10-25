"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrdersManagement() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [count, setcount] = useState(0);

 


  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch orders
  const fetchOrders = async () => {
    if (!token) return;
    try {
        const res = await fetch("http://localhost:8000/api/orders", {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

      const data = await res.json();
      console.log("Fetched orders:", data);
      setOrders(data.data || data || []);
      setcount(data.length || data.data.length || 0);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setMessage("❌ Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  if (loading) return <p className="text-center mt-10 text-blue-600 font-medium">Loading orders...</p>;
  if (message) return <p className="text-center mt-10 text-red-600">{message}</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10 text-gray-600">No orders found.</p>;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#131722] mb-6 text-center sm:text-left">
        🧾 Orders Management ({count}) 
      </h2>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-[white] shadow-md rounded-lg border border-gray-200">
          <thead className="bg-[#131722] text-white ">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">ID</th>
              <th className="px-6 py-3 text-left">Order Number</th>
              <th className="px-6 py-3 text-left font-semibold ">Subtotal</th>
              <th className="px-6 py-3 text-left font-semibold ">Total</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold ">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="hover:bg-blue-50 transition duration-200 border-b"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 text-blue-700 font-medium">{order.order_number}</td>
                <td className="px-6 py-4 text-gray-600">${order.subtotal}</td>
                <td className="px-6 py-4 text-gray-800 font-semibold">${order.total}</td>
                <td
                  className={`px-6 py-4 font-medium ${
                    order.status === "pending"
                      ? "text-orange-500"
                      : "text-green-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive Cards */}
      <div className="lg:hidden space-y-4">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-700 font-semibold">
                #{index + 1} - {order.order_number}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600">Subtotal: ${order.subtotal}</p>
            <p className="font-semibold text-gray-800">Total: ${order.total}</p>
            <p
              className={`mt-1 text-sm font-medium ${
                order.status === "pending"
                  ? "text-orange-500"
                  : "text-green-600"
              }`}
            >
              Status: {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
