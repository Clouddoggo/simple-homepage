import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Uses ts-jest for TypeScript support
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // Custom Jest matchers
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.ts", // Mock file imports
  },
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"], // Match TypeScript test files
};

export default config;
