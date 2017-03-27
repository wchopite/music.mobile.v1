// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 
  'ngCordova', 'angularMoment', 'starter.services','ngStorage'])

.run(function($ionicPlatform, $rootScope,$location, $localStorage, $http) {

  // keep user logged in after page refresh
  if($localStorage.token) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.token;
  }

  // redirect to login page if not logged in and trying to access a restricted page
  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    var publicPages = ['/login'];
    var restrictedPage = publicPages.indexOf($location.path()) === -1;
    if(restrictedPage && !$localStorage.token) {
      $location.path('/login');
    }
  });

  // URL para llamadas a los servicios RESTful
  $rootScope.urlBackend = "http://music.wchopite.com.ve/";

  $rootScope.requestHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  $rootScope.isAuthenticated = false;

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  }) 

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html'
      }
    }
  })

  // ======= Login =================//
  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'AuthenticationCtrl',
  })
  // ======= Login =================//

  // ===== Generos =================//
  .state('tab.genders', {
    url: '/genders',
    cache: false,
    views: {
      'tab-genders': {
        templateUrl: 'templates/genders/list.html',
        controller: 'GenderCtrl'
      }
    }
  })

  .state('tab.genders-new',{
    url:'/genders/new',
    views: {
      'tab-genders': {
        templateUrl: 'templates/genders/create.html',
        controller: 'GenderCtrl' 
      }
    }
  })

  .state('tab.genders-update',{ 
    url:'/genders/:id',
    cache: false,
    views: {
      'tab-genders': {
        templateUrl: 'templates/genders/update.html',
        controller: 'GenderCtrl'
      }
    }
  })
  // ===== Generos =================//

  // ===== Artistas ================//
  .state('tab.artists', {
    url: '/artists',
    cache: false,
    views: {
      'tab-artists': {
        templateUrl: 'templates/artists/list.html',
        controller: 'ArtistCtrl'
      }
    }
  })

  .state('tab.artists-new',{
    url:'/artists/new',    
    views: {
      'tab-artists': {
        templateUrl: 'templates/artists/create.html',
        controller: 'ArtistCtrl'
      }
    }
  })

  .state('tab.artists-update',{
    url:'/artists/:id',
    cache: false,
    views: {
      'tab-artists': {
        templateUrl: 'templates/artists/update.html',
        controller: 'ArtistCtrl'
      }
    }
  })
  // ===== Artistas ================//
  
  // ===== Albums ==================//
  .state('tab.albums', {
    url: '/albums',
    cache: false,
    views: {
      'tab-albums': {
        templateUrl: 'templates/albums/list.html',
        controller: 'AlbumCtrl'
      }
    }
  })
  
  .state('tab.albums-new',{
    url:'/albums/new',
    cache: false,
    views: {
      'tab-albums': {
        templateUrl: 'templates/albums/create.html',
        controller: 'AlbumCtrl'
      }
    }
  })

  .state('tab.albums-update',{
    url:'/albums/:id',
    cache: false,
    views: {
      'tab-albums': {
        templateUrl: 'templates/albums/update.html',
        controller: 'AlbumCtrl'
      }
    }
  })
  // ===== Albums ==================//

  // ===== Users =================//
  .state('tab.users', {
    url: '/users',
    cache: false,
    views: {
      'tab-users': {
        templateUrl: 'templates/users/list.html',
        controller: 'UserCtrl'
      }
    }
  })

  .state('tab.users-new',{
    url:'/users/new',
    views: {
      'tab-users': {
        templateUrl: 'templates/users/create.html',
        controller: 'UserCtrl' 
      }
    }
  })

  .state('tab.users-update',{ 
    url:'/users/:id',
    cache: false,
    views: {
      'tab-users': {
        templateUrl: 'templates/users/update.html',
        controller: 'UserCtrl'
      }
    }
  })
  // ===== Generos =================//












  .state('tab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })

  .state('tab.chat-detail', {
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
