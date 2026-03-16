import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { Gift, CheckCircle2, Banknote, PartyPopper, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AnimatedSection from "@/components/AnimatedSection";

export default function Confirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");
  const [upiId, setUpiId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmitUpi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId.trim() || !orderId) return;
    setSaving(true);

    await supabase
      .from("orders")
      .update({ upi_id: upiId, cashback_status: "processing" })
      .eq("id", orderId);

    setSubmitted(true);
    setSaving(false);
  };

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-background">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-lg">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <CheckCircle2 className="w-14 h-14 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Payment Successful! 🎉
            </h1>
            <p className="font-body text-muted">
              Your ToRelax subscription is now active
            </p>
          </motion.div>

          {/* Order ID */}
          <AnimatedSection delay={0.2}>
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-xs text-muted uppercase tracking-wider">Order ID</p>
                  <p className="font-body text-sm text-foreground font-mono mt-1">{orderId?.slice(0, 8)}...</p>
                </div>
                <button onClick={copyOrderId} className="p-2 rounded-lg hover:bg-muted/10 transition-all">
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted" />}
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3 font-body text-sm">
                <span className="text-foreground font-semibold">Amount Paid:</span>
                <span className="text-foreground">₹2000</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Cashback Card */}
          <AnimatedSection delay={0.4}>
            <motion.div
              className="relative overflow-hidden rounded-2xl p-8 mb-6"
              style={{
                background: "linear-gradient(135deg, hsl(28, 89%, 60%), hsl(28, 89%, 50%))",
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <PartyPopper className="w-full h-full" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Gift className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-accent text-xs text-white/80 uppercase tracking-wider">Cashback Reward</p>
                    <p className="font-display text-3xl font-bold text-white">₹1,000</p>
                  </div>
                </div>

                <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Banknote className="w-4 h-4 text-white" />
                    <p className="font-body text-sm font-semibold text-white">Direct Bank Transfer</p>
                  </div>
                  <p className="font-body text-xs text-white/80">
                    ₹1000 will be credited directly to your bank account within 24-48 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* UPI ID Form */}
          <AnimatedSection delay={0.6}>
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm mb-6">
              {!submitted ? (
                <>
                  <h2 className="font-display text-lg font-semibold text-foreground mb-2">
                    Enter Your UPI ID for Cashback
                  </h2>
                  <p className="font-body text-sm text-muted mb-5">
                    We'll send ₹1000 directly to your UPI-linked bank account
                  </p>
                  <form onSubmit={handleSubmitUpi}>
                    <div className="mb-4">
                      <input
                        type="text"
                        required
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi or 9876543210@paytm"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                      <p className="font-body text-xs text-muted mt-1.5">
                        Supports GPay, PhonePe, Paytm, and all UPI apps
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-body font-bold text-base disabled:opacity-50"
                    >
                      {saving ? "Submitting..." : "Submit UPI ID & Claim ₹1000"}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">UPI ID Submitted!</h3>
                  <p className="font-body text-sm text-muted mb-1">
                    <span className="font-semibold text-foreground">{upiId}</span>
                  </p>
                  <p className="font-body text-xs text-muted">
                    ₹1000 will be credited within 24-48 hours
                  </p>
                </motion.div>
              )}
            </div>
          </AnimatedSection>

          {/* What's Next */}
          <AnimatedSection delay={0.8}>
            <div className="bg-primary/5 rounded-2xl p-6 text-center">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">What's Next?</h3>
              <div className="space-y-2 mb-5">
                {[
                  "✅ Your 30-day subscription is now active",
                  "📧 GST receipt sent to your email",
                  "💰 ₹1000 cashback within 24-48 hours",
                  "🧘 Start your first meditation session",
                ].map((t) => (
                  <p key={t} className="font-body text-sm text-foreground/80">{t}</p>
                ))}
              </div>
              <Link
                to="/classes"
                className="inline-block px-8 py-3 rounded-xl bg-accent text-accent-foreground font-body font-bold animate-pulse-ring"
              >
                Start Your First Session →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
