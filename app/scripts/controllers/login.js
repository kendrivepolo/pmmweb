/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

angular.module('mymovies41FrontendApp')
    .controller('LoginCtrl', function ($scope, $location, setCreds, Login) {
            $scope.submit = function () {
            $scope.sub = true;
            /*
             * Real Login mechanism
             */
            
            var postData = {
                'userId': $scope.userid,
                'passwd': $scope.password
            };
            
            Login.login({}, postData,
                    function success(response) {
                        console.log('Success:' + JSON.stringify(response));
                        if (response.authenticated) {
                            setCreds($scope.userid, $scope.password, response.userkey);
                            $location.path('/');
                        } else {
                            $scope.error = 'Login Failed';
                        }

                    },
                    function error(errorResponse) {
                        console.log('Error:' + JSON.stringify(errorResponse));
                    }
            );
           
            //Fake Login mechanism
            /*
            var userid = $scope.userid;
            var password = $scope.password;
            if (userid === 'kendrivepolo' && password === 'kendrivep010') {
                setCreds($scope.userid, $scope.password);
                $location.path('/');
            } else {
                $scope.error = "Login Failed";
            }
            */
            };
    });
    
angular.module('mymovies41FrontendApp')
    .controller('LogoutCtrl', function ($location, deleteCreds) {
        deleteCreds();
        $location.path('/login');
    });    
