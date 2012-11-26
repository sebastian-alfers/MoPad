define(['jquery', 'backbone', 'models/GameListModel'], function($, Backbone, GameListModel){

    var ControllerView = Backbone.View.extend({

        defaults:{
            gameConnectionId: null
        },

        events:{
            'click #button': 'registerController',
            'click #free_button': 'freeButton'
        },

        initialize:function () {
            this.render();
        },

        registerController: function(){
            $('#free_button').show();
            $('#pin').attr("disabled", "disabled");

            $('#button').attr("value", "send command to game");

            console.log(this.defaults.gameConnectionId);
            if(this.defaults.gameConnectionId != null){
                $webSocketModel.send({type: 'sendCommandToGame', data: { connectionId: this.defaults.gameConnectionId, pin: $('#pin').val()}});
            }
            else{
                $webSocketModel.send({type: 'getConnectionForPin', data: { pin: $('#pin').val()}});
            }
        },

        freeButton: function(){
            $('#pin').removeAttr("disabled");
            $(this).hide();
            $('#button').attr("value", "submit pin");
        },

        render: function(){
            var template = _.template( $('#template_register_controller').html(), {});
            console.log(template);
            this.$el.html( template );
        }

    });

    return ControllerView;

});

