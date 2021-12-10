import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/server/test/*.test.(ts|tsx)"]
}

export default config;
