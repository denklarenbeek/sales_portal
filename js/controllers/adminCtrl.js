var app = angular.module('salesPortal');

//OFFER CONTROLLER
app.controller('adminCtrl', function($scope, $http, $routeParams, $location, $rootScope, dataServices, sortDocumentsServices, alertMessServices) {

  $scope.category = [];
  var unique = {};
  $scope.adminTab = 'Slimme modules';


  $http.get('mock/product.json').success(function(data){
    $scope.products = data;

    //Find all unique product categories
    for(var i in $scope.products){
      if(typeof(unique[$scope.products[i].category]) == 'undefined'){
        $scope.category.push($scope.products[i].category);
      }
      unique[$scope.products[i].category] = 0;
    }
  });

  $scope.changeTab = function(category) {
    $scope.adminTab = category;
  }

  $scope.editModeOn = function() {
    this.item.editing = true;
  }

  $scope.editModeOff = function() {
    this.item.editing = false;
  }

  $scope.newItem = function(x) {
    $scope.products.push({category: x, editing: true});
  }

  $scope.deleteItem = function(value) {
    if(this.item.required) {
      console.log('x');
    } else {
      var objectIndex = $scope.products.findIndex(x => x.description==value);
      $scope.products.splice(objectIndex, 1);
    }
  }



});
