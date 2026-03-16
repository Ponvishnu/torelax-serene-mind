import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Banknote, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AnimatedSection from "@/components/AnimatedSection";
import ScratchCard from "@/components/ScratchCard";

export default function Confirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");
  const [upiId, setUpiId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scratched, setScratched] = useState(false);

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

          {/* Scratch Card */}
          <AnimatedSection delay={0.4}>
            <div className="mb-6">
              <p className="font-body text-sm text-center text-muted mb-3">
                🎁 You have a reward! Scratch to reveal
              </p>
              <ScratchCard onRevealed={() => setScratched(true)} />
            </div>
          </AnimatedSection>

          {/* UPI ID Form — only shows after scratch */}
          {scratched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatedSection delay={0}>
                <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm mb-6">
                  {!submitted ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <Banknote className="w-5 h-5 text-primary" />
                        <h2 className="font-display text-lg font-semibold text-foreground">
                          Claim Your ₹1000 Cashback
                        </h2>
                      </div>
                      <p className="font-body text-sm text-muted mb-5">
                        Enter your UPI ID — we'll send ₹1000 directly to your bank account right away!
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
                          className="w-full px-6 py-3.5 rounded-xl bg-accent text-accent-foreground font-body font-bold text-base disabled:opacity-50 animate-pulse-ring"
                        >
                          {saving ? "Sending..." : "Send ₹1000 to My Account →"}
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
                      <h3 className="font-display text-lg font-bold text-foreground mb-1">₹1000 on its way! 🚀</h3>
                      <p className="font-body text-sm text-muted mb-1">
                        Sending to <span className="font-semibold text-foreground">{upiId}</span>
                      </p>
                      <p className="font-body text-xs text-muted">
                        You'll receive it in your bank account within minutes
                      </p>
                    </motion.div>
                  )}
                </div>
              </AnimatedSection>
            </motion.div>
          )}

          {/* What's Next */}
          <AnimatedSection delay={scratched ? 0.2 : 0.8}>
            <div className="bg-primary/5 rounded-2xl p-6 text-center">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">What's Next?</h3>
              <div className="space-y-2 mb-5">
                {[
                  "✅ Your 30-day subscription is now active",
                  "📧 GST receipt sent to your email",
                  scratched ? "💰 ₹1000 cashback being processed" : "🎁 Scratch your reward card above",
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
