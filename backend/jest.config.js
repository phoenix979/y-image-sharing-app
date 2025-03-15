/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
  
    // Ignore the compiled output folder so Jest doesn't pick up any .js tests in 'dist/'
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
  