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
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">
                Get <span className="relative inline-block">
                  <span className="relative z-10">early</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/25 blur-sm -z-0"></span>
                </span> access
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                Join the waitlist to be notified when ClearPolicy launches in your area. 
                Your ZIP code helps us prioritize where to launch <span className="text-foreground font-bold">first</span>.
              </p>
            </div>
            
            <div className="glass-strong rounded-3xl shadow-glass-strong p-10 md:p-14 hover:shadow-glass-hover glass-hover transition-all duration-500 shimmer">
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
              <div className="glass-strong p-8 rounded-3xl shadow-glass">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Data sources
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  ClearPolicy pulls from public datasets including legislative records, 
                  official government documents, and authoritative policy databases. 
                  Every claim links to its <span className="text-foreground font-semibold">source</span>.
                </p>
              </div>
              <div className="glass-strong p-8 rounded-3xl shadow-glass">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Privacy commitment
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

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-700 py-16 px-4 relative overflow-hidden">
        {/* Subtle footer glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-primary-foreground drop-shadow" />
              </div>
              <span className="text-xl font-black text-foreground tracking-tight">ClearPolicy</span>
            </div>
          </div>
          <div className="mt-10 pt-10 border-t border-neutral-200/50 text-center">
            <p className="text-sm font-medium">
              © {new Date().getFullYear()} ClearPolicy. Making civic choices <span className="text-foreground font-bold">clear</span>, calm, and confident.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
