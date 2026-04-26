import { Breadcrumbs } from "@/components/breadcrumbs";
import { formatINR } from "@/lib/utils";
import { SITE } from "@/lib/constants";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // TODO: fetch real invoice from Supabase by id.
  const invoice = {
    id,
    date: new Date().toISOString(),
    customer: { name: "Ravi Patel", email: "ravi@example.com" },
    service: "RC Transfer in Ahmedabad",
    base: 1499,
    gst: Math.round(1499 * 0.18),
  };
  const total = invoice.base + invoice.gst;

  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Invoice" },
        ]} />
      </section>
      <section className="container py-10 print:py-0">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 ring-soft print:border-0 print:p-0 print:ring-0">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Tax invoice</h1>
              <p className="mt-1 text-sm text-slate-500">Invoice #{invoice.id}</p>
            </div>
            <div className="text-right text-sm">
              <p className="font-semibold">{SITE.name}</p>
              <p className="text-slate-500">{SITE.email}</p>
            </div>
          </header>
          <hr className="my-6 border-slate-200" />
          <section className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <p className="text-slate-500">Billed to</p>
              <p className="font-medium">{invoice.customer.name}</p>
              <p className="text-slate-500">{invoice.customer.email}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-slate-500">Date</p>
              <p className="font-medium">{new Date(invoice.date).toLocaleDateString("en-IN")}</p>
            </div>
          </section>
          <table className="mt-8 w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="pb-2">Item</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="py-3">{invoice.service}</td><td className="py-3 text-right">{formatINR(invoice.base)}</td></tr>
              <tr className="border-b"><td className="py-3">GST (18%)</td><td className="py-3 text-right">{formatINR(invoice.gst)}</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="pt-4 text-right font-semibold">Total</td><td className="pt-4 text-right text-lg font-bold">{formatINR(total)}</td></tr>
            </tfoot>
          </table>
          <p className="mt-8 text-xs text-slate-500">
            This is a system-generated invoice. RTO Mitra service fee only — government RTO fees, where applicable, are paid separately to the RTO.
          </p>
        </div>
      </section>
    </>
  );
}
