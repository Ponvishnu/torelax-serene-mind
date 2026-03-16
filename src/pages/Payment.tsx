import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Shield, FileText, Zap, Gift, ChevronRight, CreditCard, Smartphone, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AnimatedSection from "@/components/AnimatedSection";
import CountdownTimer from "@/components/CountdownTimer";

interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
}

export default function Payment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addressId = searchParams.get("address");
  const [address, setAddress] = useState<Address | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  useEffect(() => {
    loadAddress();
  }, [addressId]);

  const loadAddress = async () => {
    // Auth bypassed for testing
    if (!addressId) { navigate("/address"); return; }

    const { data } = await supabase
      .from("addresses")
      .select("*")
      .eq("id", addressId)
      .single();
    if (data) setAddress(data as Address);
    else navigate("/address");
  };

  const handlePayment = async () => {
    setProcessing(true);
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || "00000000-0000-0000-0000-000000000000";

    // Create order
    const { data: order, error } = await supabase.from("orders").insert({
      user_id: session.user.id,
      address_id: addressId!,
      amount: 2000,
      status: "completed",
    }).select().single();

    if (!error && order) {
      // Simulate payment processing
      await new Promise((r) => setTimeout(r, 2000));
      navigate(`/confirmation?order=${order.id}`);
    }
    setProcessing(false);
  };

  const methods = [
    { id: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm", icon: Smartphone },
    { id: "card", label: "Credit/Debit Card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
    { id: "netbanking", label: "Net Banking", desc: "All major banks", icon: Building2 },
  ];

  return (
    <div className="pt-16">
      <section className="py-12 md:py-20 bg-background min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10 font-body text-sm">
            <span className="flex items-center gap-1.5 text-primary font-semibold">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">✓</span>
              Address
            </span>
            <ChevronRight className="w-4 h-4 text-muted" />
            <span className="flex items-center gap-1.5 text-primary font-semibold">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">2</span>
              Payment
            </span>
            <ChevronRight className="w-4 h-4 text-muted" />
            <span className="flex items-center gap-1.5 text-muted">
              <span className="w-6 h-6 rounded-full bg-muted/20 text-muted flex items-center justify-center text-xs">3</span>
              Confirm
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl md:text-4xl font-bold text-center text-foreground mb-12"
          >
            Complete Your Payment
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
                    <p className="font-body text-sm font-semibold text-foreground">₹1000 Cashback to your bank account</p>
                    <p className="font-body text-xs text-muted mt-0.5">Credited within 24-48 hours after payment</p>
                  </div>
                </div>

                {/* Delivery Address */}
                {address && (
                  <div className="border border-border/50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-body text-sm font-semibold text-foreground">Delivery Address</p>
                      <button onClick={() => navigate("/address")} className="font-body text-xs text-primary hover:underline">Change</button>
                    </div>
                    <p className="font-body text-sm text-muted">{address.full_name}</p>
                    <p className="font-body text-xs text-muted">{address.address_line1}{address.address_line2 && `, ${address.address_line2}`}</p>
                    <p className="font-body text-xs text-muted">{address.city}, {address.state} — {address.pincode}</p>
                  </div>
                )}

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

            {/* Payment Methods */}
            <AnimatedSection delay={0.15}>
              <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Payment Method</h2>

                <div className="space-y-3 mb-8">
                  {methods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                        paymentMethod === m.id
                          ? "border-primary bg-primary/5"
                          : "border-border/50 hover:border-primary/30"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        paymentMethod === m.id ? "bg-primary text-primary-foreground" : "bg-muted/10 text-muted"
                      }`}>
                        <m.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-foreground text-sm">{m.label}</p>
                        <p className="font-body text-xs text-muted">{m.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full px-6 py-4 rounded-xl bg-accent text-accent-foreground font-body font-bold text-lg animate-pulse-ring disabled:opacity-50"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-foreground" />
                      Processing...
                    </span>
                  ) : (
                    "Pay ₹2000 Securely"
                  )}
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
              </div>

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
