import { CheckCircle2 } from "lucide-react";
import clearPolicyAnimation from "@/assets/clearpolicy-animation.mp4";
import clearPolicyLogo from "@/assets/clearpolicy-logo.png";
import WaitlistForm from "@/components/waitlist/WaitlistForm";

const benefits = [
  "Plain-English explanations at any reading level",
  "Every claim backed by verifiable citations",
  "Local ballot measures for your ZIP code",
];

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-6 py-8 md:py-12 relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src={clearPolicyAnimation}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover opacity-[0.50] dark:opacity-[0.45] blur-[1px] scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="flex items-center gap-2 mb-5 animate-fade-in group w-fit mx-auto lg:mx-0">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-foreground font-semibold tracking-wide text-sm sm:text-base">100+ people joined the waitlist!</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5 animate-fade-in text-glow">
              Policy clarity, with sources you can check
            </h1>

            <p
              className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              Plain-English explanations of bills and ballot measures—backed by{" "}
              <span className="text-foreground font-medium">citations</span>.
              Join the waitlist to get early access.
            </p>

            {/* Benefits */}
            <ul
              className="space-y-3 mb-8 animate-fade-in inline-block text-left"
              style={{ animationDelay: '0.2s' }}
            >
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 icon-glow" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Inline Waitlist Form */}
            <div
              id="waitlist-form"
              className="animate-fade-in flex justify-center lg:justify-start scroll-mt-24"
              style={{ animationDelay: '0.3s' }}
            >
              <WaitlistForm variant="inline" />
            </div>

            <p
              className="text-xs text-muted-foreground mt-3 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Logo */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full scale-110 animate-pulse opacity-50 dark:opacity-70" />
              <div className="absolute inset-0 blur-2xl bg-accent/20 rounded-full" />
              <img
                src={clearPolicyLogo}
                alt="ClearPolicy"
                className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
