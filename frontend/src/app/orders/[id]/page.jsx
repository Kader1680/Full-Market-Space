"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaMoneyBillWave,
  FaStar,
} from "react-icons/fa";

export default function OrderPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/orders/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
        setMessage("Error fetching order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [token, id]);

  if (!token)
    return <div className="text-center mt-20 text-gray-600">Please login to view this order.</div>;

  if (loading)
    return <div className="text-center mt-20 text-gray-600">Loading order...</div>;

  if (!order)
    return <div className="text-center mt-20 text-gray-600">{message || "Order not found."}</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FaBoxOpen className="text-blue-600" /> Order Details
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Order ID: <span className="font-semibold text-gray-900">{order.order_number}</span>
            </p>

            <span
              className={`inline-flex items-center gap-1 mt-3 text-sm font-medium px-3 py-1 rounded-full ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {order.status === "pending" ? (
                <>
                  <FaClock /> Pending Payment
                </>
              ) : (
                <>
                  <FaCheckCircle /> Confirmed
                </>
              )}
            </span>
          </div>
        </div>

        {/* Order Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products Section */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-3 flex items-center gap-2">
              <FaShoppingCart className="text-blue-600" /> Products
            </h3>

            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.product_name}</h4>
                    <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    <p className="text-[12px] text-gray-400">Product ID: {item.product_id}</p>

                    {order.status === "confirmed" && (
                     <button
                        onClick={() => router.push(`/review/${item.product_id}`)}
                        className="inline-block mt-6 text-blue-600 font-medium hover:underline"
                      >
                        ✍️ Write a Review
                      </button>

                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-800">${item.total}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Section */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-3 flex items-center gap-2">
              <FaMoneyBillWave className="text-blue-600" /> Billing Summary
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${order.subtotal}</span>
              </li>
              <li className="flex justify-between">
                <span>Total</span>
                <span className="font-bold text-gray-900">${order.total}</span>
              </li>
            </ul>

            {order.status === "confirmed" ? (
              <div className="mt-6 w-full bg-green-100 text-green-600 py-3 rounded-md font-medium text-center flex items-center justify-center gap-2">
                <FaCheckCircle /> Paid Successfully
              </div>
            ) : (
              <button
                onClick={() => router.push(`/payement?amount=${order.total}&orderId=${order.id}`)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition flex items-center justify-center gap-2"
              >
                <FaDollarSign /> Pay / Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
