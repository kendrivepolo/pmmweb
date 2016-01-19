'use strict';

//---business logic services only------------------------------------------------------------------

var MyBusinessServices = angular.module('MyBusinessServices', ['ngCookies']);

MyBusinessServices.factory('checkCreds', ['$cookies', function($cookies) {
        return function() {
            var returnVal = false;
            var blogCreds = $cookies.blogCreds;
            if (blogCreds !== undefined && blogCreds !== "") {
                returnVal = true;
            }
            return returnVal;
        };

    }]);

MyBusinessServices.factory('getToken', ['$cookies', function($cookies) {
        return function() {
            var returnVal = "";
            var blogCreds = $cookies.blogCreds;
            if (blogCreds !== undefined && blogCreds !== "") {
                returnVal = btoa(blogCreds);
            }
            return returnVal;
        };

    }]);

MyBusinessServices.factory('getUsername', ['$cookies', function($cookies) {
        return function() {
            var returnVal = "";
            var blogUsername = $cookies.blogUsername;
            if (blogUsername !== undefined && blogUsername !== "") {
                returnVal = blogUsername;
            }
            return returnVal;
        };

    }]);



MyBusinessServices.factory('setCreds', ['$cookies', function($cookies) {
        return function(un, pw) {
            var token = un.concat(":", pw);
            $cookies.blogCreds = token;
            $cookies.blogUsername = un;
        };

    }]);

MyBusinessServices.factory('deleteCreds', ['$cookies', function($cookies) {
        return function() {
            $cookies.blogCreds = "";
            $cookies.blogUsername = "";
        };
    }]);