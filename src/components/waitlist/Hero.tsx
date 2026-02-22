import { useRef } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import clearPolicyAnimation from "@/assets/clearpolicy-animation.mp4";
import clearPolicyLogo from "@/assets/clearpolicy-logo.png";
import kileyPhoto from "@/assets/kiley.jpg";
import WaitlistForm from "@/components/waitlist/WaitlistForm";

const testimonialImages = import.meta.glob('@/assets/testimonials/*.png', { eager: true, as: 'url' });
const testimonials = Object.values(testimonialImages);

const trustItems = [
  "Every claim cited",
  "Non-partisan",
  "Local context",
];

export default function Hero() {
  const plugin = useRef(
    AutoScroll({
      speed: 2.1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <section className="min-h-[110vh] flex flex-col relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src={clearPolicyAnimation}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover opacity-[0.12] dark:opacity-[0.08] blur-[2px] scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Main content: headline left, Kiley photo right */}
        <div className="flex-1 flex items-center px-4 sm:px-6 lg:px-12 py-12">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* Left: Content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <p className="section-label mb-4 animate-fade-in">Join the Waitlist</p>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-foreground leading-tight tracking-tight mb-5 animate-fade-in">
                  Policy clarity, with sources you can check
                </h1>

                <p
                  className="text-[16px] sm:text-[17px] text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-[1.7] animate-fade-in"
                  style={{ animationDelay: '0.1s' }}
                >
                  Plain-English explanations of bills and ballot measures — backed by{" "}
                  <span className="text-foreground font-medium">citations you can verify</span>.
                  Join 100+ people on the waitlist for early access.
                </p>

                {/* Inline Waitlist Form */}
                <div
                  id="waitlist-form"
                  className="animate-fade-in flex justify-center lg:justify-start scroll-mt-24 mb-5"
                  style={{ animationDelay: '0.2s' }}
                >
                  <WaitlistForm variant="inline" />
                </div>

                <p
                  className="text-xs text-muted-foreground animate-fade-in mb-6"
                  style={{ animationDelay: '0.25s' }}
                >
                  No spam. Unsubscribe anytime.
                </p>

                {/* Trust badges */}
                <div
                  className="flex flex-wrap items-center gap-4 justify-center lg:justify-start animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  {trustItems.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--cp-green))]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Kiley Photo */}
              <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: '0.15s' }}>
                <div className="relative rounded-2xl overflow-hidden border border-[hsl(var(--border))] shadow-lg max-w-lg mx-auto lg:ml-auto lg:mr-0">
                  <img
                    src={kileyPhoto}
                    alt="Pranil with Congressman Kiley"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 sm:p-6 pt-16 sm:pt-20">
                    <div className="inline-flex items-center gap-2 bg-[hsl(var(--cp-gold))] text-white px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-2">
                      Congressional Recognition
                    </div>
                    <p className="text-white font-heading font-bold text-base sm:text-lg leading-snug mb-0.5">
                      "We need tools like this!" — Congressman Kiley
                    </p>
                    <p className="text-white/60 text-xs">
                      Demoed at the Congressional Reception
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="w-full pb-10 pt-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <img
              src={clearPolicyLogo}
              alt="ClearPolicy"
              className="w-6 h-6 object-contain"
            />
            <p className="section-label">Community</p>
          </div>

          <Carousel
            plugins={[plugin.current]}
            className="w-full pointer-events-none"
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent className="-ml-0 select-none">
              {testimonials.map((imgUrl, index) => (
                <CarouselItem key={index} className="pl-5 md:pl-7 basis-auto">
                  <div className="h-[100px] flex items-center justify-center">
                    <img
                      src={imgUrl}
                      alt={`Testimonial ${index + 1}`}
                      className="h-full w-auto object-contain rounded-xl border border-[hsl(var(--border))] shadow-sm"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
