import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]} />
      </section>
      <section className="container grid gap-8 py-8 lg:grid-cols-[220px_1fr]">
        <DashboardSidebar />
        <div className="min-h-[60vh]">{children}</div>
      </section>
    </>
  );
}
