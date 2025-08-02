import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId
} from "react";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
}

const CurvedLoop = ({
  marqueeText = "",
  speed = 2,
  className,
  curveAmount = 400,
  direction = "left",
  interactive = true,
}: CurvedLoopProps) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (
      (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0"
    );
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement>(null);
  const tspansRef = useRef<SVGTSpanElement[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [spacing, setSpacing] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  // Move the curve higher up by adjusting Y values
  const startY = 10; // Start higher up
  const controlY = startY + curveAmount;
  const endY = startY;
  const pathD = `M-100,${startY} Q500,${controlY} 1540,${endY}`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  useEffect(() => {
    if (measureRef.current)
      setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, [curveAmount]);

  useEffect(() => {
    if (!spacing) return;
    let frame = 0;
    let lastTime = 0;
    let offset = 0;
    
    const step = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      if (!dragRef.current) {
        offset += (dirRef.current === "right" ? speed : -speed) * (deltaTime / 16);
        // Keep offset within bounds for seamless looping
        if (Math.abs(offset) >= spacing) {
          offset = offset % spacing;
        }
      }
      
      tspansRef.current.forEach((t, i) => {
        if (!t) return;
        // Position each tspan with an offset for seamless looping
        let x = (i * spacing) - offset;
        // If we've scrolled past one tspan, wrap it to the end
        if (x < -spacing) {
          x += tspansRef.current.length * spacing;
        } else if (x > (tspansRef.current.length - 1) * spacing) {
          x -= tspansRef.current.length * spacing;
        }
        t.setAttribute("x", x.toString());
      });
      
      frame = requestAnimationFrame(step);
    };
    
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed]);

  // Calculate number of repeats needed to fill the viewport with some buffer
  const [repeats, setRepeats] = useState(10); // Start with a safe default
  
  useEffect(() => {
    if (spacing) {
      // Calculate how many times the text needs to repeat to fill the viewport
      const viewportWidth = window.innerWidth;
      const calculatedRepeats = Math.ceil((viewportWidth / spacing) * 1.5) + 2;
      setRepeats(Math.max(10, calculatedRepeats)); // Ensure minimum of 10 repeats
      
      // Handle window resize
      const handleResize = () => {
        const newRepeats = Math.ceil((window.innerWidth / spacing) * 1.5) + 2;
        setRepeats(Math.max(10, newRepeats));
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [spacing]);
  const ready = pathLength > 0 && spacing > 0;

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    tspansRef.current.forEach((t) => {
      if (!t) return;
      let x = parseFloat(t.getAttribute("x") || "0");
      x += dx;
      const maxX = (tspansRef.current.length - 1) * spacing;
      if (x < -spacing) x = maxX;
      if (x > maxX) x = -spacing;
      t.setAttribute("x", x.toString());
    });
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const cursorStyle = interactive
    ? dragRef.current
      ? "grabbing"
      : "grab"
    : "auto";

  return (
    <div
      className="w-full relative bg-transparent"
      style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="select-none w-full overflow-visible block aspect-[100/12] text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest leading-none -mt-8"
        viewBox="0 0 1440 120"
        style={{ 
          fontFamily: 'var(--font-sans), sans-serif',
          marginTop: '-40px' // Pull the SVG up by 40px
        }}
        preserveAspectRatio="none"
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>
        <defs>
          <path
            ref={pathRef}
            id={pathId}
            d={pathD}
            fill="none"
            stroke="transparent"
          />
        </defs>
        {ready && (
          <text
            xmlSpace="preserve"
            className={`fill-white ${className ?? ""}`}
          >
            <textPath 
              href={`#${pathId}`} 
              xmlSpace="preserve"
              startOffset={spacing / 2} 
              textAnchor="middle"
            >
              {Array.from({ length: repeats }).map((_, i) => {
                // Add space after text for all but the last repeat
                const displayText = i < repeats - 1 ? `${text} ` : text;
                return (
                  <tspan
                    key={i}
                    x={i * spacing}
                    ref={(el) => {
                      if (el) tspansRef.current[i] = el;
                    }}
                    className="fill-white/90 hover:fill-white transition-colors duration-300"
                  >
                    {displayText}
                  </tspan>
                );
              })}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
