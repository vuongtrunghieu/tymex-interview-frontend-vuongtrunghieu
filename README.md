# Frontend Assignment

Live at: https://tymex-interview-frontend-vuongtrunghieu.vercel.app/

Keep in mind that backend server is hosted on render.com on free plan. Server may be paused due to inactivity, and may take
up 50s to be active.

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
    + [ ] Using Ant Design Components
    + [x] Accessibility A11y checks
    + [x] Enhance UX with animations
- Performance
    + [x] Search & filter debounce
    + [x] Image loading optimization (lazy-loading, caching)

#### Code quality

- [x] Project scaffolding
- [x] Unit testing
- [x] Integration testing
- [x] E2E testing
- [x] Update development documentation
- [x] Clear all remaining TODOs in development code

#### Deployment

- [x] UI deployment (hosted on Vercel)
- [x] API server deployment (hosted on Render.com)
- [x] Update deployment documentation

#### Misc

- [ ] Font Drone Ranger Pro is missing for Header nav links (Is the Font free to use? If not, I would skip using it)
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

- Check [Turborepo.md](./Turborepo.md) for installation instructions. We use Turbo Repo as build system for our
  monorepo.

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

- Our application contains 2 major parts: API and Web. In theory, we can deploy them separately on vercel as 2 projects.
  However, I have trouble getting API (json-server, Node.js) server running on Vercel. So I host it on render.com
- Web is Next.js application. We can generally follow Vercel guide on how to deploy Next.js app on Vercel. With one
  caveat: we need to config some params for Vercel build to work with Turbo. Follow the instruction below
- Vercel deployment configuration:
    + Framework Preset: choose Next.js
    + Build Options: `cd ../.. && pnpm run build`
    + Output Directory: (leave empty)
    + Install Command: `pnpm install --store=node_modules/.pnpm-store`
    + Deployment Command: (leave empty)
    + Root Directory: `apps/web`
    + Include files outside the root directory in the Build Step: true
    + Node.js Version: 20
    + Environment Variables: `API_ENDPOINT=https://API_ENDPOINT` (put your API endpoint here); `API_REFRESH_INTERVAL=60`

#### Docker

- TODO