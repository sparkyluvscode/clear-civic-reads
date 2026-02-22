import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import clearpolicyLogo from "@/assets/clearpolicy-logo.png";
import { useEffect, useState } from "react";

export default function LiquidNavigation() {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`cp-header ${isScrolled ? "cp-header--scrolled" : "cp-header--top"}`}>
            <div className="cp-header__content">
                <Link
                    to="/"
                    className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                    aria-label="ClearPolicy Home"
                >
                    <img
                        src={clearpolicyLogo}
                        alt="ClearPolicy"
                        className="w-8 h-8 rounded-lg"
                    />
                    <span className="font-heading text-lg font-bold text-foreground tracking-tight">
                        ClearPolicy
                    </span>
                </Link>

                <nav className="cp-header__nav hidden sm:flex" aria-label="Site sections">
                    <a
                        href="#demo"
                        onClick={(e) => { e.preventDefault(); document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                        Demo
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-[18px] h-[18px] text-muted-foreground" />
                        ) : (
                            <Moon className="w-[18px] h-[18px] text-muted-foreground" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
