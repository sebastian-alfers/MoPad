// Sets the require.js configuration for your application.
require.config({

  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.7.2.min")
  paths: {

      // Core Libraries
      "modernizr": "../libs/modernizr",
      "jquery": "../libs/jquery-1.8.2.min",
      "bootstrap": "../../bootstrap/js/bootstrap",
      "underscore": "../libs/lodash",
      "backbone": "../libs/backbone-min",
      "backbone.validateAll": "../libs/Backbone.validateAll"

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
require(['modernizr','jquery','backbone','routers/gameCenterRouter','bootstrap','backbone.validateAll'], function(Modernizr, $, Backbone, Desktop) {

    // Instantiates a new Router
    this.router = new Desktop();
});

/**
 * main entry for the gamecenter
 *
 * load all dependencies
 *


require.config({
    paths: {
        jquery: 'libs/jquery-1.8.2.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min'
    }
});

define([

    'jquery',
    'underscore',
    'backbone',
    'gamecenter'

], function($, _, Backbone){


    var gc = new GameCenterView({ el:$('#tab_content'), bootstrap: bootstrap});

});

*/




