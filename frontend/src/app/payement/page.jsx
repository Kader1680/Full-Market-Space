"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : Promise.resolve(null);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const value = searchParams.get("amount") || 0;
    setAmount(value);
  }, [searchParams]);

  if (amount === null) return null;

  return (
    <div className="p-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Complete Your Payment
        </h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>
      </div>
    </div>
  );
}
