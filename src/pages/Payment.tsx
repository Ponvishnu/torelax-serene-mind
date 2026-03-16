import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Zap, Gift } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CountdownTimer from "@/components/CountdownTimer";

export default function Payment() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! In a production environment, this would redirect to a secure payment gateway.");
  };

  return (
    <div className="pt-16">
      <section className="py-12 md:py-20 bg-background min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl md:text-4xl font-bold text-center text-foreground mb-12"
          >
            Complete Your Subscription
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Order Summary */}
            <AnimatedSection>
              <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm h-full">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between font-body">
                    <span className="text-foreground">ToRelax Monthly Plan — 30 Days</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-body text-muted line-through text-lg">₹3000</span>
                    <span className="font-display text-3xl font-bold text-foreground">₹2000</span>
                    <span className="font-body text-xs text-muted">(incl. GST)</span>
                  </div>
                </div>

                <div className="bg-highlight rounded-xl p-4 mb-6 flex items-start gap-3">
                  <Gift className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-sm font-semibold text-foreground">₹1000 Amazon Gift Voucher included</p>
                    <p className="font-body text-xs text-muted mt-0.5">Sent to your email within 24 hours</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {["Instant access to all sessions", "GST receipt sent by email"].map((t) => (
                    <div key={t} className="flex items-center gap-2 font-body text-sm text-foreground/80">
                      <span className="text-primary">✔</span> {t}
                    </div>
                  ))}
                </div>

                <div>
                  <p className="font-accent text-xs text-muted uppercase tracking-wider mb-2">Offer ends in</p>
                  <CountdownTimer />
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection delay={0.15}>
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Your Details</h2>
                <div className="space-y-5">
                  {[
                    { label: "Full Name", type: "text", key: "name", placeholder: "Enter your full name" },
                    { label: "Email Address", type: "email", key: "email", placeholder: "you@example.com" },
                    { label: "Mobile Number", type: "tel", key: "phone", placeholder: "+91 98765 43210" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 px-6 py-4 rounded-xl bg-accent text-accent-foreground font-body font-bold text-lg animate-pulse-ring"
                >
                  Pay ₹2000 Securely
                </button>

                <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
                  {[
                    { icon: Shield, label: "Secure Payment" },
                    { icon: FileText, label: "GST Receipt" },
                    { icon: Zap, label: "Instant Access" },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-1.5 font-body text-xs text-muted">
                      <b.icon className="w-3.5 h-3.5" />
                      {b.label}
                    </div>
                  ))}
                </div>
              </form>

              <p className="text-center font-body text-xs text-muted mt-4">
                Questions? Email{" "}
                <a href="mailto:support@torelax.in" className="text-primary hover:underline">support@torelax.in</a>
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
