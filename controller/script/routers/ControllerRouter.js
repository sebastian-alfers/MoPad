define(["jquery", "backbone", "models/WebSocketModel", "views/ControllerView"], function($, Backbone, WebSocketModel, ControllerView) {

	var Router = Backbone.Router.extend({

		initialize : function() {

			// Tells Backbone to start watching for hashchange events
			Backbone.history.start();

		},

		// All of your Backbone Routes (add more)
		routes : {

			// When there is no hash bang on the url, the home method is called
			"" : "home"

		},

		home : function() {

			$webSocketModel = new WebSocketModel();
			controllerView = new ControllerView({
				el : $('#content')
			});

		}
	});

	// Returns the Router class
	return Router;

}); 