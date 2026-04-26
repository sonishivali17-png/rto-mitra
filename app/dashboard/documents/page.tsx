import { UploadDropzone } from "@/components/documents/upload-dropzone";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
        <p className="mt-1 text-sm text-slate-600">
          Upload everything we need for your case. Files are encrypted and only visible to executives working on your case.
        </p>
      </div>
      <UploadDropzone />
    </div>
  );
}
