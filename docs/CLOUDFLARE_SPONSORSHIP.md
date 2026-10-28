# Cloudflare Project Alexandria sponsorship application

**Project:** Space  
**Organization:** rockstar-bio  
**Website:** https://space.rockstar.bio  
**Repository:** https://github.com/rockstar-bio/space

## Summary

Space is an independent nonprofit open-source project focused on free access to legally redistributable mobile repair resources. The project brings together firmware, repair documentation, technical tools, and related files so people can maintain devices and learn from community knowledge without a paywall.

Space has no advertising, paid downloads, subscriptions, or commercial monetization. It is maintained as public-interest infrastructure for repair communities, independent technicians, researchers, and people whose devices are difficult or expensive to service.

## Current situation

The project previously used Microsoft OneDrive for its file data. We are preparing to migrate to Cloudflare R2 if adequate sponsorship is approved. No migration has started, no production R2 system is active, and the existing source data must remain untouched until a separately approved and verified migration plan is ready.

The repository is being refactored around a storage-provider interface so that the application can adopt R2 without coupling the frontend to a provider. The current implementation uses a local mock and makes no Cloudflare API calls.

## Requested support

- Initial sponsored R2 capacity of approximately 10 TB.
- A possible future expansion path toward 25 TB as the public archive grows.
- Capacity for approximately 2–10 TB of monthly public downloads.
- Workers and related infrastructure credits where appropriate.
- Technical guidance for large-file storage, direct delivery, and a verified resumable migration.

These are requested capacities and projected requirements, not approved benefits. We are not claiming that Cloudflare sponsorship has been granted or that Cloudflare provides unlimited free storage.

Individual files commonly range from 5–20 GB. Commercial storage and egress pricing at this scale is currently unaffordable for a completely nonprofit project with no monetization. Without infrastructure support, the project cannot sustainably provide broad, free public access while keeping downloads accessible to the communities that need them.

## Community benefit

Sponsorship would help make repair information and legally redistributable files available without advertising or paid access. It would support a stable, transparent platform for technicians, hobbyists, researchers, and device owners, while enabling us to invest in integrity checks, content review, accessibility, monitoring, and responsible operations.

Cloudflare's object storage, edge delivery, and Workers platform appear well suited to large files and global public access. We would keep the integration documented, provider-isolated, and conservative about introducing infrastructure before it is needed.

## Stewardship

We will not add credentials to the repository, activate billable resources without approval, or modify the existing OneDrive data as part of this preparation. Any migration would be separately approved, resumable, checksum-verified, and documented before public cutover.
