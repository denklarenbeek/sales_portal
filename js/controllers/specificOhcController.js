var app = angular.module('salesPortal');

//OFFER CONTROLLER
app.controller('specificOhcController', function($scope, $http, $routeParams, $location, $rootScope, dataServices, sortDocumentsServices, alertMessServices) {

  var id = $location.path();
  $scope.typeSmartModules = [];
  $scope.typeSmartProducts = [];
  $scope.typeSmartServices = [];
  $scope.typeRemote = [];
  $scope.test = [];
  $scope.totalAmount = 0;

  //function for push the products in the right array
  function categoryArray(data, value, array) {
    for (var i = 0, iLen=data.length; i<iLen; i++) {
      if(data[i].category === value) {
        array.push(data[i]);
      }
    }
  }

  function getOtherInfo(data, value, array) {
    for (var i = 0, iLen=data.length; i<iLen; i++) {
      var y = $scope.products.findIndex(x => x.description==data[i].description)
      data[i].ohc_time = $scope.products[y].ohc_time;
      data[i].price = $scope.products[y].price;
      data[i].billing = $scope.products[y].billing;
      console.log(data[i]);
    }
  }

  function calcServices(services) {
    for (var i = 0, iLen=services.length; i<iLen; i++) {
      $scope.totalAmount += services[i].ohc_time;
    }
  }

  function calcCameras(type, datakey) {
    var y = $scope.products.findIndex(x => x.description==type);
    var qCam = datakey;
    var ohcTime = $scope.products[y].ohc_time;
    var total = qCam * ohcTime;
    $scope.totalAmount += total;
  }

  $scope.testbutton = function calculateOhc() {
    $scope.totalAmount = 0;
    calcServices($scope.document.services);
    console.log($scope.totalAmount);
    calcCameras("Binnen camera's", $scope.document.insidecameras);
    console.log($scope.totalAmount);
  }

  $http.get('mock/product.json').success(function(data){
    $scope.products = data;
    categoryArray(data, 'Slimme modules', $scope.typeSmartModules);
    categoryArray(data, 'Slimme producten', $scope.typeSmartProducts);
    categoryArray(data, 'Slimme diensten', $scope.typeSmartServices);
    categoryArray(data, 'Remote verbinding', $scope.typeRemote);
  });

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
        getOtherInfo($scope.document.services, 'Shop', $scope.test);
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
