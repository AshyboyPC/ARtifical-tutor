import { useId } from "react";
import { motion } from "framer-motion";

// Utility function to merge class names
function cn(...inputs: (string | undefined)[]) {
  return inputs.filter(Boolean).join(' ');
}

export interface ModernAnimatedTextProps {
  /** Text to display */
  text: string;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Whether to show the gradient variant */
  variant?: 'gradient';
}

export function ModernAnimatedText({
  text,
  className,
  textClassName,
  animationDuration = 800,
  variant = 'gradient',
}: ModernAnimatedTextProps) {
  const id = useId();
  const letters = Array.from(text);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      {/* Animated background glow */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl blur-xl",
          "before:absolute before:inset-0 before:rounded-2xl before:animate-pulse",
          variant === 'gradient' ? "before:bg-gradient-to-r before:from-purple-600/30 before:via-pink-600/30 before:to-orange-500/30" : ""
        )}
        style={{
          background: variant === 'gradient' 
            ? "linear-gradient(45deg, rgba(147, 51, 234, 0.3), rgba(219, 39, 119, 0.3), rgba(249, 115, 22, 0.3))"
            : undefined
        }}
      />
      
      {/* Main container */}
      <motion.div
        className={cn(
          "relative px-4 py-2 rounded-2xl backdrop-blur-sm",
          "transform-gpu transition-all duration-300",
          variant === 'gradient' ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white shadow-2xl shadow-purple-500/40 border border-white/20" : ""
        )}
      >
        {/* Text content with enhanced animations */}
        <div className="relative z-10">
          <motion.div
            initial={{ 
              opacity: 0, 
              y: 20,
              filter: "blur(8px)",
              scale: 0.9
            }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
              scale: 1
            }}
            viewport={{ once: true }}
            transition={{
              duration: animationDuration / 1000,
              ease: [0.25, 0.25, 0, 1],
            }}
            className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-black tracking-tight",
              "whitespace-nowrap",
              textClassName
            )}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={`${id}-${index}`}
                initial={{
                  opacity: 0,
                  y: 10,
                  filter: "blur(4px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.03,
                  duration: 0.4,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
