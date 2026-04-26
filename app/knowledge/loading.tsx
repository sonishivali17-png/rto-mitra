import { ServiceCardsSkeleton } from "@/components/skeletons/service-cards-skeleton";

export default function KnowledgeLoading() {
  return (
    <div className="container py-12" aria-busy="true">
      <ServiceCardsSkeleton count={4} />
    </div>
  );
}
