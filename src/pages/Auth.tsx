import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, User, Phone } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "", name: "", phone: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Auth bypassed for testing — anyone can proceed
    navigate("/address");
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { full_name: form.name, phone: form.phone },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fields = isLogin
    ? [
        { key: "email", label: "Email", type: "email", icon: Mail, placeholder: "you@example.com" },
        { key: "password", label: "Password", type: "password", icon: Lock, placeholder: "••••••••" },
      ]
    : [
        { key: "name", label: "Full Name", type: "text", icon: User, placeholder: "Enter your full name" },
        { key: "email", label: "Email", type: "email", icon: Mail, placeholder: "you@example.com" },
        { key: "phone", label: "Mobile Number", type: "tel", icon: Phone, placeholder: "+91 98765 43210" },
        { key: "password", label: "Password", type: "password", icon: Lock, placeholder: "Min 6 characters" },
      ];

  return (
    <div className="pt-16 min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm">
          <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="font-body text-sm text-muted text-center mb-8">
            {isLogin ? "Sign in to continue your wellness journey" : "Join ToRelax and start relaxing"}
          </p>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm font-body rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                  {f.label}
                </label>
                <div className="relative">
                  <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 px-6 py-3.5 rounded-xl bg-accent text-accent-foreground font-body font-bold text-base disabled:opacity-50 animate-pulse-ring"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center font-body text-sm text-muted mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
