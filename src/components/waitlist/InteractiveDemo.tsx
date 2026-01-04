import { useState, useEffect, useRef } from "react";
import { Search, CheckCircle2, FileText, ExternalLink, Lock } from "lucide-react";
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

const typingSequence = ["Prop 47", "Measure A"];

type DemoState = 'idle' | 'searching' | 'found' | 'paywall' | 'invalid';

export default function InteractiveDemo() {
  const [inputValue, setInputValue] = useState("");
  const [demoState, setDemoState] = useState<DemoState>('idle');
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // Typing animation state
  const [animatedText, setAnimatedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Typing animation effect (Unchanged logic for placeholder typing)
  useEffect(() => {
    if (isFocused || inputValue) {
      setIsAnimating(false);
      if (animationRef.current) clearTimeout(animationRef.current);
      return;
    }

    setIsAnimating(true);
    let sequenceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = "";

    const animate = () => {
      const targetText = typingSequence[sequenceIndex];

      if (!isDeleting) {
        currentText = targetText.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === targetText.length) {
          animationRef.current = setTimeout(() => {
            isDeleting = true;
            animate();
          }, 1500);
          setAnimatedText(currentText);
          return;
        }
      } else {
        currentText = targetText.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          sequenceIndex = (sequenceIndex + 1) % typingSequence.length;
          animationRef.current = setTimeout(animate, 500);
          setAnimatedText("");
          return;
        }
      }

      setAnimatedText(currentText);
      const delay = isDeleting ? 50 : 100;
      animationRef.current = setTimeout(animate, delay);
    };

    animate();

    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [isFocused, inputValue]);

  // Search Logic Effect
  useEffect(() => {
    const query = inputValue.toLowerCase().trim();
    if (!query) {
      setDemoState('idle');
      return;
    }

    // Debounce search
    const timer = setTimeout(() => {
      // 1. Check for specific valid demos first
      if (query.includes("prop") && query.includes("47")) {
        setDemoState('searching');
        setTimeout(() => {
          setCurrentDemo(0);
          setDemoState('found');
        }, 600);
        return;
      }
      if (query.includes("measure") && query.includes("a")) {
        setDemoState('searching');
        setTimeout(() => {
          setCurrentDemo(1);
          setDemoState('found');
        }, 600);
        return;
      }

      // 2. Check for "semi-valid" inputs (keywords)
      // Keywords: Prop, Proposition, Measure, Bill, Act
      const validKeywords = ["prop", "proposition", "measure", "bill", "act"];
      const hasKeyword = validKeywords.some(keyword => query.includes(keyword));

      if (hasKeyword && query.length > 3) {
        setDemoState('searching');
        setTimeout(() => {
          setDemoState('paywall');
        }, 600);
        return;
      }

      // 3. Invalid input (if long enough to be a real attempt)
      if (query.length > 2) {
        setDemoState('invalid');
      } else {
        setDemoState('idle'); // Just typing...
      }

    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const demo = demoExamples[currentDemo];

  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-glow">
            See it in action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Try searching for a ballot measure to see how ClearPolicy makes complex policy instantly understandable.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <div className="glass rounded-2xl p-1 hover:shadow-lg transition-shadow">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder=""
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              {/* Animated placeholder logic */}
              {!inputValue && !isFocused && (
                <div className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  {animatedText}
                  <span className="animate-pulse">|</span>
                </div>
              )}
              {!inputValue && isFocused && (
                <div className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50">
                  Type "Prop 47" or "Measure A"...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="min-h-[200px]">

          {/* SEARCHING STATE */}
          {demoState === 'searching' && (
            <div className="frosted-panel rounded-3xl p-8 animate-scale-in text-center py-12">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.15s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                <span className="ml-2">Searching...</span>
              </div>
            </div>
          )}

          {/* INVALID STATE */}
          {demoState === 'invalid' && (
            <div className="text-center py-8 animate-fade-in">
              <p className="text-muted-foreground bg-muted/30 inline-block px-4 py-2 rounded-lg">
                Please enter a valid Proposition, Measure, or Bill number.
              </p>
            </div>
          )}

          {/* FOUND STATE (Full Demo) */}
          {demoState === 'found' && (
            <div className="frosted-panel rounded-3xl p-6 sm:p-8 animate-scale-in">
              {/* Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary pulse-glow">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {demo.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {demo.summary}
                  </p>
                </div>
              </div>

              {/* Impact */}
              <div className="glass rounded-xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Key Impact</h4>
                    <p className="text-muted-foreground text-sm">
                      {demo.impact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sources */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Verified Sources
                </h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  {demo.sources.map((source, idx) => (
                    <div key={idx} className="card-interactive p-3 cursor-pointer">
                      <div className="text-sm font-medium text-foreground mb-0.5">
                        {source.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {source.org}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PAYWALL STATE (Blurred) */}
          {demoState === 'paywall' && (
            <div className="frosted-panel rounded-3xl p-6 sm:p-8 animate-scale-in relative overflow-hidden text-left">
              {/* Visible Title Section (Unblurred) */}
              <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  {/* We mirror the input as the title */}
                  <h3 className="text-xl font-semibold text-foreground mb-2 capitalize">
                    {inputValue}
                  </h3>
                  <p className="text-muted-foreground blur-[2px] select-none">
                    Requires misdemeanor sentence instead of felony for certain drug possession offenses and most thefts under $950
                  </p>
                </div>
              </div>

              {/* Blurred Body Content */}
              <div className="blur-sm select-none pointer-events-none opacity-50">
                <div className="glass rounded-xl p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Key Impact</h4>
                      <p className="text-muted-foreground text-sm">
                        Estimated 40,000 fewer felony convictions annually. $150-250M annual savings to state corrections.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Verified Sources
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="card-interactive p-3">
                      <div className="text-sm font-medium text-foreground mb-0.5">Official Text</div>
                      <div className="text-xs text-muted-foreground">CA Secretary of State</div>
                    </div>
                    <div className="card-interactive p-3">
                      <div className="text-sm font-medium text-foreground mb-0.5">Fiscal Analysis</div>
                      <div className="text-xs text-muted-foreground">Legislative Analyst's Office</div>
                    </div>
                    <div className="card-interactive p-3">
                      <div className="text-sm font-medium text-foreground mb-0.5">Implementation Data</div>
                      <div className="text-xs text-muted-foreground">CA Dept. of Corrections</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 top-24 z-20 flex flex-col items-center justify-center">
                <div className="text-center p-6 bg-card/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl max-w-sm mx-4 transform transition-all animate-fade-in-up">
                  <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Unlock Full Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Unlock full analysis by joining the waitlist.
                  </p>
                  <Button onClick={scrollToForm} size="lg" className="w-full text-base font-semibold shadow-lg hover:shadow-primary/25">
                    Join Waitlist for Access
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* IDLE STATE */}
          {demoState === 'idle' && (
            <p className="text-center text-sm text-muted-foreground pt-8">
              Watch the typing animation above, or click to search yourself
            </p>
          )}

        </div>
      </div>
    </section>
  );
}
