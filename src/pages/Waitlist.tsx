import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/waitlist/Hero";
import HowItWorks from "@/components/waitlist/HowItWorks";
import LaunchBenefits from "@/components/waitlist/LaunchBenefits";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import InteractiveDemo from "@/components/waitlist/InteractiveDemo";
import ComparisonTable from "@/components/waitlist/ComparisonTable";
import { Button } from "@/components/ui/button";
import clearpolicyLogo from "@/assets/clearpolicy-logo.png";
export default function Waitlist() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Update page title and meta description
    document.title = "ClearPolicy — Plain-English, cited explanations of ballot measures";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Understand bills and ballot measures in minutes. ClearPolicy gives plain-English summaries with citations you can verify. Join the waitlist for early access.");
    }

    // Scroll detection
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <div className="min-h-screen">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 border-b liquid-glass-strong transition-all duration-700 ease-in-out ${
          isScrolled ? 'py-2' : 'py-0'
        }`}
        style={{
          filter: 'url(#liquid-glass-distortion) brightness(1.05)',
          borderRadius: '0 0 1rem 1rem',
          backdropFilter: isScrolled ? 'blur(30px) saturate(180%)' : 'blur(20px) saturate(150%)',
        }}
      >
        <div className={`max-w-7xl mx-auto px-6 transition-all duration-700 ease-in-out ${
          isScrolled ? 'py-3' : 'py-5'
        }`}>
          <div className={`flex items-center justify-between transition-all duration-700 ease-in-out ${
            isScrolled ? 'mb-0' : 'mb-4'
          }`}>
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 group">
                <img 
                  src={clearpolicyLogo} 
                  alt="ClearPolicy" 
                  className={`rounded-xl group-hover:scale-110 transition-all duration-700 ease-in-out drop-shadow-lg ${
                    isScrolled ? 'w-9 h-9' : 'w-11 h-11'
                  }`}
                />
                <span className={`font-black text-white tracking-tight transition-all duration-700 ease-in-out ${
                  isScrolled ? 'text-lg' : 'text-xl'
                }`}>
                  ClearPolicy
                </span>
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium text-white/80 hover:text-white transition-all duration-700 ease-in-out whitespace-nowrap ${
                  isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                }`}
              >
                About
              </Link>
            </div>
            <Button 
              onClick={scrollToForm} 
              variant="premium" 
              size={isScrolled ? "sm" : "default"}
              className="shadow-xl hover:shadow-2xl shimmer-fast transition-all duration-700 ease-in-out"
            >
              Join waitlist
            </Button>
          </div>
          
          {/* Section Navigation */}
          <nav className={`flex items-center justify-center gap-6 overflow-x-auto transition-all duration-700 ease-in-out ${
            isScrolled ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-20'
          }`}>
            <button onClick={() => scrollToSection("demo")} className="text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap">
              Demo
            </button>
            <button onClick={() => scrollToSection("comparison")} className="text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap">
              Comparison
            </button>
            <button onClick={() => scrollToSection("how-it-works")} className="text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap">
              How It Works
            </button>
            <button onClick={() => scrollToSection("benefits")} className="text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap">
              Benefits
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-28 relative z-10 mx-0 rounded-none my-0">
        <Hero onJoinClick={scrollToForm} />
        <div id="demo"><InteractiveDemo /></div>
        <div id="comparison"><ComparisonTable /></div>
        <div id="how-it-works"><HowItWorks /></div>
        <div id="benefits"><LaunchBenefits /></div>

        {/* Form section */}
        <section id="waitlist-form" className="py-24 px-4 scroll-mt-20 relative">
          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight text-glow-hero">
                Get Early Access — Launching Soon in Your Area
              </h2>
              <p className="text-xl text-light max-w-2xl mx-auto font-medium leading-relaxed">
                Join the waitlist to be notified when ClearPolicy launches in your area. 
                Your ZIP code helps us prioritize where to launch <span className="font-bold text-white">first</span>.
              </p>
            </div>
            
            <div className="liquid-glass-strong rounded-3xl shadow-glass-strong p-10 md:p-14 hover:shadow-glass-hover transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
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
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-9">
              <div className="p-8 rounded-3xl liquid-glass-strong shadow-glass hover:shadow-glass-hover transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                {/* Inner highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  Data <span className="relative inline-block">
                    <span className="relative z-10">sources</span>
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </span>
                </h3>
                <p className="text-base text-light leading-relaxed">
                  ClearPolicy pulls from public datasets including legislative records, 
                  official government documents, and authoritative policy databases. 
                  Every claim links to its <span className="relative inline-block font-semibold text-white group/word">
                    <span className="relative z-10">source</span>
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover/word:opacity-100 transition-opacity duration-500"></span>
                  </span>.
                </p>
              </div>
            </div>
              <div className="p-8 rounded-3xl liquid-glass-strong shadow-glass hover:shadow-glass-hover transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                {/* Inner highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  Privacy <span className="relative inline-block">
                    <span className="relative z-10">commitment</span>
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-civic-teal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </span>
                </h3>
                <p className="text-base text-light leading-relaxed">
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
        <div className="h-1 border-t-2 shadow-glass-strong relative overflow-hidden" style={{
        background: 'hsla(0, 0%, 100%, 0.95)',
        backdropFilter: 'blur(48px) saturate(200%)',
        borderColor: 'hsla(180, 55%, 80%, 0.6)'
      }}>
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
                  <img src={clearpolicyLogo} alt="ClearPolicy" className="w-10 h-10 rounded-xl shadow-lg group-hover:shadow-glow-blue transition-all duration-500 group-hover:scale-110 drop-shadow" />
                  <span className="text-xl font-black text-foreground tracking-tight">ClearPolicy</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed max-w-xs">
                  Your trusted source for clear, source-backed policy information. Making civic choices clear, calm, and confident.
                </p>
                <div className="flex gap-4">
                  <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:glass-strong transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:glass-strong transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                  <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:glass-strong transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
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
                <a href="#waitlist" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass hover:glass-strong transition-all duration-300 text-sm font-semibold text-foreground hover:scale-105">
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
    </div>;
}