import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/waitlist/Hero";
import HowItWorks from "@/components/waitlist/HowItWorks";
import TrustSection from "@/components/waitlist/TrustSection";
import LaunchBenefits from "@/components/waitlist/LaunchBenefits";
import AudienceSection from "@/components/waitlist/AudienceSection";
import FAQSection from "@/components/waitlist/FAQSection";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import InteractiveDemo from "@/components/waitlist/InteractiveDemo";
import SocialProof from "@/components/waitlist/SocialProof";
import ComparisonTable from "@/components/waitlist/ComparisonTable";
import LaunchTimeline from "@/components/waitlist/LaunchTimeline";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function Waitlist() {
  useEffect(() => {
    // Update page title and meta description
    document.title = "ClearPolicy — Plain-English, cited explanations of ballot measures";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Understand bills and ballot measures in minutes. ClearPolicy gives plain-English summaries with citations you can verify. Join the waitlist for early access."
      );
    }
  }, []);

  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative">
      {/* SVG Filter for liquid glass distortion */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="liquid-glass-distortion" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="3" seed="5" result="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacement" />
            <feGaussianBlur in="displacement" stdDeviation="0.5" result="blur" />
          </filter>
        </defs>
      </svg>
      
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ 
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(24px) saturate(180%)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div 
              className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative overflow-hidden"
              style={{
                background: 'rgba(59, 130, 246, 0.15)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)'
              }}
            >
              <FileText className="h-6 w-6 text-white drop-shadow-lg relative z-10" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">ClearPolicy</span>
          </Link>
          <Button 
            onClick={scrollToForm} 
            className="liquid-glass-button font-semibold px-6 py-2.5 rounded-xl"
          >
            Join waitlist
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16 relative z-10" style={{ isolation: 'isolate' }}>
        <Hero onJoinClick={scrollToForm} />
        <InteractiveDemo />
        <SocialProof />
        <ComparisonTable />
        <HowItWorks />
        <LaunchBenefits />
        <LaunchTimeline />
        <TrustSection />
        <AudienceSection />
        <FAQSection />

        {/* Form section */}
        <section id="waitlist-form" className="py-32 px-4 scroll-mt-20 relative">
          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight" style={{ lineHeight: 1.1, letterSpacing: '-0.02em', textShadow: '0 2px 24px rgba(0, 0, 0, 0.5)' }}>
                Get Early Access — Launching Soon in Your Area
              </h2>
              <p className="text-xl max-w-2xl mx-auto font-normal leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Join the waitlist to be notified when ClearPolicy launches in your area. 
                Your ZIP code helps us prioritize where to launch <span className="font-semibold text-white">first</span>.
              </p>
            </div>
            
            <div 
              className="rounded-2xl p-12 md:p-16 relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(32px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
              }}
            >
              <WaitlistForm />
            </div>

            <div className="mt-12 text-center">
              <p className="text-base font-medium" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Have questions?{" "}
                <a href="#faq" className="hover:underline font-semibold" style={{ color: 'rgba(59, 130, 246, 1)' }}>
                  Check our FAQ
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Data sources and privacy */}
        <section className="py-32 px-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div 
                className="p-8 rounded-2xl transition-all duration-500 group relative overflow-hidden"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  Data sources
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  ClearPolicy pulls from public datasets including legislative records, 
                  official government documents, and authoritative policy databases. 
                  Every claim links to its <span className="font-semibold text-white">source</span>.
                </p>
              </div>
              <div 
                className="p-8 rounded-2xl transition-all duration-500 group relative overflow-hidden"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  Privacy commitment
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  We only use your information to provide early access updates and 
                  product feedback invitations. No resale, no third-party ads.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Glass Edge Bar */}
      <footer className="relative">
        {/* Glass edge reflection bar - iOS dock style with enhanced shimmer */}
        <div 
          className="h-1 border-t-2 shadow-glass-strong relative overflow-hidden"
          style={{ 
            background: 'hsla(0, 0%, 100%, 0.95)',
            backdropFilter: 'blur(48px) saturate(200%)',
            borderColor: 'hsla(180, 55%, 80%, 0.6)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-civic-teal/10 to-primary/10" />
        </div>
        
        <div className="glass-strong py-16 px-4 relative overflow-hidden">
          {/* Subtle footer glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Brand Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:shadow-glow-blue transition-all duration-500 group-hover:scale-110">
                    <FileText className="h-6 w-6 text-primary-foreground drop-shadow" />
                  </div>
                  <span className="text-xl font-black text-foreground tracking-tight">ClearPolicy</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed max-w-xs">
                  Your trusted source for clear, source-backed policy information. Making civic choices clear, calm, and confident.
                </p>
                <div className="flex gap-4">
                  <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:glass-strong transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:glass-strong transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:glass-strong transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </div>
              </div>

              {/* Company Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Company (Soon)</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300">About Us</a></li>
                  <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300">Our Team</a></li>
                  <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300">Careers</a></li>
                  <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300">Press</a></li>
                </ul>
              </div>

              {/* Resources Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Resources (Soon)</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300">Blog</a></li>
                  <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300">Help Center</a></li>
                  <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300">Terms of Service</a></li>
                </ul>
              </div>

              {/* Stay Updated Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Stay Updated</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Join our waitlist to be the first to know when we launch and get early access to ClearPolicy.
                </p>
                <a 
                  href="#waitlist" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass hover:glass-strong transition-all duration-300 text-sm font-semibold text-foreground hover:scale-105"
                >
                  Join Waitlist
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div className="mt-12 pt-8 border-t-2 border-border/30 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <p className="text-sm text-foreground font-semibold">
                © {new Date().getFullYear()} ClearPolicy. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
