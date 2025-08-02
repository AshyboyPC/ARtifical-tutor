'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface HighlightCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'pink' | 'indigo' | 'orange' | 'green';
  id: string;
}

const colorVariants = {
  pink: 'bg-pink-600 text-white',
  indigo: 'bg-indigo-600 text-white',
  orange: 'bg-orange-500 text-white',
  green: 'bg-green-500 text-white',
} as const;

export function HighlightsCarousel({ highlights }: { highlights: HighlightCardProps[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Auto-rotate highlights
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlights.length);
    }, 5000); // Change slide every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [highlights.length]);

  return (
    <div className="w-full py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {highlights.map((highlight, index) => {
          const Icon = highlight.icon;
          const isActive = index === activeIndex;
          
          return (
            <div 
              key={highlight.id}
              className={`relative group transition-all duration-500 transform ${
                isActive ? 'scale-105 z-10' : 'scale-95 opacity-90'
              }`}
            >
              <div className="relative block overflow-hidden rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-tr from-white/50 to-zinc-100 dark:from-zinc-900/40 dark:to-zinc-800/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]">
                <div className="relative h-[280px] w-full">
                  <img
                    src="https://raw.githubusercontent.com/ruixenui/ruixen.com/refs/heads/main/public/ruixenui-bg.png"
                    alt={highlight.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${colorVariants[highlight.color]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">{highlight.title}</h3>
                  </div>
                  <p className="text-gray-200 mb-4">{highlight.description}</p>
                  <div className="flex justify-end">
                    <div className="group relative w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {highlights.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-white w-8' : 'bg-white/30'
            }`}
            aria-label={`Go to highlight ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
