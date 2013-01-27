define(["jquery", "backbone", "views/ErrorView"], function($, Backbone, ErrorView) {

    var GameCenterModel = Backbone.Model.extend({
        /**
         * @author Sebastian Alfers
         *
         * @class Model to fetch the Games from the API
         * @constructs
         *
         * GameCenterModel
         */

        /**
         * @memberof GameCenterModel
         * @member publicKey
         * @type String
         * @desc The public key for the app
         */
        defaults:{
            publicKey: null
            // TODO Aktuell kennt der view die games. das muss hier hin
        },
        initialize: function(){
             /*
             * set up the gamecenter
             * - generate the unique key for the game instance as an identifier for the bridge
             */

            //save the scope to make it available in the AJAX-callback to throw events
            $that = this;
            $.get('http://mopad-symfony.de/mopad/api/uniqueAppToken/'+this.get('publicKey'),
                function(data) {

                    //throw success
                    $that.trigger('successOnGenerateUnidqueAppId', data);
            }).error(
                function(data){

                    //throw error
                    $that.trigger('errorOnGenerateUnidqueAppId', data);

                    //render an error view
                    var error = new ErrorView({ el: $('#main_content'), message: 'Error while fetching an unique id for the app'});
                }
            );
        }
    });

    // Returns the Model class
    return GameCenterModel;

});