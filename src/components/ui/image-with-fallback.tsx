'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Image as ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  containerClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  title,
  className,
  containerClassName,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          'relative flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden group',
          containerClassName,
          className
        )}
      >
        {/* Effets de lumière de fond */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150" />

        <div className="relative z-10 flex flex-col items-center p-4 text-center">
          <ImageIcon className="w-10 h-10 text-cyan-400/70 mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-transform duration-500 group-hover:scale-110 group-hover:text-cyan-300" />
          {title ? (
            <span className="text-slate-200 font-bold text-sm md:text-base leading-tight drop-shadow-md px-2 max-w-[90%]">
              {title}
            </span>
          ) : (
            <span className="text-slate-400 font-medium text-xs md:text-sm">
              Visuel non disponible
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setError(true)}
      />
    </div>
  );
}
