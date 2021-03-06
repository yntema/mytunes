// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params) {
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());
    this.set('playlist', new Songs()); 
    this.set('newCollection', new Playlist());

    this.get('playlist').on('collectionCreated', function(collection) {
      var savedSongs = collection.slice();
      var newCollection = this.get('newCollection');
      savedSongs.forEach(function(song){
        newCollection.add(song);
      });
    }, this);

    this.get('newCollection').on('enqueuePlaylist', function(collection) {
      var listCopy = collection.slice();
      var songQueue = this.get('songQueue');
      listCopy.forEach(function(song){
        songQueue.add(song);
      });
      // this.collection.playQueue();
    }, this);
    
    params.library.on('play', function(song) {
      this.set('currentSong', song);
    }, this);

    params.library.on('playQueue', function() {
      this.set('currentSong', this.get('songQueue').shift());
    }, this);

    params.library.on('enqueue', function(song) {
      this.get('songQueue').add(song);
    }, this);

    params.library.on('dequeue', function(song) {
      this.get('songQueue').remove(song);
    }, this);

    params.library.on('addToPlaylist', function(song) {
      this.get('playlist').add(song);
    }, this);

    params.library.on('removeFromPlaylist', function(song) {
      this.get('playlist').remove(song);
    }, this);
  }

});
