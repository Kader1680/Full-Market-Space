"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaUserShield, FaCalendarAlt, FaUsers } from "react-icons/fa";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch users
  const fetchUsers = async () => {
    if (!token) redirect('/login');
    try {
      const res = await fetch("http://localhost:8000/api/users", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Fetched users:", data);

      setUsers(data.users || []);
      setCount(data.users?.length || data.length || 0);
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage("❌ Failed to load users.");
      redirect('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <img src="/loader.gif" alt="Loading..." className="w-16 h-16" />
      </div>
    );

  if (message)
    return <p className="text-center mt-10 text-red-600">{message}</p>;

  if (users.length === 0)
    return <p className="text-center mt-10 text-gray-600">No users found.</p>;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#131722] mb-6 text-center sm:text-left flex items-center gap-2">
        <FaUsers className="text-[#131722]" /> Users Management ({count})
      </h2>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead className="bg-[#131722] text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">#</th>
              <th className="px-6 py-3 text-left font-semibold">
                <FaUser className="inline-block mr-2" /> Name
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                <FaEnvelope className="inline-block mr-2" /> Email
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                <FaUserShield className="inline-block mr-2" /> Role
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                <FaCalendarAlt className="inline-block mr-2" /> Register Date
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-blue-50 transition duration-200 border-b"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-blue-700">{user.name}</td>
                <td className="px-6 py-4 text-gray-700">{user.email}</td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    user.role === "admin"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {user.role || "user"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive Cards */}
      <div className="lg:hidden space-y-4">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-700 font-semibold flex items-center gap-2">
                <FaUser /> {user.name}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <FaCalendarAlt /> {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 flex items-center gap-2">
              <FaEnvelope /> {user.email}
            </p>
            <p
              className={`mt-1 text-sm font-medium flex items-center gap-2 ${
                user.role === "admin"
                  ? "text-green-600"
                  : "text-gray-700"
              }`}
            >
              <FaUserShield /> {user.role || "user"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
