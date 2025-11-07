import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
        
        {/* Liquid droplets - Enhanced translucent spheres with variety */}
        <div className="droplet top-[12%] left-[25%] w-32 h-32 blur-[40px] droplet-float" />
        <div className="droplet top-[35%] right-[18%] w-24 h-24 blur-[35px] droplet-float" style={{ animationDelay: '3s' }} />
        <div className="droplet bottom-[15%] left-[35%] w-28 h-28 blur-[38px] droplet-float-slow" style={{ animationDelay: '5s' }} />
        <div className="droplet top-[60%] left-[15%] w-20 h-20 blur-[32px] droplet-float" style={{ animationDelay: '7s' }} />
        <div className="droplet droplet-ripple top-[25%] right-[30%] w-36 h-36 blur-[42px] droplet-float-slow" style={{ animationDelay: '1s' }} />
        <div className="droplet bottom-[30%] right-[25%] w-26 h-26 blur-[36px] droplet-float" style={{ animationDelay: '6s' }} />
        <div className="droplet top-[8%] right-[45%] w-40 h-40 blur-[48px] droplet-float-slow" style={{ animationDelay: '9s' }} />
        <div className="droplet droplet-ripple bottom-[25%] left-[18%] w-22 h-22 blur-[34px] droplet-float" style={{ animationDelay: '4s' }} />
        <div className="droplet top-[72%] right-[38%] w-30 h-30 blur-[40px] droplet-float-slow" style={{ animationDelay: '8s' }} />
        <div className="droplet top-[18%] left-[52%] w-34 h-34 blur-[44px] droplet-float" style={{ animationDelay: '2s' }} />
        
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

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-7 leading-[1.08] tracking-tight text-glow-hero relative z-20">
          Policy <span className="relative inline-block group/word">
            <span className="relative z-10 text-white" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 80px rgba(255,255,255,0.7)' }}>clarity</span>
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/35 blur-lg -z-0 group-hover/word:h-5 group-hover/word:bg-white/45 transition-all duration-700"></span>
            <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/90 to-transparent shadow-glow-blue"></span>
          </span>,<br />
          <span className="text-white">
            with <span className="relative inline-block group/word">
              <span className="relative z-10" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 80px rgba(255,255,255,0.7)' }}>sources</span>
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-civic-teal/45 blur-lg -z-0 group-hover/word:h-5 group-hover/word:bg-civic-teal/55 transition-all duration-700"></span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-civic-teal/90 to-transparent shadow-glow-teal"></span>
            </span> you can <span className="relative inline-block group/word">
              <span className="relative z-10" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 80px rgba(255,255,255,0.7)' }}>check</span>
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary/45 blur-lg -z-0 group-hover/word:h-5 group-hover/word:bg-primary/55 transition-all duration-700"></span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary/90 to-transparent shadow-glow-blue"></span>
            </span>
          </span>
        </h1>
        
        <p className="text-xl text-white/96 mb-11 max-w-3xl mx-auto leading-relaxed font-medium relative z-20" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.3)' }}>
          Plain-English explanations of bills and ballot measures—backed by <span className="font-bold text-white">citations</span>. 
          Join the waitlist to get early access in your area.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-14">
        <Button
            onClick={onJoinClick}
            size="lg"
            variant="premium"
            className="text-lg px-14 py-8 h-auto font-bold shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              Join the waitlist
              <ArrowRight className="h-6 w-6" />
            </span>
            {/* Inner glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-white mb-7">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 glass-strong rounded-full px-7 py-4 hover-lift shadow-glass-strong relative overflow-hidden group"
              style={{ 
                background: 'hsla(0, 0%, 100%, 0.92)',
                backdropFilter: 'blur(48px) saturate(200%)',
                border: '2px solid hsla(210, 60%, 85%, 0.5)'
              }}
            >
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-white drop-shadow-lg relative z-10" />
              <span className="text-sm font-bold text-white drop-shadow-lg relative z-10">{benefit}</span>
              {/* Inner highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
              {/* Shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
