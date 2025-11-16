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
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Floating glass orb background */}
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-gradient-orb-teal opacity-40 rounded-full blur-[130px] orb-float pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
            What you'll get at launch
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            Early access members will be <span className="text-foreground font-bold">first</span> to experience these features when we launch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                {/* Card with glass effect */}
                <div className="liquid-glass-strong rounded-3xl p-10 shadow-glass-strong hover:shadow-glass-hover transition-all duration-500 card-hover-lift relative overflow-hidden h-full">
                  {/* Inner highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div 
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl liquid-glass mb-8 group-hover:scale-110 group-hover:shadow-glow-blue transition-all duration-500 shimmer-hover relative overflow-hidden"
                    >
                      <Icon className="h-10 w-10 text-ice-blue drop-shadow-lg relative z-10" />
                      {/* Inner highlight */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-5 leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
