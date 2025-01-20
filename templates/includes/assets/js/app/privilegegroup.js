var app = angular.module('myApp', []).config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{a');
    $interpolateProvider.endSymbol('a}');
}]);
app.controller('PrivilegeGroupController', ['$scope','$http', function($scope,$http) {
    $scope.getAll= function(){
        
        var postdata="";
        postBack("admin/getAllPrivilegeGroups","postdata="+postdata,function(response){
              var json=JSON.parse(response);
              console.log(json);
              var output=json.data;
               $("#tableBody").html("");
                var html = "";
                for (var i = 0; i < output.length; i++) {

                    var tableData = "<tr>";
                    tableData += "<td><input id='cb" +output[i][0] + "' type='checkbox' name='selectRow' value='" + output[i][0] + "' style='height:20px;width:20px' />";

                    if (output[i].flag == 1)
                        tableData += '<span class="label label-flat label-icon text-danger" data-popup="tooltip" data-placement="bottom" title="Deleted" style="float:right; padding-top: 4px;"><i class="icon-trash"></i></span>';

                    tableData += "<td class='nameClass'>" + output[i][1] + "</td>";
                   
                    
                    
                    tableData += "</tr>";
                    $("#tableBody").append(tableData);
              }
                 applyFilterableList();
                 });
     
        
    }
    
    //$scope.getAll();


}]);