var app = angular.module('myApp', []).config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{a');
    $interpolateProvider.endSymbol('a}');
}]);

app.controller('PaymentController', ['$scope', '$http', function ($scope, $http) {
    // File Upload Variables
    $scope.uploadData = {};
    $scope.responseMessage = '';
    $scope.imageFiles= "";
    $scope.selectedPayment=1;
    $scope.paymentStatus=1;
    $scope.action = 0; // 0 = ADD , 1 = UPDATE , 2 = DELETE 
    $scope.patientId = 1;
    $scope.adminId=1;
    $scope.selectedDiagnosisId=1;
    $scope.diagnoses = "";
    $scope.initialSymptoms = "";
    $scope.doctorReport = "";
    $scope.prescribedMedicines = "";
    $scope.paymentAmount="";
    $scope.modeofpayment=1;
    postdata = "";
    

    $http.get("payment/getallpayments").then(function (response) {
        $scope.payments = response.data;
    });
    $scope.loadModal = function (action) {
        $scope.action = action;
        $("#entity_modal").modal('show');



    }
    $scope.getDetails = function () {
        $scope.action = 2;
        var newObj = new Object();
        newObj.payment_id = $scope.selectedPayment;
        postdata = JSON.stringify(newObj);
        console.log(postdata);
        var post = $http({
            method: "POST",
            url: "payment/getPaymentDetails",
            dataType: 'json',
            data: postdata,
            headers: { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            $scope.paymentStatus=parseInt(response.data);
            $("#entity_modal").modal('show');
    }, function errorCallback(response) {


        });



 
    }

    $scope.selectPayment = function (id) {
        $scope.selectedPayment = id;
    }
    $scope.submitForm = function () {
        var newObj = new Object();
        newObj.payment_id = $scope.selectedPayment;
        newObj.status = $scope.paymentStatus;
        postdata = JSON.stringify(newObj);
        switch ($scope.action) {
            case 2:
                //Update Code Here 
                var post = $http({
                    method: "POST",
                    url: "payment/updatePayment",
                    dataType: 'json',
                    data: postdata,
                    headers: { 'Content-Type': 'application/json' }
                }).then(function successCallback(response) {
                    console.log(response);
                    showSuccessMessage("Payment Updated Sucessfully ! ");
                    $("#entity_modal").modal('hide');
                    


                }, function errorCallback(response) {


                });
                break;
        }
       
    }





}]);