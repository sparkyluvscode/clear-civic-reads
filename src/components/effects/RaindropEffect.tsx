import { useEffect, useRef, useState } from "react";

interface Droplet {
  x: number;
  y: number;
  radius: number;
  velocityY: number;
  wobble: number;
  wobbleSpeed: number;
  merging: boolean;
}

export const RaindropEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const animationRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });

  // Initialize droplets with natural distribution
  useEffect(() => {
    const initialDroplets: Droplet[] = [];
    const count = 25; // Reduced for clearer, more visible drops
    
    for (let i = 0; i < count; i++) {
      initialDroplets.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 8 + Math.random() * 25, // Larger drops for better visibility
        velocityY: 0.1 + Math.random() * 0.3,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        merging: false
      });
    }
    
    setDroplets(initialDroplets);
  }, []);

  // Track mouse position for interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setDroplets(prevDroplets => {
        return prevDroplets.map(drop => {
          // Update position with gravity and wobble
          let newY = drop.y + drop.velocityY;
          let newX = drop.x + Math.sin(drop.wobble) * 0.5;
          let newWobble = drop.wobble + drop.wobbleSpeed;

          // Mouse interaction - droplets move away from cursor
          const dx = newX - mousePos.current.x;
          const dy = newY - mousePos.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 150;
          
          if (distance < influenceRadius) {
            const force = (influenceRadius - distance) / influenceRadius;
            newX += (dx / distance) * force * 2;
            newY += (dy / distance) * force * 2;
          }

          // Wrap around screen
          if (newY > canvas.height + drop.radius) {
            newY = -drop.radius;
            newX = Math.random() * canvas.width;
          }
          if (newX < -drop.radius) newX = canvas.width + drop.radius;
          if (newX > canvas.width + drop.radius) newX = -drop.radius;

          return {
            ...drop,
            x: newX,
            y: newY,
            wobble: newWobble
          };
        });
      });

      // Render droplets
      droplets.forEach(drop => {
        renderDroplet(ctx, drop);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [droplets]);

  // Render individual droplet with realistic refraction
  const renderDroplet = (ctx: CanvasRenderingContext2D, drop: Droplet) => {
    const { x, y, radius } = drop;

    ctx.save();

    // Main droplet body - crystal clear glass effect
    const gradient = ctx.createRadialGradient(
      x - radius * 0.3,
      y - radius * 0.3,
      radius * 0.1,
      x,
      y,
      radius
    );
    
    // Very subtle translucent white with blue tint for ice/water effect
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.4, 'rgba(240, 249, 255, 0.25)');
    gradient.addColorStop(0.7, 'rgba(191, 219, 254, 0.15)');
    gradient.addColorStop(1, 'rgba(147, 197, 253, 0.08)');

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Outer rim for definition
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Inner highlight - bright spot for glass reflection
    const highlight = ctx.createRadialGradient(
      x - radius * 0.35,
      y - radius * 0.35,
      0,
      x - radius * 0.35,
      y - radius * 0.35,
      radius * 0.5
    );
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    highlight.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    ctx.arc(x - radius * 0.35, y - radius * 0.35, radius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = highlight;
    ctx.fill();

    // Bottom shadow for depth
    const shadow = ctx.createRadialGradient(
      x + radius * 0.2,
      y + radius * 0.3,
      0,
      x + radius * 0.2,
      y + radius * 0.3,
      radius * 0.7
    );
    shadow.addColorStop(0, 'rgba(100, 116, 139, 0.25)');
    shadow.addColorStop(1, 'rgba(100, 116, 139, 0)');

    ctx.beginPath();
    ctx.arc(x + radius * 0.2, y + radius * 0.3, radius * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = shadow;
    ctx.fill();

    // Caustic effect - light refraction pattern inside droplet
    ctx.globalCompositeOperation = 'lighter';
    const caustic = ctx.createRadialGradient(
      x + radius * 0.15,
      y + radius * 0.15,
      radius * 0.2,
      x,
      y,
      radius * 0.8
    );
    caustic.addColorStop(0, 'rgba(147, 197, 253, 0.3)');
    caustic.addColorStop(0.6, 'rgba(191, 219, 254, 0.15)');
    caustic.addColorStop(1, 'rgba(191, 219, 254, 0)');

    ctx.beginPath();
    ctx.arc(x, y, radius * 0.75, 0, Math.PI * 2);
    ctx.fillStyle = caustic;
    ctx.fill();

    // Secondary highlight for extra dimension
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.arc(x - radius * 0.45, y - radius * 0.45, radius * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();

    ctx.restore();
  };

  return (
    <>
      {/* SVG filters for glass effects */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="droplet-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            <feSpecularLighting result="specOut" specularExponent="20" lightingColor="#fff">
              <fePointLight x="100" y="100" z="200" />
            </feSpecularLighting>
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>
      </svg>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: 'url(#droplet-blur) brightness(1.1)',
          mixBlendMode: 'screen'
        }}
      />
    </>
  );
};
