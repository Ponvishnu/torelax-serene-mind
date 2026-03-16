import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Gift, Monitor, Tablet, Smartphone } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const features = [
  "20+ guided meditation sessions",
  "Deep sleep meditation & bedtime stories",
  "Stress relief & anxiety reduction",
  "Nature soundscapes",
  "Breathing exercises",
  "New content added regularly",
];

const weeks = [
  { week: 1, title: "Stress Relief", desc: "Breathing techniques & tension release", emoji: "🟢" },
  { week: 2, title: "Sleep Improvement", desc: "Deep sleep meditations & calming stories", emoji: "🌙" },
  { week: 3, title: "Emotional Balance", desc: "Mindfulness & emotional stability", emoji: "💛" },
  { week: 4, title: "Focus & Clarity", desc: "Concentration & mental sharpness", emoji: "🧠" },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background relative overflow-hidden">
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            ToRelax Monthly Wellness Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg text-muted"
          >
            ₹2000 (Incl. GST) • 30 Days • Full Access
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedSection>
            <p className="font-body text-foreground/80 leading-relaxed text-center">
              ToRelax is a mental wellness platform designed for modern Indian professionals and individuals seeking calm, balance, and better sleep. Our curated meditation sessions, sleep stories, and nature soundscapes help you unwind in just 10 minutes a day — backed by mindfulness practices trusted worldwide.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
              What You Get
            </h2>
          </AnimatedSection>
          <div className="space-y-4">
            {features.map((f, i) => (
              <AnimatedSection key={f} delay={i * 0.08}>
                <div className="flex items-center gap-3 font-body text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  {f}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Week Program */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
              4-Week Program Structure
            </h2>
          </AnimatedSection>

          {/* Desktop horizontal */}
          <div className="hidden md:flex items-start justify-between relative">
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-border" />
            {weeks.map((w, i) => (
              <AnimatedSection key={w.week} delay={i * 0.15} className="flex flex-col items-center w-1/4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl mb-3 shadow-md">
                  {w.emoji}
                </div>
                <h4 className="font-display text-base font-semibold text-foreground">Week {w.week}</h4>
                <p className="font-body text-sm font-medium text-primary">{w.title}</p>
                <p className="font-body text-xs text-muted text-center mt-1">{w.desc}</p>
              </AnimatedSection>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden flex flex-col gap-6">
            {weeks.map((w, i) => (
              <AnimatedSection key={w.week} delay={i * 0.1} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-lg shadow-md">
                    {w.emoji}
                  </div>
                  {i < 3 && <div className="w-0.5 h-12 bg-border mt-1" />}
                </div>
                <div className="pt-1">
                  <h4 className="font-display text-base font-semibold text-foreground">Week {w.week}: {w.title}</h4>
                  <p className="font-body text-sm text-muted">{w.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Cashback Offer */}
      <section className="py-16 bg-highlight">
        <div className="container mx-auto px-4 max-w-lg">
          <AnimatedSection>
            <div className="bg-card rounded-2xl p-8 text-center shadow-md border border-accent/20">
              <Gift className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Subscribe ₹2000 → Get ₹1000 Amazon Gift Voucher</h3>
              <p className="font-body text-sm text-muted">Limited period offer for new subscribers</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Access Anywhere */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">Access Anywhere</h2>
          </AnimatedSection>
          <div className="flex justify-center gap-12">
            {[
              { icon: Smartphone, label: "Phone" },
              { icon: Tablet, label: "Tablet" },
              { icon: Monitor, label: "Desktop" },
            ].map((d, i) => (
              <AnimatedSection key={d.label} delay={i * 0.15}>
                <div className="flex flex-col items-center gap-2">
                  <d.icon className="w-10 h-10 text-primary" />
                  <span className="font-body text-sm text-muted">{d.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              Start Your 30-Day Relaxation Plan Today
            </h2>
            <Link
              to="/auth"
              className="inline-flex px-10 py-4 rounded-xl bg-accent text-accent-foreground font-body font-semibold text-lg animate-pulse-ring"
            >
              Subscribe Now — ₹2000
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
