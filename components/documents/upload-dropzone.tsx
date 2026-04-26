"use client";

import { useState } from "react";
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Status = "queued" | "uploading" | "uploaded" | "failed";
type Item = { id: string; name: string; size: number; type: string; status: Status };

export function UploadDropzone({
  accept = "RC, Aadhaar, PAN, Insurance, Loan closure letter, Address proof",
}: {
  accept?: string;
}) {
  const [items, setItems] = useState<Item[]>([]);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files).map(
      (f) => ({ id: crypto.randomUUID(), name: f.name, size: f.size, type: f.type, status: "queued" as Status })
    );
    setItems((s) => [...s, ...next]);
    // TODO: real upload to Supabase Storage
    next.forEach((it) => {
      simulateUpload(it.id);
    });
  }

  function simulateUpload(id: string) {
    setTimeout(() => setItems((s) => s.map((x) => x.id === id ? { ...x, status: "uploading" } : x)), 200);
    setTimeout(() => setItems((s) => s.map((x) => x.id === id ? { ...x, status: "uploaded" } : x)), 1200);
  }

  return (
    <div className="space-y-4">
      <label
        htmlFor="docs"
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center transition hover:border-primary/50"
      >
        <UploadCloud className="h-8 w-8 text-primary" />
        <p className="mt-3 text-sm font-medium text-slate-900">Drag & drop, or click to upload</p>
        <p className="mt-1 text-xs text-slate-500">Accepted: {accept}</p>
        <p className="mt-1 text-xs text-slate-400">PDF, JPG, PNG · up to 10 MB each</p>
        <input
          id="docs"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm">
          Choose files
        </span>
      </label>

      {!!items.length && (
        <ul className="divide-y divide-slate-100 rounded-2xl border bg-white ring-soft">
          {items.map((it) => (
            <li key={it.id} className="flex items-center gap-3 p-4">
              <FileText className="h-5 w-5 shrink-0 text-slate-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">{it.name}</p>
                <p className="text-xs text-slate-500">{(it.size / 1024).toFixed(0)} KB</p>
              </div>
              <Status item={it} />
              <button
                aria-label="Remove"
                onClick={() => setItems((s) => s.filter((x) => x.id !== it.id))}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Status({ item }: { item: Item }) {
  if (item.status === "uploaded")
    return (
      <Badge variant="success">
        <CheckCircle2 className="mr-1 h-3 w-3" /> uploaded
      </Badge>
    );
  if (item.status === "failed")
    return (
      <Badge variant="warning">
        <AlertCircle className="mr-1 h-3 w-3" /> failed
      </Badge>
    );
  return <Badge variant="muted">{item.status}</Badge>;
}
