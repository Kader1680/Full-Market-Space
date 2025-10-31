"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearch,
  faCartShopping,
  faArrowsRotate,
  faHeart,
  faChevronDown,
   faBoxOpen,
  faGauge, 
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Cart", href: "/cart" },
  ];

  return (
    <header className="bg-[#131722] text-white py-3 px-4 sm:px-10 shadow-md relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <Link href="/" className="text-3xl font-extrabold tracking-wide">
          trendyMart
        </Link>

        <div className="flex flex-1 max-w-3xl bg-white rounded-md overflow-hidden shadow-sm">
          <div className="flex items-center px-3 text-black font-semibold border-r border-gray-300">
            <span>All Categories</span>
            <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-gray-500 text-sm" />
          </div>
          <input
            type="text"
            placeholder="Search product here..."
            className="flex-1 px-4 py-2 text-gray-700 outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 flex items-center justify-center">
            <FontAwesomeIcon icon={faSearch} className="text-lg" />
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
         
        

          <div className="h-6 w-px bg-gray-600 hidden sm:block"></div>

          {/* Icons Group */}
          <div className="flex items-center gap-5">
            {/* <Link href="/compare" className="relative hover:text-blue-400">
              <FontAwesomeIcon icon={faArrowsRotate} className="text-lg" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-xs font-bold rounded-full px-1.5">
                0
              </span>
            </Link>

            <Link href="/wishlist" className="relative hover:text-blue-400">
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-xs font-bold rounded-full px-1.5">
                0
              </span>
            </Link> */}

             <Link href="/wishlist" className="relative hover:text-blue-400">
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-xs font-bold rounded-full px-1.5">
                0
              </span>
            </Link> 

            <Link href="/cart" className="relative flex items-center gap-2 hover:text-blue-400">
              <div className="relative">
                <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-xs font-bold rounded-full px-1.5">
                  0
                </span>
              </div>
              <div className="hidden sm:block leading-tight">
                <p>My Cart</p>
                <p className="text-gray-300 text-xs">$0.00</p>
              </div>
            </Link>
          </div>

           {user && (
              <li className="border-b border-gray-700">
                <Link
                  href="/orders"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 transition-all"
                >
                  <FontAwesomeIcon icon={faBoxOpen} className="text-white text-sm" />
                  <span>Orders</span>
                </Link>
              </li>
            )}

            {user && user.role === "admin" && (
              <li>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 transition-all"
                >
                  <FontAwesomeIcon icon={faGauge} className="text-white text-sm" />
                  <span>Dashboard</span>
                </Link>
              </li>
            )}

            {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 hover:text-blue-400">
                <img
                  src={
                    user.image
                      ? `http://127.0.0.1:8000/storage/${user.image}`
                      : "/user.png"
                  }
                  alt="profile"
                  className="w-9 h-9 rounded-full border border-gray-400 object-cover"
                />
                <div className="hidden sm:block leading-tight">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-300 text-xs">Profile</p>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-white text-black  px-3 py-2 rounded-md text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 hover:text-blue-400">
              <FontAwesomeIcon icon={faUser} className="text-lg" />
              <div className="hidden sm:block leading-tight">
                <p>Account</p>
                <p className="text-gray-300 text-xs">Log in</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="block sm:hidden mt-3">
        <button
          className="text-white text-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        {isMenuOpen && (
          <ul className="mt-3 bg-[#1a1f2c] rounded-md overflow-hidden">
            {menuItems.map((item) => (
              <li key={item.label} className="border-b border-gray-700">
                <Link
                  href={item.href}
                  className="block px-4 py-2 hover:bg-blue-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user && (
              <li className="border-b border-gray-700">
                <Link
                  href="/orders"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 transition-all"
                >
                  <FontAwesomeIcon icon={faBoxOpen} className="text-white text-sm" />
                  <span>Orders</span>
                </Link>
              </li>
            )}

            {user && user.role === "admin" && (
              <li>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 transition-all"
                >
                  <FontAwesomeIcon icon={faGauge} className="text-white text-sm" />
                  <span>Dashboard</span>
                </Link>
              </li>
            )}

          </ul>
        )}
      </div>
    </header>
  );
};

export default Navbar;
