import { Users, Newspaper, Heart, Briefcase } from "lucide-react";

const audiences = [
  {
    icon: Users,
    title: "Voters",
    description: "Explain this measure to me in two minutes, and show the receipts.",
    color: "text-primary",
    bgColor: "bg-trust-blue-light",
  },
  {
    icon: Newspaper,
    title: "Journalists & Creators",
    description: "Fast, citable background to brief your audience accurately.",
    color: "text-accent",
    bgColor: "bg-civic-teal-light",
  },
  {
    icon: Heart,
    title: "Advocates & Nonprofits",
    description: "Share explanations your community can read and trust.",
    color: "text-accent",
    bgColor: "bg-civic-teal-light",
  },
  {
    icon: Briefcase,
    title: "Public Officials",
    description: "Catch issues early, communicate clearly, and reduce confusion.",
    color: "text-primary",
    bgColor: "bg-trust-blue-light",
  },
];

export default function AudienceSection() {
  return (
    <section className="py-24 px-4 bg-gradient-subtle relative">
      {/* Subtle droplet accents */}
      <div className="absolute top-[20%] right-[12%] w-24 h-24 bg-primary/[0.04] rounded-full blur-[35px] droplet-float" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">
            Who it's for
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Whether you're voting, reporting, advocating, or governing—ClearPolicy helps you 
            make <span className="text-foreground font-bold">informed</span> decisions with <span className="text-foreground font-bold">confidence</span>.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="glass-strong p-7 rounded-3xl shadow-glass-strong hover:shadow-glass-hover transition-all duration-500 hover-lift group"
              >
                <div className={`w-18 h-18 rounded-2xl glass-strong bg-gradient-glass-strong flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-glow-teal transition-all duration-500`}>
                  <Icon className={`h-9 w-9 ${audience.color} drop-shadow-lg`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {audience.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
