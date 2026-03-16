import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Plus, Check, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AnimatedSection from "@/components/AnimatedSection";

interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Puducherry",
];

export default function Address() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "", phone: "", address_line1: "", address_line2: "",
    city: "", state: "Tamil Nadu", pincode: "",
  });

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    // Auth bypassed for testing
    const DUMMY_USER_ID = "00000000-0000-0000-0000-000000000000";
    
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || DUMMY_USER_ID;
    
    const { data } = await supabase
      .from("addresses")
      .select("*")
      .order("is_default", { ascending: false });
    
    if (data && data.length > 0) {
      setAddresses(data as Address[]);
      setSelectedId(data.find((a: any) => a.is_default)?.id || data[0].id);
    } else {
      setShowForm(true);
    }
    setLoading(false);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase.from("addresses").insert({
      user_id: session.user.id,
      full_name: form.full_name,
      phone: form.phone,
      address_line1: form.address_line1,
      address_line2: form.address_line2 || null,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      is_default: addresses.length === 0,
    }).select().single();

    if (!error && data) {
      setAddresses((prev) => [...prev, data as Address]);
      setSelectedId(data.id);
      setShowForm(false);
    }
    setSaving(false);
  };

  const handleContinue = () => {
    if (selectedId) {
      navigate(`/payment?address=${selectedId}`);
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <div className="pt-16">
      <section className="py-12 md:py-20 bg-background min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10 font-body text-sm">
            <span className="flex items-center gap-1.5 text-primary font-semibold">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">1</span>
              Address
            </span>
            <ChevronRight className="w-4 h-4 text-muted" />
            <span className="flex items-center gap-1.5 text-muted">
              <span className="w-6 h-6 rounded-full bg-muted/20 text-muted flex items-center justify-center text-xs">2</span>
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
            className="font-display text-2xl md:text-3xl font-bold text-center text-foreground mb-8"
          >
            Delivery Address
          </motion.h1>

          {/* Saved Addresses */}
          {addresses.length > 0 && !showForm && (
            <AnimatedSection>
              <div className="space-y-3 mb-6">
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedId(addr.id)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                      selectedId === addr.id
                        ? "border-primary bg-primary/5"
                        : "border-border/50 bg-card hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                        selectedId === addr.id ? "border-primary bg-primary" : "border-muted"
                      }`}>
                        {selectedId === addr.id && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <div>
                        <p className="font-body font-semibold text-foreground">{addr.full_name}</p>
                        <p className="font-body text-sm text-muted mt-1">
                          {addr.address_line1}
                          {addr.address_line2 && `, ${addr.address_line2}`}
                        </p>
                        <p className="font-body text-sm text-muted">
                          {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                        <p className="font-body text-sm text-muted">{addr.phone}</p>
                        {addr.is_default && (
                          <span className="inline-block mt-1.5 px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-body font-semibold">
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 font-body text-sm text-primary font-semibold hover:underline mb-6"
              >
                <Plus className="w-4 h-4" /> Add New Address
              </button>

              <button
                onClick={handleContinue}
                disabled={!selectedId}
                className="w-full px-6 py-4 rounded-xl bg-accent text-accent-foreground font-body font-bold text-lg animate-pulse-ring disabled:opacity-50"
              >
                Continue to Payment →
              </button>
            </AnimatedSection>
          )}

          {/* Address Form */}
          {showForm && (
            <AnimatedSection>
              <form onSubmit={handleSaveAddress} className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {addresses.length > 0 ? "Add New Address" : "Enter Your Address"}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">Full Name</label>
                      <input type="text" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="Enter full name" className={inputClass} />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">Mobile Number</label>
                      <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">Address Line 1</label>
                    <input type="text" required value={form.address_line1} onChange={(e) => setForm({ ...form, address_line1: e.target.value })} placeholder="House no., Building, Street" className={inputClass} />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">Address Line 2 (Optional)</label>
                    <input type="text" value={form.address_line2} onChange={(e) => setForm({ ...form, address_line2: e.target.value })} placeholder="Area, Landmark" className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">City</label>
                      <input type="text" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className={inputClass} />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">State</label>
                      <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={inputClass}>
                        {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">Pincode</label>
                      <input type="text" required pattern="[0-9]{6}" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder="600001" className={inputClass} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 rounded-xl border border-border font-body font-medium text-foreground hover:bg-muted/10 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-6 py-3.5 rounded-xl bg-accent text-accent-foreground font-body font-bold text-base disabled:opacity-50 animate-pulse-ring"
                  >
                    {saving ? "Saving..." : "Save & Continue →"}
                  </button>
                </div>
              </form>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
}
