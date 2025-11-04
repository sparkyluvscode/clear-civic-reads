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
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-white/8 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-civic-teal/12 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA0IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="absolute inset-0 bg-gradient-glow" />
      </div>
      
      <div className="relative max-w-5xl mx-auto text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong border-white/40 text-white text-sm font-medium mb-8 shimmer shadow-glass">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-lg"></span>
          </span>
          Now accepting early access signups
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
          Policy clarity,<br />
          <span className="bg-gradient-to-r from-white via-white/95 to-white/85 bg-clip-text text-transparent text-glow">
            with sources you can check
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
          Plain-English explanations of bills and ballot measures—backed by citations. 
          Join the waitlist to get early access in your area.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={onJoinClick}
            size="lg"
            variant="glass"
            className="text-lg px-12 py-7 h-auto font-semibold transition-all duration-500 hover:scale-[1.02] shadow-xl"
          >
            Join the waitlist
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/95 mb-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2.5 glass-strong border-white/30 rounded-full px-5 py-2.5 hover-lift shadow-glass"
            >
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 drop-shadow" />
              <span className="text-sm font-medium drop-shadow">{benefit}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-white/80 mt-4 drop-shadow">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
