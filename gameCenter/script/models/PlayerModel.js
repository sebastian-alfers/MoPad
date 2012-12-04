define(["jquery", "backbone"], function($, Backbone) {

    PlayerModel = Backbone.Model.extend({
        urlRoot: '/application/getPinForUser.php',
        idAttribute: 'userName',
        defaults:{
            userName: null,
            pin: null
        },
        pending: function(totalFetched, playerCount){
            console.log('ja, am waiting ' + totalFetched +', ' + playerCount );
            if(totalFetched == playerCount){
                //listen to sockets
            }
        }
    });


    return PlayerModel;

});