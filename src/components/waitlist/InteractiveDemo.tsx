import { useState, useEffect, useRef } from "react";
import { Search, CheckCircle2, FileText, ExternalLink } from "lucide-react";

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

export default function InteractiveDemo() {
  const [inputValue, setInputValue] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Typing animation state
  const [animatedText, setAnimatedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Typing animation effect
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
        // Typing
        currentText = targetText.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === targetText.length) {
          // Pause at end of word
          animationRef.current = setTimeout(() => {
            isDeleting = true;
            animate();
          }, 1500);
          setAnimatedText(currentText);
          return;
        }
      } else {
        // Deleting
        currentText = targetText.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          sequenceIndex = (sequenceIndex + 1) % typingSequence.length;
          // Pause before typing next word
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

  useEffect(() => {
    if (inputValue.toLowerCase().includes("prop") || inputValue.toLowerCase().includes("measure")) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setShowDemo(true);
        setIsTyping(false);
        setCurrentDemo(inputValue.toLowerCase().includes("47") ? 0 : 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setShowDemo(false);
    }
  }, [inputValue]);

  const demo = demoExamples[currentDemo];

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

        {/* Search Input with typing animation */}
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
              {/* Animated placeholder */}
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

        {/* Demo Preview */}
        {(showDemo || isTyping) && (
          <div className="frosted-panel rounded-3xl p-6 sm:p-8 animate-scale-in">
            {isTyping ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.15s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <span className="ml-2">Searching...</span>
                </div>
              </div>
            ) : (
              <div>
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
                      <div 
                        key={idx}
                        className="card-interactive p-3 cursor-pointer"
                      >
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
          </div>
        )}

        {!showDemo && !isTyping && (
          <p className="text-center text-sm text-muted-foreground">
            Watch the typing animation above, or click to search yourself
          </p>
        )}
      </div>
    </section>
  );
}
