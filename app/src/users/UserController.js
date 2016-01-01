(function(){

  angular
       .module('users')
       .controller(
          'UserController',
          [ '$scope', '$q', '$location', '$mdSidenav', UserController ]
        );

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param avatarsService
   * @constructor
   */
  function UserController( $scope, $q, $location, $mdSidenav) {
    var self = this;
    $scope.users  = [];
    $scope.user   = {};
    $scope.joinRoom = joinRoom;
    $scope.toggleList = toggleList;

    // Load all registered users

    // userService
    //       .loadAllUsers()
    //       .then( function( users ) {
    //         self.users    = [].concat(users);
    //         self.selected = users[0];
    //       });

    socket
      .on('user', function(user) {
        console.log("user updated:", user);
        $scope.user = user;
        $scope.$digest();
      })
      .on('users', function(usersList) {
        console.log("users list updated:", usersList);
        $scope.users = usersList;
        $scope.$digest();
      })
      ;

    function joinRoom () {
      var newUser = {name: $scope.name, avatar: null, score: 0, room: $scope.room};
      socket.emit('join room', newUser);
      $location.path('/start', false);
    }

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleList() {
      $mdSidenav('left').toggle();
    }
  }

})();
