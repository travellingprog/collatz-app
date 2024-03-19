# Collatz Loops

## About

This is the code behind the website https://www.collatzloops.com. The website creates numerical sequences that loop similarly to the [Collatz Conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture). The algorithm to derive these "loops" was created by Viktor Zivojinovic as a Python script. For the purpose of this website, that script was translated into a Typescript equivalent that can run on the front-end.

The source code has been made open-source to serve as a portfolio project for the developer, [Erick Cardenas Mendez](https://www.linkedin.com/in/erickcm/).

## Running For Development

Prerequisites:

- [FNM](https://github.com/Schniz/fnm) (or alternatively [NVM](https://github.com/nvm-sh/nvm)) for Node version management
- [pnpm](https://pnpm.io/)

Once the prerequisites are installed:

1. Install the Node version specified in **.nvmrc**:
   ```bash
   fnm install
   ```
1. Install project dependencies:
   ```bash
   pnpm install
   ```
1. Run the development server
   ```bash
   pnpm run dev
   ```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Other Development Scripts

`pnpm run build`: Build out the website as a static site ([Next.js docs](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)).

`pnpm run prettier`: Auto-format the source code using [Prettier](https://prettier.io/).

`pnpm run lint`: Check for linting errors, as defined by the ESLint configuration.

`pnpm run test`: Run the [Jest](https://jestjs.io/) tests under watch mode.

## Tech Stack

The following languages/libraries/frameworks were used in the creation of this application.

- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [MaterialUI](https://mui.com/)
- [Math.js](https://mathjs.org/)
- [Jest](https://jestjs.io/)
