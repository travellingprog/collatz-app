import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Optional: Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig outputs an async function.
// This function is async because it loads the Next.js config
const jestConfigFn = createJestConfig(customJestConfig);

// Remove comments to inpsect the full Jest config:
// const jestConfig = await jestConfigFn();
// console.log(JSON.stringify(jestConfig, null, 2));

export default jestConfigFn;
