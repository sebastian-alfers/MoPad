/**
 * @author Sebastian Alfers
 *
 * @class Main entry point
 *
 * @constructs
 *
 * GameCenter
 */
// Sets the require.js configuration for your application.
require.config({

  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.7.2.min")
  paths: {
      // Core Libraries
      "jquery": "../script/libs/jquery-1.8.2.min",
      "bootstrap": "../bootstrap/js/bootstrap",
      "underscore": "../script/libs/lodash",
      "backbone": "../script/libs/backbone-min",
      "backbone.validateAll": "../script/libs/Backbone.validateAll"

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      // Twitter Bootstrap jQuery plugins
      "bootstrap": ["jquery"],

      "backbone": {
          "deps": ["underscore", "jquery"],
          "exports": "Backbone"  //attaches "Backbone" to the window object
      },

      // Backbone.validateAll depends on Backbone.
      "backbone.validateAll": ["backbone"]

  } // end Shim Configuration

});

// Include Desktop Specific JavaScript files here (or inside of your Desktop router)
require(['jquery','backbone','bootstrap','backbone.validateAll', '../tests/testsModels'], function($, Backbone) {


});
