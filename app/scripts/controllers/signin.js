'use strict';

/**
 * @ngdoc function
 * @name mymovies41FrontendApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the mymovies41FrontendApp
 */
angular.module('mymovies41FrontendApp')
  .controller('SigninCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    //copy from https://blog.codecentric.de/en/2014/06/angularjs-google-sign-integration/
    $scope.signedIn = false;
    
    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function(authResult) {
        // Do a check if authentication has been successful.
        if(authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;
 
            //     ...
            // Do some work [1].
            //     ...
        } else if(authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;
 
            // Report error.
        }
    };
 
    // When callback is received, we need to process authentication.
    $scope.signInCallback = function(authResult) {
        $scope.$apply(function() {
            $scope.processAuth(authResult);
        });
    };
 
    // Render the sign in button.
    $scope.renderSignInButton = function() {
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '483479118240-ecclo1826fa4sntoe0dchlu6idb6aqn8.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin'
            }
        );
    }
 
    // Start function in this example only renders the sign in button.
    $scope.start = function() {
        $scope.renderSignInButton();
    };
 
    // Call start function on load.
    $scope.start();
  });