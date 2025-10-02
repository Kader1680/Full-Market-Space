"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Call your Laravel API here
    // Example:
    // const res = await fetch("http://127.0.0.1:8000/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });

    // if (res.ok) {
    //   const data = await res.json();
    //   save token to localStorage/cookie
    //   localStorage.setItem("token", data.token);
    //   router.push("/products");
    // }

    // For now, just simulate success:
    console.log("Logging in with", email, password);
    router.push("/products"); // redirect after login
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto mt-10 border p-6 rounded-lg shadow-sm bg-white"
    >
      <div>
        <label className="mb-2 text-sm text-slate-900 font-medium block">
          Email
        </label>
        <div className="relative flex items-center">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 pr-10 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border border-gray-200 focus:border-black outline-0 rounded-md transition-all"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 text-sm text-slate-900 font-medium block">
          Password
        </label>
        <div className="relative flex items-center">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 pr-10 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border border-gray-200 focus:border-black outline-0 rounded-md transition-all"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input type="checkbox" className="w-4 h-4 shrink-0" />
        <label className="text-sm text-slate-900 ml-3">Remember me</label>
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 w-full cursor-pointer !mt-4 text-[15px] font-medium bg-black hover:bg-[#111] text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
