import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function WaitlistForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    zip: "",
    role: "",
    useCase: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateZip = (zip: string) => {
    return /^\d{5}(-\d{4})?$/.test(zip);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.zip && !validateZip(formData.zip)) {
      newErrors.zip = "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)";
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to be contacted";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the secure edge function instead of direct database insert
      const { data, error } = await supabase.functions.invoke('waitlist-signup', {
        body: {
          email: formData.email,
          zip: formData.zip || null,
          role: formData.role || null,
          use_case: formData.useCase || null,
          source: "waitlist_landing_v1",
          user_agent: navigator.userAgent,
          referer: document.referrer || null,
        },
      });

      // Handle both function invocation errors and application errors
      if (error) {
        // Check if the error response has a custom message
        const errorMessage = data?.error || error.message || 'Failed to submit signup';
        throw new Error(errorMessage);
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to submit signup');
      }

      setIsSuccess(true);
      toast({
        title: "You're on the list!",
        description: "Check your email for confirmation. We'll notify you when ClearPolicy launches.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Please try again later.";
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
    const shareUrl = `${window.location.origin}/waitlist`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Link copied!",
      description: "Share ClearPolicy with others who care about clear civic information.",
    });
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-8 animate-fade-in">
        <div className="w-24 h-24 mx-auto glass-strong rounded-full flex items-center justify-center shadow-glass-strong pulse-glow">
          <CheckCircle2 className="h-12 w-12 text-civic-teal drop-shadow-lg" />
        </div>
        <div>
          <h3 className="text-3xl font-black text-foreground mb-3">You're on the list!</h3>
          <p className="text-muted-foreground text-lg font-medium">
            Check your email for confirmation. We'll notify you when ClearPolicy launches in your area.
          </p>
        </div>
        <Button onClick={handleCopyLink} variant="secondary" size="lg" className="gap-2 shadow-lg hover:shadow-xl">
          {copied ? (
            <>
              <Check className="h-5 w-5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" />
              Copy waitlist link
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7 max-w-lg mx-auto">
      <div className="space-y-3">
        <Label htmlFor="email" className="text-base font-bold">
          Email address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`h-12 text-base rounded-xl border-2 ${errors.email ? "border-destructive" : ""}`}
          required
        />
        {errors.email && (
          <p className="text-sm text-destructive font-medium">{errors.email}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="zip" className="text-base font-bold">
          ZIP code (helps us prioritize your area)
        </Label>
        <Input
          id="zip"
          type="text"
          placeholder="12345"
          value={formData.zip}
          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
          className={`h-12 text-base rounded-xl border-2 ${errors.zip ? "border-destructive" : ""}`}
          maxLength={10}
        />
        {errors.zip && (
          <p className="text-sm text-destructive font-medium">{errors.zip}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="role" className="text-base font-bold">
          I am a...
        </Label>
        <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
          <SelectTrigger id="role" className="h-12 rounded-xl border-2">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="voter">Voter</SelectItem>
            <SelectItem value="journalist">Journalist / Creator</SelectItem>
            <SelectItem value="nonprofit">Nonprofit / Advocate</SelectItem>
            <SelectItem value="official">Public Official / Staff</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="useCase" className="text-base font-bold">
          What would you use ClearPolicy for? (optional)
        </Label>
        <Textarea
          id="useCase"
          placeholder="E.g., 'Understanding ballot measures before voting' or 'Research for articles'"
          value={formData.useCase}
          onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
          className="min-h-[100px] resize-none rounded-xl border-2"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground font-medium">
          {formData.useCase.length}/500 characters
        </p>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="consent"
          checked={formData.consent}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, consent: checked as boolean })
          }
          className={errors.consent ? "border-destructive" : ""}
        />
        <div className="space-y-1 leading-none">
          <Label
            htmlFor="consent"
            className="text-sm font-normal cursor-pointer"
          >
            I agree to be contacted about early access and product feedback.{" "}
            <span className="text-destructive">*</span>
          </Label>
          {errors.consent && (
            <p className="text-sm text-destructive">{errors.consent}</p>
          )}
        </div>
      </div>

      <div className="pt-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-lg font-bold shadow-xl hover:shadow-2xl"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Joining...
            </>
          ) : (
            "Join the waitlist"
          )}
        </Button>
        <p className="text-sm text-center text-muted-foreground mt-4 font-medium">
          No spam. Unsubscribe anytime. We only use your info for early access updates.
        </p>
      </div>
    </form>
  );
}
