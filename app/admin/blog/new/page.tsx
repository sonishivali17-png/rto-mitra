import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { KNOWLEDGE_CATEGORIES } from "@/data/knowledge-articles";

export default function NewBlogPost() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">New blog post</h1>
      <form className="space-y-4 rounded-2xl border bg-white p-6 ring-soft">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Select id="category" name="category" required>
              {KNOWLEDGE_CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
            </Select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" name="excerpt" rows={2} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="body">Body (markdown)</Label>
          <Textarea id="body" name="body" rows={16} className="font-mono text-xs" />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button">Save draft</Button>
          <Button type="submit">Publish</Button>
        </div>
      </form>
    </div>
  );
}
