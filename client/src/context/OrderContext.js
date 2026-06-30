"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";


const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const [orderCount, setOrderCount] = useState(0);

  const fetchOrder = useCallback ( async  () => {
    if (!user) {
      setOrderCount(0);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      console.log("order account", data?.length)

      setOrderCount(data?.length || 0);
    } catch (error) {
      console.error(error);
    }
  }, [user]); 

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <OrderContext.Provider
      value={{ orderCount, setOrderCount }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);