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
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-glow">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to understand any policy, backed by sources you can check.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="glass-card p-8 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon with step number */}
                <div className="relative inline-block mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary pulse-glow">
                    <Icon className="w-7 h-7" />
                  </div>
                  {/* Step number - positioned top-right */}
                  <div className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground text-sm font-semibold shadow-md">
                    {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
