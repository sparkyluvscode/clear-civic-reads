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
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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
                className="relative"
              >
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-3xl glass bg-gradient-glass flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-glass">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-0.5 bg-gradient-to-r from-primary/30 to-accent/30 hidden md:block"
                    style={{ display: index === steps.length - 1 ? 'none' : undefined }}
                  />
                  <div className="relative mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full glass bg-gradient-glass text-primary text-sm font-bold shadow-md">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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
