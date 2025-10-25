"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaStar, FaUserCircle, FaPaperPlane } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";
export default function ProductReviewsPage() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const { user } = useAuth();
  const user_id = user?.id;
  
  useEffect(() => {
    console.log("Product ID from params:", id);
    const storedToken = localStorage.getItem("token");
  
    setToken(storedToken);

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/reviews/${id}`);
        const data = await res.json();
        setReviews(data.data || []);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || rating === 0)
      return alert("Please provide both rating and text.");

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:8000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: id,
          user_id: user_id,
          text,
          rating,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setReviews((prev) => [data.data, ...prev]);
        setText("");
        setRating(0);
        setMessage("✅ Review added successfully!");
      } else {
        setMessage(data.message || "Failed to add review.");
      }
    } catch (err) {
      console.error(err);

      setMessage("Error submitting review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-md border border-gray-200 rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6">
          Product Reviews
        </h1>

        {/* Reviews List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading reviews...</p>
        ) : message && !reviews.length ? (
          <p className="text-center text-red-500">{message}</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-600">No reviews yet for this product.</p>
        ) : (
          <div className="space-y-6 mb-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-5 border rounded-xl bg-gray-50 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-3xl text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.user?.name || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {review.rating && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < review.rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add Review Form */}
        {token ? (
          <form onSubmit={handleSubmit} className="mt-6 border-t pt-6">
            <h2 className="text-xl font-semibold mb-3">Add Your Review</h2>

            {/* Rating stars */}
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`cursor-pointer ${
                    i < rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your honest feedback..."
              className="w-full border rounded-lg p-3 text-gray-800 focus:ring focus:ring-blue-100 focus:outline-none"
              rows={4}
            />

            {message && (
              <p className="text-sm text-center text-green-600 mt-2">{message}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition flex items-center justify-center gap-2"
            >
              {submitting ? "Submitting..." : <><FaPaperPlane /> Submit Review</>}
            </button>
          </form>
        ) : (
          <p className="text-center text-gray-600 mt-6">
            Please login to write a review.
          </p>
        )}
      </div>
    </div>
  );
}
