var app = angular.module('myApp', []).config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{a');
    $interpolateProvider.endSymbol('a}');
}]);
app.service('fileUploadService', ['$http', function ($http) {

}]);
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A', // Restrict to attribute usage
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            // Bind to change event on the file input element
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files); // Assign files to the scope
                });
            });
        }
    };
}]);



app.controller('DiagnosisController', ['$scope', '$http','fileUploadService', function ($scope, $http) {
    // File Upload Variables
    $scope.uploadData = {};
    $scope.responseMessage = '';
    $scope.imageFiles= "";
    // Diagnosis Variables

    $scope.action = 0; // 0 = ADD , 1 = UPDATE , 2 = DELETE 
    $scope.patientId = 1;
    $scope.adminId=1;
    $scope.selectedDiagnosisId=1;
    $scope.diagnoses = "";
    $scope.initialSymptoms = "";
    $scope.doctorReport = "";
    $scope.prescribedMedicines = "";
    postdata = "";
    

    $http.get("diagnosis/getalldiagnosis").then(function (response) {
        $scope.diagnoses = response.data;
    });
    $scope.loadModal = function (action) {
        $scope.action = action;
        $("#entity_modal").modal('show');



    }
    $scope.getDetails = function () {
        $scope.action = 2;
        var newObj = new Object();
        newObj.id = $scope.selectedDiagnosisId;
        postdata = JSON.stringify(newObj);
        console.log(postdata);
        var post = $http({
            method: "POST",
            url: "diagnosis/getDiagnosisDetails",
            dataType: 'json',
            data: postdata,
            headers: { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            var patient = response.data.data;
            var images = response.data.imagelist;
            console.log(images);
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



    // Initialize with patient ID and diagnosis ID
    const patientId = 1; // Example: Replace with dynamic value
    const diagnosisId = 1; // Example: Replace with dynamic value
    $scope.loadImages(patientId, diagnosisId);


    }

    $scope.selectDiagnosis = function (id) {
        $scope.selectedDiagnosisId = id;
    }
    $scope.getAllPatients = function(){
        $http.get("patients/getAllpatients").then(function (response) {
            $scope.patients = [];
            $scope.patients = response.data;
        });

    };
    $scope.getDoctors = function(){
        $http.get("admin/getDoctors").then(function (response) {
            $scope.doctors = [];
            $scope.doctors = response.data;
        });
    }
    $scope.submitForm = function () {
        var newObj = new Object();
        newObj.patient_id = $scope.patientId;
        newObj.admin_id = $scope.adminId;
        newObj.report = $scope.doctorReport;
        newObj.initial_symptoms = $scope.initialSymptoms;
        newObj.prescribed_medicines = $scope.prescribedMedicines
        postdata = JSON.stringify(newObj);
        switch ($scope.action) {
            case 0:
                $scope.uploadImages();
                // Add Code Here
                var post = $http({
                    method: "POST",
                    url: "diagnosis/adddiagnosis",
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
    $scope.uploadFilesToUrl = function (files, patientId, diagnosisId, uploadUrl) {
        var formData = new FormData();
        formData.append('patient_id', patientId);
        formData.append('diagnosis_id', diagnosisId);

        // Append all files to the FormData
        for (var i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        return $http.post(uploadUrl, formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    };
    $scope.uploadImages = function () {
        console.log("called");
        var files = $scope.imageFiles;
        console.log($scope.imageFiles);
        var patientId = $scope.patientId;
        var diagnosisId = $scope.selectedDiagnosisId;

        // Define the backend API URL
        var uploadUrl = 'diagnosis/uploadimages';

        if (files && files.length > 0 && patientId && diagnosisId) {
            console.log("trying to upload files");
            $scope.uploadFilesToUrl(files, patientId, diagnosisId, uploadUrl)
                .then(function (response) {
                    $scope.responseMessage = response.data.message || 'Images uploaded successfully!';
                })
                .catch(function (error) {
                    console.log(error.data.error);
                    $scope.responseMessage = 'Error uploading images: ' + (error.data.error || 'Unknown error');
                });
        } else {
            $scope.responseMessage = 'Please fill in all fields and select images.';
        }
    };

    $scope.getInformation = function(){
        var newObj = new Object();
        newObj.id = $scope.selectedDiagnosisId;
        postdata = JSON.stringify(newObj);
        console.log(postdata);
        var post = $http({
            method: "POST",
            url: "diagnosis/getDiagnosisDetails",
            dataType: 'json',
            data: postdata,
            headers: { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            $scope.images= [];
            var diagnosis = response.data.data;
            var images = response.data.imagelist;
            for (let i = 0; i < images.length; i++) {
                image = {"id":i,"src":images[i]}
               $scope.images.push(image)
            }
            $scope.patientId = diagnosis[1];
            $scope.adminId = diagnosis[2]
            $scope.adminName = diagnosis[3]; 
            $scope.patientName = diagnosis[4];
            $scope.initialSymptoms = diagnosis[5];
            $scope.diagnosisDate = diagnosis[6];
            $scope.prescribedMedicines = diagnosis[7];
            $("#info_modal").modal('show');
    }, function errorCallback(response) {


        });

    $scope.closeForm= function(){
        $("#info_modal").modal('hide');
    }

        
    }
//getting forms default values 
$scope.getAllPatients();
$scope.getDoctors();


}]);