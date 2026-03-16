import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What is ToRelax?", a: "ToRelax is a mental wellness platform that offers guided meditation sessions, deep sleep audio, stress relief programs, and relaxing nature sounds — all designed for Indian users seeking calm and balance in their daily lives." },
  { q: "How does the subscription work?", a: "Once you subscribe, you get instant access to all 20+ sessions for 30 days. Access your content anytime, on any device — no downloads required." },
  { q: "How much does it cost?", a: "The subscription costs ₹2000 inclusive of GST for 30 days of full access to all sessions and features." },
  { q: "What is the cashback offer?", a: "New subscribers receive a ₹1000 Amazon Gift Voucher as instant cashback. This limited-time offer is available until April 15, 2025." },
  { q: "When will I receive the Amazon gift voucher?", a: "The ₹1000 Amazon Gift Voucher will be sent to your registered email within 24 hours of successful payment." },
  { q: "Can I get a receipt for corporate reimbursement?", a: "Yes! A GST-compliant payment receipt is sent instantly to your email after payment. You can use this for corporate wellness reimbursement." },
  { q: "How long are the sessions?", a: "Sessions range from 5 to 30 minutes. Whether you have a quick break or a longer wind-down period, there's a session for every moment." },
  { q: "Can I access ToRelax on multiple devices?", a: "Yes, you can access all sessions from your phone, tablet, or desktop browser. No app download is needed." },
  { q: "Is my payment secure?", a: "Absolutely. We use industry-standard encryption and secure payment gateways to protect your financial information." },
  { q: "Who can benefit from ToRelax?", a: "Anyone! Whether you're a busy professional, student, homemaker, or senior — our sessions are designed to help everyone find calm, better sleep, and emotional balance." },
  { q: "Can I cancel my subscription?", a: "Our subscriptions are for a fixed 30-day period. While we don't offer mid-term cancellations, you won't be auto-charged for renewal." },
  { q: "How can I contact support?", a: "You can reach us anytime at support@torelax.in. We typically respond within 24 hours." },
];

export default function FAQ() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground"
          >
            Frequently Asked Questions
          </motion.h1>
        </div>
      </section>

      <section className="py-12 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedSection>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-6 overflow-hidden">
                  <AccordionTrigger className="font-display text-base font-semibold text-foreground hover:no-underline py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm text-muted pb-5 leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mt-12 text-center bg-card rounded-xl p-8 border border-border/50">
              <p className="font-display text-lg font-semibold text-foreground mb-2">Still have questions?</p>
              <p className="font-body text-sm text-muted">
                Email us at{" "}
                <a href="mailto:support@torelax.in" className="text-primary font-medium hover:underline">
                  support@torelax.in
                </a>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
