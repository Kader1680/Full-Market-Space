"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingBag, FaClock, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

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

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load orders. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (!token)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-700 text-center text-lg font-medium">
          Please login to view your orders.
        </p>
      </div>
    );

  return (
    <div className="bg-gray-50 w-full  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-3xl font-bold text-[#161c27] flex items-center gap-3">
            <FaShoppingBag className="text-blue-600 text-3xl" /> My Orders
          </h1>
        </div>

        {message && (
          <p className="text-sm text-red-500 mb-4 text-center">{message}</p>
        )}

        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            You have no orders yet.
          </p>
        ) : (
          <div className="gap-6">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="group block bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition p-6"
              >
                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition">
                      Order #{order.order_number}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status === "pending" ? (
                      <>
                        <FaClock /> Pending
                      </>
                    ) : (
                      <>
                        <FaCheckCircle /> Confirmed
                      </>
                    )}
                  </span>
                </div>

                {/* Middle */}
                <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
                  <span className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-blue-600" />
                    Total
                  </span>
                  <span className="font-semibold text-slate-900">
                    ${order.total}
                  </span>
                </div>

                {/* Bottom */}
                <div className="mt-5">
                  <button
                    type="button"
                    className="w-full text-center py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition"
                  >
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
