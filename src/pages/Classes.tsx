import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Gift } from "lucide-react";
import { motion } from "framer-motion";
import classesHero from "@/assets/classes-hero.jpg";
import AnimatedSection from "@/components/AnimatedSection";

type Category = "All" | "Stress Relief" | "Sleep" | "Focus" | "Emotional Balance" | "Nature Sounds";

interface Session {
  id: number;
  title: string;
  desc: string;
  duration: string;
  category: Category;
  emoji: string;
  color: string;
}

const sessions: Session[] = [
  { id: 1, title: "5-Minute Instant Stress Relief", desc: "Quick breathing meditation", duration: "5 min", category: "Stress Relief", emoji: "🧘", color: "border-t-stress" },
  { id: 2, title: "Let Go of Anxiety Meditation", desc: "Release anxious thoughts", duration: "10 min", category: "Stress Relief", emoji: "🍃", color: "border-t-stress" },
  { id: 3, title: "Body Relaxation Meditation", desc: "Head-to-toe progressive relaxation", duration: "12 min", category: "Stress Relief", emoji: "💆", color: "border-t-stress" },
  { id: 4, title: "Emotional Reset Meditation", desc: "Release tension and negativity", duration: "10 min", category: "Stress Relief", emoji: "🔄", color: "border-t-stress" },
  { id: 5, title: "Work Stress Detox", desc: "For professionals after work", duration: "15 min", category: "Stress Relief", emoji: "💼", color: "border-t-stress" },
  { id: 6, title: "Deep Sleep Guided Meditation", desc: "Fall asleep faster", duration: "20 min", category: "Sleep", emoji: "🌙", color: "border-t-sleep" },
  { id: 7, title: "Night Calm Meditation", desc: "Pre-bedtime wind down", duration: "15 min", category: "Sleep", emoji: "🌌", color: "border-t-sleep" },
  { id: 8, title: "Sleep Story – Peaceful Forest", desc: "Drift into sleep", duration: "18 min", category: "Sleep", emoji: "🌲", color: "border-t-sleep" },
  { id: 9, title: "Sleep Sounds – Ocean Waves", desc: "Natural soundscape", duration: "30 min", category: "Sleep", emoji: "🌊", color: "border-t-sleep" },
  { id: 10, title: "Sleep Healing Meditation", desc: "Quiet the body and mind", duration: "20 min", category: "Sleep", emoji: "✨", color: "border-t-sleep" },
  { id: 11, title: "Morning Mind Clarity", desc: "Start calm and focused", duration: "10 min", category: "Focus", emoji: "☀️", color: "border-t-focus" },
  { id: 12, title: "Focus Booster Meditation", desc: "Pre-work mental prep", duration: "7 min", category: "Focus", emoji: "🎯", color: "border-t-focus" },
  { id: 13, title: "Productivity Reset Meditation", desc: "Clear mental clutter", duration: "8 min", category: "Focus", emoji: "⚡", color: "border-t-focus" },
  { id: 14, title: "Self-Confidence Meditation", desc: "Build positive belief", duration: "10 min", category: "Emotional Balance", emoji: "💪", color: "border-t-emotional" },
  { id: 15, title: "Gratitude Meditation", desc: "Rewire for positivity", duration: "10 min", category: "Emotional Balance", emoji: "🙏", color: "border-t-emotional" },
  { id: 16, title: "Letting Go Meditation", desc: "Release emotional burdens", duration: "12 min", category: "Emotional Balance", emoji: "🕊️", color: "border-t-emotional" },
  { id: 17, title: "Rain Sound Relaxation", desc: "Gentle rain ambience", duration: "30 min", category: "Nature Sounds", emoji: "🌧️", color: "border-t-nature" },
  { id: 18, title: "Forest Nature Calm", desc: "Birds and woodland sounds", duration: "30 min", category: "Nature Sounds", emoji: "🌳", color: "border-t-nature" },
  { id: 19, title: "Himalayan Wind Meditation", desc: "Mountain wind soundscape", duration: "20 min", category: "Nature Sounds", emoji: "🏔️", color: "border-t-nature" },
  { id: 20, title: "River Flow Relaxation", desc: "Flowing water sounds", duration: "25 min", category: "Nature Sounds", emoji: "🏞️", color: "border-t-nature" },
];

const categories: Category[] = ["All", "Stress Relief", "Sleep", "Focus", "Emotional Balance", "Nature Sounds"];

export default function Classes() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? sessions : sessions.filter((s) => s.category === active);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <img src={classesHero} alt="Forest stream" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground"
          >
            Your Relaxation Session Library
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-muted mt-3"
          >
            20+ guided meditation and relaxation sessions — designed for every mood and moment
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
                    active === cat
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-foreground/70 border border-border hover:bg-primary/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Session cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map((s, i) => (
                <AnimatedSection key={s.id} delay={i * 0.03}>
                  <div className={`relative bg-card rounded-xl border border-border/50 ${s.color} border-t-4 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{s.emoji}</span>
                        <span className="font-accent text-xs bg-background px-2 py-1 rounded-full text-muted">{s.duration}</span>
                      </div>
                      <h3 className="font-display text-base font-semibold text-foreground mb-1">{s.title}</h3>
                      <p className="font-body text-sm text-muted">{s.desc}</p>
                    </div>
                    {/* Lock overlay */}
                    <div className="absolute inset-0 bg-card/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 bg-card/90 px-4 py-2 rounded-lg shadow-sm">
                        <Lock className="w-4 h-4 text-muted" />
                        <span className="font-body text-sm font-medium text-foreground">Subscribe to Unlock</span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Sidebar desktop / bottom bar mobile */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24 bg-card rounded-xl border border-border/50 p-6 shadow-sm">
              <Gift className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">Subscribe Now & Start Relaxing</h3>
              <p className="font-body text-sm text-muted mb-1">₹1000 Cashback as Amazon Voucher</p>
              <p className="font-body text-xs text-muted mb-5">Offer valid till April 30</p>
              <Link
                to="/auth"
                className="block text-center px-6 py-3 rounded-lg bg-accent text-accent-foreground font-body font-semibold animate-pulse-ring"
              >
                Subscribe for ₹2000
              </Link>
              <p className="font-body text-xs text-muted mt-3 text-center">30-day full access • Instant delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
