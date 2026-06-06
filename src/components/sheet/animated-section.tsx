'use client';

import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

export function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
