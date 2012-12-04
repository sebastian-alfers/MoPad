define(['jquery', 'backbone'], function($, Backbone){

    var ControllerView = Backbone.View.extend({

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

            console.log('####');
            console.log(this);
            console.log('####');



            if(this.options.gameConnectionId != null){
                $webSocketModel.send({type: 'sendCommandToGame', data: { connectionId: this.options.gameConnectionId, pin: $('#pin').val()}});
            }
            else{
                $webSocketModel.send({type: 'getConnectionForPin', data: { pin: $('#pin').val()}});
            }

            $webSocketModel.on('cacheConnectionIdOnController', function(json){

                alert('cache pin ' + json.pin);

                this.options.gameConnectionId = json.pin;
                $('#username').html(json.userName);
            }, this);
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

