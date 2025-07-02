"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="text-2xl font-semibold mb-6 text-center text-black">
        Reading
      </div>
      <div className="flex flex-col divide-y divide-gray-200">
        <Link
          href="/reading/part-1"
          className="py-3 hover:bg-gray-50 transition-colors text-blue-600 font-medium text-center"
        >
          Part 1
        </Link>
        <Link
          href="/reading/part-2"
          className="py-3 hover:bg-gray-50 transition-colors text-blue-600 font-medium text-center"
        >
          Part 2
        </Link>
        <Link
          href="/reading/part-3"
          className="py-3 hover:bg-gray-50 transition-colors text-blue-600 font-medium text-center"
        >
          Part 3
        </Link>
      </div>
    </div>
  );
}
