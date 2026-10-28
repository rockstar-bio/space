# Planned infrastructure

This document describes a proposal, not a deployed production system.

## Application layer

The Next.js application owns the public UI and server-side orchestration. It depends on the storage-neutral `StorageProvider` interface in `apps/web/types/storage.ts`, so components do not import Cloudflare SDKs or storage-specific APIs.

The interface is intended to cover folder and file listing, metadata, search, downloads, temporary URLs, thumbnails, pagination, and future migration support. The current mock returns a small local catalog and performs no network calls.

## Object storage and delivery

Cloudflare R2 is the proposed object store, pending sponsorship and final design review. Large public files should be delivered directly where safe, using short-lived signed URLs or a controlled download route. The application should not proxy multi-gigabyte files through the Next.js server unnecessarily.

Cloudflare Workers may be useful for signed URL authorization, request normalization, download policy checks, migration helpers, and lightweight edge coordination. They should be introduced only when a concrete requirement and operational plan exist.

## Metadata

Object metadata may initially be derived from storage listings. A future database or other durable metadata store can support search indexes, content review state, checksums, thumbnails, migration records, and audit history. No metadata database is active in this repository.

## Migration and safety

Migration must be separately approved, resumable, and integrity-verified before any source data is changed. Credentials belong in deployment secrets, never in source or documentation. Existing OneDrive data is not accessed or modified by the current application.
