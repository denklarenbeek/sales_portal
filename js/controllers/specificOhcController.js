var app = angular.module('salesPortal');

//OFFER CONTROLLER
app.controller('specificOhcController', function($scope, $http, $routeParams, $location, $rootScope, dataServices, sortDocumentsServices, alertMessServices) {

  var id = $location.path();
  $scope.typeSmartModules = [];
  $scope.typeSmartProducts = [];
  $scope.typeSmartServices = [];
  $scope.typeRemote = [];
  var list = [
    {description: 'hallo'},
    {description: 'doei'},
    {description: 'dag'}
  ]

  $scope.returnToPage = function() {
    var page = $location.path().substring(0,36);
    $rootScope.selectedTab = 'generalOhc';
    $location.path(page);
  }

  //list, is the array where to search in
  //key, is the description you're looking for

  function findObjectKey(list, objectKey, value) {
    for (var i = 0, iLen = list.length; i<iLen; i++) {
      var objectIndex = list.findIndex(x => x[objectKey]==value)
      return objectIndex;
    };
  }

  //function for push the products in the right array
  function categoryArray(data, value, array) {
    for (var i = 0, iLen=data.length; i<iLen; i++) {
      if(data[i].category === value) {
        array.push(data[i]);
      }
    }
  }

  function getOtherInfo(data) {
    for (var i = 0, iLen=data.length; i<iLen; i++) {
      var y = $scope.products.findIndex(x => x.description==data[i].description)
      data[i].ohc_time = $scope.products[y].ohc_time;
      data[i].year_price = $scope.products[y].year_price;
    }
  }

  function calcServices(services) {
    for (var i = 0, iLen=services.length; i<iLen; i++) {
      $scope.document.totalAmount += services[i].ohc_time;
      $scope.document.totalYearAmount += services[i].year_price;
    }
  }

  //Calculate the ohc_time (q_monitors, q_pumpwatch, insidecameras, outsidecameras)
  function calcQuantityProducts(cameraType, quantityCameras) {
    var objectIndex = $scope.products.findIndex(x => x.description==cameraType);
    var ohcTime = $scope.products[objectIndex].ohc_time;
    var total = quantityCameras * ohcTime;
    $scope.document.totalAmount += total;
  }

  function calcTravelCosts() {
    var objectIndex = $scope.products.findIndex(x => x.description==$rootScope.data.distance);
    var travel = $scope.products[objectIndex].install_price;
    $scope.document.travel_costs = travel;
  }

  $scope.calcTotalAmountDocument = function calculateOhc() {
    getOtherInfo($scope.document.services);
    $scope.document.totalAmount = 0;
    $scope.document.totalYearAmount = 0;
    calcServices($scope.document.services);
    calcQuantityProducts("Binnen camera's", $scope.document.insidecameras);
    calcQuantityProducts("Buiten camera's", $scope.document.outsidecameras);
    calcQuantityProducts("Monitor", $scope.document.q_monitors);
    calcQuantityProducts("PumpWatch", $scope.document.q_pumpwatch);
    $scope.document.totalAmount = Math.round($scope.document.totalAmount * (60.25/60));

    //Add travel costs to the total amount
    calcTravelCosts()
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
    $rootScope.document = $scope.document;
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
        getOtherInfo($scope.document.services);
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
