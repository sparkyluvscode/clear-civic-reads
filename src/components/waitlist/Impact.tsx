import { useRef } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import kileyPhoto from "@/assets/kiley.jpg";

const testimonialImages = import.meta.glob('@/assets/testimonials/*.png', { eager: true, as: 'url' });
const testimonials = Object.values(testimonialImages);

export default function Impact() {
  const plugin = useRef(
    AutoScroll({
      speed: 2.1,
      stopOnInteraction: false,
      stopOnMouseEnter: true
    }),
  );

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Impact</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-tight">
            Making a Real Impact
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto leading-[1.7]">
            From verified voters to elected officials, ClearPolicy is already changing the conversation.
          </p>
        </div>

        {/* Kiley Photo */}
        <div className="relative animate-fade-in max-w-3xl mx-auto w-full">
          <div className="relative rounded-2xl overflow-hidden border border-[hsl(var(--border))] shadow-lg">
            <img
              src={kileyPhoto}
              alt="Pranil with Congressman Kiley"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-8 pt-24 text-center">
              <div className="inline-flex items-center gap-2 bg-[hsl(var(--cp-gold))] text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                Congressional Recognition
              </div>
              <p className="text-white font-heading font-bold text-xl md:text-2xl mb-1">
                "We need tools like this!" — Congressman Kiley
              </p>
              <p className="text-white/70 text-sm">
                Demoed at the Congressional Reception
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="w-full">
        <div className="text-center mb-8">
          <p className="section-label mb-3">Community</p>
          <h3 className="font-heading text-xl font-bold text-foreground">
            What the Community is Saying
          </h3>
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
              <CarouselItem key={index} className="pl-6 md:pl-8 basis-auto">
                <div className="h-[120px] flex items-center justify-center">
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
    </section>
  );
}
