import React, { useEffect, useState } from "react";
import { Copy, Link2, MessageCircle } from "lucide-react";
import {
  buildDisplayName,
  buildInviteLink,
  buildInviteMessage,
  coupleConfig,
  guestPrefixes,
  type GuestPrefix,
} from "./config";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for non-secure contexts (e.g. opened over a LAN IP).
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  }
}

export default function Admin() {
  const [prefix, setPrefix] = useState<GuestPrefix>("Mr.");
  const [guestName, setGuestName] = useState("");
  const [generated, setGenerated] = useState<{ displayName: string; link: string; message: string } | null>(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = `Invitation Links · ${coupleConfig.brideName} & ${coupleConfig.groomName}`;
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  const generate = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = buildDisplayName(prefix, guestName);
    if (!displayName) {
      setError("Please enter a guest name.");
      setGenerated(null);
      return;
    }
    setError("");
    const link = buildInviteLink(window.location.origin, displayName);
    setGenerated({ displayName, link, message: buildInviteMessage(displayName, link) });
  };

  // Editing the form after generating makes the old link stale.
  const onPrefixChange = (value: GuestPrefix) => {
    setPrefix(value);
    setGenerated(null);
  };
  const onNameChange = (value: string) => {
    setGuestName(value);
    setGenerated(null);
    if (error) setError("");
  };

  const copy = async (text: string, label: string) => {
    const ok = await copyText(text);
    setToast(ok ? `${label} copied!` : "Copy failed — please copy manually.");
  };

  return (
    <main className="h-[100dvh] overflow-y-auto overscroll-contain bg-gradient-to-b from-white via-theme-50 to-white font-montserrat text-stone-700">
      <div className="mx-auto w-full max-w-xl px-4 py-12 md:py-16">
        <header className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-theme-600">Admin</span>
          <h1 className="font-script text-5xl md:text-6xl text-theme-800 mt-2">
            {coupleConfig.brideName} &amp; {coupleConfig.groomName}
          </h1>
          <p className="mt-3 text-sm text-stone-500">Generate personalised invitation links and WhatsApp messages.</p>
        </header>

        <form onSubmit={generate} className="bg-white rounded-2xl border border-theme-200 shadow-[0_20px_50px_-25px_rgba(110,81,12,0.35)] p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="prefix" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500">Select Prefix</label>
            <select
              id="prefix"
              value={prefix}
              onChange={(e) => onPrefixChange(e.target.value as GuestPrefix)}
              className="w-full rounded-xl border border-theme-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-theme-300"
            >
              {guestPrefixes.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="guestName" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500">Guest Name</label>
            <input
              id="guestName"
              type="text"
              value={guestName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. Sanjaya"
              autoComplete="off"
              className="w-full rounded-xl border border-theme-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-theme-300"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-theme-700 hover:bg-theme-800 text-white py-3.5 text-xs uppercase tracking-[0.3em] font-bold transition-colors"
          >
            <Link2 className="w-4 h-4" /> Generate Link
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && copy(generated.link, "Link")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-theme-300 py-3 text-[11px] uppercase tracking-[0.25em] font-bold text-theme-800 hover:bg-theme-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <Copy className="w-4 h-4" /> Copy Link Only
            </button>
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && copy(generated.message, "Message")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-theme-300 py-3 text-[11px] uppercase tracking-[0.25em] font-bold text-theme-800 hover:bg-theme-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <MessageCircle className="w-4 h-4" /> Copy Full Message
            </button>
          </div>
        </form>

        {generated && (
          <section className="mt-8 space-y-6">
            <div className="bg-white rounded-2xl border border-theme-200 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 mb-2">Generated Link</p>
              <a href={generated.link} target="_blank" rel="noreferrer" className="block break-all text-theme-700 font-semibold underline underline-offset-4">
                {generated.link}
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-theme-200 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 mb-2">Greeting</p>
              <p className="font-serif text-2xl text-theme-800">Dear {generated.displayName} ❤️</p>
            </div>

            <div className="bg-white rounded-2xl border border-theme-200 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 mb-2">Message Preview</p>
              <pre className="whitespace-pre-wrap break-words font-montserrat text-sm leading-relaxed text-stone-700">{generated.message}</pre>
            </div>
          </section>
        )}
      </div>

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-theme-800 text-white px-5 py-2.5 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
