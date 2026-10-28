import Link from 'next/link'
import { listStorageItems } from '@/actions/storage'
import { fileIconUrl } from '@/lib/file-icon'

export const instant = false

type PageProps = {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ nextLink?: string | string[] }>
}

export default async function StoragePage({ params, searchParams }: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams])
  const path = `/${slug.join('/')}`
  const nextLink = Array.isArray(query.nextLink) ? query.nextLink[0] : query.nextLink
  const startedAt = performance.now()
  const data = await listStorageItems({ cursor: nextLink })
  const responseMs = Math.round(performance.now() - startedAt)

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 p-6">
      <header className="space-y-2">
        <p className="font-mono text-sm text-muted-foreground">{path}</p>
        <h1 className="text-3xl font-semibold">Storage preview</h1>
        <p className="text-sm text-muted-foreground">
          The storage provider interface is ready; production storage is waiting for sponsorship.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Response time: {responseMs} ms
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map(item => {
          return (
            <article key={item.id} className="flex items-center gap-3 rounded-lg border p-3">
              <img
                src={fileIconUrl(item)}
                alt=""
                className="size-12 object-contain"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.kind === 'folder' ? 'Folder' : 'File'}
                </p>
              </div>
            </article>
          )
        })}
      </section>

      <pre className="overflow-scroll max-h-[50dvh] rounded-lg border bg-muted/30 p-4 text-xs leading-6">
        {JSON.stringify(data, null, 2)}
      </pre>

      {data.cursor ? (
        <Link
          className="inline-flex w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          href={{
            pathname: `/${slug.join('/')}`,
            query: { nextLink: data.cursor },
          }}
        >
          Next page
        </Link>
      ) : (
        <p className="text-sm text-muted-foreground">No more items.</p>
      )}
    </main>
  )
}
