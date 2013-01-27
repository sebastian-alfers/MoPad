define(['jquery', 'backbone'], function($, Backbone){

    var ErrorView = Backbone.View.extend({
        /**
         * @author Sebastian Alfers
         *
         * @class View to render an error status
         *
         * @constructs
         *
         * ErrorViews
         */

        /**
         * @memberof ErrorView
         * @member message
         * @type String
         * @desc the error message
         */
        defaults:{
            message: null
        },
        initialize:function () {
            alert(this.options.message);
        }
    });

    return ErrorView;

});

