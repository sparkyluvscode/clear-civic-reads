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
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Floating glass orb background */}
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-gradient-orb-teal opacity-40 rounded-full blur-[130px] orb-float pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">
            What you'll get at launch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Early access members will be <span className="text-foreground font-bold">first</span> to experience these features when we launch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div 
                  className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8 group-hover:scale-110 group-hover:shadow-glow-blue transition-all duration-500 shadow-glass-strong hover-lift relative overflow-hidden"
                  style={{ 
                    background: 'hsla(0, 0%, 100%, 0.92)',
                    backdropFilter: 'blur(48px) saturate(200%)',
                    border: '2px solid hsla(210, 60%, 85%, 0.5)'
                  }}
                >
                  <Icon className="h-12 w-12 text-primary drop-shadow-lg relative z-10" />
                  {/* Inner highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base max-w-sm mx-auto">
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
