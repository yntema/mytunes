// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({

  tagName: 'tr',

  template: _.template('<td class=artist><%= artist %></td><td><%= title %><button class="x btn btn-danger btn-xs">X</button></td>'),

  events: {
    'click button.x': function() {
      this.model.dequeue();
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});