"use client";

export default function Button({ children, type = "button", className }: any) {
  return (
    <button
      type={type}
      className={`bg-secondary hover:bg-secondary-600 text-white font-bold py-2 px-4 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
