import { useState } from "react";
import Button from "../components/ui/Button";

// Calendar helpers
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "01:00 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM",
];

// Simulate some unavailable slots (e.g. already booked)
const unavailableSlots = new Set(["09:30 AM", "10:30 AM", "01:00 PM", "03:30 PM"]);

export default function BookPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState(1); // 1: calendar, 2: time, 3: form, 4: confirmed
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Brand Strategy & Rebrand");
  const [timeFormat, setTimeFormat] = useState("12h"); // 12h | 24h

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectDay = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    if (d.getDay() === 0 || d.getDay() === 6) return; // no weekends
    setSelectedDate({ year: viewYear, month: viewMonth, day, dateObj: d });
    setSelectedSlot(null);
    setStep(2);
  };

  const formatSelectedDate = (d) =>
    d ? `${DAYS_OF_WEEK[d.dateObj.getDay()]}, ${MONTHS[d.month]} ${d.day}, ${d.year}` : "";

  const to24h = (slot) => {
    if (timeFormat === "12h") return slot;
    const [time, period] = slot.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${m === 0 ? "00" : m}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4);
  };

  const progressSteps = ["Date", "Time", "Details", "Confirmed"];

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-spotlight relative isolate flex min-h-[44vh] flex-col justify-end px-6 pb-14 pt-36 text-white lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-4 flex items-center gap-4 text-lime font-mono text-sm tracking-widest uppercase">
            <span className="h-px w-12 bg-lime" />
            30-Minute Discovery Session
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl">
            SCHEDULE A <span className="text-lime">CALL.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Connect directly with Alex Thompson and the Artiflex leadership team to explore possibilities for your project.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">

        {/* Step Progress */}
        <div className="mb-12 flex items-center justify-center gap-0">
          {progressSteps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`flex size-10 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-all duration-300 ${
                  step > i + 1
                    ? "border-lime bg-lime text-night"
                    : step === i + 1
                    ? "border-electric bg-electric text-white shadow-lg shadow-electric/30"
                    : "border-stone/30 bg-mist text-stone"
                }`}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span className={`mt-1.5 text-xs font-mono uppercase tracking-wider ${
                  step >= i + 1 ? "text-night" : "text-stone"
                }`}>{s}</span>
              </div>
              {i < progressSteps.length - 1 && (
                <div className={`mb-5 h-0.5 w-16 sm:w-24 transition-all duration-500 ${step > i + 1 ? "bg-lime" : "bg-stone/20"}`} />
              )}
            </div>
          ))}
        </div>

        {step === 4 ? (
          /* ── CONFIRMATION ── */
          <div className="mx-auto max-w-2xl rounded-card bg-lime p-12 text-center text-night">
            <span className="text-6xl">🎉</span>
            <h2 className="mt-4 text-5xl">You're Scheduled!</h2>
            <p className="mt-4 text-xl">
              See you on <strong>{formatSelectedDate(selectedDate)}</strong> at <strong>{to24h(selectedSlot)}</strong>.
            </p>
            <p className="mt-2 text-ink/70 text-sm">
              A Google Meet invitation was dispatched to <strong>{email}</strong>.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button as="a" href="/" variant="dark" size="lg">Back to Home</Button>
              <Button type="button" variant="outline" onClick={() => { setStep(1); setSelectedDate(null); setSelectedSlot(null); }}>
                Book Another
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-12">

            {/* LEFT PANEL */}
            <div className="lg:col-span-7 space-y-6">

              {/* ── STEP 1: CALENDAR ── */}
              <div className={`rounded-card bg-night text-white transition-all duration-300 ${step !== 1 ? "opacity-60" : ""}`}>
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <h2 className="text-lg font-display tracking-widest">
                    {MONTHS[viewMonth]} {viewYear}
                  </h2>
                  <div className="flex gap-2">
                    <button onClick={prevMonth} className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors" aria-label="Previous month">‹</button>
                    <button onClick={nextMonth} className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors" aria-label="Next month">›</button>
                  </div>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-white/10">
                  {DAYS_OF_WEEK.map(d => (
                    <div key={d} className="py-2 text-center font-mono text-[10px] uppercase tracking-widest text-white/40">{d}</div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-0 p-3">
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                    const d = new Date(viewYear, viewMonth, day);
                    const isPast = d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                    const isToday = d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
                    const isSelected = selectedDate && selectedDate.day === day && selectedDate.month === viewMonth && selectedDate.year === viewYear;
                    const disabled = isPast || isWeekend;

                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={disabled}
                        onClick={() => selectDay(day)}
                        className={`m-0.5 flex aspect-square items-center justify-center rounded-full text-sm font-medium transition-all duration-150 ${
                          isSelected
                            ? "bg-electric text-white shadow-md shadow-electric/40 scale-110"
                            : isToday && !disabled
                            ? "border border-lime text-lime hover:bg-lime hover:text-night"
                            : disabled
                            ? "cursor-not-allowed text-white/20"
                            : "hover:bg-white/10 text-white"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="border-t border-white/10 px-6 py-4">
                    <p className="font-mono text-xs uppercase tracking-wider text-lime">Selected</p>
                    <p className="mt-1 text-lg">{formatSelectedDate(selectedDate)}</p>
                  </div>
                )}
              </div>

              {/* ── STEP 2: TIME SLOTS ── */}
              {step >= 2 && selectedDate && (
                <div className="rounded-card bg-mist p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl text-night font-display tracking-wider">Available Times</h3>
                      <p className="text-xs text-stone mt-0.5">{formatSelectedDate(selectedDate)} · All times PKT</p>
                    </div>
                    <div className="flex rounded-full border border-stone/30 overflow-hidden text-xs font-mono">
                      {["12h", "24h"].map(fmt => (
                        <button key={fmt} onClick={() => setTimeFormat(fmt)}
                          className={`px-3 py-1.5 transition-colors ${timeFormat === fmt ? "bg-night text-white" : "text-stone hover:bg-stone/10"}`}>
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                    {timeSlots.map(slot => {
                      const isUnavailable = unavailableSlots.has(slot);
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isUnavailable}
                          onClick={() => { setSelectedSlot(slot); setStep(3); }}
                          className={`rounded-2xl px-3 py-3 text-center font-mono text-xs transition-all duration-200 ${
                            isSelected
                              ? "bg-electric text-white shadow-md shadow-electric/30 scale-105"
                              : isUnavailable
                              ? "cursor-not-allowed bg-stone/10 text-stone/40 line-through"
                              : "bg-white border border-stone/20 text-ink hover:border-electric hover:text-electric"
                          }`}
                        >
                          {to24h(slot)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 3: FORM ── */}
              {step >= 3 && selectedSlot && (
                <form onSubmit={handleSubmit} className="rounded-card bg-mist p-8 space-y-5">
                  <h3 className="text-xl text-night font-display tracking-wider">Your Details</h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-mono uppercase text-stone mb-2">Full Name *</label>
                      <input type="text" required minLength={2} value={name} onChange={e => setName(e.target.value)}
                        placeholder="Your name"
                        className="h-12 w-full rounded-2xl border border-stone/30 bg-white px-4 text-night text-sm focus:border-electric focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-stone mb-2">Work Email *</label>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="h-12 w-full rounded-2xl border border-stone/30 bg-white px-4 text-night text-sm focus:border-electric focus:outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-stone mb-2">Discussion Topic</label>
                    <select value={topic} onChange={e => setTopic(e.target.value)}
                      className="h-12 w-full rounded-2xl border border-stone/30 bg-white px-4 text-night text-sm focus:border-electric focus:outline-none">
                      <option>Brand Strategy &amp; Rebrand</option>
                      <option>Digital Product Design (Web/App)</option>
                      <option>Engineering &amp; Web Development</option>
                      <option>Packaging &amp; Environmental</option>
                      <option>General Exploration</option>
                    </select>
                  </div>

                  <Button type="submit" size="lg" arrow className="w-full justify-center">
                    Confirm Appointment
                  </Button>
                </form>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:col-span-5 space-y-6">
              {/* Host card */}
              <div className="rounded-card bg-night p-8 text-white space-y-6">
                <div className="flex items-center gap-4">
                  <img src="/images/founder.jpg" alt="Alex Thompson"
                    className="size-16 rounded-full object-cover border-2 border-lime" />
                  <div>
                    <h3 className="text-2xl font-display">Alex Thompson</h3>
                    <p className="text-white/60 text-sm">Founder &amp; Creative Director, Artiflex</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-white/10 text-white/80 text-sm">
                  <div className="flex items-center gap-3"><span className="text-lime">⏱</span><span>30-minute video session</span></div>
                  <div className="flex items-center gap-3"><span className="text-lime">🌐</span><span>Google Meet link emailed to you</span></div>
                  <div className="flex items-center gap-3"><span className="text-lime">🎯</span><span>No pitch decks — just genuine advice</span></div>
                  <div className="flex items-center gap-3"><span className="text-lime">📅</span><span>Weekdays only · Monday–Friday</span></div>
                </div>
              </div>

              {/* Booking summary */}
              {selectedDate && (
                <div className="rounded-card border border-stone/20 bg-mist p-6 space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-stone">Session Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone">Date</span>
                      <span className="font-medium text-night">{formatSelectedDate(selectedDate)}</span>
                    </div>
                    {selectedSlot && (
                      <div className="flex justify-between text-sm">
                        <span className="text-stone">Time</span>
                        <span className="font-medium text-night">{to24h(selectedSlot)}</span>
                      </div>
                    )}
                    {topic && step >= 3 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-stone">Topic</span>
                        <span className="font-medium text-night text-right max-w-[55%]">{topic}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-stone">Duration</span>
                      <span className="font-medium text-night">30 minutes</span>
                    </div>
                  </div>
                </div>
              )}

              {/* What we cover */}
              <div className="rounded-card bg-mist p-6 border border-stone/20">
                <h4 className="text-lg text-night mb-3">What we'll cover</h4>
                <ul className="space-y-2.5 text-sm text-ink/80">
                  {[
                    "Appraisal of your current brand positioning",
                    "Feasibility, timeline projections & approach",
                    "Budget brackets & engagement model",
                    "Which Artiflex package suits you best",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-electric font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
