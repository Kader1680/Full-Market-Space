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
      console.log(data);

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
    <div className="bg-white max-w-4xl flex items-center mx-auto md:min-h-screen p-4">
      <div className="grid md:grid-cols-3 items-center [box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-xl overflow-hidden w-full">
        {/* Left Info Section */}
        <div className="max-md:order-1 flex flex-col justify-center md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-slate-900 to-slate-700 lg:px-8 px-4 py-4">
          <div>
            <h3 className="text-white text-lg">Create Your Account</h3>
            <p className="text-[13px] text-slate-300 mt-3 leading-relaxed">
              Welcome to our registration page! Get started by creating your
              account.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg">Simple & Secure Registration</h3>
            <p className="text-[13px] text-slate-300 mt-3 leading-relaxed">
              Our registration process is designed to be straightforward and
              secure. We prioritize your privacy and data security.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 w-full py-6 px-6 sm:px-14 max-w-lg mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-slate-900 text-2xl font-bold">Register Now</h1>
          </div>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Name
              </label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="text-slate-900 bg-white border border-slate-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter name"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5z"></path>
                </svg>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Email Id
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-slate-900 bg-white border border-slate-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <g transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                    ></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"></path>
                  </g>
                </svg>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-slate-900 bg-white border border-slate-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24z"></path>
                </svg>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm text-slate-600"
              >
                I accept the{" "}
                <a
                  href="#"
                  className="text-blue-600 font-medium hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Error or Success messages */}
            {error && (
              <div className="text-center text-red-500 text-sm">{error}</div>
            )}
            {message && !error && (
              <div className="text-center text-green-600 text-sm">
                {message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none cursor-pointer disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create an account"}
            </button>
          </div>

          <p className="text-slate-600 text-sm mt-6 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
