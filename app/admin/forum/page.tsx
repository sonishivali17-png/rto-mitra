import { Badge } from "@/components/ui/badge";
import { FORUM_QUESTIONS } from "@/data/forum-seed";

export default function ForumModeration() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Forum moderation</h1>
      <div className="overflow-hidden rounded-2xl border bg-white ring-soft">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Author</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {FORUM_QUESTIONS.map((q) => (
              <tr key={q.id} className="border-t">
                <td className="px-5 py-3 font-medium">{q.title}</td>
                <td className="px-5 py-3">{q.authorName}</td>
                <td className="px-5 py-3"><Badge variant="muted">{q.category}</Badge></td>
                <td className="px-5 py-3">
                  <Badge variant={q.solved ? "success" : "warning"}>{q.solved ? "solved" : "open"}</Badge>
                </td>
                <td className="px-5 py-3 space-x-3">
                  <button className="text-primary hover:underline">Approve</button>
                  <button className="text-red-600 hover:underline">Hide</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
