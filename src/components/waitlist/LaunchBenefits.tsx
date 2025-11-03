import { Bell, FileText, Smartphone } from "lucide-react";

const benefits = [
  {
    icon: Bell,
    title: "Personalized alerts",
    description: "Get notified about ballot measures and bills relevant to your ZIP code and interests.",
  },
  {
    icon: FileText,
    title: "Clear, shareable summaries",
    description: "Explanations with source links you can share with friends, family, or your audience.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first experience",
    description: "Quick reads on your phone when you need them—at the polls or on the go.",
  },
];

export default function LaunchBenefits() {
  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What you'll get at launch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Early access members will be first to experience these features when we launch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl glass bg-gradient-glass mb-6 group-hover:scale-110 transition-all duration-500 shadow-glass">
                  <Icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
