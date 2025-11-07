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
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/15 shadow-glass-strong backdrop-blur-glass-strong">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl glass-strong bg-gradient-glass-strong flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-glass-strong">
              <FileText className="h-6 w-6 text-primary drop-shadow-lg" />
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
          {/* Background droplets */}
          <div className="absolute top-[15%] left-[8%] w-32 h-32 bg-white/[0.06] rounded-full blur-[40px] droplet-float" />
          <div className="absolute bottom-[20%] right-[10%] w-28 h-28 bg-civic-teal/[0.05] rounded-full blur-[38px] droplet-float" style={{ animationDelay: '5s' }} />
          
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
            
            <div className="glass-strong rounded-3xl shadow-glass-strong p-10 md:p-14 hover:shadow-glass-hover glass-hover transition-all duration-500 shimmer border-2 border-white/10 hover:border-primary/30 relative overflow-hidden group">
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: '0 0 60px hsl(var(--primary) / 0.15) inset' }} />
              <WaitlistForm />
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
              <div className="glass-strong p-8 rounded-3xl shadow-glass border-2 border-white/10 hover:border-primary/30 hover:shadow-glass-hover transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
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
              <div className="glass-strong p-8 rounded-3xl shadow-glass border-2 border-white/10 hover:border-civic-teal/30 hover:shadow-glass-hover transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
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
        </section>
      </main>

      {/* Footer with Glass Edge Bar */}
      <footer className="relative">
        {/* Glass edge reflection bar - iOS dock style */}
        <div className="h-1 glass-strong border-t-2 border-white/20 shadow-glass-strong relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
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
              <p className="text-sm font-medium">
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
