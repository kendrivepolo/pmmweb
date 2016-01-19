'use strict';

/**
 * @ngdoc function
 * @name mymovies41FrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mymovies41FrontendApp
 */
angular.module('mymovies41FrontendApp')
    .controller('ViewFilmCtrl', function ($scope, $cookies, $routeParams, $log, 
        $location, $http, $rootScope, FileUploader, 
        Films, Studios, MediaTypes, checkCreds) {
        //check login info    
        if (!checkCreds()) {
            $location.path('/login');
        }    

        var film = {};
        var coverImageUrl = $rootScope.baseUrl + '/films/' + $routeParams.id + '/cover';
        var screenshotImageBaseUrl = $rootScope.baseUrl + '/films/' + $routeParams.id + '/screenshots';

        $cookies.currentFilmId = $routeParams.id;
        $scope.showAddStudioFlag = false;
        $scope.coverImageUploader = new FileUploader({
            url: coverImageUrl,
            autoUpload: true,
            queueLimit: 1,
            alias: 'cover',
            removeAfterUpload: true
        });
        $scope.screenshotImagesUploader = new FileUploader({
            url: screenshotImageBaseUrl,
            autoUpload: true,
            alias: 'screenshots',
            removeAfterUpload: false
        });
        $scope.coverImageUrl = coverImageUrl;
        $scope.screenshotImageBaseUrl = screenshotImageBaseUrl;

        //reload cover image after uploading
        $scope.coverImageUploader.onCompleteItem = function () {
            var random = (new Date()).toString();
            coverImageUrl = coverImageUrl + '?cb=' + random;
            $scope.coverImageUrl = coverImageUrl;
            $rootScope.imgTimestamp = random;
        };

        var loadFilm = function () {
            Films.getFilm($routeParams.id).then(function (response) {
                film = response.data;
                if (film.mediaFiles.length <= 0) {
                    film.mediaFiles = [{'format':'empty','storage':'empty'}];
                }
                $scope.film = film;
            });
        };
        loadFilm();

        Films.getScreenshots($routeParams.id).then(function (response) {
            var screenshots = response.data;
            $scope.screenshots = screenshots.filenames;
        });

        $scope.updateFilm = function () {

            Films.updateFilm($scope.film).then(
                function () {
                    $scope.showUpdateFilmResult = false;
                    $scope.appendComment = '';
                    $log.log('update film ' + $scope.film.id + ' successfully');
                    //reload film
                    loadFilm();
                },
                function () {
                    $scope.showUpdateFilmResult = true;
                    $log.log('update film ' + $scope.film.id + ' fails');
                }
            );
        };

        var calculateProperyContent = function () {
            var propertyContent = '';
            if (angular.isDefined($scope.film)) {
                propertyContent = $scope.film.title + $scope.film.streetDate + $scope.film.performers +
                angular.toJson($scope.film.studio) + angular.toJson($scope.film.mediaFiles) +
                $scope.film.comment + $scope.film.description;
            } else {
                propertyContent = '';
            }
            return propertyContent;
        };

        $scope.$watch('appendComment', function() {
            var d = new Date();
            if (angular.isDefined($scope.film) && $scope.appendComment !== '') {
            	if ($scope.film.comment == null) {
            		$scope.film.comment = '';
            	}
                $scope.film.comment = $scope.film.comment + '\n\r[' + d.toDateString() + ']\n\r' + $scope.appendComment;
            }
        });

        $scope.$watch(calculateProperyContent, function (newValue, oldValue) {
            //$log.log('old value: ' + angular.toJson(oldValue));
            //$log.log('new value: ' + angular.toJson(newValue));
            if (oldValue === '' || newValue === oldValue) {
                $log.log('film is not changed!');
            } else {
                $log.log('film is changed, update backend data!');
                $scope.updateFilm();
            }
        });

        $scope.listStudios = function () {
            Studios.getStudios().then(function (response) {
                $scope.studios = response.data;
            });
        };

        $scope.listMediaTypes = function () {
            //$scope.mediaTypes = ['AVI','BLURAY','DVD','MKV','MOV','MP4','MPEG','RM','VCD','WMV'];
            MediaTypes.getMediaTypes().then(function (response) {
                    $scope.mediaTypes = response.data;
                },
                function () {
                    $log.log('get media types fails');
                }
            );
        };

    })//end of ViewFilmCtrl
    .controller('CreateFilmCtrl', function ($scope, $cookies, $routeParams, 
        $location, $log, $http, $rootScope, FileUploader, 
        Films, Studios, MediaTypes, checkCreds) {
        //check login info    
        if (!checkCreds()) {
            $location.path('/login');
        } 
        var coverImage;
        var screenshotImages = [];

        $scope.showAddStudioFlag = false;

        $scope.createFilm = function () {
            var mediaFile = {};
            var mediaFiles = [];

            if ($scope.showAddStudioFlag) {
                var newStudio = {'name': $scope.newStudio, 'id': -1};
                $scope.film.studio = newStudio;
            }

            if ($scope.film.comment) {
                var d = new Date();
                $scope.film.comment = '[' + d.toDateString() + ']\n\r' + $scope.film.comment;
            }

            if ($scope.mediaType) {
                mediaFile.format = $scope.mediaType;
                mediaFile.storage = $scope.storage;
                mediaFiles[0] = mediaFile;
                $scope.film.mediaFiles = mediaFiles;
            }

            Films.createFilm($scope.film, coverImage, screenshotImages).then(
                function () {
                    $scope.createFilmSuccess = true;
                    $log.log('create film ' + $scope.film.title + ' successfully');
                },
                function () {
                    $scope.createFilmSuccess = false;
                    $log.log('create film ' + $scope.film.title + ' fails');
                }
            );
        };

        $scope.listStudios = function () {
            Studios.getStudios().then(function (response) {
                $scope.studios = response.data;
            });
        };

        $scope.listMediaTypes = function () {
            MediaTypes.getMediaTypes().then(function (response) {
                    $scope.mediaTypes = response.data;
                },
                function () {
                    $log.log('get media types fails');
                }
            );
        };

        $scope.setCoverImage = function (files) {
            coverImage = files[0];
        };

        $scope.setScreenshotImages = function (files) {
            screenshotImages = files;
        };

        $scope.showAddStudio = function () {
            $scope.showAddStudioFlag = true;
        };
    });

