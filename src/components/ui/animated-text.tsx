import * as React from "react"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  duration?: number
  delay?: number
  replay?: boolean
  className?: string
  textClassName?: string
  underlineClassName?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  underlineGradient?: string
  underlineHeight?: string
  underlineOffset?: string
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  ({
    text,
    duration = 0.5,
    delay = 0.1,
    replay = true,
    className,
    textClassName,
    underlineClassName,
    as: Component = "h1",
    underlineGradient = "from-blue-500 via-purple-500 to-pink-500",
    underlineHeight = "h-1",
    underlineOffset = "-bottom-2",
    ...props
  }, ref) => {
    const [isInView, setIsInView] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else if (replay) {
            // Only reset if we want to replay the animation
            setIsInView(false);
          }
        },
        {
          threshold: 0.1, // Trigger when 10% of the element is visible
          rootMargin: '0px 0px -50px 0px' // Slight offset to trigger slightly before element is in view
        }
      );

      const currentRef = elementRef.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [replay]);
    const letters = Array.from(text)

    const container: Variants = {
      hidden: { 
        opacity: 0 
      },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: { 
          staggerChildren: duration, 
          delayChildren: i * delay 
        }
      })
    }

    const child: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200
        }
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200
        }
      }
    }

    const lineVariants: Variants = {
      hidden: {
        width: "0%",
        left: "50%"
      },
      visible: {
        width: "100%",
        left: "0%",
        transition: {
          delay: letters.length * delay,
          duration: 0.8,
          ease: "easeOut"
        }
      }
    }

    return (
      <div 
        ref={(node) => {
          // Handle both forwarded ref and our internal ref
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          // @ts-ignore - This is a workaround for the forwarded ref
          elementRef.current = node;
        }} 
        className={cn("flex flex-col items-center justify-center gap-2", className)}
        {...props}
      >
        <div className="relative">
          <motion.div
            style={{ display: "flex", overflow: "hidden" }}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn("text-4xl font-bold text-center", textClassName)}
          >
            {letters.map((letter, index) => (
              <motion.span key={index} variants={child}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn(
              "absolute",
              underlineHeight,
              underlineOffset,
              "bg-gradient-to-r",
              underlineGradient,
              underlineClassName
            )}
          />
        </div>
      </div>
    )
  }
)
AnimatedText.displayName = "AnimatedText"

export { AnimatedText }
