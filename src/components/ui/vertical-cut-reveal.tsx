'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center';
  autoStart?: boolean;
  onComplete?: () => void;
}

export interface VerticalCutRevealRef {
  start: () => void;
  reset: () => void;
}

const VerticalCutReveal = forwardRef<VerticalCutRevealRef, TextProps>(
  ({
    children,
    reverse = false,
    duration = 0.6,
    delay = 0,
    staggerDuration = 0.02,
    staggerFrom = 'first',
    autoStart = true,
    onComplete,
    className,
    ...props
  }, ref) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);
    const text = typeof children === 'string' ? children : '';

    const chars = Array.from(text);
    
    const getStaggerDelay = (index: number) => {
      if (staggerFrom === 'first') return index * staggerDuration;
      if (staggerFrom === 'last') return (chars.length - 1 - index) * staggerDuration;
      if (staggerFrom === 'center') {
        const center = (chars.length - 1) / 2;
        return Math.abs(center - index) * staggerDuration;
      }
      return 0;
    };

    const start = () => {
      setIsAnimating(true);
    };

    const reset = () => {
      setIsAnimating(false);
    };

    useImperativeHandle(ref, () => ({
      start,
      reset,
    }));

    useEffect(() => {
      if (autoStart) {
        start();
      }
    }, [autoStart]);

    const variants: Variants = {
      hidden: {
        y: reverse ? 40 : -40,
        opacity: 0,
      },
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay: delay + getStaggerDelay(i),
          ease: [0.22, 0.61, 0.36, 1],
        },
      }),
    };

    return (
      <span ref={containerRef} className={cn('inline-flex flex-wrap', className)} {...props}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="hidden"
            animate={isAnimating ? 'visible' : 'hidden'}
            variants={variants}
            onAnimationComplete={i === chars.length - 1 ? onComplete : undefined}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    );
  }
);

VerticalCutReveal.displayName = 'VerticalCutReveal';

export { VerticalCutReveal };
