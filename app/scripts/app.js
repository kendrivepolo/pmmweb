'use strict';

/**
 * @ngdoc overview
 * @name mymovies41FrontendApp
 * @description
 * # mymovies41FrontendApp
 *
 * Main module of the application.
 */
angular
    .module('mymovies41FrontendApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'MyServices',
        'xeditable',
        'angularFileUpload'
    ])
    .run(function (editableOptions, $rootScope) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
       $rootScope.baseUrl = 'http://59.125.131.152/mymovies-backend-4.1';
       //$rootScope.baseUrl = 'http://localhost:8080/pmm';
       //$rootScope.baseUrl = '../mymovies-backend-4.1';
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'MainCtrl',
                templateUrl: 'views/main.html'
            })
            .when('/film/:id', {
                controller: 'ViewFilmCtrl',
                templateUrl: 'views/film.html'
            })
            .when('/new', {
                templateUrl: 'views/createfilm.html',
                controller: 'CreateFilmCtrl'
            })
            .when('/signin', {
              templateUrl: 'views/signin.html',
              controller: 'SigninCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .filter('atLeast', function () {
        return function (text, length) {
            if (isNaN(length)) {
                length = 10;
            }
            if (text.length >= length) {
                return text;
            }
            else {
                var spaces = '';
                for (var i = 0; i < length - text.length; i++) {
                    spaces = spaces + '\xA0';
                }
                return text + spaces;
            }
        };
    });

