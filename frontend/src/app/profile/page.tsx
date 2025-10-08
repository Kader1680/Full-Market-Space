"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:8000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
        } else {
          setError("Failed to fetch profile");
        }
      })
      .catch(() => setError("Network error"));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (error)
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md text-red-600 text-center border border-red-200">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg border border-gray-100">
        <div className="flex flex-col items-center text-center">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}&background=2563eb&color=fff`}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-600 shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {user.name}
          </h2>
          <p className="text-gray-500 mb-6">{user.email}</p>

          <div className="flex gap-4 w-full justify-center flex-wrap">
            <button
              onClick={() => router.push("/edit-profile")}
              className="px-5 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Optional: User info section */}
        <div className="mt-8 border-t pt-6 text-left">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Account Details
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Joined:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              <strong>Status:</strong> Active
            </p>
            <p>
              <strong>Role:</strong> User
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
