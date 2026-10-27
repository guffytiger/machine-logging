const metrics = [
  { label: "Machines online", value: "0", note: "No machines connected" },
  { label: "Active jobs", value: "0", note: "No jobs running" },
  { label: "Events today", value: "0", note: "No events recorded" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-primary">OVERVIEW</p>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Monitor machine activity and production at a glance.</p>
      </section>
      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="text-sm font-medium text-muted-foreground">{metric.label}</h2>
            <p className="mt-4 text-3xl font-semibold tabular-nums">{metric.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{metric.note}</p>
          </article>
        ))}
      </section>
      <section className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
        <h2 className="font-semibold">No machine activity yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">Machine status and recent events will appear here once data is available.</p>
      </section>
    </div>
  );
}
