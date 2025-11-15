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

  // Initialize droplets with natural distribution - varied sizes from tiny mist to large dew
  useEffect(() => {
    const initialDroplets: Droplet[] = [];
    const dropletCount = 45; // Increased for better coverage

    for (let i = 0; i < dropletCount; i++) {
      // Create natural clustering along curves
      const isInCluster = Math.random() > 0.35;
      let x, y;

      if (isInCluster && initialDroplets.length > 0) {
        const clusterCenter = initialDroplets[Math.floor(Math.random() * initialDroplets.length)];
        // Tighter clustering for realism
        x = clusterCenter.x + (Math.random() - 0.5) * 120;
        y = clusterCenter.y + (Math.random() - 0.5) * 120;
      } else {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
      }

      // Size distribution: 70% tiny (8-20px), 20% medium (20-50px), 10% large (50-100px)
      let size;
      const sizeRoll = Math.random();
      if (sizeRoll < 0.7) {
        size = 8 + Math.random() * 12; // Tiny mist-like
      } else if (sizeRoll < 0.9) {
        size = 20 + Math.random() * 30; // Medium
      } else {
        size = 50 + Math.random() * 50; // Large dewdrops
      }

      initialDroplets.push({
        id: i,
        x: Math.max(0, Math.min(window.innerWidth, x)),
        y: Math.max(0, Math.min(window.innerHeight, y)),
        size: size,
        velocity: { x: 0, y: 0 },
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.025,
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
          // Gravity effect - larger drops slide slower, tiny drops stay mostly still
          const gravityFactor = Math.min(droplet.size / 100, 0.15);
          let newY = droplet.y + gravityFactor * 0.08;
          
          // Enhanced wobble animation with size-based variation
          const newWobble = droplet.wobble + droplet.wobbleSpeed;
          const wobbleIntensity = droplet.size < 20 ? 0.5 : 0.2; // Tiny drops wobble more
          const wobbleOffset = Math.sin(newWobble) * wobbleIntensity;

          // Mouse interaction - gentle repel with spring-like physics
          const dx = droplet.x - mousePos.current.x;
          const dy = droplet.y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let newVelX = droplet.velocity.x * 0.92;
          let newVelY = droplet.velocity.y * 0.92;

          // Interaction radius increases with droplet size
          const interactionRadius = 100 + droplet.size * 0.5;
          
          if (dist < interactionRadius && dist > 0) {
            const force = Math.pow((interactionRadius - dist) / interactionRadius, 2);
            const pushStrength = droplet.size < 20 ? 3 : 1.5; // Tiny drops more reactive
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

    // Soft diffused shadow beneath droplet
    ctx.save();
    ctx.beginPath();
    const shadowGradient = ctx.createRadialGradient(x, y + size * 0.15, 0, x, y + size * 0.15, size * 0.9);
    shadowGradient.addColorStop(0, "rgba(10, 17, 40, 0.2)");
    shadowGradient.addColorStop(0.6, "rgba(10, 17, 40, 0.08)");
    shadowGradient.addColorStop(1, "rgba(10, 17, 40, 0)");
    ctx.fillStyle = shadowGradient;
    ctx.arc(x, y + size * 0.15, size * 0.9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Main droplet body - ultra-realistic translucent gradient
    ctx.save();
    ctx.beginPath();
    const bodyGradient = ctx.createRadialGradient(
      x - size * 0.25,
      y - size * 0.25,
      size * 0.05,
      x,
      y,
      size
    );
    // Environmental color pickup - pale blue/silver tones
    bodyGradient.addColorStop(0, "rgba(255, 255, 255, 0.18)");
    bodyGradient.addColorStop(0.3, "rgba(200, 220, 240, 0.06)");
    bodyGradient.addColorStop(0.6, "rgba(147, 180, 220, 0.04)");
    bodyGradient.addColorStop(1, "rgba(100, 150, 200, 0.02)");
    ctx.fillStyle = bodyGradient;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Sharp specular highlight (top-left)
    ctx.save();
    ctx.beginPath();
    const highlightGradient = ctx.createRadialGradient(
      x - size * 0.35,
      y - size * 0.35,
      0,
      x - size * 0.35,
      y - size * 0.35,
      size * 0.35
    );
    highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
    highlightGradient.addColorStop(0.4, "rgba(255, 255, 255, 0.4)");
    highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = highlightGradient;
    ctx.arc(x - size * 0.35, y - size * 0.35, size * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Crisp meniscus edge
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = size > 30 ? 1.5 : 1;
    ctx.beginPath();
    ctx.arc(x, y, size - 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Subtle iridescent prismatic fringe (rainbow specular glint)
    if (size > 15) {
      ctx.save();
      // Pale blue iridescence
      ctx.strokeStyle = "rgba(180, 220, 255, 0.15)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(x, y, size - 1, Math.PI * 1.1, Math.PI * 1.4);
      ctx.stroke();
      
      // Pale green iridescence
      ctx.strokeStyle = "rgba(200, 255, 220, 0.1)";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.arc(x, y, size - 1.5, Math.PI * 1.5, Math.PI * 1.7);
      ctx.stroke();
      ctx.restore();
    }

    // Caustic light pattern inside larger drops
    if (size > 40) {
      ctx.save();
      ctx.globalAlpha = 0.08;
      const causticGradient = ctx.createRadialGradient(
        x + size * 0.1,
        y + size * 0.15,
        0,
        x + size * 0.1,
        y + size * 0.15,
        size * 0.6
      );
      causticGradient.addColorStop(0, "rgba(200, 230, 255, 0.3)");
      causticGradient.addColorStop(1, "rgba(200, 230, 255, 0)");
      ctx.fillStyle = causticGradient;
      ctx.beginPath();
      ctx.arc(x + size * 0.1, y + size * 0.15, size * 0.6, 0, Math.PI * 2);
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
