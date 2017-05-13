angular.module('starter.controllers', [])

.controller('GenderCtrl',
  ['$scope','$timeout','$location','$state','$stateParams','$ionicPopup','GenderFactory',
  function($scope,$timeout,$location,$state,$stateParams,$ionicPopup,GenderFactory){

    $scope.id = $stateParams.id;

    $scope.list = function() {
      
      GenderFactory.list()
        .then(function(res) {

          $scope.error = false;
          $scope.ready = false;
          $scope.genders = res.data;
          $scope.ready = true;
        })
        .catch(function(err) {

          $scope.error = true;
          $scope.ready = true;
          $scope.message = "Status "+err.status+" - "+err.data;
        })
        .finally(function() {
          
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.show = function(id) { 

      $scope.noReady = true;
      $scope.error = false;

      GenderFactory.show(id)
        .then(function(res) {

          $scope.noReady = false;
          $scope.gender = res.data;
        })
        .catch(function(err) {
          
          console.error('Error', err.status, err.data);
        });
    };

    $scope.create = function(gender) {

      $scope.noReady = true;
      $scope.error = false;

      GenderFactory.create(gender)
        .then(function(res) {

          $scope.noReady = false;
          $scope.success= true;
          $timeout(function() {
            $location.path('/tab/genders');
          }, 1500);
        })
        .catch(function(err) {
          
          $scope.noReady = false;
          $scope.error = true;
          $scope.status = "Error: "+err.status;
          $scope.message = err.data;
        });
    };

    $scope.update = function(gender) {

      $scope.noReady = true;
      $scope.error = false;

      GenderFactory.update(gender)
        .then(function(res) {

          $scope.noReady = false;
          $scope.success= true;
          $timeout(function() {
            $location.path('/tab/genders');
          }, 1500);
        })
        .catch(function(err) {
          
          $scope.noReady = false;
          $scope.error = true;
          $scope.status = "Error: "+err.status;
          $scope.message = err.data;
        });
    };

    $scope.destroy = function(id){

      var confirmPopup = $ionicPopup.confirm({
        title: 'Eliminar genero musical',
        template: '¿Desea usted eliminar este registro?'
      });
      confirmPopup.then(function(res) {
        if(res) {

          GenderFactory.destroy(id)
            .then(function(res) {
              
              var alertPopup = $ionicPopup.alert({
                title: 'Registro eliminado',
                template: res.data
              });
              
              alertPopup.then(function(res) {
                
                $state.go($state.current, {}, {reload: true});
              });
            })
            .catch(function(err) {
            
              var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'No se pudo eliminar el registro. Error: '+err.status+' - '+err.data
              });

              alertPopup.then(function(res) {
                console.error('Error', err.status, err.data);
              });
            });
        }
      });
    };
  }
])

.controller('ArtistCtrl', function($scope,$timeout,$location,$state,$stateParams,$ionicPopup,ArtistFactory){

  $scope.id = $stateParams.id;

  $scope.list = function(){

    ArtistFactory.list()
      .then(function(res) {

        $scope.error = false;
        $scope.ready = false;
        $scope.artists = res.data;
        $scope.ready = true;
      })
      .catch(function(err) {

        $scope.error = true;
        $scope.ready = true;
        $scope.message = "Status "+err.status+" - "+err.data;        
      })
      .finally(function() {
        
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.show = function(id) {

    $scope.noReady = true;
    $scope.error = false;

    ArtistFactory.show(id)
      .then(function(res) {

        $scope.noReady = false;
        $scope.artist = res.data;
      })
      .catch(function(err) {
        
        console.error('Error', err.status, err.data);
      })
    ;
  };

  $scope.create = function(artist) {

    $scope.noReady = true;
    $scope.error = false;

    ArtistFactory.create(artist)
      .then(function(res) {

        $scope.noReady = false;
        $scope.success= true;
        $timeout(function() {
          $location.path('/tab/artists');
        }, 1500);
      })
      .catch(function(err) {
        
        $scope.noReady = false;
        $scope.error = true;
        $scope.status = "Error: "+err.status;
        $scope.message = err.data;
      });
  };

  $scope.update = function(artist) {

    $scope.noReady = true;
    $scope.error = false;

    ArtistFactory.update(artist)
      .then(function(res) {

        $scope.noReady = false;
        $scope.success= true;
        $timeout(function() {
          $location.path('/tab/artists');
        }, 1500);
      })
      .catch(function(err) {
        
        $scope.noReady = false;
        $scope.error = true;
        $scope.status = "Error: "+err.status;
        $scope.message = err.data;
      });
  };

  $scope.destroy = function(id){

    var confirmPopup = $ionicPopup.confirm({
      title: 'Eliminar artista',
      template: '¿Desea usted eliminar este registro?'
    });
    confirmPopup.then(function(res) {
      if(res) {

        ArtistFactory.destroy(id)
          .then(function(res) {
            
            var alertPopup = $ionicPopup.alert({
              title: 'Registro eliminado',
              template: res.data
            });

            alertPopup.then(function(res) {
              $state.go($state.current, {}, {reload: true});
            });
          })
          .catch(function(err) {
          
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: 'No se pudo eliminar el registro. Error: '+err.status+' - err.data'
            });
            alertPopup.then(function(res) {
              console.error('Error', err.status, err.data);
            });
          });
      }
    });
  };
})

.controller('AlbumCtrl', function($scope,GenderFactory, ArtistFactory,AlbumFactory,
 $ionicPopup,$timeout,$location,$state,$stateParams,
 $rootScope,$cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice,
 $cordovaActionSheet){

  $genders = [];        // lista de generos
  $artists = [];        // lista de artistas
  $scope.image = null;  // imagen del album

  $scope.id = $stateParams.id;
 
  // Listado de albums
  $scope.list = function(){

    AlbumFactory.list().then(function(res) {

      $scope.ready = false;
      $scope.error = false;
      $scope.albums = res.data;
      $scope.ready = true;
      $scope.random = Math.random();
    },
    function(err){
      $scope.error = true;
    })
    .finally(function() {
        
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  // Consultar album
  $scope.show = function(id) {

    $scope.noReady = true;
    $scope.error = false;

    AlbumFactory.show(id)
      .then(function(res) {

        var random = Math.random();

        $scope.noReady = false;
        res.data.year = parseInt(res.data.year);
        res.data.artist_id = parseInt(res.data.artist_id);
        res.data.gender_id = parseInt(res.data.gender_id);
        $scope.album = res.data;
        $scope.path = "<img src="+$rootScope.urlBackend+$scope.album.path+"?r="+random+"/>";
      })
      .catch(function(err) {        
        console.error('Error', err.status, err.data);
      });
  };

  // Eliminar album
  $scope.destroy = function(id){

    var confirmPopup = $ionicPopup.confirm({
      title: 'Eliminar genero musical',
      template: '¿Desea usted eliminar este registro?'
    });
    confirmPopup.then(function(res) {

      if(res) {

        AlbumFactory.destroy(id)
          .then(function(res) {

            var alertPopup = $ionicPopup.alert({
              title: 'Registro eliminado',
              template: res.data
            });
            
            alertPopup.then(function(res) {
              
              $state.go($state.current, {}, {reload: true});
            });
          })
          .catch(function(err) {
          
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: 'No se pudo eliminar el registro. Error: '+err.status+' - '+err.data
            });

            alertPopup.then(function(res) {
              console.error('Error', err.status, err.data);
            });
          });
      }
    });
  };

  // Lista de generos musicales
  $scope.getGenders = function() {

    GenderFactory.list()
      .then(function(res) {

        $scope.error = false;        
        $scope.genders = res.data;
        $scope.ready = true;
      })
      .catch(function(err) {

        $scope.error = true;
        $scope.ready = true;        
        console.error('Error', err.status, err.data);
      });
  };

  // Lista de "artistas"
  $scope.getArtists = function() {

    ArtistFactory.list()
      .then(function(res) {

        $scope.error = false;        
        $scope.artists = res.data;
        $scope.ready = true;
      })
      .catch(function(err) {

        $scope.error = true;
        $scope.ready = true;        
        console.error('Error', err.status, err.data);
      });
  };

  // Crear album
  $scope.create = function(album) {

    $scope.noReady = true;
    $scope.error = false;

    var url = $rootScope.urlBackend+'api/v1/albums';
 
    // File for Upload
    var targetPath = $scope.pathForImage($scope.image);
  
    // File name only
    var filename = $scope.image;
  
    var options = {
      fileKey: "image",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {
        'artist_id': album.artist_id,
        'name': album.name,
        'year': album.year,
        'gender_id': album.gender_id,
        'description': album.description,
        'image': filename,
        'user_id': 1
      }
    };    
  
    $cordovaFileTransfer.upload(url, targetPath, options)
      .then(function(result) {
        
        $scope.showAlert("Success", "Registro almacenado satisfactoriamente");
        $location.path('/tab/albums');
      },
      function(err){
        $scope.showAlert('Error', JSON.stringify(err));
      })
  };

  // Actualizar album
  $scope.update = function(album) {

    $scope.noReady = true;
    $scope.error = false;

    var url = $rootScope.urlBackend+'api/v1/albums/'+album.id;
 
    // File for Upload
    var targetPath = $scope.pathForImage($scope.image);
  
    // File name only
    var filename = $scope.image;
  
    var options = {
      fileKey: "image",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {
        '_method': 'put',
        'artist_id': album.artist_id,
        'name': album.name,
        'year': album.year,
        'gender_id': album.gender_id,
        'description': album.description,
        'image': filename,
        'user_id': 1
      }
    };    
    
    $cordovaFileTransfer.upload(url, targetPath, options)
      .then(function(result) {
        
        $scope.showAlert("Success", "Registro actualizado satisfactoriamente");
        $location.path('/tab/albums');
      },
      function(err){
        $scope.showAlert('Error', JSON.stringify(err));
      })
    ;      
  };

  // Funciones de Cordova

  // Muestra una ventana $ionicPopup alert con el titulo y mensaje indicado
  $scope.showAlert = function(title, msg) {

    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };

  // Obtiene la ruta de la imagen para mostrarla en la vista
  $scope.pathForImage = function(image) {

    if (image === null) {
      return '';
    } 
    else {
      return cordova.file.dataDirectory + image;
    }
  };

  // Muestra la ventana dialog para subir la imagen
  $scope.loadImage = function() {

    var options = {
      title: 'Seleccionar fuente de la Imagen',
      buttonLabels: ['Usar la camara','Desde el tlf'],
      addCancelButtonWithLabel: 'Cancelar',
      androidEnableCancelButton : true
    };

    $cordovaActionSheet.show(options).then(function(btnIndex) {
      
      var type = null;

      // Opcion 1 - Usar la camara
      if(btnIndex === 1) {
        type = Camera.PictureSourceType.CAMERA;          
      } 
      else if (btnIndex === 2) { // Opcion 2 - Desde el tlf
        type = Camera.PictureSourceType.PHOTOLIBRARY;
      }

      if(type !== null) {
        $scope.selectPicture(type);
      }
    });    
  };

  // Permite tomar la foto desde la camara o elegir desde las fotos en el tlf
  $scope.selectPicture = function(sourceType) {

    var options = {
      quality: 60,      
      destinationType: Camera.DestinationType.FILE_URI, // NATIVE_URI for IOS
      sourceType: sourceType,
      saveToPhotoAlbum: false
    };
    
    // Tomar la foto. Segun las opciones - var options
    $cordovaCamera.getPicture(options).then(function(imagePath) {

      // Se obtiene el nombre del archivo en el directorio temporal que retorna el metodo getPicture()
      var currentName = imagePath.substr(imagePath.lastIndexOf('/')+1);      

      // Si quisieramos renombrar el archivo
      var newFileName = currentName;

      // Si el tlf es Android y se elige cargar una imagen desde el tlf
      if($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {


        /*
          http://ourcodeworld.com/articles/read/22/solve-native-path-of-android-content-if-resolvelocalfilesystemurl-doesn-t-work

          However, with android version >= 4.4 was introduced the MediaStore. 
          The Media provider contains meta data for all available media on both 
          internal and external storage devices and returns a content:// URI.

          Then if your filebrowser provides a native uri content of android, something 
          like : content://com.google.android.apps.photos.contentprovider/0/1/content%3A%2F%2Fmedia%2Fexternal%2Fimages%2Fmedia%2F63131
          instead of file:///path/to/myfile/ ,  you will be unable to retrieve a file 
          entry of the previous path as the cordova file plugin expects an absolute file path.

          This is a well known problem of the paths with android >= 4.4, therefore someone 
          just wrote a plugin to solve this issue, you can use the following solution.
        */

        window.FilePath.resolveNativePath(imagePath, successNative, failNative);

        function failNative(err){
          console.error(err);
        }

        function successNative(realPath) {

          window.resolveLocalFileSystemURL(realPath, success, fail);
          
          function fail(e) {
            console.error('Error: ', e);
          };

          function success(fileEntry) {

            var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
            
            $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
              $scope.image = newFileName;
            },
            function(error){
              $scope.showAlert('Error', error.exception);
            });
          };
        }
      }
      else { // en cualquier otro caso

        var namePath = imagePath.substr(0, imagePath.lastIndexOf('/')+1);

        // Move the file to permanent storage
        $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
          .then(function(success){
            $scope.image = newFileName; // Se setea el $scope.image debido a que la imagen fue movida satisfactoriamente
          }, 
          function(error){
            $scope.showAlert('Error', error.exception);
          });
      }
    },
    function(err){
      $scope.showAlert('Error', err);
    })
  };  
})

.controller('UserCtrl',
  ['$scope','$timeout','$location','$state','$stateParams','$ionicPopup','UserFactory',
  function($scope,$timeout,$location,$state,$stateParams,$ionicPopup,UserFactory){

    $scope.id = $stateParams.id;

    $scope.list = function() {
      
      UserFactory.list()
        .then(function(res) {

          $scope.error = false;
          $scope.ready = false;
          $scope.users = res.data;
          $scope.ready = true;
        })
        .catch(function(err) {

          $scope.error = true;
          $scope.ready = true;
          $scope.message = "Status "+err.status+" - "+err.data;
          console.error('Error', err.status, err.data);
        })
        .finally(function() {
          
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.show = function(id) { 

      $scope.noReady = true;
      $scope.error = false;

      UserFactory.show(id)
        .then(function(res) {

          $scope.noReady = false;
          $scope.user = res.data;
        })
        .catch(function(err) {
          
          console.error('Error', err.status, err.data);
        });
    };

    $scope.create = function(user) {

      $scope.noReady = true;
      $scope.error = false;

      UserFactory.create(user)
        .then(function(res) {

          $scope.noReady = false;
          $scope.success= true;
          $timeout(function() {
            $location.path('/tab/users');
          }, 1500);
        })
        .catch(function(err) {
          
          $scope.noReady = false;
          $scope.error = true;
          $scope.status = "Error: "+err.status;
          $scope.message = err.data;
        });
    };

    $scope.update = function(user) {

      $scope.noReady = true;
      $scope.error = false;

      UserFactory.update(user)
        .then(function(res) {

          $scope.noReady = false;
          $scope.success= true;
          $timeout(function() {
            $location.path('/tab/users');
          }, 1500);
        })
        .catch(function(err) {
          
          $scope.noReady = false;
          $scope.error = true;
          $scope.status = "Error: "+err.status;
          $scope.message = err.data;
        });
    };

    $scope.destroy = function(id){

      var confirmPopup = $ionicPopup.confirm({
        title: 'Eliminar usuario',
        template: '¿Desea usted eliminar este registro?'
      });
      confirmPopup.then(function(res) {
        if(res) {

          UserFactory.destroy(id)
            .then(function(res) {
              
              var alertPopup = $ionicPopup.alert({
                title: 'Registro eliminado',
                template: res.data
              });
              
              alertPopup.then(function(res) {
                
                $state.go($state.current, {}, {reload: true});
              });
            })
            .catch(function(err) {
            
              var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'No se pudo eliminar el registro. Error: '+err.status+' - '+err.data
              });

              alertPopup.then(function(res) {
                console.error('Error', err.status, err.data);
              });
            });
        }
      });
    };
  }
])

.controller('AuthenticationCtrl', function($scope,$rootScope,$http,$location,AuthenticationFactory,$localStorage){

  $scope.login = function(user) {

    AuthenticationFactory.login(user)
      .then(function(res) {

        $rootScope.isAuthenticated = true;
        $localStorage.token = res.data.token;

        // add jwt token to auth header for all requests made by the $http service
        $http.defaults.headers.common.Authorization = 'Bearer ' + res.data.token;

        $location.path('/tab/home');
      })
      .catch(function(err) {

        $scope.message = "Status "+err.status+" - "+err.data;        
      });
  };
})

.controller('LogoutCtrl',function($scope,$location, $localStorage,$http){

  delete $localStorage.token;
  $http.defaults.headers.common.Authorization = '';
  $location.path('#/login');
});
;