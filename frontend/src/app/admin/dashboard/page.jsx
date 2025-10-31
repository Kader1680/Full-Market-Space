"use client";
import React, { useEffect, useState } from "react";

export default function Dashboard() {

  const [productcount, setproductcount] = useState(0)
  const [orderscount, setuserscount] = useState(0)
  const [costumers, setcostumers] = useState(0)
  const [transactions, settransactions] = useState(0)

  const [latest, setlatest] = useState([]);

  useEffect(() => {
      fetch("http://localhost:8000/api/products")
        .then((res) => res.json())
        .then((data) => setproductcount(data.data || []))
        .catch((err) => console.error("Error fetching products:", err));
    }, []);

  

  

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8000/api/orders", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setuserscount(data);
 
      } catch (error) {
        console.error(error);
        setMessage("Error fetching orders");
      }
    };

    fetchOrders();
  }, [token]);



    

  useEffect(() => {
    const fetchcustomers = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8000/api/costumers", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch costumers");
        const data = await res.json();
        console.log(data);
        setcostumers(data.users);
 
      } catch (error) {
        console.error(error);
      }
  
    };

    fetchcustomers();
  }, [token]);





    useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchcustomers = async () => {

      if (!token) return;
      try {
        const res = await fetch("http://localhost:8000/api/transactions", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch costumers");
        const data = await res.json();
        console.log(data);
        settransactions(data.transaction_count);
 
      } catch (error) {
        console.error(error);
      }
      
    };

    fetchcustomers();
  }, [token]);


  
    useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchcustomers = async () => {

      if (!token) return;
      try {
        const res = await fetch("http://localhost:8000/api/latest-static", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch costumers");
        const data = await res.json();
        console.log("latest : ",  data);
        setlatest(data);
 
      } catch (error) {
        console.error(error);
      }
      
    };

    fetchcustomers();
  }, [token]);




  




  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-screen fixed">
        <div className="p-6 text-xl font-bold text-indigo-600 border-b border-gray-200">
          Dahba Dashboard
        </div>
        <nav className="p-6 space-y-4">
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Dashboard</a>
          <a href="/admin/products/index" className="block text-gray-700 hover:text-indigo-600 font-medium">Product Management</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Order Management</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Transaction Management</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Settings</a>
        </nav>
      </aside>
 
      <main className="ml-64 p-6">
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome, Admin!</h1>
          <p className="text-gray-600 mt-2">Here’s a quick overview of your dashboard.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-indigo-600 text-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium">Total Products</p>
            <h2 className="text-2xl font-bold mt-2">{productcount.length}</h2>
          </div>
          <div className="bg-green-600 text-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium">Total Orders</p>
            <h2 className="text-2xl font-bold mt-2">{orderscount.length}</h2>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium">Pending Transactions</p>
            <h2 className="text-2xl font-bold mt-2">{transactions}</h2>
          </div>
          <div className="bg-red-600 text-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium">Customers</p>
            <h2 className="text-2xl font-bold mt-2">{costumers}</h2>
          </div>
        </div>

        {/* Product Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">Product Name</th>
                  {/* <th className="px-4 py-2 border-b">Category</th> */}
                  <th className="px-4 py-2 border-b">Price</th>
                  <th className="px-4 py-2 border-b">Stock</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
            
                  {
                    latest.produsts && latest.produsts.map((item) => (
                         <tr className="hover:bg-gray-50">

                             <td className="px-4 py-2 border-b"> {item.name} </td>
                            <td className="px-4 py-2 border-b">{item.price}</td>
                            <td className="px-4 py-2 border-b">{item.stock}</td>
                            <td className="px-4 py-2 border-b space-x-2">
                              <button className="px-2 py-1 bg-indigo-600 text-white rounded-md text-sm">Edit</button>
                              <button className="px-2 py-1 bg-red-600 text-white rounded-md text-sm">Delete</button>
                            </td>
                         </tr>

                    
                    ))
                  }
                 
               
                {/* More rows... */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">Order ID</th>
                  <th className="px-4 py-2 border-b">Customer</th>
                  <th className="px-4 py-2 border-b">Product</th>
                  <th className="px-4 py-2 border-b">Total</th>
                  {/* <th className="px-4 py-2 border-b">Status</th> */}
                  {/* <th className="px-4 py-2 border-b">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {
                    latest.produsts && latest.orders.map((item) => (
                         <tr  className="hover:bg-gray-50">

                             <td className="px-4 py-2 border-b"> {item.id} </td>
                             <td className="px-4 py-2 border-b"> {item.user.name} </td>
                             <td className="px-4 py-2 border-b"> {item.product_name} </td>
                            <td className="px-4 py-2 border-b">{item.total}</td>
                            {/* <td className="px-4 py-2 border-b">{item.stock}</td> */}
                            {/* <td className="px-4 py-2 border-b space-x-2">
                              <button className="px-2 py-1 bg-indigo-600 text-white rounded-md text-sm">Edit</button>
                              <button className="px-2 py-1 bg-red-600 text-white rounded-md text-sm">Delete</button>
                            </td> */}
                         </tr>

                    
                    ))
                  }
                 
                {/* More rows... */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">Transaction ID</th>
                  <th className="px-4 py-2 border-b">Order ID</th>
                  <th className="px-4 py-2 border-b">Amount</th>
                  <th className="px-4 py-2 border-b">Payment Method</th>
                  <th className="px-4 py-2 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">TXN-001</td>
                  <td className="px-4 py-2 border-b">ORD-MPOTLAQX</td>
                  <td className="px-4 py-2 border-b">$246.00</td>
                  <td className="px-4 py-2 border-b">Credit Card</td>
                  <td className="px-4 py-2 border-b">Completed</td>
                </tr>
                {/* More rows... */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
