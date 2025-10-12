"use client";
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const orderId = searchParams.get("orderId"); // ✅ get order ID from URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      alert("Please enter your card details.");
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name, email },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "", // ✅ optional for guests
        },
        body: JSON.stringify({
          name,
          email,
          amount: parseFloat(amount),
          payment_method_id: paymentMethod.id,
          order_id: orderId, // ✅ include order ID
        }),
      });

      const data = await res.json();

      if (data.status) {
        alert("✅ Payment successful!");
      } else {
        alert("❌ Payment failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error during payment");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-900 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-900 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-900 mb-1">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-md p-3">
          <CardElement />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
}
