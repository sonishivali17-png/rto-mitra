import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChatSkeleton } from "@/components/skeletons/chat-skeleton";
import { TrackPageView } from "@/components/track-page-view";

// Lazy: chat UI is heavy + only needed once user reaches this page.
const ChatUI = dynamic(() => import("@/components/ai/chat-ui").then((m) => m.ChatUI), {
  loading: () => <ChatSkeleton />,
});

export const metadata: Metadata = buildMetadata({
  title: "Ask RTO Mitra AI — Free Vehicle Paperwork Assistant",
  description:
    "Get personalised, source-referenced guidance for any RTO problem in India. Powered by trusted official sources.",
  path: "/ai-assistant",
});

export default function AiAssistantPage() {
  return (
    <>
      <TrackPageView event="ai_assistant_view" />
      <section className="container pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Ask AI" }]} />
        <div className="mt-8 max-w-2xl">
          <span className="pill"><Sparkles className="h-3.5 w-3.5 text-primary" /> Ask RTO Mitra AI</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Type your problem. Get a clear plan.
          </h1>
          <p className="mt-3 text-slate-600">
            Personalised, source-referenced answers — drawing only from official sources
            like parivahan.gov.in and your state transport department.
          </p>
        </div>
      </section>

      <section className="container py-10">
        <ChatUI />
      </section>
    </>
  );
}
