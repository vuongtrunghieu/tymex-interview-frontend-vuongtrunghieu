# Decisions logs

## Purpose

- Document key decisions made during the project, including rationale and context.

## Formatting

#### Decision Title

- Date
- Context
- Options Considered
- Rationale
- Impact
- Follow-up Actions

## Logs

#### Scaffold project with Next.js, Turbo Repo, Biome, TypeScript

- Date: 2024-10-24
- Context: Prior to the implementation of the project, it was essential to select an appropriate technology to execute
  the task effectively.
- Options Considered: React.js, Next.js
- Rationale:
    + The UI library is constrained to the React.js ecosystem due to the parameters of the assessment.
    + Even though we can make the app works with just React.js, Next.js is a solid choice due to its support for React
      Suspense, and Server Components, which will enhance the overall performance of our application.
    + Both Turbo Repo and Next.js are products developed by Vercel.
    + While a monorepo structure may be excessive for this project, it facilitates development by co-locating everything
      and provides build optimization through Turbo Repo, leading to faster development feedback loops.
    + Once Turbo Repo is integrated into the project, the overall management will be streamlined.
    + I am becoming familiar with Turbo Repo and would like to leverage it in future projects.
    + Biome is a new toolchain, which is much faster than
      Eslint/Prettier: https://github.com/biomejs/biome/tree/main/benchmark#formatting.
    + TypeScript is one of the essential requirements from the assessment.
- Impact
    + Do it once and forget. It shouldn't stand in our way while we develop features.
    + By utilizing these tools, we establish a solid foundation for maintaining good code quality and optimizing
      development time.
- Follow-up Actions
    + [x] We haven't set up any test for this project yet.
        - Updated 2024-10-27: added Vitest, Jest for component testing, and Playwright for E2E testing.
    + [ ] Check if we need to lower the rule levels for linting/typechecking if something is annoying to fix; because
      due to
      time constraint, I don't aim to be perfect right at the start.
    + [ ] If we have extra time, we might set up a simple Github CI pipeline to run checks on every commit.

#### Build UI components (`packages/ui`) using TailwindCSS, Shadcn

- Date: 2024-10-26
- Context: `packages/ui` is where we build shareable UI components that will be used across the project.
- Options Considered: Shadcn, TailwindCSS, Ant Design
- Rationale:
    + I have experience using Shadcn to efficiently build prototypes. This library can significantly advance our product
      lifecycle due to its lightweight and modular nature, allowing us to utilize only the components necessary for this
      project.
    + TailwindCSS accelerates our development time by enabling us to avoid context-switching between declaration and
      implementation (CSS files).
    + Together, these tools provide robust development capabilities, along with a visually appealing user interface that
      includes built-in accessibility features.
    + In the future, we may consider replacing Shadcn with Ant Design to fulfill additional requirements, should our
      timeline permit.
- Impact:
    - High, but assumed I'm familiar with the tools, we can get project developed fast, and still have flexibility for
      UI
      component changes.
- Follow-up Actions
    + [ ] Replace Shadcn with Ant Design

#### Using search params in app's URL to manipulate and save filtering, sorting parameters

- Date: 2024-10-27
- Context: We need to implement sorting and filtering for items in our component-based Next.js project. It is crucial to
  ensure that components interact effectively, particularly when fetching new data in response to sorting and filtering
  changes.
- Options Considered: URL search query params
- Rationale
    + During the design phase, we opted for URL search query parameters, believing that this would simplify the task and
      minimize the need for additional state management.
    + This approach enables us to enter a URL and achieve the desired application state without requiring external data retrieval.
    + Many websites, particularly in the e-commerce sector, utilize this method, allowing users to easily share URLs.
    + I have experience using a library called nuqs (https://github.com/47ng/nuqs), which allows for intuitive and
      type-safe manipulation of URL search parameters, including compatibility with server components.
- Impact
- Follow-up Actions