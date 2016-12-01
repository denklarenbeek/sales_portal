'use strict';

var app = angular.module('salesPortal');

app.controller('locationIDCtrl', function($scope, $http, $routeParams, dataServices, $location, $rootScope, alertMessServices) {
  var id = $location.path();

  $scope.selectedNav = "customer";
  $rootScope.selectedTab = "customer";

  //GET the database information
  dataServices.get(id)
  .then(function successCallback(response) {
    $scope.customer = response.data;
    $rootScope.data = response.data;
  }, function errorCallback(response){
    var errorMessage = response.status + ' ' + response.statusText;
    alertMessServices.error(errorMessage);
  });

  //PUT the information
  $scope.saveLocation = function(customerData) {
    //Check if the company is filled in
    if($scope.customer.company === undefined || $scope.customer.company === "") {
      alertMessServices.error("Please fill in the company");
    //Check if the city if filled in
    } else if($scope.customer.city === undefined || $scope.customer.city === "") {
      alertMessServices.error("Please fill in the city");
    //Save the data
    } else {
      dataServices.put(id, customerData).then(function successCallback(response) {
        if(response.status = 200) {
          var message = response.config.data.company + " is bijgewerkt";
          alertMessServices.success(message);
          $rootScope.editing = false;
        }
      //Error Callback
      }, function errorCallback(response){
        var errorMessage = response.statusText + ' ' + response.data.company;
        alertMessServices.error(errorMessage);
      })
    }
  };

  //Delete the information
  $scope.deleteLocation = function() {
    //Remove the location out of the database
    dataServices.remove(id).then(function (response) {
      console.log(response);
      $location.path('/');
      $rootScope.editing = false;
    })
  };
});
