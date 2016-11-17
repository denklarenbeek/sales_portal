var app = angular.module('salesPortal');

//OFFER CONTROLLER
app.controller('ohcController', function($scope, $http, $routeParams, dataServices, sortDocumentsServices, $rootScope, alertMessServices) {

  $scope.selectedOhc = "generalOhc";

  //Get all the ohc documents of this customer
  $scope.documents = sortDocumentsServices.getDocuments($rootScope.data.documents, 'ohc');

  //Add the updated time as new value to customer
  for (var i=0, iLen=$scope.documents.length; i<iLen; i++) {
    var x = $scope.documents[i].updatedAt;
    $scope.documents[i].changed = x.substring(0,10);
  };

  $scope.clickOhc = function(index) {

    //Set the document to the specific documents
    $scope.document = $scope.documents[index];

    //Set the view to a specific ohc
    $scope.selectedOhc = "specificOhc";

  }
});
