import { ArrowRight, CheckCircle2, Search } from "lucide-react";
import clearPolicyLogo from "@/assets/clearpolicy-logo.png";

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
    <section className="relative overflow-hidden px-4 py-32 md:py-48 min-h-[90vh] flex items-center">
      <div className="relative max-w-6xl mx-auto text-center">
        {/* ClearPolicy Logo */}
        <div 
          className="mb-12 opacity-0 animate-fade-in"
          style={{ 
            animationDelay: '0s',
            animationFillMode: 'forwards'
          }}
        >
          <img 
            src={clearPolicyLogo} 
            alt="ClearPolicy" 
            className="h-16 md:h-20 mx-auto drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 4px 20px rgba(255,255,255,0.3)) drop-shadow(0 0 40px rgba(147, 197, 253, 0.4))'
            }}
          />
        </div>

        <div 
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full liquid-glass-strong text-white text-sm font-semibold mb-8 shimmer shadow-glass-strong hover-lift opacity-0 animate-fade-in"
          style={{ 
            animationDelay: '0.5s',
            animationFillMode: 'forwards'
          }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" style={{ boxShadow: '0 0 30px rgba(52, 211, 153, 0.6)' }}></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" style={{ boxShadow: '0 0 25px rgba(52, 211, 153, 0.9), 0 0 40px rgba(52, 211, 153, 0.5)' }}></span>
          </span>
          Now accepting early access signups
        </div>

        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-10 leading-[1.05] tracking-tight relative z-20 opacity-0 animate-fade-in"
          style={{ 
            textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(147, 197, 253, 0.4)',
            animationDelay: '1.2s',
            animationFillMode: 'forwards'
          }}
        >
          Policy clarity, with sources you can check
        </h1>
        
        <p 
          className="text-xl md:text-2xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed font-normal relative z-20 opacity-0 animate-fade-in"
          style={{ 
            textShadow: '0 3px 12px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.3)',
            animationDelay: '1.9s',
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
            animationDelay: '2.6s',
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
          className="flex flex-col sm:flex-row gap-6 justify-center mb-20 opacity-0 animate-fade-in"
          style={{ 
            animationDelay: '3.3s',
            animationFillMode: 'forwards'
          }}
        >
          <button
            onClick={onJoinClick}
            className="group relative liquid-glass-strong text-lg px-16 py-9 rounded-2xl text-white font-bold shadow-glass-strong hover:shadow-glow-ice shimmer-fast transition-all duration-500 hover:scale-[1.02] overflow-hidden"
            aria-label="Join the waitlist for early access"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-ice-blue/20 via-ice-blue/30 to-ice-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <span className="relative z-10 flex items-center gap-3 justify-center">
              Get Early Access — Launching Soon
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        <ul
          className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-x-14 gap-y-6 text-white/85 relative z-20 mb-10 opacity-0 animate-fade-in"
          style={{ 
            animationDelay: '4.0s',
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
            animationDelay: '4.0s',
            animationFillMode: 'forwards'
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
