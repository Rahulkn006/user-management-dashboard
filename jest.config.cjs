/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  clearMocks: true,

  moduleNameMapper: {
    '^react-router$': '<rootDir>/src/test-mocks/react-router.tsx',
  },
  collectCoverageFrom: [
  'src/**/*.{ts,tsx}',
  '!src/**/*.test.{ts,tsx}',
  '!src/**/*.d.ts',
  '!src/setupTests.ts',
  '!src/test-mocks/**',
],

coverageDirectory: 'coverage',

coverageReporters: ['text', 'html'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: false,
        diagnostics: false,
        tsconfig: {
          jsx: 'react-jsx',
          module: 'CommonJS',
          moduleResolution: 'Node',
          esModuleInterop: true,
          verbatimModuleSyntax: false,
          strict: true,
        },
      },
    ],
  },
}