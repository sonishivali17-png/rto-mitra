import { ServiceCardsSkeleton } from "@/components/skeletons/service-cards-skeleton";

export default function ServicesLoading() {
  return (
    <div className="container py-12" aria-busy="true">
      <ServiceCardsSkeleton />
    </div>
  );
}
