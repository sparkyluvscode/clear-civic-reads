import { Calendar, MapPin, Rocket } from "lucide-react";

const timeline = [
  {
    phase: "Alpha Launch",
    date: "Q2 2025",
    regions: ["San Francisco Bay Area", "Los Angeles County"],
    status: "In Development",
    icon: Rocket
  },
  {
    phase: "Beta Expansion",
    date: "Q3 2025",
    regions: ["Seattle/Portland", "Austin", "Denver", "Boston"],
    status: "Planned",
    icon: MapPin
  },
  {
    phase: "Nationwide",
    date: "Q4 2025 - Q1 2026",
    regions: ["All 50 States", "Major cities & counties"],
    status: "Roadmap",
    icon: Calendar
  }
];

export default function LaunchTimeline() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[20%] right-[15%] w-[350px] h-[350px] bg-gradient-orb-ice opacity-25 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 text-glow-hero">
            Launch Timeline
          </h2>
          <p className="text-xl text-light max-w-2xl mx-auto font-medium">
            We're launching city by city, starting with areas of highest demand. <span className="text-white font-bold">Your ZIP code helps us prioritize.</span>
          </p>
        </div>

        <div className="space-y-6">
          {timeline.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <div 
                key={idx}
                className="liquid-glass-strong rounded-3xl p-8 shadow-glass-strong hover:shadow-glass-hover transition-all duration-500 group relative overflow-hidden"
              >
                {/* Inner highlights */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="liquid-glass rounded-2xl p-4 border border-ice-blue/30 shadow-glow-ice group-hover:scale-110 transition-transform duration-500">
                      <Icon className="h-8 w-8 text-ice-blue" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white">
                        {phase.phase}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-ice-blue/20 text-ice-blue border border-ice-blue/30">
                        {phase.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {phase.regions.map((region, ridx) => (
                        <span 
                          key={ridx}
                          className="text-light text-sm"
                        >
                          {region}{ridx < phase.regions.length - 1 ? " •" : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">
                        {phase.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-light text-sm mb-4">
            💡 Timeline subject to change based on development progress and demand
          </p>
          <p className="text-light font-medium">
            <span className="text-white font-bold">Join the waitlist</span> to get notified when we launch in your area
          </p>
        </div>
      </div>
    </section>
  );
}
