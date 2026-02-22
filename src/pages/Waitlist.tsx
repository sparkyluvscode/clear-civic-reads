import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/waitlist/Hero";
import HowItWorks from "@/components/waitlist/HowItWorks";
import InteractiveDemo from "@/components/waitlist/InteractiveDemo";
import SectionDivider from "@/components/waitlist/SectionDivider";
import DewDrops from "@/components/DewDrops";
import clearpolicyLogo from "@/assets/clearpolicy-logo.png";
import Impact from "@/components/waitlist/Impact";
import LiquidNavigation from "@/components/LiquidNavigation";

export default function Waitlist() {
  useEffect(() => {
    document.title = "ClearPolicy — Plain-English, cited explanations of ballot measures";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Understand bills and ballot measures in minutes. ClearPolicy gives plain-English summaries with citations you can verify. Join the waitlist for early access.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <DewDrops />
      <LiquidNavigation />

      <main className="pt-16 relative z-10">
        <Hero />

        <div id="impact">
          <Impact />
        </div>

        <div id="demo">
          <InteractiveDemo />
        </div>

        <div id="how-it-works">
          <HowItWorks />
        </div>

        <SectionDivider />

        {/* Data sources and privacy */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Data sources
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  ClearPolicy pulls from public datasets including legislative records,
                  official government documents, and authoritative policy databases.
                  Every claim links to its source.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Privacy commitment
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We only use your information to provide early access updates and
                  product feedback invitations. No resale, no third-party ads.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="glass border-t border-border/30 py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <img
                src={clearpolicyLogo}
                alt="ClearPolicy"
                className="w-8 h-8 rounded-lg shadow-md"
              />
              <span className="font-bold text-foreground">ClearPolicy</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>

            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ClearPolicy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
