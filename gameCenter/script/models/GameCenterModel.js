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

        defaults:{
            publicKey: null
            // TODO Aktuell kennt der view die games. das muss hier hin
        },

        /**
         * @memberof GameCenterModel
         * @member publicKey
         * @type String
         * @desc The public key for the app
         */


        /**
         * @memberof GameCenterModel
         * @function initialize
         *
         * @desc the constructor of this class
         */
        initialize: function(){
             /*
             * set up the gamecenter
             * - generate the unique key for the game instance as an identifier for the bridge
             */

            //save the scope to make it available in the AJAX-callback to throw events
            $that = this;
            $.get('http://mopad-symfony.de/mopad/api/uniqueAppToken/'+this.get('publicKey'),
                function(data) {

                    /**
                     * @memberof GameCenterModel
                     * @Event successOnGenerateUnidqueAppId
                     * @desc Throws if we got an app id / token in the session in php
                     */
                    $that.trigger('successOnGenerateUnidqueAppId', data);
            }).error(
                function(data){

                    /**
                     * @memberof GameCenterModel
                     * @Event errorOnGenerateUnidqueAppId
                     * @desc Throws if we got an error while getting the app id
                     */
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