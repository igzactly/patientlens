var app = angular.module('myApp', []).config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{a');
    $interpolateProvider.endSymbol('a}');
}]);
app.controller('PrivilegeGroupController', ['$scope','$http', function($scope,$http) {


}]);