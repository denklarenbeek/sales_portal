var app = angular.module('salesPortal');

//OFFER CONTROLLER
app.controller('specificOhcController', function($scope, $http, $routeParams, $location, $rootScope, dataServices, sortDocumentsServices, alertMessServices) {

  var id = $location.path();
  $scope.typeSmartModules = ['Fuel', 'Shop', 'Car', 'Service', 'Park'];
  $scope.typeSmartProducts = [{'description': 'AutoAlert', 'time': 0.15},{'description': 'PumpCheck', 'time': 1}]
  $scope.typeSmartServices = ['Portal', 'Watch-it', 'Snapshot', 'Heartbeat 2.0', 'BBI'];
  $scope.typeRemote = ['Open VPN', 'Tokheim', '4G']

  // GET specific document
  dataServices.get(id).then(function successCallback(response){
    $scope.document = response.data;
  }, function errorCallback(error){
    var errorMessage = error.status + ' ' + error.statusText;
    alertMessServices.error(errorMessage)
  });

  //PUT specific document
  $scope.saveDocument = function(customerData) {
    console.log(customerData);
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
    var url = id + '/services/'
    dataServices.post(url, {category: 'Slimme producten'}).then(function successCallback(response) {
      $scope.document.services.push({category: cat});
    }, function errorCallback(error){
      alertMessServices.error("Can not save service");
    });

  }

  //Delete item for the services object
  $scope.deleteItem = function(id) {
    var url = $location.path() + '/services/' + id;
    dataServices.remove(url).then(function(response){
      alertMessServices.success('verwijderd');
    })
    $scope.document.services.splice($scope.document.services.findIndex(x => x._id==id, 1));
  }

});
