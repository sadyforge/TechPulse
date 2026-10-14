
"use client";

import { useState } from "react";
import { Link, Button, Spinner } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";
import NavLinksPage from "./NavLinks";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="my-4 flex items-center justify-center gap-4">
        <Spinner />
      </div>
    );
  }

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    toast.success("Successfully User sign-out")
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const links = <NavLinksPage />;

  const authLinks = user ? (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
        aria-label="User menu"
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 pl-1.5 pr-3 transition hover:bg-gray-50"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="h-9 w-9 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <span className="max-w-32 truncate text-sm font-semibold text-gray-800">
          {user.name || "User"}
        </span>

        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m6 9 6 6 6-6"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <>
          <button
            type="button"
            aria-label="Close user menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setIsDropdownOpen(false)}
          />

          <div className="absolute right-0 z-20 mt-3 w-60 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user.name || "User"}
              </p>
              <p className="truncate text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M20 21a8 8 0 0 0-16 0m8-10a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                  />
                </svg>
                Profile
              </Link>

              <Button
                onPress={handleSignOut}
                variant="light"
                className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-4-4 5-5-5-5m5 5H3"
                  />
                </svg>
                Sign Out
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <>
      <Link href="/sign-in">Login</Link>
      <Link href="/sign-up">
        <Button color="primary">Sign Up</Button>
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 1v5m6-5v5M9 18v5m6-5v5M1 9h5m-5 6h5m12-6h5m-5 6h5"
                  />
                </svg>
              </div>

              <p className="text-xl font-extrabold tracking-tight text-gray-900">
                Tech<span className="text-blue-600">Pulse</span>
              </p>
            </Link>
          </div>
        </div>

        <ul className="hidden items-center gap-4 md:flex">{links}</ul>

        <div className="hidden items-center gap-4 md:flex">{authLinks}</div>
      </header>

      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {links}

            <li className="mt-4 flex flex-col gap-3 border-t border-separator pt-4">
              {authLinks}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
