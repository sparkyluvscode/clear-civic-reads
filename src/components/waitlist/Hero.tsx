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
    <section className="relative overflow-hidden px-4 py-24 md:py-40 min-h-[90vh] flex items-center">
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
      
      <div className="relative max-w-5xl mx-auto text-center">
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight relative z-20 opacity-0"
          style={{ 
            textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(147, 197, 253, 0.4)',
            animation: 'typing 2s steps(50) forwards',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderRight: '3px solid rgba(255,255,255,0.8)',
            animationDelay: '0.5s'
          }}
        >
          Policy clarity, with sources you can check
        </h1>
        
        <p 
          className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-[1.6] font-normal relative z-20 opacity-0 animate-fade-in" 
          style={{ 
            textShadow: '0 3px 12px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.3)',
            animationDelay: '2.5s',
            animationFillMode: 'forwards'
          }}
        >
          Plain-English explanations of bills and ballot measures—backed by <span className="font-semibold text-white">citations</span>. 
          Join the waitlist to get early access in your area.
        </p>

        {/* Search box teaser with liquid glass */}
        <div 
          className="mb-12 max-w-2xl mx-auto opacity-0 animate-fade-in"
          style={{ 
            animationDelay: '3.2s',
            animationFillMode: 'forwards'
          }}
        >
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

        <div 
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16 opacity-0 animate-fade-in"
          style={{ 
            animationDelay: '3.9s',
            animationFillMode: 'forwards'
          }}
        >
          <button
            onClick={onJoinClick}
            className="liquid-glass-strong text-lg px-14 py-8 rounded-2xl text-white font-bold shadow-2xl shimmer-fast hover:scale-105 transition-transform"
            aria-label="Join the waitlist for early access"
          >
            <span className="relative z-10 flex items-center gap-2.5 justify-center">
              Get Early Access — Launching Soon
              <ArrowRight className="h-6 w-6" />
            </span>
          </button>
        </div>

        <div 
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full liquid-glass-strong text-white text-sm font-semibold mb-8 shimmer shadow-glass-strong hover-lift opacity-0 animate-fade-in"
          style={{ 
            animationDelay: '4.6s',
            animationFillMode: 'forwards'
          }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" style={{ boxShadow: '0 0 20px rgba(74, 222, 128, 0.8)' }}></span>
          </span>
          Now accepting early access signups
        </div>

        <ul 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-x-12 gap-y-5 text-white/85 relative z-20 mb-8 opacity-0 animate-fade-in"
          style={{ 
            animationDelay: '4.6s',
            animationFillMode: 'forwards'
          }}
        >
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3 text-base font-normal">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-ice-blue drop-shadow-lg" />
              <span style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{benefit}</span>
            </li>
          ))}
        </ul>

        <p 
          className="text-sm text-white/75 relative z-20 font-normal opacity-0 animate-fade-in" 
          style={{ 
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            animationDelay: '4.6s',
            animationFillMode: 'forwards'
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
