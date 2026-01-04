import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import clearPolicyAnimation from "@/assets/clearpolicy-animation.mp4";
import clearPolicyLogo from "@/assets/clearpolicy-logo.png";

interface HeroProps {
  onJoinClick: () => void;
}

const benefits = [
  "Plain-English explanations at any reading level",
  "Every claim backed by verifiable citations",
  "Local ballot measures for your ZIP code",
];

export default function Hero({ onJoinClick }: HeroProps) {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-6 py-12 md:py-16 relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src={clearPolicyAnimation}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover opacity-[0.45] dark:opacity-[0.40] blur-[1px] scale-125"
        />
        {/* Gradient overlay to blend video into background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Desktop: Side by side | Mobile: Logo on top */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Content - appears second on mobile, first on desktop */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="flex items-center gap-2 mb-6 animate-fade-in group w-fit">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-foreground font-semibold tracking-wide text-sm sm:text-base">1,000+ people joined the waitlist!</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in text-glow">
              Policy clarity, with sources you can check
            </h1>

            <p
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              Plain-English explanations of bills and ballot measures—backed by{" "}
              <span className="text-foreground font-medium">citations</span>.
              Join the waitlist to get early access in your area.
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

            {/* CTA */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <button
                onClick={onJoinClick}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg btn-glow shimmer"
              >
                Get Early Access
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p
              className="text-sm text-muted-foreground mt-4 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Logo - appears first on mobile, second on desktop */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in">
            <div className="relative">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full scale-110 animate-pulse opacity-50 dark:opacity-70" />
              <div className="absolute inset-0 blur-2xl bg-accent/20 rounded-full" />
              <img
                src={clearPolicyLogo}
                alt="ClearPolicy"
                className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
