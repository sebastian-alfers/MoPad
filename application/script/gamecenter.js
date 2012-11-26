define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    console.log($);
    console.log(Backbone);

    var GameCenterBootstrapModel = Backbone.Model.extend({

        defaults:{
            publicKey: null
        },
        initialize: function(){
            /*
             * set up the gamecenter
             * - generate the unique key for the game instance as an identifier for the bridge
             */

            //save the scope to make it available in the AJAX-callback to throw events
            $that = this;

            $.get('/application/generateUniqueAppId.php', {publicKey: this.get('publicKey')},
                function(data) {
                    //throw success
                    $that.trigger('successOnGenerateUnidqueAppId', data);
            }).error(
                function(data){
                    //throw error
                    $that.trigger('errorOnGenerateUnidqueAppId', data);

                    //render an error view
                    var error = new ErrorView({ el: $('#main_content')});
                }
            );
        }
    });

    return GameCenterBootstrapModel;

});

