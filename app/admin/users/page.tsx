export default function UsersAdmin() {
  const DEMO = [
    { id: "u1", name: "Ravi Patel", email: "ravi@example.com", joined: "2026-03-04", cases: 1 },
    { id: "u2", name: "Khushbu Shah", email: "khushbu@example.com", joined: "2026-04-01", cases: 0 },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Users</h1>
      <div className="overflow-hidden rounded-2xl border bg-white ring-soft">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3">Cases</th>
            </tr>
          </thead>
          <tbody>
            {DEMO.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-5 py-3 font-medium">{u.name}</td>
                <td className="px-5 py-3">{u.email}</td>
                <td className="px-5 py-3 text-slate-500">{u.joined}</td>
                <td className="px-5 py-3">{u.cases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
