import { Users, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function SocialProof() {
  const [count, setCount] = useState(847);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const cities = [
    "San Francisco", "Los Angeles", "Seattle", "Portland", "Austin",
    "Denver", "Boston", "New York", "Chicago", "Miami"
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-orb-silver opacity-25 rounded-full blur-[130px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="liquid-glass-strong rounded-3xl p-12 text-center shadow-glass-strong relative overflow-hidden">
          {/* Inner highlights */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="h-8 w-8 text-ice-blue" />
              <TrendingUp className="h-8 w-8 text-ice-blue animate-pulse" />
            </div>
            
            <div className="mb-4">
              <div className="text-6xl md:text-7xl font-black text-foreground mb-2 text-glow-hero">
                {count.toLocaleString()}+
              </div>
              <p className="text-xl text-light font-semibold">
                Voters joined from <span className="text-foreground">{cities.length}</span> cities
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {cities.slice(0, 6).map((city, idx) => (
                <div 
                  key={idx}
                  className="liquid-glass rounded-full px-5 py-2 text-sm font-medium text-foreground border border-foreground/20"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {city}
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-muted-light mb-6">AS FEATURED IN</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                {['TechCrunch', 'The Verge', 'Wired', 'Axios'].map((pub, idx) => (
                  <div 
                    key={idx}
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {pub}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-light mt-4">(Coming Soon)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
