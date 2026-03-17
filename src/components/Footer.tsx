import { Leaf, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Wave divider */}
      <svg viewBox="0 0 1440 60" className="w-full -mb-1 text-background fill-current" preserveAspectRatio="none">
        <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
      </svg>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 items-start">
          {/* Company */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 italic">Company</h4>
            <ul className="font-body text-sm space-y-3 opacity-80">
              <li><Link to="/about" className="hover:opacity-100 transition-opacity">About</Link></li>
              <li><Link to="/classes" className="hover:opacity-100 transition-opacity">Classes</Link></li>
              <li><Link to="/faq" className="hover:opacity-100 transition-opacity">FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 italic">Support</h4>
            <ul className="font-body text-sm space-y-3 opacity-80">
              <li><a href="mailto:support@torelax.in" className="hover:opacity-100 transition-opacity">Contact Us</a></li>
              <li><Link to="/faq" className="hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
              <li><Link to="/faq" className="hover:opacity-100 transition-opacity">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Center Logo */}
          <div className="text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mb-3">
              <Leaf className="w-7 h-7" />
            </div>
            <span className="font-display text-2xl font-bold italic">ToRelax</span>
            <p className="font-body text-sm opacity-70 mt-1">Your daily companion for calm,<br />sleep & mindfulness</p>
          </div>

          {/* Stay Connected */}
          <div className="md:text-right">
            <h4 className="font-display text-lg font-semibold mb-4 italic">Stay Connected</h4>
            <div className="font-body text-sm space-y-3 opacity-80">
              <p className="flex items-center gap-2 md:justify-end">
                <Mail className="w-4 h-4" />
                support@torelax.in
              </p>
              <p>Chennai, Tamil Nadu, India</p>
            </div>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div className="border-t border-primary-foreground/20 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs opacity-60">© 2026 ToRelax. All rights reserved.</p>
          <div className="flex gap-6 font-body text-xs opacity-60">
            <Link to="/faq" className="hover:opacity-100 transition-opacity">Privacy</Link>
            <Link to="/faq" className="hover:opacity-100 transition-opacity">Terms</Link>
            <Link to="/faq" className="hover:opacity-100 transition-opacity">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
