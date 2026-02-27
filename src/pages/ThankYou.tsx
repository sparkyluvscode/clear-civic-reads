import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import clearpolicyLogo from "@/assets/clearpolicy-logo.png";
import LiquidNavigation from "@/components/LiquidNavigation";

export default function ThankYou() {
  return (
    <div className="min-h-screen text-foreground transition-colors duration-300">
      <LiquidNavigation />

      <main className="pt-16 relative z-10 flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
          <div className="glass-card max-w-xl w-full p-8 sm:p-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--cp-green)/0.1)] flex items-center justify-center border border-[hsl(var(--cp-green)/0.2)]">
                <CheckCircle2 className="w-8 h-8 text-[hsl(var(--cp-green))]" />
              </div>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
              Thanks for joining the waitlist!
            </h1>
            <p className="text-[16px] text-muted-foreground leading-relaxed mb-6">
              You'll be notified when ClearPolicy launches.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Follow{" "}
              <a
                href="https://linkedin.com/in/pranilraichura"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-colors"
              >
                linkedin.com/in/pranilraichura
              </a>
              {" "}for updates.
            </p>

            <Link
              to="/"
              className="btn-cp inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-[15px]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-[hsl(var(--border))] py-10 px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <img
                src={clearpolicyLogo}
                alt="ClearPolicy"
                className="w-7 h-7 rounded-lg"
              />
              <span className="font-heading text-sm font-bold text-foreground tracking-tight">ClearPolicy</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>

            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ClearPolicy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
