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
    <section className="py-20 px-4 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why trust ClearPolicy?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for transparency, designed for clarity. Every feature reinforces trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass p-8 rounded-2xl shadow-glass hover:shadow-glass-hover transition-all duration-500 hover-lift group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl glass bg-gradient-glass flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 glass p-8 rounded-2xl shadow-glass hover:shadow-glass-hover transition-all duration-500">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-xl glass bg-gradient-glass flex items-center justify-center">
                <Shield className="h-7 w-7 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Privacy first
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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
