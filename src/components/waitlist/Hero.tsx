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
      <div className="relative max-w-5xl mx-auto text-center">
        <div 
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full liquid-glass-strong text-foreground text-sm font-semibold mb-8 shimmer shadow-glass-strong hover-lift opacity-0 animate-fade-in"
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
          className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-[1.1] tracking-tight relative z-20 opacity-0 animate-fade-in"
          style={{ 
            animationDelay: '1.2s',
            animationFillMode: 'forwards'
          }}
        >
          Policy clarity, with sources you can check
        </h1>
        
        <p 
          className="text-xl text-foreground/90 mb-12 max-w-3xl mx-auto leading-[1.6] font-normal relative z-20 opacity-0 animate-fade-in" 
          style={{ 
            animationDelay: '1.9s',
            animationFillMode: 'forwards'
          }}
        >
          Plain-English explanations of bills and ballot measures—backed by <span className="font-semibold text-foreground">citations</span>. 
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
          >
            <div className="flex items-center gap-3 px-4">
              <Search className="h-6 w-6 text-foreground opacity-70" />
              <span className="flex-1 py-4 text-muted-foreground text-lg">
                Search for a ballot measure or policy...
              </span>
            </div>
          </div>
        </div>

        <div 
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16 opacity-0 animate-fade-in"
          style={{ 
            animationDelay: '3.3s',
            animationFillMode: 'forwards'
          }}
        >
          <button
            onClick={onJoinClick}
            className="liquid-glass-strong text-lg px-14 py-8 rounded-2xl text-foreground font-bold shadow-2xl shimmer-fast hover:scale-105 transition-transform"
            aria-label="Join the waitlist for early access"
          >
            <span className="relative z-10 flex items-center gap-2.5 justify-center">
              Get Early Access — Launching Soon
              <ArrowRight className="h-6 w-6" />
            </span>
          </button>
        </div>

        <ul
          className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-x-12 gap-y-5 text-foreground/85 relative z-20 mb-8 opacity-0 animate-fade-in"
          style={{ 
            animationDelay: '4.0s',
            animationFillMode: 'forwards'
          }}
        >
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3 text-base font-normal">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-ice-blue drop-shadow-lg" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <p 
          className="text-sm text-foreground/75 relative z-20 font-normal opacity-0 animate-fade-in" 
          style={{ 
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
