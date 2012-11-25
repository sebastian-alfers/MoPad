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
            socketMsgTypeIdentify: 'identify'
        },

        initialize:function () {

            if (!("WebSocket" in window)) {
                this.trigger('errorWebSocketAvailable', data);
            }
            else{
                //jea, we support web sockets
                //this.trigger('successWebSocketAvailable', data);
                $that = this;
                $socket = new WebSocket(this.defaults.host);
                $socket.onopen = function () {
                console.log('Websocket: Status ' + $socket.readyState + ' (open)');

                    //put this to an custom function
                    $that.send({type:$that.defaults.socketMsgTypeIdentify, data: {publicKey:'123456'}});
                }
                this.defaults.socket = $socket;
                //loadSocket( {type: 'game', gameInstanceId: data.uniqueAppIdForBridge} );
            }

        },

        send: function(data){

            if (data == "" || data == undefined) {
                console.log('Websocket: No data set');
        		return;
        	}

            if(data.type == "" || data.type == undefined){
                console.log('Websocket: no type set for web socket message');
        		return;
            }

            try {
                this.defaults.socket.send(JSON.stringify({'type':buttonId.type, 'data': buttonId}));
                console.log('Websocket: Sent ' + data)
            } catch (exception) {
                console.log('Websocket: Error '+data);
            }
        }
    });


    // Returns the Model class
    return WebSocketModel;

});