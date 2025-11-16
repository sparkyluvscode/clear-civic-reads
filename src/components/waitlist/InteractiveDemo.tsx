import { useState, useEffect } from "react";
import { Search, CheckCircle2, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoExamples = [
  {
    query: "Prop 47",
    title: "Proposition 47: Criminal Sentences. Misdemeanor Penalties",
    summary: "Requires misdemeanor sentence instead of felony for certain drug possession offenses and most thefts under $950",
    impact: "Estimated 40,000 fewer felony convictions annually. $150-250M annual savings to state corrections.",
    sources: [
      { title: "Official Text", org: "CA Secretary of State" },
      { title: "Fiscal Analysis", org: "Legislative Analyst's Office" },
      { title: "Implementation Data", org: "CA Dept. of Corrections" }
    ]
  },
  {
    query: "Measure A",
    title: "Measure A: Affordable Housing Bond",
    summary: "Authorizes $500M bond for affordable housing construction and preservation in the city",
    impact: "Estimated 3,500 new affordable units over 10 years. Property tax increase of $12-18 per $100k of assessed value.",
    sources: [
      { title: "Ballot Language", org: "City Attorney" },
      { title: "Housing Impact Study", org: "Housing Authority" },
      { title: "Bond Analysis", org: "City Controller" }
    ]
  }
];

export default function InteractiveDemo() {
  const [inputValue, setInputValue] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (inputValue.toLowerCase().includes("prop") || inputValue.toLowerCase().includes("measure")) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setShowDemo(true);
        setIsTyping(false);
        setCurrentDemo(inputValue.toLowerCase().includes("47") ? 0 : 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setShowDemo(false);
    }
  }, [inputValue]);

  const demo = demoExamples[currentDemo];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
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

      {/* Background orbs */}
      <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-gradient-orb-ice opacity-30 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5 text-glow-hero">
            See it in action
          </h2>
          <p className="text-xl text-light max-w-2xl mx-auto font-medium">
            Try searching for a ballot measure to see how ClearPolicy makes complex policy <span className="text-foreground font-bold">instantly understandable</span>.
          </p>
        </div>

        {/* Interactive Search Input */}
        <div className="mb-12">
          <div 
            className="liquid-glass-strong rounded-2xl p-2 shadow-glass-hover relative"
            style={{ 
              filter: 'url(#liquid-glass-distortion) brightness(1.1)',
            }}
          >
            <div className="flex items-center gap-3 px-4">
              <Search className="h-6 w-6 text-foreground opacity-70" />
              <input
                type="text"
                placeholder='Try typing "Prop 47" or "Measure A"...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none py-4 text-foreground placeholder:text-muted-foreground text-lg"
                aria-label="Search for ballot measures"
              />
            </div>
          </div>
        </div>

        {/* Demo Preview */}
        {(showDemo || isTyping) && (
          <div 
            className="liquid-glass rounded-3xl p-8 shadow-glass-strong animate-scale-in relative overflow-hidden"
            style={{ 
              filter: 'url(#liquid-glass-distortion) brightness(1.06)',
            }}
          >
            {/* Inner highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            
            {isTyping ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 text-white">
                  <div className="w-2 h-2 bg-ice-blue rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-ice-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-ice-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <span className="ml-2 text-light">Searching...</span>
                </div>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-ice-blue/20 backdrop-blur-sm border border-ice-blue/30">
                    <FileText className="h-6 w-6 text-ice-blue" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {demo.title}
                    </h3>
                    <p className="text-light leading-relaxed text-lg">
                      {demo.summary}
                    </p>
                  </div>
                </div>

                <div className="liquid-glass rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-ice-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-bold mb-2">Key Impact</h4>
                      <p className="text-light">
                        {demo.impact}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Verified Sources
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    {demo.sources.map((source, idx) => (
                      <div 
                        key={idx}
                        className="liquid-glass rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <div className="text-sm font-semibold text-white mb-1">
                          {source.title}
                        </div>
                        <div className="text-xs text-muted-light">
                          {source.org}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex justify-center">
                  <Button 
                    variant="premium" 
                    size="lg"
                    className="shimmer-fast"
                    aria-label="Join waitlist to get full access"
                  >
                    Join Waitlist for Full Access
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {!showDemo && !isTyping && (
          <div className="text-center">
            <p className="text-muted-light text-sm">
              Start typing above to see a live preview
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
