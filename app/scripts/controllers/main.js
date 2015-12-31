'use strict';

/**
 * @ngdoc function
 * @name mymovies41FrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mymovies41FrontendApp
 */
angular.module('mymovies41FrontendApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope, $cookies, $location, $anchorScroll, Films, Searcher) {
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



   $scope.searchFilms = function () {
       var testdata = [
           {"comment":"","description":"When her husband came from work today, Christine was there waiting for him with a little treat. She fed Logan grapes directly from her mouth, while she told him all the naughty things she wanted to do to him in bed. As Christine's hand traveled down Logan's flat stomach into his jeans, she discovered his member stiff and throbbing. His hardness turned her on so much, she wrapped her lips around the head, and pushed them to the base of the shaft. Once her snatch was so wet, Logan took her to bed and thrust himself deep into her from behind until a her sweet pussy clenched with orgasms.","id":4428,"owner":null,"performers":"Christine Paradise","rating":null,"streetDate":"12/27/2013","studio":{"filmCount":97,"id":306,"name":"Babes.com","url":"http://www.babes.com"},"title":"Take Me Down"},
           {"comment":"","description":"Whenever Tyler Nixon comes home to find his girlfriend Tiffany Tyler wearing her high leather boots, he knows he's in for some really hot sex. This one night, Tiffany didn't waste any time sucking on Tyler's prick, licking at the crown like a lollipop, and sliding her wet lips up and down the shaft while playing with his balls. Then she climbed on top and straddled him like a cowgirl, bucking her hips as she rode him hard and fast. After Tiffany laid back to take his dick missionary-style, she tugged on his prick until he came all over her chest.","id":4429,"owner":null,"performers":"Tiffany Tyler","rating":null,"streetDate":"12/30/2013","studio":{"filmCount":97,"id":306,"name":"Babes.com","url":"http://www.babes.com"},"title":"In Her Mouth"},{"comment":"","description":"美女自摸，用根彎彎的棒子，自己捅自己。","id":4430,"owner":null,"performers":"Jasmin","rating":null,"streetDate":"2014.03.01","studio":{"filmCount":136,"id":302,"name":"WowGirls.com","url":"http://www.wowgirls.com"},"title":"Killing Time"},
           {"comment":"","description":"","id":4507,"owner":null,"performers":"Emily Grey","rating":null,"streetDate":"2014-05-16","studio":{"filmCount":35,"id":117,"name":"18YearsOld.com","url":"http://18yearsold.com/h18/index.php?p=1"},"title":"Freaks in the Sheets"},
           {"comment":"","description":"","id":4508,"owner":null,"performers":"Emily Grey","rating":null,"streetDate":"May 16, 2014","studio":{"filmCount":35,"id":117,"name":"18YearsOld.com","url":"http://18yearsold.com/h18/index.php?p=1"},"title":"Emily's Smooth Pussy"},
           {"comment":"","description":"留下Scene 4：Denis Reed、Jenny Simons及Scene 5：Kattie Gold、Kristof Cale","id":4509,"owner":null,"performers":"","rating":null,"streetDate":"2014","studio":{"filmCount":33,"id":161,"name":"Daring","url":""},"title":"A Touch Of Nature"},
           {"comment":"","description":"","id":4510,"owner":null,"performers":"Abigaile Johnson","rating":null,"streetDate":"","studio":{"filmCount":1,"id":354,"name":"First Anal Quest","url":"http://firstanalquest.com/"},"title":"College cutie does hardcore anal"}
       ];

       var i, l = testdata.length;
       $scope.films = [];
       $scope.filmChunks = [];

       for ( i = 0; i < l; i += 3) {
           console.log(i);
           $scope.filmChunks.push( testdata.slice(i, i + 3) );
       }

       $scope.films = testdata;
       //Searcher.searchFilms($scope.keyword).then(function (response) {
       //    $scope.films = response.data;
       //});
   };

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

