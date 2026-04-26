import { Skeleton } from "@/components/skeleton";

export function ChatSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]" aria-busy="true" aria-live="polite">
      <div className="space-y-4">
        <Skeleton className="h-44 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="rounded-2xl border bg-white ring-soft">
        <div className="space-y-4 p-6">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-24 w-5/6" />
          <Skeleton className="h-24 w-2/3" />
        </div>
        <div className="border-t bg-slate-50 p-3">
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
