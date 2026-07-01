"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  };

  const checkAuth = useCallback(async () => {
    const token = getToken();

    try {
      const headers = {
        Accept: "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch("http://localhost:8000/api/profile", {
        credentials: "include",
        headers,
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setUser(data.user ?? null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    const token = getToken();

    try {
      await fetch("http://localhost:8000/api/logout", {
        credentials: "include",
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("auth_token");
      setUser(null);
    }
  };

return (
  <AuthContext.Provider value={{ user, setUser, loading, logout, refreshAuth: checkAuth }}>
    {children}
  </AuthContext.Provider>
);

   
};