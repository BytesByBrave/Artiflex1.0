import { useState } from "react";
import Input from "../ui/Input";
import { subscribe } from "../../services/contentService";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      await subscribe(email);
      setEmail("");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-3">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className="grid size-14 shrink-0 place-items-center rounded-full bg-lime text-night disabled:opacity-60"
        >
          ➤
        </button>
      </form>
      {status === "done" && <p className="mt-3 text-lime">You're subscribed.</p>}
      {status === "error" && <p className="mt-3 text-red-300">That didn't go through. Check the email and try again.</p>}
    </div>
  );
}
