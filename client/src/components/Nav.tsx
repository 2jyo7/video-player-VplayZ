import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4 bg-white shadow-md md:py-6">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" aria-label="Home">
            <Image
              src="https://www.svgrepo.com/show/491978/gas-costs.svg"
              height={40}
              width={40}
              alt="logo"
            />
          </Link>
          <div className="md:hidden">
            <button
              type="button"
              id="main-menu"
              aria-label="Main menu"
              aria-haspopup="true"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden md:flex md:space-x-10">
          <Link
            href="https://docs.pingping.io"
            target="_blank"
            className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
          >
            Github
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 text-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition duration-150 ease-in-out"
          >
            Login
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-700 transition duration-150 ease-in-out"
          >
            Get started
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
