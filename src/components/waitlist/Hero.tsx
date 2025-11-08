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
        {/* Large floating glass orbs */}
        <div className="absolute top-[15%] left-[8%] w-[450px] h-[450px] bg-gradient-orb-blue rounded-full blur-[130px] orb-float" />
        <div className="absolute bottom-[20%] right-[12%] w-[550px] h-[550px] bg-gradient-orb-teal rounded-full blur-[140px] orb-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[45%] left-[45%] w-[600px] h-[600px] bg-gradient-orb-blue rounded-full blur-[160px] orb-float" style={{ animationDelay: '4s' }} />
        
        {/* Premium glass raindrops - Enhanced liquid effects */}
        <div className="glass-raindrop top-[15%] right-[15%] w-20 h-20 droplet-float" style={{ animationDelay: '0s' }} />
        <div className="glass-raindrop top-[35%] left-[10%] w-16 h-16 droplet-float-medium" style={{ animationDelay: '2s' }} />
        <div className="glass-raindrop bottom-[30%] right-[8%] w-24 h-24 droplet-float-slow" style={{ animationDelay: '5s' }} />
        <div className="glass-raindrop top-[55%] right-[25%] w-14 h-14 droplet-float" style={{ animationDelay: '3s' }} />
        <div className="glass-raindrop bottom-[45%] left-[18%] w-18 h-18 droplet-float-medium" style={{ animationDelay: '7s' }} />
        <div className="glass-raindrop top-[70%] left-[5%] w-20 h-20 droplet-float-slow" style={{ animationDelay: '4s' }} />
        <div className="glass-raindrop bottom-[20%] left-[30%] w-16 h-16 droplet-float" style={{ animationDelay: '1s' }} />
        <div className="glass-raindrop top-[40%] right-[5%] w-22 h-22 droplet-float-medium" style={{ animationDelay: '6s' }} />
        
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
            background: 'hsla(0, 0%, 100%, 0.95)',
            backdropFilter: 'blur(48px) saturate(200%)',
            border: '2px solid hsla(210, 60%, 85%, 0.6)'
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
                background: 'hsla(0, 0%, 100%, 0.92)',
                backdropFilter: 'blur(32px) saturate(180%)',
                border: '2px solid hsl(210 60% 85% / 0.6)',
                boxShadow: 'inset 0 1px 0 0 hsl(0 0% 100% / 0.25), 0 2px 8px hsl(210 30% 15% / 0.08)'
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
                background: 'hsla(0, 0%, 100%, 0.95)',
                backdropFilter: 'blur(48px) saturate(200%)',
                border: '2px solid hsla(210, 60%, 85%, 0.7)',
                boxShadow: 'var(--shadow-glass-strong)'
              }}
            >
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary drop-shadow-lg relative z-10" />
              <span className="text-sm font-black text-foreground relative z-10" style={{ textShadow: '0 1px 3px rgba(255,255,255,0.6)' }}>{benefit}</span>
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
