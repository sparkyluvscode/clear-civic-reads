import { useEffect, useRef, useState } from "react";

interface Droplet {
  id: number;
  x: number;
  y: number;
  size: number;
  velocity: { x: number; y: number };
  wobble: number;
  wobbleSpeed: number;
  merging: boolean;
}

export const RaindropEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const animationFrameRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });

  // Initialize droplets with natural distribution - microscopic dew realism
  useEffect(() => {
    const initialDroplets: Droplet[] = [];
    // Higher density for microscopic appearance: 150-250 total droplets
    const dropletCount = 200;

    for (let i = 0; i < dropletCount; i++) {
      // Create natural clustering along curves (Perlin-like distribution)
      const isInCluster = Math.random() > 0.30;
      let x, y;

      if (isInCluster && initialDroplets.length > 0) {
        const clusterCenter = initialDroplets[Math.floor(Math.random() * initialDroplets.length)];
        // Tighter clustering for condensation patterns
        x = clusterCenter.x + (Math.random() - 0.5) * 80;
        y = clusterCenter.y + (Math.random() - 0.5) * 80;
      } else {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
      }

      // Apple Liquid Glass microscopic size distribution:
      // 70% TINY (2-6px), 20% SMALL (8-15px), 8% MEDIUM (18-30px), 2% LARGE (35-50px)
      let size;
      const sizeRoll = Math.random();
      if (sizeRoll < 0.70) {
        size = 2 + Math.random() * 4; // 2-6px: barely visible micro-beads
      } else if (sizeRoll < 0.90) {
        size = 8 + Math.random() * 7; // 8-15px: noticeable but delicate
      } else if (sizeRoll < 0.98) {
        size = 18 + Math.random() * 12; // 18-30px: occasional accent drops
      } else {
        size = 35 + Math.random() * 15; // 35-50px: rare focal points (MAX 50px)
      }

      initialDroplets.push({
        id: i,
        x: Math.max(0, Math.min(window.innerWidth, x)),
        y: Math.max(0, Math.min(window.innerHeight, y)),
        size: size,
        velocity: { x: 0, y: 0 },
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: size < 6 ? 0.005 + Math.random() * 0.01 : 0.01 + Math.random() * 0.02,
        merging: false,
      });
    }

    setDroplets(initialDroplets);
  }, []);

  // Mouse tracking for interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setDroplets((prevDroplets) => {
        return prevDroplets.map((droplet) => {
          // Realistic microscopic physics based on size
          let newY = droplet.y;
          let newVelX = droplet.velocity.x * 0.95;
          let newVelY = droplet.velocity.y * 0.95;
          
          // Gravity: Only affects larger drops (35-50px slide, smaller stay mostly static)
          if (droplet.size > 30) {
            const gravityFactor = (droplet.size - 30) / 100; // 35-50px range
            newY += gravityFactor * 0.05; // Very slow slide (5-15px/sec)
          } else if (droplet.size > 15) {
            // Medium drops: imperceptible drift
            newY += 0.01;
          }
          // Tiny drops (2-6px) and small drops (8-15px): Static or negligible motion
          
          // Subtle wobble based on size
          const newWobble = droplet.wobble + droplet.wobbleSpeed;
          const wobbleIntensity = droplet.size < 6 ? 0.15 : (droplet.size < 15 ? 0.25 : 0.1);
          const wobbleOffset = Math.sin(newWobble) * wobbleIntensity;

          // Mouse interaction - gentle float/repel (NOT wild bounce)
          const dx = droplet.x - mousePos.current.x;
          const dy = droplet.y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Interaction radius based on drop size
          const interactionRadius = droplet.size < 6 ? 60 : (droplet.size < 15 ? 80 : 120);
          
          if (dist < interactionRadius && dist > 0) {
            const force = Math.pow((interactionRadius - dist) / interactionRadius, 1.8);
            const pushStrength = droplet.size < 6 ? 1.2 : (droplet.size < 15 ? 0.8 : 0.4);
            newVelX += (dx / dist) * force * pushStrength;
            newVelY += (dy / dist) * force * pushStrength;
          }

          let newX = droplet.x + newVelX + wobbleOffset;
          newY += newVelY;

          // Boundary wrapping
          if (newY > canvas.height + droplet.size) {
            newY = -droplet.size;
          }
          if (newX < -droplet.size) newX = canvas.width + droplet.size;
          if (newX > canvas.width + droplet.size) newX = -droplet.size;

          return {
            ...droplet,
            x: newX,
            y: newY,
            velocity: { x: newVelX, y: newVelY },
            wobble: newWobble,
          };
        });
      });

      // Render droplets
      droplets.forEach((droplet) => {
        renderDroplet(ctx, droplet);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [droplets]);

  const renderDroplet = (ctx: CanvasRenderingContext2D, droplet: Droplet) => {
    const { x, y, size } = droplet;

    // Base opacity: 15-30% translucent (barely visible individually)
    const baseOpacity = 0.15 + Math.random() * 0.15;

    // Soft diffused shadow (only for medium+ drops)
    if (size > 15) {
      ctx.save();
      ctx.beginPath();
      const shadowGradient = ctx.createRadialGradient(x, y + size * 0.12, 0, x, y + size * 0.12, size * 0.7);
      shadowGradient.addColorStop(0, `rgba(10, 17, 40, ${baseOpacity * 0.6})`);
      shadowGradient.addColorStop(0.7, `rgba(10, 17, 40, ${baseOpacity * 0.2})`);
      shadowGradient.addColorStop(1, "rgba(10, 17, 40, 0)");
      ctx.fillStyle = shadowGradient;
      ctx.arc(x, y + size * 0.12, size * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Main droplet body - ultra-subtle translucent gradient
    ctx.save();
    ctx.beginPath();
    const bodyGradient = ctx.createRadialGradient(
      x - size * 0.3,
      y - size * 0.3,
      size * 0.05,
      x,
      y,
      size
    );
    // Environmental color pickup - barely visible, natural tones
    bodyGradient.addColorStop(0, `rgba(255, 255, 255, ${baseOpacity * 0.8})`);
    bodyGradient.addColorStop(0.4, `rgba(200, 220, 240, ${baseOpacity * 0.4})`);
    bodyGradient.addColorStop(0.7, `rgba(147, 180, 220, ${baseOpacity * 0.25})`);
    bodyGradient.addColorStop(1, `rgba(100, 150, 200, ${baseOpacity * 0.1})`);
    ctx.fillStyle = bodyGradient;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Sharp specular highlight (1-2px white dot)
    ctx.save();
    ctx.beginPath();
    const highlightSize = size < 6 ? size * 0.25 : (size < 15 ? size * 0.3 : size * 0.35);
    const highlightGradient = ctx.createRadialGradient(
      x - size * 0.35,
      y - size * 0.35,
      0,
      x - size * 0.35,
      y - size * 0.35,
      highlightSize
    );
    highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${Math.min(baseOpacity * 4, 0.9)})`);
    highlightGradient.addColorStop(0.5, `rgba(255, 255, 255, ${baseOpacity * 1.5})`);
    highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = highlightGradient;
    ctx.arc(x - size * 0.35, y - size * 0.35, highlightSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Crisp meniscus edge with subtle rim (only for visible drops >8px)
    if (size > 8) {
      ctx.save();
      ctx.strokeStyle = `rgba(255, 255, 255, ${baseOpacity * 1.2})`;
      ctx.lineWidth = size > 30 ? 0.8 : 0.5;
      ctx.beginPath();
      ctx.arc(x, y, size - 0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Subtle iridescent prismatic fringe (only for larger drops >18px)
    if (size > 18) {
      ctx.save();
      ctx.strokeStyle = `rgba(180, 220, 255, ${baseOpacity * 0.6})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(x, y, size - 0.8, Math.PI * 1.1, Math.PI * 1.35);
      ctx.stroke();
      
      ctx.strokeStyle = `rgba(200, 255, 220, ${baseOpacity * 0.4})`;
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      ctx.arc(x, y, size - 1, Math.PI * 1.45, Math.PI * 1.65);
      ctx.stroke();
      ctx.restore();
    }

    // Caustic light pattern (only for large focal drops >35px)
    if (size > 35) {
      ctx.save();
      ctx.globalAlpha = baseOpacity * 0.5;
      const causticGradient = ctx.createRadialGradient(
        x + size * 0.12,
        y + size * 0.18,
        0,
        x + size * 0.12,
        y + size * 0.18,
        size * 0.5
      );
      causticGradient.addColorStop(0, "rgba(200, 230, 255, 0.25)");
      causticGradient.addColorStop(1, "rgba(200, 230, 255, 0)");
      ctx.fillStyle = causticGradient;
      ctx.beginPath();
      ctx.arc(x + size * 0.12, y + size * 0.18, size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  return (
    <>
      {/* SVG Filters for enhanced realism */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="droplet-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
            <feSpecularLighting
              in="blur"
              surfaceScale="5"
              specularConstant="1.5"
              specularExponent="20"
              lightingColor="#ffffff"
              result="specular"
            >
              <fePointLight x="-50" y="-50" z="200" />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceGraphic" operator="in" result="composite" />
            <feBlend in="SourceGraphic" in2="composite" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Canvas overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ filter: "url(#droplet-filter)" }}
      />
    </>
  );
};
