"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.status) {
        localStorage.setItem("token", data.token);
        router.push("/profile");
      } else {
        setError(data.message || "Registration failed");
      }

      setMessage(data.message || "");
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden transition-all duration-500">
        {/* Left Side - Info Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white flex flex-col justify-center p-10 space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-3">Welcome to Our Store </h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              Create your account to start shopping, tracking orders, and enjoying exclusive offers.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Simple & Secure</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We value your privacy. Your data is securely encrypted, and registration is quick and safe.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center p-8 sm:p-14 bg-white"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Create Account</h1>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-slate-800 text-sm font-medium block mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-slate-800 text-sm font-medium block mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-800 text-sm font-medium block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center mt-2">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-slate-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 font-medium hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Feedback */}
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            {message && !error && (
              <p className="text-sm text-green-600 text-center">{message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 bg-slate-900 text-white w-full py-3 rounded-lg text-sm font-semibold hover:bg-slate-800 active:scale-[0.98] transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-sm text-slate-600 text-center mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
