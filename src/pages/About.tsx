import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrustSection from "@/components/waitlist/TrustSection";
import AudienceSection from "@/components/waitlist/AudienceSection";
import FAQSection from "@/components/waitlist/FAQSection";
import { Button } from "@/components/ui/button";
import clearpolicyLogo from "@/assets/clearpolicy-logo.png";

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.title = "About — ClearPolicy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Learn about ClearPolicy's mission to make policy understandable through plain-English explanations with verifiable citations."
      );
    }

    // Scroll detection
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 border-b liquid-glass-strong transition-all duration-700 ease-in-out ${
          isScrolled ? 'py-2' : 'py-0'
        }`}
        style={{ 
          borderRadius: '0 0 1rem 1rem',
          backdropFilter: isScrolled ? 'blur(30px) saturate(180%)' : 'blur(20px) saturate(150%)',
          filter: 'url(#liquid-glass-distortion) brightness(1.02)',
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
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Link to="/">
                <Button 
                  variant="premium"
                  size={isScrolled ? "sm" : "default"}
                  className="shadow-xl hover:shadow-2xl shimmer-fast transition-all duration-700 ease-in-out"
                >
                  Back to Home
                </Button>
              </Link>
              <div className={`flex items-center gap-1.5 liquid-glass-strong px-2 py-0.5 rounded-full transition-all duration-700 ease-in-out ${
                isScrolled ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
              }`}>
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <span className="text-[10px] text-white/90 font-medium whitespace-nowrap">Now accepting early access signups</span>
              </div>
            </div>
          </div>
          
          {/* Section Navigation */}
          <nav className={`flex items-center justify-center gap-6 overflow-x-auto transition-all duration-700 ease-in-out ${
            isScrolled ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-20'
          }`}>
            <button 
              onClick={() => scrollToSection("trust")}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
            >
              Why Trust Us
            </button>
            <button 
              onClick={() => scrollToSection("who-its-for")}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
            >
              Who It's For
            </button>
            <button 
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
            >
              FAQ
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-28 relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-32 md:py-40 min-h-[60vh] flex items-center">
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tight relative z-20"
              style={{ 
                textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(147, 197, 253, 0.4)',
              }}
            >
              About ClearPolicy
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-normal relative z-20"
              style={{ 
                textShadow: '0 3px 12px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.3)',
              }}
            >
              Making elections and public policy understandable through transparent, citation-first explanations.
            </p>
          </div>
        </section>

        <div id="trust"><TrustSection /></div>
        <div id="who-its-for"><AudienceSection /></div>
        <div id="faq"><FAQSection /></div>

        {/* Footer */}
        <footer className="relative mt-32 py-16 px-4">
          <div className="absolute inset-0 liquid-glass-strong border-t" style={{ filter: 'url(#liquid-glass-distortion) brightness(1.05)' }} />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={clearpolicyLogo} alt="ClearPolicy" className="w-10 h-10 rounded-lg drop-shadow-lg" />
                  <span className="text-xl font-black text-white tracking-tight">ClearPolicy</span>
                </div>
                <p className="text-light text-sm leading-relaxed">
                  Plain-English, citation-backed explanations of bills and ballot measures.
                </p>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Navigation</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="text-light hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/about" className="text-light hover:text-white transition-colors">About</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Connect</h3>
                <p className="text-light text-sm">
                  Questions? Reach out at{" "}
                  <a href="mailto:hello@clearpolicy.org" className="text-white hover:text-ice-blue transition-colors">
                    hello@clearpolicy.org
                  </a>
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 text-center text-sm text-muted-light">
              <p>&copy; {new Date().getFullYear()} ClearPolicy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* SVG Filters */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquid-glass-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.003" numOctaves="2" result="warp" seed="2" />
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="20" in="SourceGraphic" in2="warp" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
