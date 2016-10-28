'use strict';

var app = angular.module('salesPortal');

app.controller('locationIDCtrl', function($scope, $http, $routeParams, dataServices, $location, $rootScope) {

  var id = $routeParams.id;

  //GET the database information
    dataServices.get(id)
    .then(function successCallback(response) {
      $scope.customer = response.data;
    });

  //PUT the information
  $scope.saveLocation = function(id, customerData) {
    dataServices.put(id, customerData).then(function successCallback(response) {
      console.log(customerData);
      $rootScope.editing = false;
    })
  };

  //Delete the information
  $scope.deleteLocation = function(id) {
    //Remove the location out of the database
    dataServices.remove(id).then(function (response) {
      console.log(response);
      $location.path('/');
      $rootScope.editing = false;
    })
  };
});
