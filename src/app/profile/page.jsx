"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button, Spinner } from "@heroui/react";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Please Sign In
        </h1>
        <p className="text-gray-500">
          Sign in to view your profile.
        </p>
        <Button as={Link} href="/sign-in" color="primary">
          Sign In
        </Button>
      </div>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-[80vh] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />

          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-14 flex flex-col items-center">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "Profile"}
                  className="h-28 w-28 rounded-full border-4 border-white bg-white object-cover shadow-md"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-4xl font-bold text-white shadow-md">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              <h1 className="mt-4 text-2xl font-bold text-gray-900">
                {user.name || "User"}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>

              <span
                className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold ${
                  user.emailVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {user.emailVerified
                  ? "Email Verified"
                  : "Email Not Verified"}
              </span>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Account Information
              </h2>

              <div className="space-y-4 rounded-xl border border-gray-200 p-5">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="mt-1 break-words font-medium text-gray-900">
                    {user.name || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="mt-1 break-all font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="mt-1 break-all font-medium text-gray-900">
                    {user.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
              
                href="/"
                variant="bordered"
                className="flex-1"
              >
                Back to Home
              </Link>

              <Button
                color="danger"
                variant="flat"
                onPress={handleSignOut}
                className="flex-1"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
