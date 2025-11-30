import { useEffect, useRef } from "react";

interface Drop {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
}

export default function DewDrops() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize drops
    const dropCount = Math.floor((window.innerWidth * window.innerHeight) / 25000);
    dropsRef.current = Array.from({ length: dropCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.3 + 0.1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    }));

    const drawDrop = (drop: Drop) => {
      if (!ctx) return;
      
      const gradient = ctx.createRadialGradient(
        drop.x - drop.size * 0.3,
        drop.y - drop.size * 0.3,
        0,
        drop.x,
        drop.y,
        drop.size
      );
      
      // Subtle blue-white gradient for dew effect
      gradient.addColorStop(0, `rgba(255, 255, 255, ${drop.opacity * 0.8})`);
      gradient.addColorStop(0.3, `rgba(200, 220, 255, ${drop.opacity * 0.5})`);
      gradient.addColorStop(0.7, `rgba(150, 180, 220, ${drop.opacity * 0.3})`);
      gradient.addColorStop(1, `rgba(100, 150, 200, 0)`);

      ctx.beginPath();
      ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add subtle highlight
      ctx.beginPath();
      ctx.arc(
        drop.x - drop.size * 0.25,
        drop.y - drop.size * 0.25,
        drop.size * 0.3,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity * 0.6})`;
      ctx.fill();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dropsRef.current.forEach((drop) => {
        // Gentle floating motion
        drop.wobble += drop.wobbleSpeed;
        drop.y -= drop.speed;
        drop.x += Math.sin(drop.wobble) * 0.3;

        // Reset when off screen
        if (drop.y < -drop.size * 2) {
          drop.y = canvas.height + drop.size * 2;
          drop.x = Math.random() * canvas.width;
        }
        if (drop.x < -drop.size * 2) drop.x = canvas.width + drop.size;
        if (drop.x > canvas.width + drop.size * 2) drop.x = -drop.size;

        drawDrop(drop);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

