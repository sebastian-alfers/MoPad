/**
 * every web-stocket message must look like this:
 * {type: 'type of the mesage', data:{?????}}
 */
define(["jquery", "backbone"], function($, Backbone) {

    var WebSocketModel = Backbone.Model.extend({

        defaults:{
            host: 'ws://localhost:8081/', //can be overloaded while construct this model
            socket: null,
            model: null, // the game or the controller
            socketMsgTypeIdentify: 'identify',
            socketMsgTypePinForUser: 'getPinForUser',
            vendorType: null //identify as a game or controller
        },

        send: function(data){

            if (data == "" || data == undefined) {
                console.log('Websocket: No data set');
        		return;
        	}

            if(data.type == "" || data.type == undefined){
                console.log('Websocket: No type set for web socket message');
        		return;
            }

            try {
                this.defaults.socket.send(JSON.stringify(data));
                console.log('Websocket: Sent ')
                console.log(data);
            } catch (exception) {
                console.log('Websocket: Error '+ exception);
            }
        },

        initialize:function () {

            if (!("WebSocket" in window)) {
                this.trigger('errorWebSocketAvailable', data);
            }
            else{

                //jea, we support web sockets
                //this.trigger('successWebSocketAvailable', data);
                $webSocketModel = this;
                $socket = new WebSocket(this.defaults.host);

                $socket.onopen = function() {
                    console.log('Websocket: Status ' + $socket.readyState + ' (open)');

                    $webSocketModel.send({type:$webSocketModel.defaults.socketMsgTypeIdentify, vendor: $webSocketModel.attributes.vendorType, data: {publicKey:'123456'}});
                }
                $socket.onmessage = function (msg) {

                    var json = JSON.parse(msg.data);

                    console.log(json);

                    //just pass the message type (from node) as an event to be subscribed to
                    $webSocketModel.trigger(json.msg, json);

   				}

                this.defaults.socket = $socket;
                //loadSocket( {type: 'game', gameInstanceId: data.uniqueAppIdForBridge} );
            }

        },

        getPinForPlayer: function(player){
            $webSocketModel.send({type:this.defaults.socketMsgTypePinForUser, vendor: $webSocketModel.attributes.vendorType, data : {username: player.get('username')}});
        }
    });


    // Returns the Model class
    return WebSocketModel;

});