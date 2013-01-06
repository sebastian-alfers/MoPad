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
            if(window.location.search.substring(1) != undefined && window.location.search.substring(1) != ''){
                alert(window.location.search.substring(1));
                $webSocketModel = new WebSocketModel({host: 'ws://' + window.location.search.substring(1) + ':8081/'});
            }
            else{
                $webSocketModel = new WebSocketModel({host: 'ws://localhost:8081/'});
            }

			controllerView = new ControllerView({
				el : $('#main')
			});

		}
	});

	// Returns the Router class
	return Router;

}); 