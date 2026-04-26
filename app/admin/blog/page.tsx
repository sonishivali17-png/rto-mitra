import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KNOWLEDGE_ARTICLES } from "@/data/knowledge-articles";

export default function BlogAdmin() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Blog CMS</h1>
        <Link href="/admin/blog/new">
          <Button><Plus className="h-4 w-4" /> New post</Button>
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border bg-white ring-soft">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Published</th>
              <th className="px-5 py-3">Updated</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {KNOWLEDGE_ARTICLES.map((a) => (
              <tr key={a.slug} className="border-t">
                <td className="px-5 py-3 font-medium">{a.title}</td>
                <td className="px-5 py-3 text-slate-500">{a.category}</td>
                <td className="px-5 py-3 text-slate-500">{a.publishedAt}</td>
                <td className="px-5 py-3 text-slate-500">{a.updatedAt ?? a.publishedAt}</td>
                <td className="px-5 py-3 space-x-3">
                  <Link href={`/knowledge/${a.categorySlug}/${a.slug}`} className="text-primary hover:underline">View</Link>
                  <button className="text-slate-500 hover:text-primary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
