import { Skeleton } from "@/components/skeleton";

export default function CommunityLoading() {
  return (
    <div className="container py-12 space-y-3" aria-busy="true">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}
