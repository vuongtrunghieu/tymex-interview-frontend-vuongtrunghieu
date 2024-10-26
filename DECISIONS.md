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
    + We haven't set up any test for this project yet.
    + Check if we need to lower the rule levels for linting/typechecking if something is annoying to fix; because due to
      time constraint, I don't aim to be perfect right at the start.
    + If we have extra time, we might set up a simple Github CI pipeline to run checks on every commit.