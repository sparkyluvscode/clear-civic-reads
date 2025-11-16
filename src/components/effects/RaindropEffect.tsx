import { useEffect, useRef, useState } from "react";

interface Droplet {
  x: number;
  y: number;
  radius: number;
  velocityX: number;
  velocityY: number;
  mass: number;
  wobble: number;
  wobbleSpeed: number;
  trail: { x: number; y: number; alpha: number }[];
}

export const RaindropEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const animationRef = useRef<number>();
  const mousePos = useRef({ x: -1000, y: -1000 });
  const isMobile = useRef(window.innerWidth < 768);

  // Initialize droplets with physics
  useEffect(() => {
    const initialDroplets: Droplet[] = [];
    const count = isMobile.current ? 35 : 80;
    
    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 20;
      initialDroplets.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius,
        velocityX: (Math.random() - 0.5) * 0.3,
        velocityY: 0.05 + Math.random() * 0.25,
        mass: radius * radius,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.025,
        trail: []
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

  // Animation loop with physics
  useEffect(() => {
    const canvas = canvasRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!canvas || !bgCanvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const bgCtx = bgCanvas.getContext('2d', { alpha: false });
    if (!ctx || !bgCtx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
      
      // Draw background gradient once
      const gradient = bgCtx.createRadialGradient(
        bgCanvas.width / 2, bgCanvas.height / 2, 0,
        bgCanvas.width / 2, bgCanvas.height / 2, bgCanvas.width * 0.7
      );
      gradient.addColorStop(0, 'hsl(222, 47%, 11%)');
      gradient.addColorStop(0.5, 'hsl(217, 33%, 17%)');
      gradient.addColorStop(1, 'hsl(222, 47%, 11%)');
      bgCtx.fillStyle = gradient;
      bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const GRAVITY = 0.08;
    const FRICTION = 0.985;
    const MERGE_THRESHOLD = 1.5;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setDroplets(prevDroplets => {
        let newDroplets = [...prevDroplets];

        // Physics update
        newDroplets = newDroplets.map(drop => {
          let { x, y, velocityX, velocityY, wobble, trail } = drop;

          // Apply gravity and friction
          velocityY += GRAVITY * (drop.mass / 400);
          velocityX *= FRICTION;
          velocityY *= FRICTION;

          // Wobble motion
          velocityX += Math.sin(wobble) * 0.08;
          wobble += drop.wobbleSpeed;

          // Mouse repulsion with smooth falloff
          const dx = x - mousePos.current.x;
          const dy = y - mousePos.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 180;
          
          if (distance < influenceRadius && distance > 0) {
            const force = Math.pow((influenceRadius - distance) / influenceRadius, 2) * 3;
            velocityX += (dx / distance) * force;
            velocityY += (dy / distance) * force;
          }

          // Update position
          x += velocityX;
          y += velocityY;

          // Screen wrapping with natural repositioning
          if (y > canvas.height + drop.radius * 2) {
            y = -drop.radius;
            x = Math.random() * canvas.width;
            velocityY = 0.1 + Math.random() * 0.2;
          }
          if (x < -drop.radius) x = canvas.width + drop.radius;
          if (x > canvas.width + drop.radius) x = -drop.radius;

          // Trail effect
          trail.push({ x, y, alpha: 0.6 });
          if (trail.length > 3) trail.shift();
          trail = trail.map(t => ({ ...t, alpha: t.alpha * 0.85 }));

          return { ...drop, x, y, velocityX, velocityY, wobble, trail };
        });

        // Collision and merging
        for (let i = 0; i < newDroplets.length; i++) {
          for (let j = i + 1; j < newDroplets.length; j++) {
            const d1 = newDroplets[i];
            const d2 = newDroplets[j];
            const dx = d2.x - d1.x;
            const dy = d2.y - d1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = (d1.radius + d2.radius) * MERGE_THRESHOLD;

            if (dist < minDist) {
              // Merge smaller into larger
              if (d1.radius > d2.radius) {
                newDroplets[i].radius = Math.sqrt(d1.radius * d1.radius + d2.radius * d2.radius * 0.7);
                newDroplets[i].mass = newDroplets[i].radius * newDroplets[i].radius;
                newDroplets.splice(j, 1);
                j--;
              } else {
                newDroplets[j].radius = Math.sqrt(d2.radius * d2.radius + d1.radius * d1.radius * 0.7);
                newDroplets[j].mass = newDroplets[j].radius * newDroplets[j].radius;
                newDroplets.splice(i, 1);
                i--;
                break;
              }
            }
          }
        }

        // Maintain droplet count
        const targetCount = isMobile.current ? 35 : 80;
        while (newDroplets.length < targetCount) {
          const radius = 6 + Math.random() * 18;
          newDroplets.push({
            x: Math.random() * canvas.width,
            y: -radius,
            radius,
            velocityX: (Math.random() - 0.5) * 0.2,
            velocityY: 0.1 + Math.random() * 0.2,
            mass: radius * radius,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.015 + Math.random() * 0.025,
            trail: []
          });
        }

        return newDroplets;
      });

      // Render droplets with lensing
      droplets.forEach(drop => {
        renderDropletWithLensing(ctx, bgCtx, drop);
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

  // Render droplet with true lensing and caustics
  const renderDropletWithLensing = (
    ctx: CanvasRenderingContext2D, 
    bgCtx: CanvasRenderingContext2D | null, 
    drop: Droplet
  ) => {
    const { x, y, radius, trail } = drop;

    ctx.save();

    // Draw trail
    trail.forEach((t, i) => {
      if (t.alpha > 0.05) {
        const trailGrad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, radius * 0.3);
        trailGrad.addColorStop(0, `rgba(147, 197, 253, ${t.alpha * 0.15})`);
        trailGrad.addColorStop(1, 'rgba(147, 197, 253, 0)');
        ctx.fillStyle = trailGrad;
        ctx.beginPath();
        ctx.arc(t.x, t.y, radius * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Lensing effect - sample background and distort
    if (bgCtx) {
      const lensRadius = radius * 0.85;
      try {
        const sourceX = Math.max(0, Math.min(x - lensRadius, bgCtx.canvas.width - lensRadius * 2));
        const sourceY = Math.max(0, Math.min(y - lensRadius, bgCtx.canvas.height - lensRadius * 2));
        const imgData = bgCtx.getImageData(sourceX, sourceY, lensRadius * 2, lensRadius * 2);
        
        // Apply lens distortion
        const distorted = ctx.createImageData(imgData);
        for (let py = 0; py < lensRadius * 2; py++) {
          for (let px = 0; px < lensRadius * 2; px++) {
            const dx = px - lensRadius;
            const dy = py - lensRadius;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < lensRadius) {
              const refraction = 1.33; // Water refractive index
              const angle = Math.atan2(dy, dx);
              const magnitude = dist / lensRadius;
              const newDist = dist * (1 - magnitude * 0.4) * refraction;
              
              const newX = Math.floor(lensRadius + Math.cos(angle) * newDist);
              const newY = Math.floor(lensRadius + Math.sin(angle) * newDist);
              
              if (newX >= 0 && newX < lensRadius * 2 && newY >= 0 && newY < lensRadius * 2) {
                const srcIdx = (newY * lensRadius * 2 + newX) * 4;
                const destIdx = (py * lensRadius * 2 + px) * 4;
                distorted.data[destIdx] = imgData.data[srcIdx];
                distorted.data[destIdx + 1] = imgData.data[srcIdx + 1];
                distorted.data[destIdx + 2] = imgData.data[srcIdx + 2];
                distorted.data[destIdx + 3] = 255;
              }
            }
          }
        }
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.putImageData(distorted, x - lensRadius, y - lensRadius);
        ctx.restore();
      } catch (e) {
        // Fallback if lensing fails
      }
    }

    // Droplet body overlay - crystal clear glass
    const gradient = ctx.createRadialGradient(
      x - radius * 0.35,
      y - radius * 0.35,
      radius * 0.1,
      x,
      y,
      radius
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    gradient.addColorStop(0.3, 'rgba(240, 249, 255, 0.22)');
    gradient.addColorStop(0.65, 'rgba(191, 219, 254, 0.12)');
    gradient.addColorStop(1, 'rgba(147, 197, 253, 0.06)');

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Sharp edge definition
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Primary specular highlight
    const highlight = ctx.createRadialGradient(
      x - radius * 0.4,
      y - radius * 0.4,
      0,
      x - radius * 0.4,
      y - radius * 0.4,
      radius * 0.55
    );
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    highlight.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
    highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    ctx.arc(x - radius * 0.4, y - radius * 0.4, radius * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = highlight;
    ctx.fill();

    // Caustic light beneath droplet
    ctx.globalCompositeOperation = 'screen';
    const causticY = y + radius * 1.2;
    const caustic = ctx.createRadialGradient(
      x, causticY, 0,
      x, causticY, radius * 1.3
    );
    caustic.addColorStop(0, 'rgba(147, 197, 253, 0.4)');
    caustic.addColorStop(0.3, 'rgba(191, 219, 254, 0.25)');
    caustic.addColorStop(0.6, 'rgba(224, 242, 254, 0.1)');
    caustic.addColorStop(1, 'rgba(224, 242, 254, 0)');

    ctx.beginPath();
    ctx.ellipse(x, causticY, radius * 1.1, radius * 0.4, 0, 0, Math.PI * 2);
    ctx.fillStyle = caustic;
    ctx.fill();

    // Internal caustic refraction
    ctx.globalCompositeOperation = 'lighter';
    const internalCaustic = ctx.createRadialGradient(
      x + radius * 0.2,
      y + radius * 0.2,
      radius * 0.15,
      x,
      y,
      radius * 0.75
    );
    internalCaustic.addColorStop(0, 'rgba(147, 197, 253, 0.35)');
    internalCaustic.addColorStop(0.5, 'rgba(191, 219, 254, 0.18)');
    internalCaustic.addColorStop(1, 'rgba(191, 219, 254, 0)');

    ctx.beginPath();
    ctx.arc(x, y, radius * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = internalCaustic;
    ctx.fill();

    // Secondary smaller highlight
    ctx.globalCompositeOperation = 'screen';
    ctx.beginPath();
    ctx.arc(x - radius * 0.5, y - radius * 0.5, radius * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();

    // Subtle bottom shadow
    ctx.globalCompositeOperation = 'multiply';
    const shadow = ctx.createRadialGradient(
      x + radius * 0.15,
      y + radius * 0.25,
      0,
      x + radius * 0.15,
      y + radius * 0.25,
      radius * 0.6
    );
    shadow.addColorStop(0, 'rgba(71, 85, 105, 0.3)');
    shadow.addColorStop(1, 'rgba(71, 85, 105, 0)');

    ctx.beginPath();
    ctx.arc(x + radius * 0.15, y + radius * 0.25, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = shadow;
    ctx.fill();

    ctx.restore();
  };

  return (
    <>
      {/* SVG filters for liquid glass effects */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="liquid-glass-filter" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feSpecularLighting in="blur" surfaceScale="4" specularConstant="1.2" 
                                specularExponent="20" lightingColor="hsl(200, 100%, 95%)" result="spec">
              <fePointLight x="-200" y="-200" z="300" />
            </feSpecularLighting>
            <feComposite in="SourceGraphic" in2="spec" operator="arithmetic" 
                         k1="0" k2="1" k3="0.8" k4="0" result="composite" />
            <feBlend in="composite" in2="SourceGraphic" mode="screen" />
          </filter>
        </defs>
      </svg>
      
      {/* Background canvas for lensing source */}
      <canvas
        ref={bgCanvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0, zIndex: -1 }}
      />
      
      {/* Main droplet canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: 'url(#liquid-glass-filter)',
          mixBlendMode: 'screen',
          willChange: 'transform'
        }}
      />
    </>
  );
};
