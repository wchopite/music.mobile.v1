angular.module('starter.services', [])

.factory('GenderFactory', function($http, $rootScope) {
  
  return {
    list: function() { 
      return $http({
        method: 'get',
        url: $rootScope.urlBackend+'api/v1/genders',
        headers: $rootScope.requestHeaders
      });
    },
    show: function(id) {
      return $http({
        method: 'GET',
        url: $rootScope.urlBackend+'api/v1/genders/'+id,
        headers: $rootScope.requestHeaders
      });
    },
    create: function(gender) {
      return $http({
        method: 'POST',
        url: $rootScope.urlBackend+'api/v1/genders',
        data: gender,
        headers: $rootScope.requestHeaders
      });
    },
    update: function(gender){
      return $http({
        method: 'PUT',
        url: $rootScope.urlBackend+'api/v1/genders/'+gender.id,
        data: gender,
        headers: $rootScope.requestHeaders
      });
    },
    destroy: function(id) {
      return $http({
        method: 'delete',
        url: $rootScope.urlBackend+'api/v1/genders/'+id,        
        headers: $rootScope.requestHeaders
      });
    }
  };
})

.factory('ArtistFactory', function($http, $rootScope) {

  return {
    list: function(){
      return $http({
        method: 'GET',
        url: $rootScope.urlBackend+'api/v1/artists',
        headers: $rootScope.requestHeaders
      }); 
    },
    show: function(id) {      
      return $http({
        method: 'GET',
        url: $rootScope.urlBackend+'api/v1/artists/'+id,
        headers: $rootScope.requestHeaders
      });
    },
    create: function(artist) {      
      return $http({
        method: 'POST',
        url: $rootScope.urlBackend+'api/v1/artists',
        data: artist,
        headers: $rootScope.requestHeaders
      });
    },
    update: function(artist){
      return $http({
        method: 'PUT',
        url: $rootScope.urlBackend+'api/v1/artists/'+artist.id,
        data: artist,
        headers: $rootScope.requestHeaders
      });
    },
    destroy: function(id) {
      return $http({
        method: 'delete',
        url: $rootScope.urlBackend+'api/v1/artists/'+id,
        headers: $rootScope.requestHeaders
      });
    }
  };
})

.factory('AlbumFactory', function($http, $rootScope) {

  return {
    list: function(){
      return $http({
        method: 'GET',
        url: $rootScope.urlBackend+'api/v1/albums',
        headers: $rootScope.requestHeaders
      });
    },
    show: function(id) {
      return $http({
        method: 'GET',
        url: $rootScope.urlBackend+'api/v1/albums/'+id,
        headers: $rootScope.requestHeaders
      });
    },
    destroy: function(id) {
      return $http({
        method: 'delete',
        url: $rootScope.urlBackend+'api/v1/albums/'+id,
        headers: $rootScope.requestHeaders
      });
    }
  };
})

.factory('AuthenticationFactory', function($http,$rootScope){

  return {
    login: function(user){
      return $http({
        method: 'POST',
        url: $rootScope.urlBackend+'api/v1/login',
        data: user,
        headers: $rootScope.requestHeaders
      });
    },
    logout: function(id) {
      return $http({
        method: 'get',
        url: $rootScope.urlBackend+'api/v1/logout',
        headers: $rootScope.requestHeaders
      });
    }
  };
})

.factory('UserFactory', function($http, $rootScope) {
  
  return {
    list: function() { 
      return $http({
        method: 'get',
        url: $rootScope.urlBackend+'api/v1/users',
        headers: $rootScope.requestHeaders
      });
    },
    show: function(id) {
      return $http({
        method: 'GET',
        url: $rootScope.urlBackend+'api/v1/users/'+id,
        headers: $rootScope.requestHeaders
      });
    },
    create: function(user) {
      return $http({
        method: 'POST',
        url: $rootScope.urlBackend+'api/v1/users',
        data: user,
        headers: $rootScope.requestHeaders
      });
    },
    update: function(user){
      return $http({
        method: 'PUT',
        url: $rootScope.urlBackend+'api/v1/users/'+user.id,
        data: user,
        headers: $rootScope.requestHeaders
      });
    },
    destroy: function(id) {
      return $http({
        method: 'delete',
        url: $rootScope.urlBackend+'api/v1/users/'+id,        
        headers: $rootScope.requestHeaders
      });
    }
  };
})



.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [
    {
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }
  ];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})


;
