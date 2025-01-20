var app = angular.module('myApp', []).config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{a');
    $interpolateProvider.endSymbol('a}');
}]);

app.controller('PatientController', ['$scope', '$http', function ($scope, $http) {
    $scope.action = 0; // 0 = ADD , 1 = UPDATE , 2 = DELETE 
    $scope.selectedpatientiD = 0;
    $scope.patients = "";
    $scope.patientName = "";
    $scope.patientEmail = "";
    $scope.patientPhone = "";
    $scope.patientGender = "";
    $scope.patientBloodGroup = 1;
    $scope.patientAge = 0;
    $scope.patientMedicalHistory = "";
    $scope.patientEmergencyNumber="";
    $scope.bloodGroups = [{"id":1,"name":"A"},{"id":2,"name":"B"},{"id":3,"name":"AB"},{"id":4,"name":"O"}];
    postdata = "";
    $http.get("patients/getAllpatients").then(function (response) {
        $scope.patients = response.data;
    });
    $scope.loadModal = function (action) {
        $scope.action = 1;
        $("#entity_modal").modal('show');



    }
    $scope.getDetails = function () {
        $scope.action = 2;
        var newObj = new Object();
        newObj.id = $scope.selectedpatientiD;
        postdata = JSON.stringify(newObj);
        console.log(postdata);
        var post = $http({
            method: "POST",
            url: "patients/getpatientDetails",
            dataType: 'json',
            data: postdata,
            headers: { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            var patient = response.data.data;
            console.log(patient);

            $scope.patientName = patient[1];
            $scope.patientEmail = patient[2];
            $scope.patientPhone = patient[3];
            $scope.patientAge = patient[4];
            $scope.patientGender = patient[5];
            $scope.patientBloodGroup = patient[6];
            $scope.patientMedicalHistory = patient[7];
            $scope.patientEmergencyNumber = patient[8];

            $("#entity_modal").modal('show');


        }, function errorCallback(response) {


        });




    }

    $scope.selectPatient = function (id) {
        $scope.selectedpatientiD = id;
    }
    $scope.getAllPatients = function(){
        $http.get("patients/getAllpatients").then(function (response) {
            $scope.patients = [];
            $scope.patients = response.data;
        });

    };

    $scope.submitForm = function () {
        var newObj = new Object();
        newObj.id = $scope.selectedpatientiD;
        newObj.name = $scope.patientName;
        newObj.email = $scope.patientEmail;
        newObj.phone = $scope.patientPhone;
        newObj.gender = $scope.patientGender;
        newObj.bloodGroup = $scope.patientBloodGroup;
        newObj.medicalHistory = $scope.patientMedicalHistory;
        newObj.emergencyNumber = $scope.patientEmergencyNumber
        newObj.age=$scope.patientAge;
        postdata = JSON.stringify(newObj);
        switch ($scope.action) {
            case 1:
                // Add Code Here
                var post = $http({
                    method: "POST",
                    url: "patients/addpatient",
                    dataType: 'json',
                    data: postdata,
                    headers: { 'Content-Type': 'application/json' }
                }).then(function successCallback(response) {
                    showSuccessMessage("patient " + $scope.patientName + " Details Added Sucessfully ! ");
                    $("#entity_modal").modal('hide');


                }, function errorCallback(response) {


                });
                break;
            case 2:
                //Update Code Here 
                var post = $http({
                    method: "POST",
                    url: "patients/updatePatient",
                    dataType: 'json',
                    data: postdata,
                    headers: { 'Content-Type': 'application/json' }
                }).then(function successCallback(response) {
                    showSuccessMessage("patient " + $scope.patientName + " Details Updated Sucessfully ! ");
                    $("#entity_modal").modal('hide');
                    console.log(newObj.id);


                }, function errorCallback(response) {


                });
                break;
        }
        $scope.getAllPatients();
    }

}]);