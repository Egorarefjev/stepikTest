'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    cssModules: {
      extension: 'scss',
    },
    sassOptions: {
      extension: 'scss'
    }
  });

  return app.toTree();
};
