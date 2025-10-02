"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        {/* Logo */}
        <Link href="/" className="max-sm:hidden">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-36"
          />
        </Link>
        <Link href="/" className="hidden max-sm:block">
          <img
            src="https://readymadeui.com/readymadeui-short.svg"
            alt="logo"
            className="w-9"
          />
        </Link>

        {/* Menu */}
        <div
          className={`${menuOpen ? "block" : "hidden"} max-lg:block lg:!block`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer"
          >
            ✕
          </button>

          <ul className="lg:flex gap-x-4 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <Link href="/">
                <img
                  src="https://readymadeui.com/readymadeui.svg"
                  alt="logo"
                  className="w-36"
                />
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-blue-700 text-blue-700 block font-medium text-[15px] px-3 py-3"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-blue-700 text-slate-900 block font-medium text-[15px] px-3 py-3"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="hover:text-blue-700 text-slate-900 block font-medium text-[15px] px-3 py-3"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="hover:text-blue-700 text-slate-900 block font-medium text-[15px] px-3 py-3"
              >
                Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Right buttons */}
        <div className="flex max-lg:ml-auto space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all"
          >
            Sign up
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden cursor-pointer"
          >
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
