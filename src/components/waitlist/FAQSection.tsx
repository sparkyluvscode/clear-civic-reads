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
    <section className="py-20 px-4 bg-neutral-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about ClearPolicy.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
