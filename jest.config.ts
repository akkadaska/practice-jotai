import { type JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  rootDir: './',
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default jestConfig;
