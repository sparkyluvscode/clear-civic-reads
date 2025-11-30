import { useEffect, useRef, useState } from "react";

export default function LiquidTransition() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the transition zone we are
      // Starts when element enters viewport, ends when it leaves top
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Trigger zone: from when element is 80% down the viewport to when it's 20% up
      const triggerStart = windowHeight * 0.8;
      const triggerEnd = -elementHeight * 0.5;
      
      if (elementTop < triggerStart && elementTop > triggerEnd) {
        setIsVisible(true);
        const progress = 1 - (elementTop - triggerEnd) / (triggerStart - triggerEnd);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      } else if (elementTop >= triggerStart) {
        setIsVisible(false);
        setScrollProgress(0);
      } else {
        setIsVisible(false);
        setScrollProgress(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-32 md:h-48 overflow-hidden pointer-events-none"
    >
      {/* Liquid glass wave effect */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {/* Primary wave - rolls down */}
        <div 
          className="absolute left-0 right-0 h-24 md:h-32"
          style={{
            top: `${scrollProgress * 100}%`,
            transform: `translateY(-50%)`,
          }}
        >
          {/* Glass blur layer */}
          <div 
            className="absolute inset-0 backdrop-blur-md bg-gradient-to-b from-transparent via-primary/10 to-transparent"
            style={{
              opacity: 0.8 - scrollProgress * 0.3,
            }}
          />
          
          {/* Wave shape using SVG */}
          <svg 
            className="absolute w-full h-full"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`M0,50 
                  Q${150 + scrollProgress * 50},${20 + Math.sin(scrollProgress * Math.PI) * 30} 
                  ${300},50 
                  T${600},50 
                  T${900},50 
                  T${1200},50 
                  L1200,100 L0,100 Z`}
              fill="url(#waveGradient)"
              className="transition-all duration-100"
            />
          </svg>

          {/* Shimmer highlight */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              transform: `translateX(${(scrollProgress - 0.5) * 200}%)`,
              opacity: 0.6,
            }}
          />
        </div>

        {/* Secondary ripple effect */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-primary/5"
          style={{
            width: `${scrollProgress * 300}%`,
            height: `${scrollProgress * 300}%`,
            top: '50%',
            transform: `translate(-50%, -50%) scale(${scrollProgress})`,
            opacity: (1 - scrollProgress) * 0.5,
          }}
        />

        {/* Floating droplets */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin((scrollProgress + i * 0.2) * Math.PI * 2) * 20}%`,
              opacity: isVisible ? 0.6 : 0,
              transform: `scale(${0.5 + scrollProgress * 0.5})`,
              transition: 'opacity 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Static subtle divider for when not animating */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: isVisible ? 0 : 0.5 }}
      >
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </div>
  );
}

