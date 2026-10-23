import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../ui/Button";

const links = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/packages", label: "Packages" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <Link to="/" className="font-display text-4xl text-white">
          ARTIFLEX<span className="text-lime">.</span>
        </Link>

        <nav className="hidden gap-10 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-white/90 transition-colors hover:text-lime ${isActive ? "text-lime" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Button as={Link} to="/book" variant="white" className="hidden md:inline-flex">
          Get Started
        </Button>

        <button
          className="text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="mx-6 flex flex-col gap-5 rounded-3xl bg-night/90 p-8 backdrop-blur md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="font-display text-4xl text-white">
              {l.label}
            </Link>
          ))}
          <Button as={Link} to="/book" onClick={() => setOpen(false)}>Get Started</Button>
        </nav>
      )}
    </header>
  );
}
