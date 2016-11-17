'use strict';

var app = angular.module('salesPortal');

app.controller('locationIDCtrl', function($scope, $http, $routeParams, dataServices, $location, $rootScope, alertMessServices) {

  var id = $routeParams.id;
  $scope.selectedNav = "customer";


  //GET the database information
  dataServices.get(id)
  .then(function successCallback(response) {
    $scope.customer = response.data;
    $rootScope.data = response.data;
  }, function errorCallback(response){
    var errorMessage = response.status + ' ' + response.statusText;
    alertMessServices.error(errorMessage, '.alert');
  });

  //PUT the information
  $scope.saveLocation = function(id, customerData) {
    //Check if the company is filled in
    if($scope.customer.company === undefined || $scope.customer.company === "") {
      alertMessServices.error("Please fill in the company", '.alert');
    //Check if the city if filled in
    } else if($scope.customer.city === undefined || $scope.customer.city === "") {
      alertMessServices.error("Please fill in the city", '.alert');
    //Save the data
    } else {
      dataServices.put(id, customerData).then(function successCallback(response) {
        if(response.status = 200) {
          var message = response.config.data.company + " is bijgewerkt";
          alertMessServices.success(message, '.alert');
          $rootScope.editing = false;
        }
      //Error Callback
      }, function errorCallback(response){
        var errorMessage = response.statusText + ' ' + response.data.company;
        alertMessServices.error(errorMessage, '.alert');
      })
    }



  };

  //Delete the information
  $scope.deleteLocation = function(id) {
    var url = 'https://bbsalesapi.herokuapp.com/locations';
    //Remove the location out of the database
    dataServices.remove(id).then(function (response) {
      console.log(response);
      $location.path('/');
      $rootScope.editing = false;
    })
  };
});
