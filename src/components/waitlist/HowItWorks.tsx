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
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-trust-blue-light flex items-center justify-center mb-6 transition-transform hover:scale-105">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-border hidden md:block"
                    style={{ display: index === steps.length - 1 ? 'none' : undefined }}
                  />
                  <div className="relative">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-4">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
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
