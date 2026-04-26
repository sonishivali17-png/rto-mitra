"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Paperclip, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { STATES, VEHICLE_TYPES } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";
import { RenderedMarkdown } from "@/components/knowledge/rendered-markdown";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

type Source = { title: string; url: string };
type Message =
  | { role: "user"; content: string }
  | { role: "assistant"; content: string; sources?: Source[] };

const STARTERS = [
  "How do I transfer my bike's RC after buying it?",
  "Loan closed but RC still shows hypothecation — what to do?",
  "How long does NOC take in Ahmedabad?",
  "Lost my RC — duplicate process?",
];

export function ChatUI() {
  const [state, setState] = useState("Gujarat");
  const [vehicle, setVehicle] = useState("Two Wheeler");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function send(text?: string) {
    const question = (text ?? input).trim();
    if (!question) return;
    const newMsgs: Message[] = [...messages, { role: "user", content: question }];
    setMessages(newMsgs);
    setInput("");
    setPending(true);
    trackEvent("ai_message_sent", { state, vehicle, qLen: question.length });
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question,
          state,
          vehicleType: vehicle,
          history: messages,
        }),
      });
      const data = await res.json();
      setMessages([...newMsgs, { role: "assistant", content: data.answer, sources: data.sources }]);
    } catch {
      setMessages([
        ...newMsgs,
        {
          role: "assistant",
          content: "I couldn't reach the server. Please try again or WhatsApp us for help.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Left controls */}
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border bg-white p-5 ring-soft">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Sparkles className="h-4 w-4 text-primary" /> Context
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-700">State</label>
              <Select value={state} onChange={(e) => setState(e.target.value)} className="mt-1">
                {STATES.map((s) => <option key={s}>{s}</option>)}
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700">Vehicle type</label>
              <Select value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="mt-1">
                {VEHICLE_TYPES.map((v) => <option key={v}>{v}</option>)}
              </Select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-slate-50 p-5 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Need done-for-you support?</p>
          <p className="mt-1">Skip the queues — our team handles the entire process.</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/services" className="text-primary hover:underline">Browse services →</Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
              WhatsApp us →
            </a>
          </div>
        </div>
      </aside>

      {/* Chat panel */}
      <div className="rounded-2xl border bg-white ring-soft">
        <div ref={scrollRef} className="max-h-[60vh] min-h-[420px] overflow-y-auto p-6">
          {!messages.length ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Ask RTO Mitra AI</h3>
              <p className="mt-1 max-w-md text-sm text-slate-600">
                Ask any RTO problem — we'll give you a step-by-step plan with sources.
              </p>
              <div className="mt-6 grid w-full gap-2 sm:grid-cols-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-xl border bg-slate-50 px-3 py-2 text-left text-sm text-slate-700 hover:border-primary/40 hover:bg-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {messages.map((m, i) => (
                <li key={i} className={m.role === "user" ? "ml-auto max-w-[80%]" : "max-w-[88%]"}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-white"
                        : "border bg-slate-50 text-slate-800"
                    }`}
                  >
                    {m.role === "user" ? (
                      <p className="whitespace-pre-line">{m.content}</p>
                    ) : (
                      <RenderedMarkdown source={m.content} />
                    )}
                    {m.role === "assistant" && m.sources?.length ? (
                      <div className="mt-3 border-t border-slate-200 pt-3">
                        <p className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                          <BookOpen className="h-3.5 w-3.5" /> Trusted sources
                        </p>
                        <ul className="mt-1 list-disc space-y-1 pl-5 text-xs">
                          {m.sources.map((s) => (
                            <li key={s.url}>
                              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                {s.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
              {pending && (
                <li>
                  <div className="inline-flex items-center gap-2 rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    <span className="flex gap-1">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:120ms]" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:240ms]" />
                    </span>
                    Thinking…
                  </div>
                </li>
              )}
            </ul>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-end gap-2 border-t bg-slate-50 p-3"
        >
          <button type="button" className="rounded-xl border bg-white p-2.5 text-slate-500 hover:text-primary" title="Upload a document (Phase 2)">
            <Paperclip className="h-4 w-4" />
          </button>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your RTO question…"
            rows={2}
            className="bg-white"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <Button type="submit" disabled={pending || !input.trim()}>
            <Send className="h-4 w-4" /> Send
          </Button>
        </form>
      </div>
    </div>
  );
}
