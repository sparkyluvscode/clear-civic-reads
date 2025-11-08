import { MapPin, FileSearch, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Enter your ZIP",
    description: "Find what's on your ballot and relevant to your community.",
  },
  {
    icon: FileSearch,
    title: "Pick your measure",
    description: "Clear disambiguation helps you select the exact bill or measure you mean.",
  },
  {
    icon: CheckCircle,
    title: "Read with confidence",
    description: "Plain-English summary with citations you can verify at every step.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 relative">
      {/* Subtle background orb */}
      <div className="absolute top-1/4 right-[5%] w-[400px] h-[400px] bg-gradient-orb-blue opacity-30 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">
            How it works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Three simple steps to understand any policy, backed by <span className="text-foreground font-bold">sources</span> you can check.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative"
              >
                <div className="flex flex-col items-center text-center group">
                  <div 
                    className="w-24 h-24 rounded-3xl flex items-center justify-center mb-7 group-hover:scale-110 transition-all duration-500 shadow-glass-strong hover:shadow-glow-blue shimmer-hover relative overflow-hidden"
                    style={{ 
                      background: 'hsla(0, 0%, 100%, 0.95)',
                      backdropFilter: 'blur(48px) saturate(200%)',
                      border: '2px solid hsla(210, 60%, 85%, 0.6)',
                      boxShadow: 'var(--shadow-glass-strong)'
                    }}
                  >
                    <Icon className="h-11 w-11 text-primary drop-shadow-lg relative z-10" />
                    {/* Inner highlight - enhanced */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                  </div>
                  <div className="absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-[2px] bg-gradient-to-r from-primary/40 via-accent/35 to-primary/40 hidden md:block"
                    style={{ display: index === steps.length - 1 ? 'none' : undefined }}
                  />
                  <div className="relative mb-5">
                    <span 
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full text-primary text-base font-black shadow-glass shimmer-hover relative overflow-hidden"
                      style={{ 
                        background: 'hsla(0, 0%, 100%, 0.95)',
                        backdropFilter: 'blur(48px) saturate(200%)',
                        border: '2px solid hsla(210, 60%, 85%, 0.7)',
                        boxShadow: 'var(--shadow-glass-strong)'
                      }}
                    >
                      <span className="relative z-10">{index + 1}</span>
                      {/* Inner highlight - enhanced */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
