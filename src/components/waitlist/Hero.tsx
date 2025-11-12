import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Search } from "lucide-react";

interface HeroProps {
  onJoinClick: () => void;
}

const benefits = [
  "Plain-English explanations at any reading level",
  "Every claim backed by verifiable citations",
  "Local ballot measures for your ZIP code",
];

export default function Hero({ onJoinClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-32 min-h-[90vh] flex items-center">
      {/* Liquid Glass Droplet Background */}
      <div className="absolute inset-0">
        {/* Large floating silver/ice translucent orbs */}
        <div className="absolute top-[15%] left-[8%] w-[450px] h-[450px] opacity-50" style={{ background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4), rgba(203, 213, 225, 0.25), transparent)', filter: 'blur(110px)', animation: 'orb-float 10s ease-in-out infinite' }} />
        <div className="absolute bottom-[20%] right-[12%] w-[550px] h-[550px] opacity-45" style={{ background: 'radial-gradient(circle, rgba(203, 213, 225, 0.35), rgba(148, 163, 184, 0.2), transparent)', filter: 'blur(120px)', animation: 'orb-float 12s ease-in-out infinite', animationDelay: '3s' }} />
        <div className="absolute top-[45%] left-[45%] w-[600px] h-[600px] opacity-40" style={{ background: 'radial-gradient(circle, rgba(241, 245, 249, 0.3), rgba(147, 197, 253, 0.18), transparent)', filter: 'blur(130px)', animation: 'orb-float 14s ease-in-out infinite', animationDelay: '6s' }} />
        
        {/* Premium translucent silver glass bubbles */}
        <div className="glass-raindrop droplet-float-slow" style={{ width: '140px', height: '140px', top: '12%', left: '10%', animationDelay: '0s', opacity: 0.65 }} />
        <div className="glass-raindrop droplet-float-medium" style={{ width: '95px', height: '95px', top: '22%', right: '15%', animationDelay: '2s', opacity: 0.6 }} />
        <div className="glass-raindrop droplet-float" style={{ width: '115px', height: '115px', top: '42%', left: '6%', animationDelay: '4s', opacity: 0.55 }} />
        <div className="glass-raindrop droplet-float-slow" style={{ width: '105px', height: '105px', top: '58%', right: '10%', animationDelay: '1s', opacity: 0.62 }} />
        <div className="glass-raindrop droplet-float-medium" style={{ width: '80px', height: '80px', top: '32%', right: '8%', animationDelay: '3s', opacity: 0.58 }} />
        <div className="glass-raindrop droplet-float" style={{ width: '125px', height: '125px', top: '68%', left: '72%', animationDelay: '5s', opacity: 0.6 }} />
        <div className="glass-raindrop droplet-float-slow" style={{ width: '70px', height: '70px', top: '48%', right: '22%', animationDelay: '2.5s', opacity: 0.56 }} />
        <div className="glass-raindrop droplet-float-medium" style={{ width: '100px', height: '100px', top: '78%', left: '18%', animationDelay: '4.5s', opacity: 0.59 }} />
      </div>
      
      <div className="relative max-w-5xl mx-auto text-center animate-fade-in">
        <div className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full liquid-glass-strong text-white text-sm font-semibold mb-10 shimmer shadow-glass-strong hover-lift">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-glow-ice"></span>
          </span>
          Now accepting early access signups
        </div>

        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-7 leading-[1.08] tracking-tight relative z-20"
          style={{ 
            textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(147, 197, 253, 0.4)'
          }}
        >
          Policy clarity, with sources you can check
        </h1>
        
        <p className="text-xl text-white mb-11 max-w-3xl mx-auto leading-relaxed font-medium relative z-20" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.3)' }}>
          Plain-English explanations of bills and ballot measures—backed by <span className="font-bold">citations</span>. 
          Join the waitlist to get early access in your area.
        </p>

        {/* Search box teaser with liquid glass */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div 
            className="liquid-glass-strong rounded-2xl p-2 shadow-glass-hover relative overflow-hidden group"
            style={{ 
              filter: 'url(#liquid-glass-distortion) brightness(1.1)',
            }}
          >
            <div className="flex items-center gap-3 px-4">
              <Search className="h-6 w-6 text-white opacity-70" />
              <span className="flex-1 py-4 text-gray-400 text-lg">
                Search for a ballot measure or policy...
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-14">
          <Button
            onClick={onJoinClick}
            size="lg"
            variant="premium"
            className="text-lg px-14 py-8 h-auto font-bold shadow-2xl shimmer-fast"
            aria-label="Join the waitlist for early access"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              Get Early Access — Launching Soon
              <ArrowRight className="h-6 w-6" />
            </span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-white mb-7">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 liquid-glass-strong rounded-full px-7 py-4 hover-lift shadow-glass-strong shimmer-hover relative overflow-hidden group"
            >
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-ice-blue drop-shadow-lg relative z-10" />
              <span className="text-sm font-black text-white relative z-10" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>{benefit}</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 20px rgba(147, 197, 253, 0.3) inset' }} />
            </div>
          ))}
        </div>

        <p className="text-sm text-white/90 mt-5 font-medium relative z-20" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
