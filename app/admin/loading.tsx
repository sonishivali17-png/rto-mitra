import { Skeleton } from "@/components/skeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-6" aria-busy="true">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-72 w-full" />
    </div>
  );
}
