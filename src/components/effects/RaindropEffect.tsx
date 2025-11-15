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

  // Initialize droplets with natural distribution
  useEffect(() => {
    const initialDroplets: Droplet[] = [];
    const dropletCount = 40;

    for (let i = 0; i < dropletCount; i++) {
      // Create clusters by grouping some droplets
      const isInCluster = Math.random() > 0.4;
      let x, y;

      if (isInCluster && initialDroplets.length > 0) {
        const clusterCenter = initialDroplets[Math.floor(Math.random() * initialDroplets.length)];
        x = clusterCenter.x + (Math.random() - 0.5) * 150;
        y = clusterCenter.y + (Math.random() - 0.5) * 150;
      } else {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
      }

      initialDroplets.push({
        id: i,
        x: Math.max(0, Math.min(window.innerWidth, x)),
        y: Math.max(0, Math.min(window.innerHeight, y)),
        size: 15 + Math.random() * 35, // Varied sizes
        velocity: { x: 0, y: 0 },
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
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
          // Gravity effect - slow downward drift
          let newY = droplet.y + 0.05;
          
          // Wobble animation
          const newWobble = droplet.wobble + droplet.wobbleSpeed;
          const wobbleOffset = Math.sin(newWobble) * 0.3;

          // Mouse interaction - repel droplets near cursor
          const dx = droplet.x - mousePos.current.x;
          const dy = droplet.y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let newVelX = droplet.velocity.x * 0.95;
          let newVelY = droplet.velocity.y * 0.95;

          if (dist < 80) {
            const force = (80 - dist) / 80;
            newVelX += (dx / dist) * force * 2;
            newVelY += (dy / dist) * force * 2;
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

    // Shadow beneath droplet
    ctx.save();
    ctx.beginPath();
    const shadowGradient = ctx.createRadialGradient(x, y + size * 0.1, 0, x, y + size * 0.1, size * 0.8);
    shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0.15)");
    shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = shadowGradient;
    ctx.arc(x, y + size * 0.1, size * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Main droplet body with gradient
    ctx.save();
    ctx.beginPath();
    const bodyGradient = ctx.createRadialGradient(
      x - size * 0.2,
      y - size * 0.2,
      size * 0.1,
      x,
      y,
      size
    );
    bodyGradient.addColorStop(0, "rgba(255, 255, 255, 0.25)");
    bodyGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.08)");
    bodyGradient.addColorStop(1, "rgba(147, 197, 253, 0.12)");
    ctx.fillStyle = bodyGradient;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Highlight (specular)
    ctx.save();
    ctx.beginPath();
    const highlightGradient = ctx.createRadialGradient(
      x - size * 0.3,
      y - size * 0.3,
      0,
      x - size * 0.3,
      y - size * 0.3,
      size * 0.4
    );
    highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    highlightGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
    highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = highlightGradient;
    ctx.arc(x - size * 0.3, y - size * 0.3, size * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Edge highlight (meniscus)
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, size - 1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Subtle prismatic edge (iridescence)
    ctx.save();
    ctx.strokeStyle = "rgba(147, 197, 253, 0.4)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(x, y, size - 0.5, Math.PI * 1.2, Math.PI * 1.8);
    ctx.stroke();
    ctx.restore();
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
