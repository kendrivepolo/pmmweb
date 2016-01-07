'use strict';

/**
 * @ngdoc function
 * @name mymovies41FrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mymovies41FrontendApp
 */
angular.module('mymovies41FrontendApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope, $cookies, $location, $anchorScroll, Films) {
   var startPage = 1;
   var filmsPerPage = 30;
   if (angular.isDefined($cookies.currentPage)) { startPage = parseInt($cookies.currentPage, 10); }

   /**
   * Function: showFilmsByPage(page)
   */
   var showFilmsByPage = function(page) {
   var films = []; 

   Films.getFilmsByPage(page, filmsPerPage).then(function(response){
         films = response.data;
         var i, l = films.length;
         $scope.filmChunks = [];

         for ( i = 0; i < l; i += 3) {
                $scope.filmChunks.push( films.slice(i, i + 3) );
         }

         $scope.films = films;
         $scope.currentPage = page;
         $cookies.currentPage = page;

         if (angular.isDefined($cookies.currentFilmId)) {
             $scope.currentFilmId = parseInt($cookies.currentFilmId, 10);
             $location.hash('film-' + $scope.currentFilmId);
             $anchorScroll();
         }
     }); 
    };//end of function showFilmsByPage

    /**
    * Function showPager
    */
    var showPager = function(startPage, totalFilmNumber) {
        angular.element('#pagination-demo').twbsPagination({
        startPage: startPage,
        totalPages: totalFilmNumber,
        visiblePages: 10,
        onPageClick: function (event, page) {
            //$('#page-content').text('Page number' + totalFilmNumber);
            angular.element('#film-table').scope().gotoPage(page);
            }
        });
    };

   $scope.nextPage = function() {
        showFilmsByPage($scope.currentPage + 1);
    };

   $scope.previousPage  = function() {
        showFilmsByPage($scope.currentPage - 1);
   };

   $scope.nextPage = function() {
        showFilmsByPage($scope.currentPage + 1);
   };

   $scope.gotoPage = function(page) {
        $cookies.currentPage = page;
         showFilmsByPage(page);
   };

   $rootScope.clearCurrentPageInCookie = function() {
        $cookies.currentPage = '';
        startPage = 1;
        showFilmsByPage(startPage);
   };

   $rootScope.setFocus = function(currentPage) {
        if (currentPage === 'Home') {
            $rootScope.isHomePage = true;
            $rootScope.isCreateFilmPage = false;
        } else if (currentPage === 'CreateFilm') {
            $rootScope.isHomePage = false;
            $rootScope.isCreateFilmPage = true;
        } else {
            $rootScope.isHomePage = false;
            $rootScope.isCreateFilmPage = false;
        }
   };

   //make images refresh when needed
   if (!angular.isDefined($rootScope.imgTimestamp)) {
       var random = (new Date()).toString();
       $rootScope.imgTimestamp = random;
    }

   $rootScope.setFocus('Home');

   //pagination, get total film number first.
    Films.getTotalFilmNumber().then(function(response){
           var totalFilmNumber = response.data.totalFilmNumber;
           var modulus = totalFilmNumber % filmsPerPage;
           var quotient = totalFilmNumber / filmsPerPage;
           if (modulus > 0) { quotient =  quotient + 1 ;  $scope.totalFilmNumber = quotient;}
           showPager(startPage, quotient);
    }); 

   showFilmsByPage(startPage);
});

