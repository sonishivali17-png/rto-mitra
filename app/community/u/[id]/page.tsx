import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { FORUM_QUESTIONS } from "@/data/forum-seed";
import { QuestionCard } from "@/components/forum/question-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return buildMetadata({
    title: `${id} — Profile`,
    description: `Public community profile for ${id} on RTO Mitra.`,
    path: `/community/u/${id}`,
  });
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const questions = FORUM_QUESTIONS.filter(
    (q) => q.authorName.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
  );
  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Community", href: "/community" },
          { label: id },
        ]} />
        <div className="mt-8 flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            {id.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{id.replace(/-/g, " ")}</h1>
            <p className="text-sm text-slate-500">RTO Mitra community member</p>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <h2 className="text-xl font-bold text-slate-900">Their questions</h2>
        <div className="mt-4 space-y-3">
          {questions.length ? (
            questions.map((q) => <QuestionCard key={q.id} q={q} />)
          ) : (
            <p className="rounded-2xl border bg-slate-50 p-6 text-sm text-slate-700">
              No questions yet from this user.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
