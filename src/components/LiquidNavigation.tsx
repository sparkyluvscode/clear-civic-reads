import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import clearpolicyLogo from "@/assets/clearpolicy-logo.png";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function LiquidNavigation() {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Trigger animation after mount
        setIsLoaded(true);
        document.body.classList.add("animation-complete");

        // Scroll listener for collapsing nav
        const handleScroll = () => {
            // Trigger collapse when scrolling 1% into the second page
            const threshold = window.innerHeight * 1.01;

            if (window.scrollY > threshold) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.body.classList.remove("animation-complete");
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToForm = () => {
        document.getElementById("waitlist-form")?.scrollIntoView({
            behavior: "smooth"
        });
    };

    return (
        <div className={`glass-nav-wrapper ${isLoaded ? "opacity-100" : "opacity-0"} ${isScrolled ? "glass-nav-wrapper--collapsed" : ""}`}>
            <header className="glass-surface glass-surface--svg">
                <div className="glass-surface__content">

                    {/* Logo / Home */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-1 hover:opacity-80 transition-opacity"
                        aria-label="Back to top"
                    >
                        <img
                            src={clearpolicyLogo}
                            alt="ClearPolicy"
                            className="w-8 h-8 rounded-lg shadow-sm"
                        />
                    </Link>

                    {/* Divider */}
                    <span className="glass-nav__divider" aria-hidden="true"></span>

                    {/* Navigation Links */}
                    <nav className="glass-nav__links hidden sm:flex" aria-label="Site sections">
                        <a
                            href="#impact"
                            onClick={(e) => { e.preventDefault(); document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="cursor-pointer"
                        >
                            Impact
                        </a>
                        <a
                            href="#demo"
                            onClick={(e) => { e.preventDefault(); document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="cursor-pointer"
                        >
                            Demo
                        </a>
                    </nav>

                    {/* Divider (Mobile only hides the links but keeping divider structure consistent) */}
                    <span className="glass-nav__divider hidden sm:block" aria-hidden="true"></span>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="glass-nav__toggle p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-foreground/80" />
                            ) : (
                                <Moon className="w-5 h-5 text-foreground/80" />
                            )}
                        </button>

                        {/* Join Button - Compact for pill */}
                        <Button
                            onClick={scrollToForm}
                            size="sm"
                            className="rounded-full h-8 px-4 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            Join
                        </Button>
                    </div>

                </div>

                {/* Iridescent Holographic Overlay */}
                <div className="glass-nav__surface"></div>

            </header>
        </div>
    );
}
