import { useCallback, useState } from "react";
import { useSpring } from "framer-motion";

export function useExpandable(initialState = false) {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const animatedHeight = useSpring(0, { 
    stiffness: 300, 
    damping: 30 
  });

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return { isExpanded, toggleExpand, animatedHeight };
}
