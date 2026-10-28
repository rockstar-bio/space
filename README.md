# Space

Space is an independent, nonprofit, open-source project making legally redistributable mobile firmware, repair resources, technical tools, and documentation easier to find and use.

The project is free to use. It has no advertising, paid downloads, subscriptions, or commercial monetization.

## Status

The repository is being prepared for a future public file platform. The current app includes the application shell and a storage-provider interface backed by a local mock. Production storage, migration, and public downloads are not active yet.

The project previously used OneDrive for development data. That integration has been removed from the application. Existing data remains untouched; no migration is being performed by this repository.

## Planned features

- Browse folders and files with metadata and search.
- Large-file downloads with temporary URLs and resumable delivery.
- Thumbnails and file previews where available.
- Verified, resumable migration with integrity checks.
- Clear content licensing and takedown processes.

## Proposed infrastructure

The planned storage provider is Cloudflare R2, pending sponsorship approval. A Next.js application will use a provider interface so storage details remain isolated from the UI. See [docs/INFRASTRUCTURE.md](docs/INFRASTRUCTURE.md) and the [Cloudflare sponsorship application](docs/CLOUDFLARE_SPONSORSHIP.md).

## Local development

Requirements: Bun and a recent Node.js runtime.

```sh
bun install
bun run dev
```

Useful checks:

```sh
bun run typecheck
bun run build
```

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request. Content contributions must also follow the [content policy](docs/CONTENT_POLICY.md).

## Roadmap and sponsorship

See [ROADMAP.md](ROADMAP.md) for the staged plan and [SPONSORS.md](SPONSORS.md) for the infrastructure request. Cloudflare is a prospective sponsor; no sponsorship or infrastructure benefit has been granted.

## License

Original project code is available under the MIT License. The license does not apply to third-party firmware, software, trademarks, documentation, or other content whose rights belong to someone else.
