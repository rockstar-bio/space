# Contributing to Space

Thank you for helping make repair knowledge easier to access.

## Local setup

Install Bun, clone the repository, and run:

```sh
bun install
bun run dev
```

Before opening a pull request, run `bun run typecheck` and `bun run build`. Keep provider-specific logic behind the storage interface in `apps/web/types/storage.ts`; do not add credentials or call production storage from local mocks.

## Issues

Use GitHub issues for reproducible bugs, accessibility problems, documentation gaps, and focused feature proposals. Include the affected route, expected behavior, actual behavior, and relevant logs without secrets.

## Pull requests

Keep changes focused, explain the user impact, and update documentation when behavior or infrastructure plans change. Add tests or validation steps where practical. Content additions must be legally redistributable and comply with [the content policy](docs/CONTENT_POLICY.md).

Please be respectful and collaborative. By contributing, you agree to follow the project [Code of Conduct](CODE_OF_CONDUCT.md).
