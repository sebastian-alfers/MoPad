require(['../script/models/GameCenterModel'], function(Settings) {

    var Mediator = null;

   	module("core/helpers/mediator Tests",{
   		setup : function(){
   			Mediator = testr('core/helpers/mediator');
   		}
   	});

    test('basic mediation of listen-notify functionality', function(){
   		var mediator = new Mediator();
   		var separateMediator = new Mediator();

    });

});

