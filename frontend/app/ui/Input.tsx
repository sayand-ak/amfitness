"use client";

export default function Input({ type = "text", placeholder, className, ...props }: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full p-2 border border-gray-300 rounded focus:border-none text-[15px] ${className}`}
      {...props}
    />
  );
}
