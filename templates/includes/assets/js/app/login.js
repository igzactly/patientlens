var app = angular.module('myApp', []).config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{a');
    $interpolateProvider.endSymbol('a}');
}]);

app.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
    $scope.userId="";
    $scope.userPass= "";
    $scope.doLogin = function(){
        var newObj = new Object();
        newObj.userId = $scope.userId;
        newObj.userPass = $scope.userPass;
        postdata = JSON.stringify(newObj);
        var post = $http({
            method: "POST",
            url: "admin/doLogin",
            dataType: 'json',
            data: postdata,
            headers: { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            console.log(response);
            showSuccessMessage("user validated ! ");
            window.location = "admin";
            


        }, function errorCallback(response) {


        });
       
        
    }

}]);