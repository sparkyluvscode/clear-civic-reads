import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/waitlist/Hero";
import HowItWorks from "@/components/waitlist/HowItWorks";
import TrustSection from "@/components/waitlist/TrustSection";
import LaunchBenefits from "@/components/waitlist/LaunchBenefits";
import AudienceSection from "@/components/waitlist/AudienceSection";
import FAQSection from "@/components/waitlist/FAQSection";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 border-b shadow-glass-strong"
        style={{ 
          background: 'hsla(0, 0%, 100%, 0.92)',
          backdropFilter: 'blur(48px) saturate(200%)',
          borderBottomColor: 'hsla(210, 60%, 85%, 0.5)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl glass-strong flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-glass-strong relative overflow-hidden"
              style={{ 
                background: 'hsla(0, 0%, 100%, 0.92)',
                backdropFilter: 'blur(48px) saturate(200%)',
                border: '2px solid hsla(210, 60%, 85%, 0.5)'
              }}
            >
              <FileText className="h-6 w-6 text-primary drop-shadow-lg relative z-10" />
              {/* Inner highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
            </div>
            <span className="text-xl font-black text-foreground tracking-tight">ClearPolicy</span>
          </Link>
          <Button 
            onClick={scrollToForm} 
            variant="default"
            size="default"
            className="shadow-xl hover:shadow-2xl"
          >
            Join waitlist
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16">
        <Hero onJoinClick={scrollToForm} />
        <HowItWorks />
        <TrustSection />
        <LaunchBenefits />
        <AudienceSection />
        <FAQSection />

        {/* Form section */}
        <section id="waitlist-form" className="py-24 px-4 scroll-mt-20 relative">
          {/* Background droplets - Enhanced */}
          <div className="droplet top-[15%] left-[8%] w-32 h-32 blur-[40px] droplet-float" />
          <div className="droplet bottom-[20%] right-[10%] w-28 h-28 blur-[38px] droplet-float-slow" style={{ animationDelay: '5s' }} />
          <div className="droplet top-[45%] right-[25%] w-24 h-24 blur-[36px] droplet-float" style={{ animationDelay: '3s' }} />
          
          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5 tracking-tight">
                Get <span className="relative inline-block group/word">
                  <span className="relative z-10">early</span>
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-accent/30 blur-sm -z-0 group-hover/word:h-3 group-hover/word:bg-accent/40 transition-all duration-500"></span>
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent"></span>
                </span> access
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
                Join the waitlist to be notified when ClearPolicy launches in your area. 
                Your ZIP code helps us prioritize where to launch <span className="relative inline-block font-bold text-foreground group/word">
                  <span className="relative z-10">first</span>
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover/word:opacity-100 transition-opacity duration-500"></span>
                </span>.
              </p>
            </div>
            
            <div 
              className="rounded-3xl shadow-glass-strong p-10 md:p-14 hover:shadow-glass-hover glass-hover transition-all duration-500 shimmer relative overflow-hidden group"
              style={{ 
                background: 'hsla(0, 0%, 100%, 0.92)',
                backdropFilter: 'blur(48px) saturate(200%)',
                border: '2px solid hsla(210, 60%, 85%, 0.5)'
              }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: '0 0 60px hsl(var(--primary) / 0.15) inset' }} />
              {/* Inner highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10">
                <WaitlistForm />
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-base text-muted-foreground font-medium">
                Have questions?{" "}
                <a href="#faq" className="text-primary hover:underline font-bold">
                  Check our FAQ
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Data sources and privacy */}
        <section className="py-20 px-4 bg-gradient-subtle border-t border-border/50">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-9">
              <div 
                className="p-8 rounded-3xl shadow-glass hover:shadow-glass-hover transition-all duration-500 group relative overflow-hidden"
                style={{ 
                  background: 'hsla(0, 0%, 100%, 0.92)',
                  backdropFilter: 'blur(48px) saturate(200%)',
                  border: '2px solid hsla(210, 60%, 85%, 0.5)'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                {/* Inner highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight">
                  Data <span className="relative inline-block">
                    <span className="relative z-10">sources</span>
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </span>
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  ClearPolicy pulls from public datasets including legislative records, 
                  official government documents, and authoritative policy databases. 
                  Every claim links to its <span className="relative inline-block font-semibold text-foreground group/word">
                    <span className="relative z-10">source</span>
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover/word:opacity-100 transition-opacity duration-500"></span>
                  </span>.
                </p>
              </div>
            </div>
              <div 
                className="p-8 rounded-3xl shadow-glass hover:shadow-glass-hover transition-all duration-500 group relative overflow-hidden"
                style={{ 
                  background: 'hsla(0, 0%, 100%, 0.92)',
                  backdropFilter: 'blur(48px) saturate(200%)',
                  border: '2px solid hsla(210, 60%, 85%, 0.5)'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                {/* Inner highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight">
                  Privacy <span className="relative inline-block">
                    <span className="relative z-10">commitment</span>
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-civic-teal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </span>
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  We only use your information to provide early access updates and 
                  product feedback invitations. No resale, no third-party ads.
                </p>
              </div>
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
        
        <div className="bg-neutral-900 text-neutral-700 py-16 px-4 relative overflow-hidden">
          {/* Subtle footer glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:shadow-glow-blue transition-all duration-500 group-hover:scale-110">
                  <FileText className="h-6 w-6 text-primary-foreground drop-shadow" />
                </div>
                <span className="text-xl font-black text-foreground tracking-tight">ClearPolicy</span>
              </div>
            </div>
            <div className="mt-10 pt-10 border-t-2 border-neutral-200/50 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <p className="text-sm text-foreground font-bold">
                © {new Date().getFullYear()} ClearPolicy. Making civic choices <span className="relative inline-block group/word">
                  <span className="text-foreground font-bold relative z-10">clear</span>
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover/word:opacity-100 transition-opacity duration-500"></span>
                </span>, calm, and confident.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
