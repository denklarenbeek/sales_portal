var app = angular.module('salesPortal');

//OFFER CONTROLLER
app.controller('ohcController', function($scope, $http, $routeParams, dataServices, sortDocumentsServices, $rootScope, alertMessServices) {

  $scope.selectedOhc = "generalOhc";
  $scope.typeSmartModules = ['Fuel', 'Shop', 'Car', 'Service', 'Park'];
  $scope.typeSmartProducts = ['AutoAlert', 'PumpCheck'];
  $scope.typeSmartServices = ['Portal', 'Watch-it', 'Snapshot', 'Heartbeat 2.0', 'BBI'];

  //Get all the ohc documents of this customer
  $scope.documents = sortDocumentsServices.getObjectByType($rootScope.data.documents, 'ohc');

  //Add the updated time as new value to customer
  for (var i=0, iLen=$scope.documents.length; i<iLen; i++) {
    var x = $scope.documents[i].updatedAt;
    $scope.documents[i].changed = x.substring(0,10);
  };

  //When click on OHC box
  $scope.clickOhc = function(index) {

    //Set the document to the specific documents
    $scope.document = $scope.documents[index];

    //Set the view to a specific ohc
    $scope.selectedOhc = "specificOhc";

  }

  $scope.newOhcItem = function() {
    $rootScope.data.documents.push({type: 'ohc'});
    $scope.selectedOhc = "specificOhc";
    $rootScope.editing = true;
  }

  //Push new item to the services object
  $scope.newItem = function(cat) {
    $scope.document.services.push({category: cat});
  }

  //Delete item for the services object
  $scope.deleteItem = function(id) {
    var locationId = $routeParams.id;
    var serviceId = id;
    var documentId = $scope.document._id;
    var url = locationId + '/documents/' + documentId + '/services/' + serviceId;
    var index = $scope.document.services.findIndex(x => x._id==serviceId);
    dataServices.remove(url).then(function(response){
      alertMessServices.success('verwijderd');
    })
    $scope.document.services.splice(index, 1);
  }

});
