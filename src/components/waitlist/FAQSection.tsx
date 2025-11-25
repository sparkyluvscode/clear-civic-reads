import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is ClearPolicy non-partisan?",
    answer: "Yes. ClearPolicy provides neutral summaries with visible citations and transparent methods. We don't endorse candidates or positions—we explain what policies would do, who they affect, and why they matter.",
  },
  {
    question: "Where do you get your information?",
    answer: "We pull from public legislative sources, official government documents, and authoritative datasets. Every claim links to its source so you can verify and read more.",
  },
  {
    question: "How accurate is this?",
    answer: "Every summary is backed by citations to source documents. You can click any claim to see where it comes from and judge the evidence yourself. Our transparent sourcing means you're never asked to trust a black-box summary.",
  },
  {
    question: "Is it free?",
    answer: "Early access is free. We'll share updates about pricing or funding models before any broader launch. Our goal is to keep the service accessible to all voters.",
  },
  {
    question: "When will my area be supported?",
    answer: "Join the waitlist with your ZIP code—we'll prioritize areas based on demand and upcoming election cycles. We're starting with high-interest regions and expanding from there.",
  },
  {
    question: "Which areas launch first?",
    answer: "We're prioritizing states and localities with upcoming elections and high signup interest. Your ZIP code helps us know where to focus development effort.",
  },
  {
    question: "How is my data used?",
    answer: "We only use your email and ZIP code to send early-access updates and collect product feedback. We don't sell your information, serve ads based on it, or share it with third parties.",
  },
  {
    question: "Can I see a demo?",
    answer: "We're building the first version now. Waitlist members will get early access to test features and give feedback before the public launch.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 px-4 relative">
      {/* Background orb - OPTIMIZED */}
      <div className="absolute top-1/2 left-[5%] w-[450px] h-[450px] bg-gradient-orb-blue opacity-25 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">
            Frequently asked questions
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            Everything you need to know about ClearPolicy.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-5">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-strong rounded-3xl px-7 shadow-glass-strong hover:shadow-glass-hover transition-all duration-300 border-0"
            >
              <AccordionTrigger className="text-left font-bold hover:no-underline py-6 text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-6 leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
