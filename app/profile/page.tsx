"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Disable scroll when this page is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling on unmount
    };
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      </main>
    );
  }

  if (!session) return null;

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Username:
        </h2>
        <p className="mb-4 text-gray-500 dark:text-gray-300">
          {session.user?.name || "Unnamed User"}
        </p>
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Registered Email:
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          {session.user?.email}
        </p>

        <button
          onClick={() => signOut()}
          className="mt-6 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md shadow transition"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
