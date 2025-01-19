'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ href, children, className }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href); 
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`text-blue-600 hover:underline ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;
