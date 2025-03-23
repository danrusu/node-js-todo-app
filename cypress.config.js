const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, _config) {
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
