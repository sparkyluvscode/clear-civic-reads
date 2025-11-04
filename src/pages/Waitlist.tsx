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
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10 shadow-glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl glass-strong bg-gradient-glass flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-glass">
              <FileText className="h-5 w-5 text-primary drop-shadow" />
            </div>
            <span className="text-xl font-bold text-foreground">ClearPolicy</span>
          </Link>
          <Button 
            onClick={scrollToForm} 
            variant="glass"
            className="border-primary/30 text-foreground hover:border-primary/40 transition-all duration-500"
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
        <section id="waitlist-form" className="py-20 px-4 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get early access
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join the waitlist to be notified when ClearPolicy launches in your area. 
                Your ZIP code helps us prioritize where to launch first.
              </p>
            </div>
            
            <div className="glass-strong rounded-3xl shadow-glass-strong p-8 md:p-12 hover:shadow-glass-hover glass-hover transition-all duration-500">
              <WaitlistForm />
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Have questions?{" "}
                <a href="#faq" className="text-primary hover:underline">
                  Check our FAQ
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Data sources and privacy */}
        <section className="py-16 px-4 bg-neutral-50 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Data sources
                </h3>
                <p className="text-sm text-muted-foreground">
                  ClearPolicy pulls from public datasets including legislative records, 
                  official government documents, and authoritative policy databases. 
                  Every claim links to its source.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Privacy commitment
                </h3>
                <p className="text-sm text-muted-foreground">
                  We only use your information to provide early access updates and 
                  product feedback invitations. No resale, no third-party ads.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-700 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">ClearPolicy</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-200 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} ClearPolicy. Making civic choices clear, calm, and confident.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
