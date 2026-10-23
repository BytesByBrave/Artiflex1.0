import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { sendContact } from "../services/contentService";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    service: "Brand Identity",
    budget: "$25k - $50k",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please enter at least 10 characters in your message.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await sendContact({
        name: formData.name,
        email: formData.email,
        message: `${formData.message} [Service: ${formData.service}, Budget: ${formData.budget}]`,
      });
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
        service: "Brand Identity",
        budget: "$25k - $50k",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.response?.data?.message || "Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-spotlight relative isolate flex min-h-[48vh] flex-col justify-end px-6 pb-16 pt-36 text-white lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-4 flex items-center gap-4 text-lime font-mono text-sm tracking-widest uppercase">
            <span className="h-px w-12 bg-lime" />
            Initiate Conversation
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl">
            CONTACT <span className="text-lime">US.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            Tell us about your brand challenge. We respond to all inquiries within 24 business hours.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7 rounded-card bg-mist p-8 sm:p-12">
            <h2 className="text-4xl text-night sm:text-5xl">Send An Inquiry</h2>
            <p className="mt-2 text-stone">Fill out the details below to get in touch with our studio team.</p>

            {status === "success" && (
              <div className="mt-6 rounded-2xl bg-lime p-6 text-night font-medium">
                ✓ Message received! We’ve received your inquiry and will reach out shortly.
              </div>
            )}

            {status === "error" && (
              <div className="mt-6 rounded-2xl bg-red-100 p-6 text-red-800 font-medium">
                ⚠ {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  minLength={2}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Elena Vance"
                  className="h-14 w-full rounded-2xl border border-stone/30 bg-white px-5 text-night placeholder:text-stone/60 focus:border-electric focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="elena@company.com"
                  className="h-14 w-full rounded-2xl border border-stone/30 bg-white px-5 text-night placeholder:text-stone/60 focus:border-electric focus:outline-none"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone mb-2">Interested Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="h-14 w-full rounded-2xl border border-stone/30 bg-white px-5 text-night focus:border-electric focus:outline-none"
                  >
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Digital Product Design">Digital Product Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Packaging & 3D">Packaging &amp; 3D</option>
                    <option value="Full Rebrand & Systems">Full Rebrand &amp; Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone mb-2">Estimated Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="h-14 w-full rounded-2xl border border-stone/30 bg-white px-5 text-night focus:border-electric focus:outline-none"
                  >
                    <option value="$15k - $25k">$15k - $25k</option>
                    <option value="$25k - $50k">$25k - $50k</option>
                    <option value="$50k - $100k">$50k - $100k</option>
                    <option value="$100k+">$100k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone mb-2">Project Brief / Message (min 10 chars)</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your brand goals, target timeline, and what you want to achieve..."
                  className="w-full rounded-2xl border border-stone/30 bg-white p-5 text-night placeholder:text-stone/60 focus:border-electric focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                arrow
                disabled={status === "loading"}
                className="w-full sm:w-auto"
              >
                {status === "loading" ? "Transmitting..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Details & Location */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <h3 className="text-3xl text-night">Direct Inquiries</h3>
              <p className="mt-2 text-stone">Reach us directly for press, speaking, or urgent agency collaborations.</p>
              
              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase text-stone tracking-widest">Electronic Mail</h4>
                  <a href="mailto:hello@artiflex.studio" className="mt-1 block text-2xl font-display text-electric hover:underline">
                    hello@artiflex.studio
                  </a>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase text-stone tracking-widest">Press &amp; Media</h4>
                  <a href="mailto:press@artiflex.studio" className="mt-1 block text-2xl font-display text-night hover:underline">
                    press@artiflex.studio
                  </a>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase text-stone tracking-widest">Studio Headquarters</h4>
                  <p className="mt-1 text-lg text-ink/80">
                    428 Hudson Street, Studio 6B<br />
                    New York, NY 10014
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase text-stone tracking-widest">Operating Hours</h4>
                  <p className="mt-1 text-lg text-ink/80">
                    Monday – Friday: 9am – 6pm EST<br />
                    Global emergency support: 24/7
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-card bg-night p-8 text-white">
              <span className="font-mono text-xs uppercase tracking-widest text-lime">Need Immediate Booking?</span>
              <h4 className="mt-2 text-3xl">Prefer a live video call?</h4>
              <p className="mt-2 text-sm text-white/70">Skip the email exchange and reserve an introductory 30-minute discovery session.</p>
              <Button as="a" href="/book" variant="lime" className="mt-6 w-full text-center">
                Schedule a Call ↗
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
