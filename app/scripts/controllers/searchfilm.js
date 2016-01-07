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
      console.log('keyword: ' + $scope.keyword);
      $location.path('/doSearch/' + $scope.keyword);
    }
  });

angular.module('mymovies41FrontendApp')
    .controller('DoSearchCtrl', function ($scope, $routeParams, Searcher) {
      Searcher.searchFilms($routeParams.keyword).then(function (response) {
           $scope.films = response.data;
           //$scope.films = [
           //   {"comment":"","description":"","id":4528,"mediaFiles":[],"owner":null,"performers":"Holly Michaels","rating":null,"streetDate":"2014-02-28","studio":{"filmCount":97,"id":319,"name":"Nubile Films","url":"http://www.nubilefilms.com"},"title":"Body Language"},
           //   {"comment":"","description":"","id":4528,"mediaFiles":[],"owner":null,"performers":"Holly Michaels","rating":null,"streetDate":"2014-02-28","studio":{"filmCount":97,"id":319,"name":"Nubile Films","url":"http://www.nubilefilms.com"},"title":"Body Language"}
           // ]
      });
    });
