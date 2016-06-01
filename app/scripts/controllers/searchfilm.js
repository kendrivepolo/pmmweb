'use strict';

/**
 * @ngdoc function
 * @name mymovies41FrontendApp.controller:SearchfilmctrlCtrl
 * @description
 * # SearchfilmctrlCtrl
 * Controller of the mymovies41FrontendApp
 */
angular.module('mymovies41FrontendApp')
  .controller('SearchCtrl', function ($scope, $location) {
    $scope.submit = function(){
      $location.path('/doSearch/' + $scope.keyword);
    };
  });

angular.module('mymovies41FrontendApp')
    .controller('DoSearchCtrl', function ($scope, $routeParams, Searcher) {
      Searcher.searchFilms($routeParams.keyword).then(function (response) {
           $scope.keyword = $routeParams.keyword;
           $scope.films = response.data;
      });
    });
