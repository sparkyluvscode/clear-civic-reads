import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, Copy, Check, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface WaitlistFormProps {
  variant?: "inline" | "full";
}

export default function WaitlistForm({ variant = "full" }: WaitlistFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from('waitlist_signups')
        .insert({
          email: email.toLowerCase(),
          source: "waitlist_landing_v2",
          user_agent: navigator.userAgent,
          referer: document.referrer || null,
        })
        .select()
        .single();

      if (dbError) {
        if (dbError.code === '23505') {
          throw new Error('This email is already on the waitlist!');
        }
        throw new Error(dbError.message || 'Failed to submit signup');
      }

      setIsSuccess(true);
      toast({
        title: "You're on the list!",
        description: "We'll notify you when ClearPolicy launches.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Please try again later.";
      toast({
        title: "Submission failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/thanks`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Link copied!",
      description: "Share ClearPolicy with others who care about clear civic information.",
    });
  };

  if (isSuccess && variant === "inline") {
    return (
      <div className="flex items-center gap-3 animate-fade-in">
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
          <span className="text-foreground font-medium text-sm sm:text-base">You're on the list!</span>
        </div>
        <Button onClick={handleCopyLink} variant="outline" size="sm" className="gap-1.5 rounded-xl">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Share"}
        </Button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">You're on the list!</h3>
          <p className="text-muted-foreground">
            We'll notify you when ClearPolicy launches.
          </p>
        </div>
        <Button onClick={handleCopyLink} variant="outline" className="gap-2">
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy waitlist link
            </>
          )}
        </Button>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className={`h-12 sm:h-13 rounded-xl bg-background/60 backdrop-blur-sm border-border/50 text-base pl-4 pr-4 placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/25 shadow-[0_0_12px_hsl(var(--primary)/0.08)] hover:shadow-[0_0_16px_hsl(var(--primary)/0.12)] focus:shadow-[0_0_16px_hsl(var(--primary)/0.15)] transition-shadow ${error ? "border-destructive" : ""}`}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 sm:h-13 px-6 rounded-xl font-semibold text-base btn-glow shimmer gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
        {error && (
          <p className="text-sm text-destructive mt-2">{error}</p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          className={`h-14 text-base ${error ? "border-destructive" : ""}`}
          required
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 text-base font-semibold"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Joining...
          </>
        ) : (
          "Join the Waitlist"
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
