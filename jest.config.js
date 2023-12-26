const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/app/$1'
  },
  modulePathIgnorePatterns: ['mocks'],
  testEnvironment: 'jest-environment-jsdom',
  verbose: true
}

module.exports = createJestConfig(customJestConfig)