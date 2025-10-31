"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        router.push("/products");
      } else {
        setError(data.message || "Invalid credentials");
      }
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
        {/* Left Side */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white flex flex-col justify-center p-10 space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-3">Welcome Back </h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              Sign in to continue shopping, track your orders, and access your account dashboard.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Secure Login</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your data is encrypted, and your privacy is our top priority.
            </p>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="flex flex-col justify-center p-8 sm:p-14 bg-white">
          <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-slate-800 text-sm font-medium block mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-800 text-sm font-medium block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex items-center justify-between text-sm mt-1">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-center text-red-600 text-sm mt-2">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-slate-800 active:scale-[0.98] transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-sm text-slate-600 text-center mt-6">
              Don’t have an account?
              <a
                href="/register"
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
