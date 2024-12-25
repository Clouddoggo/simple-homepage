import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Uses ts-jest for TypeScript support
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // Custom Jest matchers,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock styles
  },
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"], // Match TypeScript test files
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest", // Use ts-jest for transpilation
  },
};

export default config;
