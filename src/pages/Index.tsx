import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Check, Brain, Moon, Heart } from "lucide-react";
import heroImg from "@/assets/hero-nature.jpg";
import AnimatedSection from "@/components/AnimatedSection";
import CountdownTimer from "@/components/CountdownTimer";
import CounterAnimation from "@/components/CounterAnimation";

const testimonials = [
  { quote: "My sleep improved within a week.", name: "Priya S.", city: "Chennai", color: "bg-primary" },
  { quote: "Perfect for busy professionals.", name: "Rahul K.", city: "Bangalore", color: "bg-accent" },
  { quote: "Very calming audio sessions.", name: "Anita R.", city: "Coimbatore", color: "bg-secondary" },
  { quote: "Great stress relief program.", name: "Vikram M.", city: "Hyderabad", color: "bg-primary" },
  { quote: "A simple way to relax the mind.", name: "Lakshmi N.", city: "Madurai", color: "bg-accent" },
  { quote: "Helped me stay focused.", name: "Karthik P.", city: "Chennai", color: "bg-secondary" },
  { quote: "Very helpful for mental calmness.", name: "Divya S.", city: "Trichy", color: "bg-primary" },
  { quote: "Worth the subscription.", name: "Arun V.", city: "Bangalore", color: "bg-accent" },
  { quote: "I feel more positive every day.", name: "Meena R.", city: "Salem", color: "bg-secondary" },
  { quote: "Amazing sleep stories.", name: "Suresh K.", city: "Chennai", color: "bg-primary" },
];

const offerFeatures = [
  "Instant access after registration",
  "Guided Meditation sessions",
  "Deep sleep audio tracks",
  "Stress relief programs",
  "Relaxing nature sounds",
];

const weeks = [
  { week: 1, title: "Stress Relief", desc: "Breathing techniques & tension release", emoji: "🟢" },
  { week: 2, title: "Sleep Improvement", desc: "Deep sleep meditations & bedtime stories", emoji: "🌙" },
  { week: 3, title: "Emotional Balance", desc: "Mindfulness & emotional stability", emoji: "💛" },
  { week: 4, title: "Focus & Clarity", desc: "Concentration & mental sharpness", emoji: "🧠" },
];

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden grain-overlay">
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-20">
          <img src={heroImg} alt="Serene misty forest lake" className="w-full h-[120%] object-cover" loading="eager" />
          <div className="absolute inset-0 bg-background/55" />
        </motion.div>

        {/* Breathing rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border border-primary/20 animate-breathe"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
          >
            Relax Your Mind.{" "}
            <span className="text-primary">Recharge Your Life.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-muted mt-6 max-w-xl mx-auto"
          >
            Calm your mind, sleep better, and regain emotional balance — in just 10 minutes a day.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/auth"
              className="px-8 py-4 rounded-xl bg-accent text-accent-foreground font-body font-semibold text-lg animate-pulse-ring"
            >
              Start Your Journey →
            </Link>
            <Link
              to="/classes"
              className="px-8 py-4 rounded-xl border-2 border-primary/30 text-foreground font-body font-semibold text-lg hover:bg-primary/5 transition-colors"
            >
              Explore Sessions
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-8 h-8 text-primary/60 animate-bounce-down" />
        </motion.div>
      </section>

      {/* OFFER BANNER */}
      <section className="bg-highlight py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <span className="inline-block bg-accent/20 text-accent font-accent font-bold text-sm px-4 py-1.5 rounded-full mb-4 animate-blink-glow">
              💰 LIMITED TIME OFFER
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
              Subscribe ₹2000 <span className="text-muted font-body text-lg">(Incl. GST)</span>
            </h2>
            <p className="font-body text-lg text-foreground/80 mb-2">
              Get <span className="font-bold text-accent">₹1000 Instant Cashback</span> as Amazon Gift Voucher
            </p>
            <p className="font-body text-sm text-muted animate-blink-glow mb-8">
              Payment receipt sent instantly to your email for corporate reimbursement
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 max-w-lg mx-auto">
              {offerFeatures.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-2 font-body text-sm text-foreground/80"
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {f}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mb-8">
              <p className="font-accent text-sm text-muted mb-3 uppercase tracking-wider">Offer ends in</p>
              <CountdownTimer />
            </div>
            <Link
              to="/auth"
              className="inline-flex px-8 py-4 rounded-xl bg-accent text-accent-foreground font-body font-semibold text-lg animate-pulse-ring"
            >
              Start Your Relaxation Journey Today →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <span className="text-3xl mb-2 block">🧘</span>
              <CounterAnimation target={10000} suffix="+" />
              <p className="font-body text-muted mt-2">Users</p>
            </div>
            <div>
              <span className="text-3xl mb-2 block">🎧</span>
              <CounterAnimation target={20} suffix="+" />
              <p className="font-body text-muted mt-2">Sessions</p>
            </div>
            <div>
              <span className="text-3xl mb-2 block">⭐</span>
              <CounterAnimation target={49} suffix="" />
              <p className="font-body text-muted mt-2">
                <span className="text-primary font-display text-lg">4.9</span> Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              How It Works
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Brain, title: "Guided Meditation", desc: "Calm your nervous system with expert-led sessions designed for Indian lifestyles." },
              { icon: Moon, title: "Deep Sleep Audio", desc: "Fall asleep faster and wake refreshed with soothing sleep stories and sounds." },
              { icon: Heart, title: "Emotional Balance", desc: "Reduce anxiety and build positivity through mindfulness and gratitude practices." },
            ].map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.15}>
                <div className="bg-card rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-border/50">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <f.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{f.title}</h3>
                  <p className="font-body text-sm text-muted">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM STRUCTURE */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              4-Week Wellness Program
            </h2>
          </AnimatedSection>

          {/* Desktop horizontal */}
          <div className="hidden md:flex items-start justify-between max-w-4xl mx-auto relative">
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-border" />
            {weeks.map((w, i) => (
              <AnimatedSection key={w.week} delay={i * 0.15} className="flex flex-col items-center w-1/4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl mb-4 shadow-md">
                  {w.emoji}
                </div>
                <h4 className="font-display text-lg font-semibold text-foreground mb-1">Week {w.week}</h4>
                <p className="font-body font-medium text-primary text-sm mb-1">{w.title}</p>
                <p className="font-body text-xs text-muted text-center">{w.desc}</p>
              </AnimatedSection>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden flex flex-col gap-6 max-w-sm mx-auto">
            {weeks.map((w, i) => (
              <AnimatedSection key={w.week} delay={i * 0.1} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-lg shadow-md">
                    {w.emoji}
                  </div>
                  {i < 3 && <div className="w-0.5 h-12 bg-border mt-1" />}
                </div>
                <div className="pt-1.5">
                  <h4 className="font-display text-base font-semibold text-foreground">Week {w.week}: {w.title}</h4>
                  <p className="font-body text-sm text-muted">{w.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              What Our Users Say
            </h2>
          </AnimatedSection>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-accent text-sm">⭐</span>
                    ))}
                  </div>
                  <p className="font-display text-sm italic text-foreground/80 mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-accent-foreground font-body text-xs font-bold`}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">{t.name}</p>
                      <p className="font-body text-xs text-muted">{t.city}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Mobile marquee */}
          <div className="md:hidden relative">
            <div className="flex animate-marquee w-[200%]">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="w-72 flex-shrink-0 mx-3 bg-card rounded-xl p-5 shadow-sm border border-border/50">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-accent text-xs">⭐</span>
                    ))}
                  </div>
                  <p className="font-display text-sm italic text-foreground/80 mb-3">"{t.quote}"</p>
                  <p className="font-body text-xs font-medium text-foreground">{t.name} <span className="text-muted">• {t.city}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-primary/10 relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Take 10 minutes today.<br />Transform your life.
            </h2>
            <Link
              to="/payment"
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
