import { Shield, BookOpen, Layers, Map } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Non-partisan and citation-first",
    description: "Neutral summaries with every claim linked to a verifiable source.",
  },
  {
    icon: BookOpen,
    title: "Reading-level toggle",
    description: "Choose simple or expert explanations—same facts, different depth.",
  },
  {
    icon: Map,
    title: "Local and timely",
    description: "See what's on your ballot, specific to your ZIP code and election cycle.",
  },
  {
    icon: Layers,
    title: "Transparent sourcing",
    description: "A visible source meter shows how well each claim is backed by evidence.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-24 px-4 relative">
      {/* Background droplets - Enhanced variety */}
      <div className="droplet top-[10%] left-[15%] w-28 h-28 blur-[38px] droplet-float" />
      <div className="droplet bottom-[15%] right-[20%] w-32 h-32 blur-[40px] droplet-float-slow" style={{ animationDelay: '4s' }} />
      <div className="droplet top-[50%] left-[8%] w-24 h-24 blur-[36px] droplet-float" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5 text-glow-hero">
            Why <span className="relative inline-block">
              <span className="relative z-10">trust</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-primary/20 blur-sm -z-0"></span>
            </span> ClearPolicy?
          </h2>
          <p className="text-xl text-light max-w-2xl mx-auto font-medium">
            Built for <span className="text-foreground font-bold">transparency</span>, designed for <span className="text-foreground font-bold">clarity</span>. Every feature reinforces trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-9 rounded-3xl liquid-glass-strong shadow-glass-strong hover:shadow-glass-hover card-hover-lift shimmer-hover group relative overflow-hidden"
              >
                {/* Inner highlight - enhanced */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
                <div className="flex items-start gap-5">
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-2xl liquid-glass flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow-teal transition-all duration-500 shimmer-hover relative overflow-hidden"
                  >
                    <Icon className="h-8 w-8 text-ice-blue drop-shadow-lg relative z-10" />
                    {/* Inner highlight - enhanced */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-light leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div 
          className="mt-8 p-9 rounded-3xl liquid-glass-strong shadow-glass-strong hover:shadow-glass-hover card-hover-lift shimmer-hover relative overflow-hidden"
        >
          {/* Inner highlight - enhanced */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
          <div className="flex items-start gap-5 relative z-10">
            <div className="flex-shrink-0">
              <div 
                className="w-16 h-16 rounded-2xl liquid-glass flex items-center justify-center shadow-glow-blue shimmer-hover relative overflow-hidden"
              >
                <Shield className="h-8 w-8 text-ice-blue drop-shadow-lg relative z-10" />
                {/* Inner highlight - enhanced */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                Privacy first
              </h3>
              <p className="text-light leading-relaxed text-base">
                We only use your information to provide early access updates and invite feedback. 
                No resale, no third-party ads, no tracking beyond what's necessary to serve you better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
