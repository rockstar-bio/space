export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 p-6 sm:p-10">
      <div className="max-w-3xl space-y-5">
        <p className="font-mono text-sm text-muted-foreground">SPACE / ROCKSTAR-BIO</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Free access to repair knowledge.</h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Space is a nonprofit, open-source project for legally redistributable mobile firmware, repair resources, tools, and documentation.
        </p>
      </div>
      <section className="grid gap-4 sm:grid-cols-3">
        {['Nonprofit by design', 'Open-source foundation', 'Storage infrastructure in preparation'].map((label) => (
          <div key={label} className="rounded-xl border p-5 text-sm font-medium">{label}</div>
        ))}
      </section>
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
        The public storage layer is being prepared for future Cloudflare R2 sponsorship. No external storage credentials or production APIs are active in this build.
      </p>
    </main>
  );
}
