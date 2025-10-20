"use client";
import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";

export default function OrderPage() {
  const params = useParams();
  const id = params?.id;

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
      }
      setLoading(false);
    };
    fetchOrder();
  }, [token, id]);

  if (!token)
    return (
      <div className="text-center mt-20 text-slate-700">
        Please login to view this order.
      </div>
    );
  if (loading)
    return (
      <div className="text-center mt-20 text-slate-700">
        Loading order details...
      </div>
    );
  if (!order)
    return (
      <div className="text-center mt-20 text-slate-700">
        {message || "Order not found."}
      </div>
    );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Order Details
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Order ID:{" "}
              <span className="font-medium text-slate-900">
                {order.order_number}
              </span>
            </p>
            <span
              className={`inline-block mt-3 text-sm font-medium px-3 py-1 rounded-full ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {order.status === "pending" ? "Pending Payment" : "Confirmed"}
            </span>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-slate-900 border-b border-gray-200 pb-3">
              Products
            </h3>

            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0"
                >
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">
                      {item.product_name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    ${item.total}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-slate-900 border-b border-gray-200 pb-3">
              Billing Summary
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex justify-between">
                Subtotal
                <span className="font-medium text-slate-900">
                  ${order.subtotal}
                </span>
              </li>
              <li className="flex justify-between">
                Total
                <span className="font-semibold text-slate-900">
                  ${order.total}
                </span>
              </li>
            </ul>

            {/* Payment Button */}
            {order.status === "confirmed" ? (
              <div className="w-full mt-6 bg-green-100 text-green-600 py-3 text-center rounded-md font-medium">
                Order Paid Successfully
              </div>
            ) : (
              <button
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-medium transition"
                onClick={() =>
                  redirect(`/payement?amount=${order.total}&orderId=${order.id}`)
                }
              >
                Pay / Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
