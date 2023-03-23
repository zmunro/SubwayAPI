module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['/usr/src/app'],
    moduleNameMapper: {
      '^@/(.*)$': '/usr/src/app/$1',
    },
  };
  