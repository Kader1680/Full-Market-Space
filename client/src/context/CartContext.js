"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const fetchCart = useCallback(async () => {
    if (!user) {
      setCartCount(0);
      return;
    }

    const token = localStorage.getItem("token");

    try {

      const res = await fetch("http://127.0.0.1:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      console.log(data.items?.length);

      setCartCount(data.items?.length || 0);
    } catch (error) {
      console.error(error);
    }
  }, [user]); 

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
