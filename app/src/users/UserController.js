(function(){

  angular
       .module('users')
       .controller(
          'UserController',
          [ 'userService', '$mdSidenav', '$scope', '$log', '$q', '$location', UserController ]
        );

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $scope, $log, $q, $location) {
    var self = this;

    self.selected     = null;
    $scope.users      = userService.users;
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    $scope.joinRoom   = joinRoom;
    $scope.name       = userService.name;
    $scope.room       = userService.room;

    // Load all registered users

    // userService
    //       .loadAllUsers()
    //       .then( function( users ) {
    //         self.users    = [].concat(users);
    //         self.selected = users[0];
    //       });

    socket.on('new user joined', function(usersList) {
      console.log("new user joined");
      console.log(usersList);
      userService.setUsers(usersList);
      $scope.users = userService.users;
      $scope.$digest();
    });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
      self.toggleList();
    }

    function joinRoom () {
      userService.addUser($scope.name, null, 0, $scope.room);
      $location.path('/start', false);
    }

  }

})();
