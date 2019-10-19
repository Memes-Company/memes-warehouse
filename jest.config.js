module.exports = {
  clearMocks: true,
  collectCoverage: false,
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testMatch: ['**/*.test.(ts|tsx)'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules/', 'dist'],
  collectCoverageFrom: ['!**/node_modules/**', '!**/*test.{ts,tsx}', '!**/*.d.ts', '**/*.{ts,tsx}'],
};
