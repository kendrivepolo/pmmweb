'use strict';

/**
 * @ngdoc function
 * @name mymovies41FrontendApp.controller:SearchfilmctrlCtrl
 * @description
 * # SearchfilmCtrl
 * Controller of the mymovies41FrontendApp
 */
angular.module('mymovies41FrontendApp')
  .controller('SearchfilmCtrl', function ($scope, $rootScope, Search) {
        var keyword = "";
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        var doSearch = function () {
            Search.searchFilms($scope.keyword).then(function (response) {
                console.log($scope.keyword)
            });
        };
  });
