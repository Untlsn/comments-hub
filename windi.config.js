const { defineConfig } = require('windicss/helpers');
const defConfig = require('./tailwind.config.cjs');


module.exports = defineConfig({
  ...defConfig,
  plugins: [
    require('@windicss/plugin-interaction-variants'),
  ],
});