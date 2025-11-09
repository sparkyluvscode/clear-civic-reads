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
    <section className="relative overflow-hidden bg-gradient-hero px-4 py-20 md:py-32 min-h-[90vh] flex items-center">
      {/* Liquid Glass Droplet Background */}
      <div className="absolute inset-0">
        {/* Large floating silver/ice translucent orbs */}
        <div className="absolute top-[15%] left-[8%] w-[450px] h-[450px] opacity-50" style={{ background: 'radial-gradient(circle, hsl(0 0% 95% / 0.4) 0%, hsl(210 100% 92% / 0.25) 35%, transparent 70%)', filter: 'blur(110px)', animation: 'orb-float 10s ease-in-out infinite' }} />
        <div className="absolute bottom-[20%] right-[12%] w-[550px] h-[550px] opacity-45" style={{ background: 'radial-gradient(circle, hsl(0 0% 92% / 0.35) 0%, hsl(210 100% 88% / 0.2) 40%, transparent 75%)', filter: 'blur(120px)', animation: 'orb-float 12s ease-in-out infinite', animationDelay: '3s' }} />
        <div className="absolute top-[45%] left-[45%] w-[600px] h-[600px] opacity-40" style={{ background: 'radial-gradient(circle, hsl(0 0% 98% / 0.3) 0%, hsl(210 100% 90% / 0.18) 45%, transparent 80%)', filter: 'blur(130px)', animation: 'orb-float 14s ease-in-out infinite', animationDelay: '6s' }} />
        
        {/* Premium translucent silver glass bubbles */}
        <div className="glass-raindrop droplet-float-slow" style={{ width: '140px', height: '140px', top: '12%', left: '10%', animationDelay: '0s', opacity: 0.65 }} />
        <div className="glass-raindrop droplet-float-medium" style={{ width: '95px', height: '95px', top: '22%', right: '15%', animationDelay: '2s', opacity: 0.6 }} />
        <div className="glass-raindrop droplet-float" style={{ width: '115px', height: '115px', top: '42%', left: '6%', animationDelay: '4s', opacity: 0.55 }} />
        <div className="glass-raindrop droplet-float-slow" style={{ width: '105px', height: '105px', top: '58%', right: '10%', animationDelay: '1s', opacity: 0.62 }} />
        <div className="glass-raindrop droplet-float-medium" style={{ width: '80px', height: '80px', top: '32%', right: '8%', animationDelay: '3s', opacity: 0.58 }} />
        <div className="glass-raindrop droplet-float" style={{ width: '125px', height: '125px', top: '68%', left: '72%', animationDelay: '5s', opacity: 0.6 }} />
        <div className="glass-raindrop droplet-float-slow" style={{ width: '70px', height: '70px', top: '48%', right: '22%', animationDelay: '2.5s', opacity: 0.56 }} />
        <div className="glass-raindrop droplet-float-medium" style={{ width: '100px', height: '100px', top: '78%', left: '18%', animationDelay: '4.5s', opacity: 0.59 }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-25" />
        
        {/* Top glow gradient */}
        <div className="absolute inset-0 bg-gradient-glow" />
      </div>
      
      <div className="relative max-w-5xl mx-auto text-center animate-fade-in">
        <div className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full glass-strong border-white/45 text-white text-sm font-semibold mb-10 shimmer shadow-glass-strong hover-lift">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-glow-blue"></span>
          </span>
          Now accepting early access signups
        </div>

        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-7 leading-[1.08] tracking-tight text-glow-white relative z-20"
          style={{ 
            textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 80px hsl(210 60% 55% / 0.4)'
          }}
        >
          Policy <span className="relative inline-block group/word">
            <span className="relative z-10 text-white" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 80px rgba(255,255,255,0.7)' }}>clarity</span>
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/40 blur-lg -z-0 group-hover/word:h-5 group-hover/word:bg-white/50 transition-all duration-700"></span>
            <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/90 to-transparent shadow-glow-blue"></span>
          </span>,<br />
          <span className="text-white">
            with <span className="relative inline-block group/word">
              <span className="relative z-10" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 80px rgba(255,255,255,0.7)' }}>sources</span>
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-civic-teal/50 blur-lg -z-0 group-hover/word:h-5 group-hover/word:bg-civic-teal/60 transition-all duration-700"></span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/90 to-transparent shadow-glow-teal"></span>
            </span> you can <span className="relative inline-block group/word">
              <span className="relative z-10" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 80px rgba(255,255,255,0.7)' }}>check</span>
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary/50 blur-lg -z-0 group-hover/word:h-5 group-hover/word:bg-primary/60 transition-all duration-700"></span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/90 to-transparent shadow-glow-blue"></span>
            </span>
          </span>
        </h1>
        
        <p className="text-xl text-white/96 mb-11 max-w-3xl mx-auto leading-relaxed font-medium relative z-20" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.3)' }}>
          Plain-English explanations of bills and ballot measures—backed by <span className="font-bold text-white">citations</span>. 
          Join the waitlist to get early access in your area.
        </p>

        {/* Interactive search/preview box - Premium glass input */}
        <div 
          className="max-w-3xl mx-auto mb-10 p-7 rounded-3xl shadow-glass-strong hover:shadow-glass-hover card-hover-lift shimmer-hover relative overflow-hidden group"
          style={{ 
            background: 'hsla(0, 0%, 98%, 0.5)',
            backdropFilter: 'blur(56px) saturate(180%)',
            WebkitBackdropFilter: 'blur(56px) saturate(180%)',
            border: '2px solid hsla(0, 0%, 100%, 0.5)',
            boxShadow: 'inset 0 2px 4px 0 hsla(0, 0%, 100%, 0.6), 0 12px 40px hsla(220, 15%, 10%, 0.15), 0 0 0 1px hsla(210, 100%, 90%, 0.3)',
          }}
        >
          {/* Glowing border on hover */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: '0 0 60px hsl(210 60% 55% / 0.2) inset' }} />
          {/* Inner highlight - stronger */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div 
              className="flex items-center gap-3 p-5 rounded-2xl input-glass group/input"
              style={{
                background: 'hsla(0, 0%, 98%, 0.55)',
                backdropFilter: 'blur(56px) saturate(180%)',
                WebkitBackdropFilter: 'blur(56px) saturate(180%)',
                border: '2px solid hsla(0, 0%, 100%, 0.5)',
                boxShadow: 'inset 0 2px 4px 0 hsla(0, 0%, 100%, 0.6), 0 6px 20px hsla(220, 15%, 10%, 0.12), 0 0 0 1px hsla(210, 100%, 88%, 0.35)',
              }}
            >
              <Search className="h-5 w-5 text-primary flex-shrink-0 drop-shadow-sm" />
              <input
                type="text"
                placeholder="Search for a ballot measure or policy..."
                className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground/80 font-medium"
                aria-label="Search for ballot measures or policies"
                disabled
              />
            </div>
            <p className="text-sm text-center text-foreground/80 font-semibold">
              Coming soon: Instant plain-English explanations with <span className="font-black text-foreground">verifiable citations</span>.
            </p>
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
              Join the waitlist
              <ArrowRight className="h-6 w-6" />
            </span>
            {/* Inner glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-white mb-7">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 glass-strong rounded-full px-7 py-4 hover-lift shadow-glass-strong shimmer-hover relative overflow-hidden group"
              style={{ 
                background: 'hsla(0, 0%, 98%, 0.55)',
                backdropFilter: 'blur(56px) saturate(180%)',
                WebkitBackdropFilter: 'blur(56px) saturate(180%)',
                border: '2px solid hsla(0, 0%, 100%, 0.5)',
                boxShadow: 'inset 0 2px 4px 0 hsla(0, 0%, 100%, 0.6), 0 6px 20px hsla(220, 15%, 10%, 0.12), 0 0 0 1px hsla(210, 100%, 88%, 0.35)',
              }}
            >
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-foreground drop-shadow-lg relative z-10" />
              <span className="text-sm font-black text-foreground relative z-10" style={{ textShadow: '0 1px 3px hsla(0, 0%, 0%, 0.2)' }}>{benefit}</span>
              {/* Inner highlight - enhanced */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-70" />
              {/* Pulse glow on hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 20px hsl(210 60% 55% / 0.3) inset' }} />
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
