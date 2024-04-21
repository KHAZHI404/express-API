/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: "__tests__/.*.e2e.test.ts$",
  testTimeout: 100000, //от этой ошибки! -> thrown: "Exceeded timeout of 5000 ms for a test.
}