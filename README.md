# Frontend Assignment

## Overview

This is the repo contains my assignment.

See [ANALYSIS.md](./ANALYSIS.md) for project requirements and analysis.

See [DECISIONS.md](./DECISIONS.md) for key decisions and logs.

### Implementation checklist

#### Functional capabilities
- [x] UI looks and feels
- [x] API integration
- [x] Data refresh interval
- [x] Pagination (or lazy-loading) of data
- [x] Search & filter
- [x] Sorting

#### Non-functional requirements

- UI/UX
    + [x] Responsive design (desktop, tablet, mobile)
    + [ ] Using Ant Design
    + [x] Accessibility A11y checks
- Performance
    + [x] Search & filter debounce
    + [ ] Image loading optimization (lazy-loading, caching)

#### Code quality

- [x] Project scaffolding
- [x] Unit testing
- [x] Integration testing
- [ ] E2E testing
- [ ] Update development documentation
- [ ] Clear all remaining TODOs

#### Deployment

- [ ] UI deployment
- [ ] API server deployment
- [ ] Update deployment documentation

#### Misc
- [ ] Font Drone Ranger Pro is missing for Header nav links
- [ ] Do we support multi select for Tier, Theme filter?

## Development

### Prerequisites

- pnpm (v9)
- Node.js (v20+)

### Add Environment Variables

For local development, you might copy the contents of `apps/app/.env.example` into `apps/app/.env`.

For production deployment, you might need to adjust environment variables in your `.env` file accordingly to your setup.

- `API_ENDPOINT`: base URL of the backend API (mock data).

### Getting started

- Check [Turborepo.md](./Turborepo.md) for installation instructions. We use Turbo Repo as build system for our monorepo.

### Project architecture


```text
.
├── apps                         # App workspace
│    ├── api                     # Mock server
│    └── web                     # Main app
├── packages                     # Shared packages between apps
│    ├── typescript-config       # Shared typescript configuration
│    └── ui                      # Shared UI components
├── turbo.json                   # Turbo configuration
├── LICENSE                      # This file is missing TODO
├── DECISIONS.md                 # Decision logs: this serves as a learning resource; the app evolves as we learn
├── README.md                    # This file!
└── ANALYSIS.md                  # Project analysis and my personal thoughts before starting the project
```

### Production Deployment

#### Vercel

- TODO

#### Docker

- TODO