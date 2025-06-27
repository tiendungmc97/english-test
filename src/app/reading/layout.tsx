import React, { ReactNode } from "react";

interface ReadingLayoutProps {
  children: ReactNode;
}

export default function ReadingLayout({ children }: ReadingLayoutProps) {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full bg-white">
        <div className="p-2">
          <a
            href="/"
            className="inline-block px-4 py-1 bg-blue-600 text-white rounded font-medium no-underline"
          >
            Home
          </a>
        </div>
      </div>
      <div className="pt-10">{children}</div>
    </>
  );
}
