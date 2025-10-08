"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
        setOrder(data); // keep full order object
      } catch (err) {
        console.error(err);
        setMessage("Error fetching order");
      }
      setLoading(false);
    };
    fetchOrder();
  }, [token, id]);

  if (!token) return <p className="text-center mt-10">Please login to view this order.</p>;
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!order) return <p className="text-center mt-10">{message || "Order not found."}</p>;

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-300 pb-6 gap-4 md:gap-0">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-slate-900">Order Details</h2>
            <h4 className="text-base text-slate-600 mt-2">Order Id: {order.order_number}</h4>
          </div>
        </div>

        {/* Products and Delivery Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Products */}
          <div>
            <h3 className="text-base font-semibold text-slate-900 border-b border-gray-300 pb-2">Products</h3>
            <div className="space-y-4 mt-4">
              {order.items.map((item) => (
                <div key={item.id} className="grid sm:grid-cols-3 items-center gap-4">
                  <div className="col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <div>
                      <h4 className="text-[15px] font-medium text-slate-900">{item.product_name}</h4>
                      <p className="text-xs font-medium text-slate-600 mt-1">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="sm:ml-auto">
                    <h4 className="text-[15px] font-medium text-slate-900">${item.total}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Billing */}
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-md p-4 sm:p-6">
              <h3 className="text-base font-semibold text-slate-900 border-b border-gray-300 pb-2">Billing Details</h3>
              <ul className="font-medium mt-4 space-y-2">
                <li className="flex justify-between text-slate-600 text-sm">
                  Subtotal <span className="text-slate-900 font-semibold">${order.subtotal}</span>
                </li>
                <li className="flex justify-between text-slate-600 text-sm">
                  Total <span className="text-slate-900 font-semibold">${order.total}</span>
                </li>
              </ul>

              <button
                className="w-full mt-6 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                onClick={() => alert("Redirect to payment gateway")}
              >
                Pay / Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
