import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Wave divider */}
      <svg viewBox="0 0 1440 60" className="w-full -mb-1 text-background fill-current" preserveAspectRatio="none">
        <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
      </svg>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Center: Logo */}
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Leaf className="w-7 h-7" />
              <span className="font-display text-2xl font-bold">ToRelax</span>
            </div>
            <p className="font-body text-sm opacity-80">Relax Your Mind. Recharge Your Life.</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 font-body text-sm opacity-80">
            <Link to="/about" className="hover:opacity-100 transition-opacity">About</Link>
            <Link to="/classes" className="hover:opacity-100 transition-opacity">Sessions</Link>
            <Link to="/faq" className="hover:opacity-100 transition-opacity">FAQ</Link>
            <a href="mailto:support@torelax.in" className="hover:opacity-100 transition-opacity">Contact</a>
            <Link to="/faq" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link to="/faq" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
          </div>

          {/* Bottom */}
          <div className="text-center font-body text-xs opacity-60 border-t border-primary-foreground/20 pt-6 w-full max-w-md">
            <p>support@torelax.in</p>
            <p className="mt-1">© 2025 ToRelax. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
