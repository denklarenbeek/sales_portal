var app = angular.module('salesPortal');

//OFFER CONTROLLER
app.controller('specificOhcController', function($scope, $http, $routeParams, $location, $rootScope, dataServices, sortDocumentsServices, alertMessServices) {

  var id = $location.path();
  $scope.typeSmartModules = ['Fuel', 'Shop', 'Car', 'Service', 'Park'];
  $scope.typeSmartProducts = ['AutoAlert', 'PumpCheck'];
  $scope.typeSmartServices = ['Portal', 'Watch-it', 'Snapshot', 'Heartbeat 2.0', 'BBI'];

  // GET specific document
  dataServices.get(id).then(function successCallback(response){
    $scope.document = response.data;
  }, function errorCallback(error){
    var errorMessage = error.status + ' ' + error.statusText;
    alertMessServices.error(errorMessage)
  });

  //PUT specific document
  $scope.saveDocument = function(customerData) {
    dataServices.put(id, customerData).then(function successCallback(response) {
        var message = response.config.data.company + " is bijgewerkt";
        alertMessServices.success(message);
        $rootScope.editing = false;
    //Error Callback
    }, function errorCallback(response){
      var errorMessage = response.statusText + ' ' + response.data.company;
      alertMessServices.error(errorMessage);
    })
  }

  $scope.deleteDocument = function() {
    dataServices.remove(id).then(function successCallback(response){
      alertMessServices.success('verwijderd');
      var locationId = $location.path().split('/')[2];
      $location.path('/locations/' + locationId);
    })
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
