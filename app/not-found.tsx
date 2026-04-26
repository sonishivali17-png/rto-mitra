import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-slate-600">
        The page you're looking for doesn't exist or has moved. Try the homepage or
        browse our services.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/"><Button>Go home</Button></Link>
        <Link href="/services"><Button variant="outline">Browse services</Button></Link>
      </div>
    </div>
  );
}
