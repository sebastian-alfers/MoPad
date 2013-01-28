/**
 * every web-stocket message must look like this:
 * {type: 'type of the mesage', data:{?????}}
 */
define(["jquery", "backbone"], function($, Backbone) {

    var WebSocketModel = Backbone.Model.extend({
        /**
         * @author Sebastian Alfers
         *
         * @class Model to handle WebSocket connections to the
         *        bridge
         *
         * @constructs
         *
         * WebSocketModel
         */
        defaults:{
            host: 'ws://localhost:8081/', //can be overloaded while construct this model
            socket: null,
            model: null, // the game or the controller
            socketMsgTypeIdentify: 'identify',
            socketMsgTypePinForUser: 'getPinForUser',
            socketMsgTypeKickOffGame: 'kickOffGame',
            connectionType: null, //identify as a game or controller
            connected: false
        },

        /**
         * @memberof WebSocketModel
         * @member host
         * @type String
         * @desc the web socket url
         */

        /**
         * @memberof WebSocketModel
         * @member socket
         * @type WebSocket
         * @desc the web socket model
         */

        /**
         * @memberof WebSocketModel
         * @member socketMsgTypeIdentify
         * @type String
         * @desc key to identify a web socket message to identify the gamecenter on the bridge
         */

        /**
         * @memberof WebSocketModel
         * @member socketMsgTypePinForUser
         * @type String
         * @desc key to identify a web socket message to receive a new generated pin
         */

        /**
         * @memberof WebSocketModel
         * @member socketMsgTypeKickOffGame
         * @type String
         * @desc key to identify a web socket message to start a game
         */

        /**
         * @memberof WebSocketModel
         * @member connectionType
         * @type String
         * @desc our type of connection (was needed when we used this model also for the controller)
         */

        /**
         * @memberof WebSocketModel
         * @member connected
         * @type Boolean
         * @desc identify if we are connected to the WS
         */

        /**
         * @memberof WebSocketModel
         * @function send
         *
         * @desc wrapper arround the browsers native websocket.send() method
         */
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
                //console.log('Websocket: Sent ')
                //console.log(data);
            } catch (exception) {
                //console.log('Websocket: Error '+ exception);
            }
        },

        /**
         * @memberof WebSocketModel
         * @function initialize
         *
         * @desc constructor
         */
        initialize:function () {

            //init the status view

            if (!("WebSocket" in window)) {
                this.trigger('errorWebSocketAvailable', data);
            }
            else{

                //jea, we support web sockets
                //this.trigger('successWebSocketAvailable', data);
                $webSocketModel = this;
                $socket = new WebSocket(this.defaults.host);

                $socket.onopen = function() {
                    $webSocketModel.set({"connected": true});
                    $webSocketModel.send({type:$webSocketModel.defaults.socketMsgTypeIdentify, connectionType: $webSocketModel.attributes.connectionType, data: {publicKey:'123456'}});
                    $webSocketModel.trigger("onopen");
                }

                $socket.onclose = function() {
                    $webSocketModel.set({"connected": false});
                    $webSocketModel.trigger("onclose");
                }

                $socket.onmessage = function (msg) {

                    var json = JSON.parse(msg.data);

                    console.log(json);

                    //just pass the message type (from node) as an event to be subscribed to
                    $webSocketModel.trigger(json.type, json);

   				}

                this.defaults.socket = $socket;
                //loadSocket( {type: 'game', gameInstanceId: data.uniqueAppIdForBridge} );
            }

        },

        /**
         * @memberof WebSocketModel
         * @function getPinForPlayer
         *
         * @desc send a web socket message to the server. the playerChooserView listens
         * for a message that comes back from the server to store a key
         */
        getPinForPlayer: function(player){
            $webSocketModel.send({type:this.defaults.socketMsgTypePinForUser, connectionType: $webSocketModel.attributes.connectionType, data : {username: player.get('username')}});
        },

        /**
         * @memberof WebSocketModel
         * @function getPinForPlayer
         *
         * @desc send a web socket message to the server. starts the game
         */
        kickOffGame: function(gameId){
            $webSocketModel.send({type:this.defaults.socketMsgTypeKickOffGame, data : {gameId: gameId}});
        }
    });


    // Returns the Model class
    return WebSocketModel;

});