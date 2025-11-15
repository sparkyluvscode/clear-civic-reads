import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "Plain language explanations",
    clearpolicy: true,
    ballot: false as boolean | "sometimes",
    news: "sometimes" as boolean | "sometimes"
  },
  {
    feature: "Every claim cited to source",
    clearpolicy: true,
    ballot: false as boolean | "sometimes",
    news: false as boolean | "sometimes"
  },
  {
    feature: "Non-partisan analysis",
    clearpolicy: true,
    ballot: true as boolean | "sometimes",
    news: false as boolean | "sometimes"
  },
  {
    feature: "Shows real-world impact",
    clearpolicy: true,
    ballot: false as boolean | "sometimes",
    news: "sometimes" as boolean | "sometimes"
  },
  {
    feature: "Mobile-friendly & fast",
    clearpolicy: true,
    ballot: false as boolean | "sometimes",
    news: true as boolean | "sometimes"
  },
  {
    feature: "Free & accessible",
    clearpolicy: true,
    ballot: true as boolean | "sometimes",
    news: false as boolean | "sometimes"
  }
];

export default function ComparisonTable() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 text-glow-hero">
            Why ClearPolicy?
          </h2>
          <p className="text-xl text-light max-w-2xl mx-auto font-medium">
            Compare how different sources help you understand ballot measures
          </p>
        </div>

        <div className="liquid-glass-strong rounded-3xl overflow-hidden shadow-glass-strong relative">
          {/* Inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-6 text-white font-bold text-lg">Feature</th>
                  <th className="text-center p-6">
                    <div className="text-ice-blue font-black text-xl">ClearPolicy</div>
                  </th>
                  <th className="text-center p-6">
                    <div className="text-light font-semibold">Official Ballot Language</div>
                  </th>
                  <th className="text-center p-6">
                    <div className="text-light font-semibold">News Articles</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, idx) => (
                  <tr 
                    key={idx} 
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-6 text-light font-medium">{item.feature}</td>
                    <td className="p-6 text-center">
                      {item.clearpolicy === true && (
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-ice-blue/20 border border-ice-blue/30">
                          <Check className="h-6 w-6 text-ice-blue" />
                        </div>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {item.ballot === true ? (
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20">
                          <Check className="h-5 w-5 text-white opacity-50" />
                        </div>
                      ) : item.ballot === "sometimes" ? (
                        <span className="text-muted-light text-sm">Sometimes</span>
                      ) : (
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30">
                          <X className="h-5 w-5 text-red-400 opacity-50" />
                        </div>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {item.news === true ? (
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20">
                          <Check className="h-5 w-5 text-white opacity-50" />
                        </div>
                      ) : item.news === "sometimes" ? (
                        <span className="text-muted-light text-sm">Sometimes</span>
                      ) : (
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30">
                          <X className="h-5 w-5 text-red-400 opacity-50" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
