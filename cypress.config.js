const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // FULL HD, 16/9
  viewportHeight: 1080,
  viewportWidth: 1920,

  video: false,

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'E2E test',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    setupNodeEvents(on, _config) {
      // reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      // use Tasks to execute Node.js code
      on('task', {
        // implement node event listeners here
        // log to Node.js console
        logToTerminal: message => {
          console.log(message);
          return null;
        },
      });
    },
  },
});
