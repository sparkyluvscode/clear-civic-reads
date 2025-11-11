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
    <section className="relative overflow-hidden px-4 py-32 md:py-40 min-h-[90vh] flex items-center">
      {/* Clean dark gradient background - no large blobs */}
      
      <div className="max-w-6xl mx-auto text-center px-4 relative z-10">
        {/* Main headline */}
        <h1 
          className="text-6xl md:text-7xl lg:text-[72px] font-bold text-white mb-8 tracking-tight"
          style={{ 
            lineHeight: 1.1, 
            letterSpacing: '-0.02em',
            textShadow: '0 2px 24px rgba(0, 0, 0, 0.5)'
          }}
        >
          Plain-English, cited explanations
          <br />
          of ballot measures
        </h1>

        {/* Subheadline */}
        <p 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-normal leading-relaxed"
          style={{ 
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: 1.6
          }}
        >
          Understand bills and ballot measures in minutes — with{" "}
          <span className="font-semibold text-white">
            sources you can verify
          </span>
          .
        </p>

        {/* Search box teaser */}
        <div className="max-w-2xl mx-auto mb-16">
          <div 
            className="rounded-2xl p-5 flex items-center gap-4 group cursor-pointer relative overflow-hidden transition-all duration-300"
            onClick={onJoinClick}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              height: '56px',
              maxHeight: '56px'
            }}
          >
            <Search className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform duration-500" style={{ color: 'rgba(59, 130, 246, 1)' }} />
            <span className="text-base font-normal relative z-10 transition-colors duration-500" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Search for any policy or ballot measure...
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onJoinClick}
          size="lg"
          className="liquid-glass-button text-lg px-10 py-6 rounded-xl font-semibold mb-16 hover:scale-105 transition-transform duration-300 relative"
        >
          Join the waitlist
        </Button>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-2xl p-8 flex flex-col items-center gap-4 transition-all duration-300 group hover:scale-105 relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                minHeight: '120px'
              }}
            >
              <CheckCircle2 className="h-7 w-7 relative z-10 group-hover:scale-110 transition-transform duration-500" style={{ color: 'rgba(59, 130, 246, 1)' }} />
              <span className="font-semibold text-white text-base relative z-10 text-center">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
