module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['/usr/src'],
    moduleNameMapper: {
      '^@/(.*)$': '/usr/src/$1',
    },
  };
  