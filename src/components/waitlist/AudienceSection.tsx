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
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Who it's for
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're voting, reporting, advocating, or governing—ClearPolicy helps you 
            make informed decisions with confidence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="glass p-6 rounded-2xl shadow-glass hover:shadow-glass-hover transition-all duration-500 hover-lift group"
              >
                <div className={`w-16 h-16 rounded-2xl glass bg-gradient-glass flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`h-8 w-8 ${audience.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
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
