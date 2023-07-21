module.exports = {
    roots: ['<rootDir>/src/'],
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/**/index.ts',
      '!<rootDir>/src/main/**',
      '!<rootDir>/src/infra/database/typeorm/config/**',
      '!<rootDir>/src/infra/database/typeorm/test/**',
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'jest-environment-node',
    transform: {
      '.+\\.ts': 'ts-jest'
    }
  };
  