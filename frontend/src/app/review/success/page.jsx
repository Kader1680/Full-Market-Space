"use client";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function ReviewSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-8 text-center max-w-md">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Submitted Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for sharing your feedback. Your review helps us improve.
        </p>
        <Link
          href="/orders"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          Back to Orders
        </Link>
      </div>
    </div>
  );
}
