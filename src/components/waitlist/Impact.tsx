import { useRef } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import kileyPhoto from "@/assets/kiley.jpg";

// Dynamically import all testimonial images
const testimonialImages = import.meta.glob('@/assets/testimonials/*.png', { eager: true, as: 'url' });
const testimonials = Object.values(testimonialImages);

export default function Impact() {
  const plugin = useRef(
    AutoScroll({
      speed: 1.9, // Increased by ~5% from 1.8
      stopOnInteraction: false,
      stopOnMouseEnter: true
    }),
  );

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Content Container (Standard Width) */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-glow">
            Making a Real Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From verified voters to elected officials, ClearPolicy is already changing the conversation.
          </p>
        </div>

        {/* Section 1: Kiley Photo (Centered) */}
        <div className="relative group animate-fade-in max-w-3xl mx-auto w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-2xl overflow-hidden glass shadow-xl border border-white/10">
            <img
              src={kileyPhoto}
              alt="Pranil with Congressman Kevin Kiley"
              className="w-full h-auto object-cover transform transition duration-700 hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 pt-24 text-center">
              <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold mb-3 shadow-lg backdrop-blur-sm">
                <Star className="w-4 h-4 fill-current" />
                <span>Congressional Recognition</span>
              </div>
              <p className="text-white font-bold text-2xl md:text-3xl drop-shadow-md mb-2">
                "Congressman Kiley Approved!"
              </p>
              <p className="text-white/80 text-base md:text-lg">
                Demoed at the Congressional Reception
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Testimonials Carousel (Full Page Width) */}
      <div className="w-full">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-foreground inline-block">
            What the Community is Saying
          </h3>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full pointer-events-none" // Disable interaction as it's a passive ticker
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
                    className="h-full w-auto object-contain rounded-xl border border-white/5 shadow-lg bg-black/20"
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
