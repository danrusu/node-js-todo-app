const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        // use Tasks to execute Node.js code
        // log to Node.js console
        log: message => {
          console.log(message);
          return null;
        },
        getAuthorization: () => {
          return require('./test/auth').getAuthorization();
        },
      });
    },
  },
});
