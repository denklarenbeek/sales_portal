var app = angular.module('salesPortal');

//OFFER CONTROLLER
app.controller('ohcController', function($scope, $http, $routeParams, $location, $rootScope, dataServices, sortDocumentsServices, alertMessServices) {

  //Get all the ohc documents of this customer
  $scope.documents = sortDocumentsServices.getObjectByType($rootScope.data.documents, 'ohc');

  //Add the updated time as new value to customer
  for (var i=0, iLen=$scope.documents.length; i<iLen; i++) {
    var x = $scope.documents[i].updatedAt;
    $scope.documents[i].changed = x.substring(0,10);
  };

  $scope.goToPage = function(id, index) {
    var location = $location.path();
    var documentId = id;
    var url = location + "/documents/" + documentId;
    $location.path(url);
  }

  $scope.newOhcDocument = function() {
    var location = $location.path() + '/documents/';
    dataServices.post(location, {type: 'ohc'}).then(function successCallback(response){
      //Set editing mode on
      $rootScope.editing = true;
      //Get last object number
      var a = response.data.documents.length -1;
      //Navigate to location/:lId/documents/:dId
      $location.path(location + response.data.documents[a]._id);
      //Set alert message success
      alertMessServices.success('Nieuwe locatie is aangemaakt');
    }, function errorCallback(error){
      var errorMessage = error.status + ' ' + erro.statusText;
      alertMessServices.error(errorMessage);
    });
  }
});
