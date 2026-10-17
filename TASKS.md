# Space backend implementation

## Phase checklist

- [x] Phase 1 — Repository audit and architecture
- [ ] Phase 2 — Enable Cache Components and establish Graph authentication
- [ ] Phase 3 — Folder and file operations with native Graph pagination
- [ ] Phase 4 — README and metadata handling
- [ ] Phase 5 — Custom folder thumbnails
- [ ] Phase 6 — Cache lifetimes, tags and invalidation
- [ ] Phase 7 — OneDrive webhook and delta synchronization
- [ ] Phase 8 — Search and large-file download support
- [ ] Phase 9 — Final testing, security review and backend documentation

## Phase 1 — findings

### Repository audit

- Target repository: `rockstar-bio/space`, checked out on `main`.
- Workspace is a Bun monorepo with `apps/web` and Next.js `16.3.5` resolved in `bun.lock`.
- The app currently has a minimal `next.config.js` with no existing settings to preserve.
- Microsoft Graph client dependency and an initial token-fetching action already exist in the working tree.
- Existing working-tree changes are user work and were preserved.
- The reference repository is `fixitrock/station`; its drive actions use the same Cloudflare Worker token endpoint, Graph drive paths, README download URLs and `icon.png` convention. Its implementation also uses legacy `unstable_cache` and custom React caching, so it is useful as behavior reference only and is not copied as the new cache architecture.

### Compatibility

- Next.js 16 supports `cacheComponents: true`, `use cache`, `cacheLife()` and `cacheTag()`.
- Cache Components requires the Node.js runtime; no Edge runtime should be introduced for these operations.
- Route-level `revalidate`/`fetchCache` and new `unstable_cache` usage should not be used as the primary design.
- The current app has no Edge runtime declarations.

### Proposed backend architecture

- `lib/onedrive/token.ts`: server-only Worker token acquisition, expiry-aware refresh and secret handling.
- `lib/onedrive/client.ts`: server-only, allowlisted Graph client with bounded timeout/retry handling for 401/403/404/429/5xx and `Retry-After`.
- `lib/onedrive/pagination.ts`: typed Graph page result and server-side continuation validation; follow the exact Graph `@odata.nextLink`, never synthesize offsets or skip tokens.
- `lib/onedrive/folders.ts` and `files.ts`: minimal `$select` queries, public-root/path or validated-item-ID restrictions, and normalized application types.
- `lib/onedrive/readme.ts`: per-folder cached README metadata/content, with expiring download URLs used only inside the uncached retrieval operation.
- `lib/onedrive/thumbnails.ts`: non-blocking-friendly typed icon contract; cache stable icon IDs/versions separately from short-lived image URLs.
- `lib/cache/*`: tag constructors and narrowly scoped invalidation helpers using tags such as `space:folder:<id>`, `space:readme:<id>`, `space:icon:<id>`, and `space:item:<id>`.
- `actions/drive/*`: only the future client-facing server operations; internal data functions remain server-only.
- One minimal webhook Route Handler will be added only in the synchronization phase and only after durable-state availability is resolved.

### Cache boundaries

- Stable cache entries: normalized folder/file metadata, README content, icon IDs/versions and individual Graph page results after removing unsafe temporary URLs.
- Short-lived or uncached entries: access tokens, download URLs, thumbnail URLs and continuation data whose validity cannot be established.
- Authentication and token refresh remain outside cached scopes.
- Cache each Graph page independently and tag it with the affected folder/page identity; webhook or reconciliation invalidation must never trust incoming tag strings directly.

### Pagination contract

```ts
type DrivePage<T> = {
  items: T[]
  nextLink: string | null
  hasMore: boolean
}
```

The public cursor contract will be finalized during Phase 3 after inspecting real Graph continuation URLs. Raw continuation URLs will be exposed only if they pass strict Graph host/path validation and contain no credentials; otherwise a signed/opaque server-side representation will be used. `$top` is validated and configurable, with a default of 50.

### Durable synchronization limitation

The repository currently contains no database, KV, Redis, R2, or deployment configuration indicating a durable store for Graph subscription and delta state. Phase 7 must stop for an infrastructure decision if the deployment does not provide durable storage; production webhook activation is out of scope without explicit approval.

## Phase 1 verification

- `bun run typecheck` — passed.
- `bun run build` — passed; Next.js production build completed successfully.
- Fixed the pre-existing undefined `logWarning` references in `apps/web/actions/drive/children.ts` by using `console.warn`.
- No other application code was changed in Phase 1.

## Next phase plan

After explicit approval, Phase 2 will add the Next.js configuration needed for Cache Components and replace the initial Graph token/client approach with a server-only, timeout/retry-aware authentication boundary. It will then run typecheck and build, fixing only Phase 2 issues before stopping again.
