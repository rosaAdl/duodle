(function(){
  'use strict';

  angular.module('users')
         .service('userService', ['$q', '$http', UserService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function UserService($q, $http){
      // var users = [
      //   {
      //     name: 'Lia Lugo',
      //     avatar: 'svg-1',
      //     score: 0
      //   },
      //   {
      //     name: 'George Duke',
      //     avatar: 'svg-2',
      //     score: 0
      //   },
      //   {
      //     name: 'Gener Delosreyes',
      //     avatar: 'svg-3',
      //     score: 0
      //   },
      //   {
      //     name: 'Lawrence Ray',
      //     avatar: 'svg-4',
      //     score: 0
      //   },
      //   {
      //     name: 'Ernesto Urbina',
      //     avatar: 'svg-5',
      //     score: 0
      //   },
      //   {
      //     name: 'Gani Ferrer',
      //     avatar: 'svg-6',
      //     score: 0
      //   }
      // ];
      var name;
      var room;
      var users = [];
    // Promise-based API
    return {
      loadAllUsers : function() {
        // Simulate async nature of real remote calls
        return $q.when(users);
      },
      users: users,
      name: name,
      room: room,
      addUser : function(name, avatar, score, room) {
        var newUser = {name: name, avatar: avatar, score: score, room: room};
        socket.emit('join room', newUser);
        this.name = name;
        this.room = room;
      },
      setUsers : function(users) {
        this.users = users;
      }

    };
  }

})();
