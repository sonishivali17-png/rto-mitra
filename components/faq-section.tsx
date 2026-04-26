import { Accordion } from "@/components/ui/accordion";
import { faqJsonLd } from "@/lib/seo";
import type { FaqItem } from "@/types";

export function FaqSection({
  title = "Frequently asked questions",
  description,
  faqs,
  withSchema = true,
}: {
  title?: string;
  description?: string;
  faqs: FaqItem[];
  withSchema?: boolean;
}) {
  return (
    <section className="container py-16">
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
        />
      )}
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
          {description && <p className="mt-3 max-w-md text-slate-600">{description}</p>}
        </div>
        <Accordion items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
      </div>
    </section>
  );
}
