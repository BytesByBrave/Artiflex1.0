import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { cn } from "../utils/cn";

/* ── Pricing plans ────────────────────────────────────────── */
const plans = [
  {
    id: "basic",
    name: "Basic",
    tag: null,
    price: "$2,500",
    period: "/project",
    desc: "Perfect for startups and small businesses getting their brand off the ground.",
    color: "bg-mist border border-stone/20",
    headerColor: "bg-mist",
    btnVariant: "outline",
    features: [
      { label: "Brand Identity (Logo + 2 Variants)", included: true },
      { label: "Color Palette & Typography Guide", included: true },
      { label: "Business Card Design", included: true },
      { label: "1 Revision Round", included: true },
      { label: "Social Media Kit", included: false },
      { label: "Web UI Design", included: false },
      { label: "Motion & Animation", included: false },
      { label: "Dedicated Account Manager", included: false },
      { label: "Priority Support", included: false },
      { label: "Full Brand Guidelines PDF", included: false },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tag: "Most Popular",
    price: "$6,500",
    period: "/project",
    desc: "Great for growing companies that need a cohesive digital and visual presence.",
    color: "bg-electric border-0 text-white",
    headerColor: "bg-electric",
    btnVariant: "white",
    features: [
      { label: "Brand Identity (Logo + 4 Variants)", included: true },
      { label: "Color Palette & Typography Guide", included: true },
      { label: "Business Card Design", included: true },
      { label: "3 Revision Rounds", included: true },
      { label: "Social Media Kit (8 Templates)", included: true },
      { label: "Web UI Design (Up to 5 Pages)", included: true },
      { label: "Motion & Animation", included: false },
      { label: "Dedicated Account Manager", included: false },
      { label: "Priority Support", included: false },
      { label: "Full Brand Guidelines PDF", included: true },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tag: "Best Value",
    price: "$14,000",
    period: "/project",
    desc: "For established brands demanding world-class design systems and engineering.",
    color: "bg-lime border-0 text-night",
    headerColor: "bg-lime",
    btnVariant: "dark",
    features: [
      { label: "Brand Identity (Logo + Unlimited Variants)", included: true },
      { label: "Color Palette & Typography Guide", included: true },
      { label: "Business Card & Stationery Suite", included: true },
      { label: "Unlimited Revision Rounds", included: true },
      { label: "Social Media Kit (20+ Templates)", included: true },
      { label: "Web UI Design (Full Website)", included: true },
      { label: "Motion & Animation Package", included: true },
      { label: "Dedicated Account Manager", included: true },
      { label: "Priority 24/7 Support", included: true },
      { label: "Full Brand Guidelines PDF", included: true },
    ],
  },
];

/* ── Custom services catalog for the interactive builder ─── */
const serviceCategories = [
  {
    category: "Brand & Identity",
    items: [
      { id: "logo", label: "Logo Design", price: 800 },
      { id: "brand-guide", label: "Brand Guidelines PDF", price: 600 },
      { id: "color", label: "Color Palette System", price: 400 },
      { id: "typography", label: "Typography System", price: 350 },
      { id: "stationery", label: "Stationery Suite", price: 700 },
    ],
  },
  {
    category: "Digital & Web",
    items: [
      { id: "landing", label: "Landing Page UI Design", price: 1200 },
      { id: "web-full", label: "Full Website UI (5+ pages)", price: 3500 },
      { id: "webdev", label: "Web Development (React/Next)", price: 4000 },
      { id: "mobile", label: "Mobile App UI Design", price: 2500 },
      { id: "dashboard", label: "Dashboard / SaaS UI", price: 3000 },
    ],
  },
  {
    category: "Content & Social",
    items: [
      { id: "social-kit", label: "Social Media Kit (8 templates)", price: 500 },
      { id: "social-full", label: "Social Kit Pro (20 templates)", price: 1000 },
      { id: "email", label: "Email Newsletter Template", price: 450 },
      { id: "presentation", label: "Pitch Deck / Presentation", price: 900 },
    ],
  },
  {
    category: "Motion & 3D",
    items: [
      { id: "animation", label: "Logo Animation (MP4/Lottie)", price: 600 },
      { id: "motion", label: "Full Motion Package", price: 1800 },
      { id: "3d", label: "3D Product Render (3 angles)", price: 1200 },
    ],
  },
  {
    category: "Strategy & Consulting",
    items: [
      { id: "strategy", label: "Brand Strategy Workshop", price: 1500 },
      { id: "audit", label: "Brand Audit Report", price: 800 },
      { id: "ux-research", label: "UX Research & Report", price: 1200 },
    ],
  },
];

/* ── Key features comparison table rows ─────────────────── */
const comparisonRows = [
  { feature: "Brand Logo Design", basic: "Logo + 2 Variants", standard: "Logo + 4 Variants", premium: "Unlimited Variants" },
  { feature: "Color & Typography", basic: "✓", standard: "✓", premium: "✓" },
  { feature: "Revision Rounds", basic: "1", standard: "3", premium: "Unlimited" },
  { feature: "Social Media Kit", basic: "–", standard: "8 Templates", premium: "20+ Templates" },
  { feature: "Web UI Design", basic: "–", standard: "Up to 5 pages", premium: "Full Website" },
  { feature: "Web Development", basic: "–", standard: "–", premium: "✓ Full Stack" },
  { feature: "Motion & Animation", basic: "–", standard: "–", premium: "✓ Full Package" },
  { feature: "3D Product Renders", basic: "–", standard: "–", premium: "✓ Included" },
  { feature: "Dedicated Account Manager", basic: "–", standard: "–", premium: "✓" },
  { feature: "Priority Support", basic: "–", standard: "–", premium: "24/7" },
  { feature: "Brand Guidelines PDF", basic: "–", standard: "✓", premium: "✓ Extended" },
  { feature: "Delivery Timeline", basic: "2–3 weeks", standard: "4–6 weeks", premium: "6–10 weeks" },
];

export default function PackagesPage() {
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [customSelected, setCustomSelected] = useState(new Set());
  const [showCustom, setShowCustom] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Brand & Identity");

  const toggleService = (id) => {
    setCustomSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // All custom items flat
  const allItems = serviceCategories.flatMap(c => c.items);
  const selectedItems = allItems.filter(i => customSelected.has(i.id));
  const customTotal = selectedItems.reduce((sum, i) => sum + i.price, 0);

  // Progress = selected count / total possible
  const maxItems = allItems.length;
  const progressPct = maxSelected => Math.round((customSelected.size / maxItems) * 100);

  // Determine complexity label
  const getComplexityLabel = () => {
    const pct = (customSelected.size / maxItems) * 100;
    if (pct === 0) return { label: "Nothing selected yet", color: "text-stone" };
    if (pct < 20) return { label: "Starter Scope", color: "text-blue-400" };
    if (pct < 45) return { label: "Growth Scope", color: "text-electric" };
    if (pct < 70) return { label: "Advanced Scope", color: "text-lime-dark" };
    return { label: "Enterprise Scope", color: "text-lime" };
  };
  const complexity = getComplexityLabel();

  return (
    <div>
      {/* Header */}
      <section className="bg-spotlight relative isolate flex min-h-[44vh] flex-col justify-end px-6 pb-14 pt-36 text-white lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-4 flex items-center gap-4 text-lime font-mono text-sm tracking-widest uppercase">
            <span className="h-px w-12 bg-lime" />
            Transparent Pricing
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl">
            OUR <span className="text-lime">PACKAGES.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Simple, honest pricing with no surprises. Choose a plan or build your own custom scope.
          </p>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={cn(
                "relative cursor-pointer rounded-card p-8 transition-all duration-300",
                plan.color,
                selectedPlan === plan.id
                  ? "ring-4 ring-offset-2 ring-electric scale-[1.02] shadow-2xl"
                  : "hover:scale-[1.01] hover:shadow-lg"
              )}
            >
              {plan.tag && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-night px-4 py-1 text-xs font-mono uppercase tracking-wider text-white">
                  {plan.tag}
                </span>
              )}

              <div className="mb-6">
                <p className={cn("font-mono text-xs uppercase tracking-widest mb-2", plan.id === "standard" ? "text-white/60" : "text-stone")}>{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className="font-display text-6xl leading-none">{plan.price}</span>
                  <span className={cn("mb-1 text-sm", plan.id === "standard" ? "text-white/60" : "text-stone")}>{plan.period}</span>
                </div>
                <p className={cn("mt-3 text-sm leading-relaxed", plan.id === "standard" ? "text-white/80" : "text-ink/70")}>{plan.desc}</p>
              </div>

              <ul className="mb-8 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f.label} className={cn("flex items-center gap-2.5 text-sm", !f.included && (plan.id === "standard" ? "text-white/30" : "text-stone/40"))}>
                    <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      f.included
                        ? plan.id === "standard" ? "bg-white/20 text-white" : plan.id === "premium" ? "bg-night/15 text-night" : "bg-electric/15 text-electric"
                        : "bg-transparent border border-current opacity-30"
                    )}>
                      {f.included ? "✓" : "–"}
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>

              <Button
                as={Link}
                to="/book"
                variant={plan.btnVariant}
                className="w-full justify-center"
                arrow
              >
                Get {plan.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Enterprise / Custom CTA strip */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-card border border-stone/20 bg-mist px-8 py-6 sm:flex-row">
          <div>
            <p className="font-display text-2xl text-night">Need something bespoke?</p>
            <p className="text-sm text-stone mt-0.5">Design a custom scope exactly matched to your needs using our interactive builder below.</p>
          </div>
          <Button variant="dark" arrow onClick={() => { setShowCustom(true); setTimeout(() => document.getElementById("custom-builder")?.scrollIntoView({ behavior: "smooth" }), 100); }}>
            Build Custom Plan
          </Button>
        </div>

        {/* ── Comparison Table ── */}
        <div className="mt-20">
          <h2 className="text-5xl text-night sm:text-6xl">Feature <span className="text-stone">Comparison</span></h2>
          <p className="mt-2 text-stone">See what's included in each plan at a glance.</p>

          <div className="mt-8 overflow-x-auto rounded-card border border-stone/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone/20 bg-mist">
                  <th className="p-4 text-left font-mono text-xs uppercase tracking-wider text-stone">Feature</th>
                  {plans.map(p => (
                    <th key={p.id} className={cn("p-4 text-center font-display text-xl", p.id === "standard" ? "text-electric" : p.id === "premium" ? "text-night" : "text-stone")}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={cn("border-b border-stone/10", i % 2 === 0 ? "bg-white" : "bg-mist/50")}>
                    <td className="p-4 font-medium text-ink">{row.feature}</td>
                    {[row.basic, row.standard, row.premium].map((val, j) => (
                      <td key={j} className={cn("p-4 text-center", val === "–" ? "text-stone/40" : val === "✓" ? "text-lime-dark font-bold" : "text-ink")}>
                        {val === "✓" ? <span className="inline-flex size-6 items-center justify-center rounded-full bg-lime text-night font-bold text-xs">✓</span> : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Custom Builder ── */}
        <div id="custom-builder" className="mt-24 scroll-mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-lime">Build Your Own</p>
              <h2 className="mt-1 text-5xl text-night sm:text-6xl">Custom <span className="text-stone">Plan Builder</span></h2>
              <p className="mt-2 text-stone">Select the services you need and we'll quote you a tailored package.</p>
            </div>
            <button
              onClick={() => setShowCustom(v => !v)}
              className="h-12 rounded-full border border-night px-6 font-medium text-night transition-colors hover:bg-night hover:text-white"
            >
              {showCustom ? "▲ Collapse Builder" : "▼ Open Builder"}
            </button>
          </div>

          {showCustom && (
            <div className="mt-8 rounded-card border border-stone/20 bg-mist p-6 sm:p-10">
              {/* ── Progress Bar ── */}
              <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-stone">Scope Progress</span>
                    <p className={cn("mt-0.5 font-display text-lg", complexity.color)}>{complexity.label}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-3xl text-night">{customSelected.size}</span>
                    <span className="text-stone text-sm"> / {maxItems} services</span>
                  </div>
                </div>

                {/* Segmented bar */}
                <div className="relative mt-3 h-4 w-full overflow-hidden rounded-full bg-stone/10">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max((customSelected.size / maxItems) * 100, customSelected.size > 0 ? 3 : 0)}%`,
                      background: customSelected.size === 0
                        ? "transparent"
                        : customSelected.size < 5
                        ? "linear-gradient(90deg, #3b82f6, #0a1fe0)"
                        : customSelected.size < 10
                        ? "linear-gradient(90deg, #0a1fe0, #cddb3f)"
                        : "linear-gradient(90deg, #cddb3f, #e1ee63)",
                    }}
                  />
                  {/* Milestone markers */}
                  {[25, 50, 75].map(pct => (
                    <div key={pct} className="absolute top-0 h-full w-px bg-white/50" style={{ left: `${pct}%` }} />
                  ))}
                </div>
                <div className="mt-1 flex justify-between font-mono text-[10px] text-stone/60">
                  <span>Starter</span>
                  <span>Growth</span>
                  <span>Advanced</span>
                  <span>Enterprise</span>
                </div>

                {/* Selected services chips */}
                {selectedItems.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedItems.map(item => (
                      <span key={item.id} className="inline-flex items-center gap-1.5 rounded-full bg-electric/10 px-3 py-1 text-xs font-medium text-electric">
                        {item.label}
                        <button onClick={() => toggleService(item.id)} className="ml-0.5 text-electric/60 hover:text-electric" aria-label={`Remove ${item.label}`}>✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Category tabs */}
              <div className="mb-6 flex flex-wrap gap-2">
                {serviceCategories.map(c => (
                  <button
                    key={c.category}
                    onClick={() => setActiveCategory(c.category)}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all",
                      activeCategory === c.category ? "bg-night text-white" : "bg-white border border-stone/20 text-stone hover:border-night hover:text-night"
                    )}
                  >
                    {c.category}
                  </button>
                ))}
              </div>

              {/* Service items grid */}
              {serviceCategories.filter(c => c.category === activeCategory).map(cat => (
                <div key={cat.category} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map(item => {
                    const isChecked = customSelected.has(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleService(item.id)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200",
                          isChecked
                            ? "border-electric bg-electric/10 shadow-sm"
                            : "border-stone/20 bg-white hover:border-electric/40 hover:bg-electric/5"
                        )}
                      >
                        <div className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all",
                          isChecked ? "border-electric bg-electric text-white" : "border-stone/30 text-transparent"
                        )}>
                          ✓
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-sm font-medium leading-tight", isChecked ? "text-electric" : "text-night")}>{item.label}</p>
                          <p className="mt-0.5 font-mono text-xs text-stone">${item.price.toLocaleString()}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}

              {/* Total & CTA */}
              <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-night p-6 text-white sm:flex-row sm:items-center">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-white/50">Estimated Total</p>
                  <p className="mt-1 font-display text-5xl text-lime">
                    ${customTotal.toLocaleString()}
                  </p>
                  <p className="mt-0.5 text-xs text-white/50">{customSelected.size} service{customSelected.size !== 1 ? "s" : ""} selected · Final quote after consultation</p>
                </div>
                <div className="flex gap-3">
                  {customSelected.size > 0 && (
                    <button onClick={() => setCustomSelected(new Set())} className="h-12 rounded-full border border-white/20 px-5 text-sm text-white/70 hover:text-white transition-colors">
                      Clear
                    </button>
                  )}
                  <Button as={Link} to="/contact" variant="lime" arrow>
                    Request Custom Quote
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── FAQ / Trust strip ── */}
        <div className="mt-20 grid gap-8 sm:grid-cols-3 text-center">
          {[
            { icon: "🔒", title: "Fixed-Price Contracts", desc: "No hidden fees or scope creep surprises. What we quote is what you pay." },
            { icon: "🔄", title: "Revisions Included", desc: "Every plan includes revision rounds so you're 100% satisfied before delivery." },
            { icon: "🚀", title: "Fast Turnaround", desc: "We run focused sprints. Basic projects go live in as little as 2 weeks." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="rounded-card border border-stone/20 bg-mist p-8">
              <span className="text-4xl">{icon}</span>
              <h3 className="mt-3 text-xl text-night">{title}</h3>
              <p className="mt-2 text-sm text-stone leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
