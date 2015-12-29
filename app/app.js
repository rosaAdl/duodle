
angular
  .module('starterApp', ['ngRoute', 'ngMaterial', 'users'])
  .config(function ($mdThemingProvider, $mdIconProvider) {

      $mdIconProvider
          .defaultIconSet("./assets/svg/avatars.svg", 128)
          .icon("menu"       , "./assets/svg/menu.svg"        , 24)
          .icon("share"      , "./assets/svg/share.svg"       , 24);

          $mdThemingProvider.theme('default')
              .primaryPalette('brown')
              .accentPalette('red');

  })
  .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: './src/users/view/main.html',
          controller: 'UserController'
        })
        .when('/', {
          templateUrl: './src/users/view/main.html',
          controller: 'UserController'
        })
        .when('/chat', {
          templateUrl: './src/users/view/chat.html'
        });
    }
  );

