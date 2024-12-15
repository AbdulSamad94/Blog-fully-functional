"use client";

import { useEffect } from "react";
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error captured:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="bg-red-100 dark:bg-red-900 p-6 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-500 dark:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m0-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-bold">Something went wrong!</h1>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
        {error.message ||
          "We encountered an unexpected error. Please try again."}
      </p>
      <button
        onClick={() => {
          reset();
        }}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 dark:hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
