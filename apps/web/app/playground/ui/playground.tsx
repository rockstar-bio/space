'use client'

import { useState } from 'react'
import { AlertCircle, ArrowLeft, CheckCircle2, Clock3, Copy, History, Play, RotateCcw, Server, Trash2 } from 'rockin/lucide'
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Field, FieldDescription, FieldLabel, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, Textarea } from 'rockin/ui'
import { cn } from 'rockin/cn'
import { runPlaygroundAction, type PlaygroundActionName } from '@/actions/playground'

const initialInput = JSON.stringify({ slug: '', top: 50 }, null, 2)
type Response = Awaited<ReturnType<typeof runPlaygroundAction>>
type Run = { id: number; action: PlaygroundActionName; input: string; result: Response; serverMs: number; roundTripMs: number; time: string }

const jsonOf = (result: Response) => JSON.stringify(result.ok ? result.data : { error: result.error }, null, 2)

function JsonViewer({ value }: { value: string }) {
  return (
    <pre className="max-h-145 overflow-auto whitespace-pre-wrap wrap-break-word rounded-lg bg-muted/30 p-4 font-mono text-xs leading-6 text-foreground">
      {value}
    </pre>
  )
}

export default function Playground() {
  const [action, setAction] = useState<PlaygroundActionName>('getChildren')
  const [input, setInput] = useState(initialInput)
  const [result, setResult] = useState<Response | null>(null)
  const [roundTripMs, setRoundTripMs] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [runs, setRuns] = useState<Run[]>([])
  const [runA, setRunA] = useState<number | null>(null)

  async function sendRequest() {
    const started = performance.now()
    setRunning(true)
    let response: Response
    try {
      response = await runPlaygroundAction(action, input)
    } catch (error) {
      response = { ok: false, status: 500, elapsedMs: 0, error: error instanceof Error ? error.message : String(error) }
    }
    const elapsed = Math.round(performance.now() - started)
    const record: Run = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      action,
      input,
      result: response,
      serverMs: response.elapsedMs,
      roundTripMs: elapsed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }
    setResult(response)
    setRoundTripMs(elapsed)
    setRuns((current) => [record, ...current])
    setRunA(record.id)
    setRunning(false)
  }

  function loadRun(run: Run) {
    setResult(run.result)
    setInput(run.input)
    setAction(run.action)
    setRoundTripMs(run.roundTripMs)
    setRunA(run.id)
  }

  function reset() {
    setInput(initialInput)
    setResult(null)
    setRoundTripMs(null)
    setRunA(null)
  }

  async function copyJson() {
    if (!result) return
    await navigator.clipboard.writeText(jsonOf(result))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <main className="app-section text-foreground sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><Server className="size-4" /> Space / Server lab</div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Action playground</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">A Postman-style console for server actions. Every request is logged, replayable, and ready to compare.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { window.location.href = '/' }}><ArrowLeft className="size-4" /> Home</Button>
        </header>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3"><div><CardTitle>Request</CardTitle><CardDescription>Send structured input to an allowlisted action.</CardDescription></div><Badge variant="outline">SERVER ACTION</Badge></div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Field>
                <FieldLabel>Action</FieldLabel>
                <Select value={action} onValueChange={(value) => setAction(value as PlaygroundActionName)}>
                  <SelectTrigger><SelectValue placeholder="Choose an action" /></SelectTrigger>
                  <SelectContent><SelectItem value="getChildren">getChildren</SelectItem></SelectContent>
                </Select>
                <FieldDescription>actions / drive / children</FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Input JSON</FieldLabel>
                <Textarea value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} aria-label="Action input JSON" className="min-h-60 font-mono text-xs leading-6" />
                <FieldDescription>Use slug, pageParam, and top. Top is clamped to 1–200.</FieldDescription>
              </Field>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button variant="ghost" size="sm" onClick={reset} disabled={running}><RotateCcw className="size-4" /> Reset</Button>
                <Button onClick={sendRequest} disabled={running}><Play className="size-4" /> {running ? 'Running…' : 'Send request'}</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader><div className="flex flex-wrap items-start justify-between gap-3"><div><CardTitle>Response</CardTitle><CardDescription>Formatted JSON, status, and timing for the selected run.</CardDescription></div><Button variant="outline" size="sm" onClick={copyJson} disabled={!result}><Copy className="size-4" /> {copied ? 'Copied' : 'Copy JSON'}</Button></div></CardHeader>
            <CardContent className="min-w-0 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className={cn(result?.ok && 'border-emerald-500/50 text-emerald-600 dark:text-emerald-400', result && !result.ok && 'border-destructive/50 text-destructive')}>
                  {result?.ok ? <CheckCircle2 className="size-3.5" /> : result ? <AlertCircle className="size-3.5" /> : null} {result ? `${result.status} ${result.ok ? 'OK' : 'ERROR'}` : 'Waiting'}
                </Badge>
                <Separator orientation="vertical" className="h-4" />
                <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" /> Server {result ? `${result.elapsedMs} ms` : '—'}</span>
                <span>Round trip {roundTripMs !== null ? `${roundTripMs} ms` : '—'}</span>
              </div>
              <div className="overflow-hidden rounded-lg border bg-muted/30"><JsonViewer value={result ? jsonOf(result) : '// Run an action to inspect its JSON response'} /></div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-2"><History className="size-4 text-primary" /><CardTitle>Run history <Badge variant="secondary">{runs.length}</Badge></CardTitle></div><CardDescription>Each click creates a separate log entry, even for the same request.</CardDescription></div><Button variant="ghost" size="sm" onClick={() => { setRuns([]); setRunA(null) }} disabled={!runs.length}><Trash2 className="size-4" /> Clear history</Button></div></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {runs.length === 0 ? <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">Your request log will appear here after the first run.</div> : runs.map((run) => (
                <button key={run.id} type="button" onClick={() => loadRun(run)} className={cn('flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left hover:bg-muted/60', runA === run.id && 'border-primary bg-primary/5')}>
                  <span className="min-w-0"><span className="flex items-center gap-2 text-sm font-medium">{run.result.ok ? <CheckCircle2 className="size-4 text-emerald-500" /> : <AlertCircle className="size-4 text-destructive" />} {run.action} <span className="text-muted-foreground">#{run.id % 100000}</span></span><span className="mt-1 block truncate font-mono text-xs text-muted-foreground">{run.input}</span></span>
                  <span className="shrink-0 text-right text-xs text-muted-foreground"><span className="block">{run.time}</span><span className="block">{run.roundTripMs} ms</span></span>
                </button>
              ))}
            </div>

          </CardContent>
        </Card>

        <Card size="sm"><CardContent className="flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-muted-foreground"><span>Only explicitly registered actions can be called from this playground.</span><Badge variant="secondary">Cache Components enabled</Badge></CardContent></Card>
      </div>
    </main>
  )
}
