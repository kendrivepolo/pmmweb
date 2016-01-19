'use strict';

var services = angular.module('MyServices', []);

services.factory('Films',  ['$http', '$rootScope','$cacheFactory', function($http, $rootScope, $cacheFactory) {
    return {
        getTotalFilmNumber : function() {
             return $http.get($rootScope.baseUrl + '/films/number');
        },

        getFilmsByPage : function(page, size) {
            return $http.get($rootScope.baseUrl + '/films?page=' + page + '&size=' + size, { cache: true });
        },

        getFilm : function(id){
            return $http.get($rootScope.baseUrl + '/films/' + id, { cache: true });
        },

        getScreenshots : function(id){
            return $http.get($rootScope.baseUrl + '/films/' + id + '/screenshots', { cache: true });
        },

       updateFilm : function(film){
            return $http.put($rootScope.baseUrl + '/films/' + film.id, film).success(function() {
                var $httpDefaultCache = $cacheFactory.get('$http');
                $httpDefaultCache.removeAll();
             });
       },

       createFilm : function(film, coverImage, screenshotImages){
            var fd = new FormData();
            fd.append('cover', coverImage);
            for(var i=0; i<screenshotImages.length;i++) {
                console.log('screenshot: ' + i);
                fd.append('screenshots', screenshotImages[i]);
            }
            fd.append('body', JSON.stringify(film));

            return $http.post($rootScope.baseUrl + '/films', fd, {
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).success(function() {
                var $httpDefaultCache = $cacheFactory.get('$http');
                $httpDefaultCache.removeAll();
            });
       }
    };
}]);

//
//define 'Studios' Service
//
services.factory('Studios',  ['$http',  '$rootScope', function($http, $rootScope) {
    return {
        getStudios : function() {
            return $http.get($rootScope.baseUrl + '/studios');
        }
    };
}]);

//
//define 'MediaTypes' Service
//
services.factory('MediaTypes',  ['$http',  '$rootScope', function($http, $rootScope) {
    return {
        getMediaTypes : function() {
            return $http.get($rootScope.baseUrl + '/mediatypes');
        }
    };
}]);

//
//define 'Search' Service
//
services.factory('Searcher',  ['$http',  '$rootScope', function($http, $rootScope) {
    return {
        searchFilms : function(keyword) {
            return $http.get($rootScope.baseUrl + '/search/' + keyword);
        }
    };
}]);

services.factory('Login', ['$resource', '$rootScope', 
    function($resource, $rootScope) {
        return $resource($rootScope.baseUrl + '/accesstoken', {}, {
           login: {method: 'POST', cache: false, isArray: false}
        });
    }]);

services.factory('logService', function () {
var messageCount = 0;
return {
log: function (msg) {
console.log('(LOG + ' + messageCount++ + ') ' + msg);
}
};
});
