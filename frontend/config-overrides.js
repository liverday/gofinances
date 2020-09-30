const jestConfig = require('./jest.config');

module.exports = {
  jest(config) {
    config.preset = jestConfig.preset;
    config.reporters = jestConfig.reporters;
    return config;
  },
};
