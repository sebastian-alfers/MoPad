(function($){

  var ListView = Backbone.View.extend({
    el: $('#wizzard'), // attaches `this.el` to an existing element.

    initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

       this.render(); // not all views are self-rendering. This one is.
    },

    render: function(){
      $(this.el).append('<ul class="nav nav-tabs"><li class="active"><a href="#">Game</a></li><li><a href="#">Player</a></li><li><a href="#">Pins</a></li></ul>');
    }
  });

  var listView = new ListView();
})(jQuery);