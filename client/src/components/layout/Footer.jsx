import { Link } from "react-router-dom";
import ContactCTA from "../sections/ContactCTA";
import NewsletterForm from "../sections/NewsletterForm";

const services = ["Brand Identity", "UI/UX Design", "Web Development", "Strategy", "Marketing"];
const company = [
  { label: "About Us", to: "/about" },
  { label: "Our Work", to: "/work" },
  { label: "Careers", to: "/careers" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="footer-glow relative overflow-hidden text-white">
      <ContactCTA />

      {/* giant watermark */}
      <div aria-hidden="true" className="pointer-events-none select-none px-6 font-display text-[34vw] leading-[0.8] text-white/10 lg:px-12">
        ARTIFLEX
      </div>

      <div className="relative mx-auto -mt-[8vw] grid max-w-7xl gap-12 px-6 pb-16 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr] lg:px-12">
        <div>
          <p className="font-display text-4xl">ARTIFLEX<span className="text-lime">.</span></p>
          <p className="mt-4 max-w-sm text-white/80">
            A creative design studio crafting exceptional digital experiences for forward-thinking brands that dare to be different.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-xl">Services</h3>
          <ul className="space-y-3 text-white/70">
            {services.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-xl">Company</h3>
          <ul className="space-y-3 text-white/70">
            {company.map((c) => (
              <li key={c.label}><Link className="hover:text-lime" to={c.to}>{c.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-xl">Newsletter</h3>
          <p className="mb-4 text-white/70">Get design insights and industry news delivered monthly.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 px-6 py-6 text-sm text-white/70 sm:flex-row sm:justify-between lg:px-12">
        <p>© {new Date().getFullYear()} Artiflex Studio. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
