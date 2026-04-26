import { AdminSidebar } from "@/components/admin/sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";

/**
 * Admin layout. Once auth is wired, gate this with:
 *   const supabase = await createClient();
 *   const { data: { user } } = await supabase.auth.getUser();
 *   if (!user || !ADMIN_EMAILS.includes(user.email)) redirect("/");
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin" }]} />
      </section>
      <section className="container grid gap-8 py-8 lg:grid-cols-[220px_1fr]">
        <AdminSidebar />
        <div className="min-h-[60vh]">{children}</div>
      </section>
    </>
  );
}
