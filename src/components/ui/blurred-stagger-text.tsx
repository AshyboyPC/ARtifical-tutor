"use client" 

import * as React from "react"
import { motion } from "framer-motion";
 
export const BlurredStagger = ({
  text = "we love hextaui.com ❤️",
  className = "",
  as: Component = "h2"
}: {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) => {
  const headingText = text;
 
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };
 
  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };
 
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      className={className}
    >
      {React.createElement(
        Component,
        null,
        headingText.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.3 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))
      )}
    </motion.div>
  );
};
