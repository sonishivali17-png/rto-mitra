import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  // TODO: Pull from Supabase session.
  return (
    <form className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My profile</h1>
        <p className="mt-1 text-sm text-slate-600">Keep your details updated for faster service.</p>
      </div>
      <div className="rounded-2xl border bg-white p-6 ring-soft">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue="Ravi Patel" /></div>
          <div className="space-y-1.5"><Label>Email</Label><Input type="email" defaultValue="ravi@example.com" /></div>
          <div className="space-y-1.5"><Label>WhatsApp</Label><Input defaultValue="+91 98XXXXXXXX" /></div>
          <div className="space-y-1.5"><Label>City</Label><Input defaultValue="Ahmedabad" /></div>
        </div>
        <Button className="mt-6">Save changes</Button>
      </div>
    </form>
  );
}
