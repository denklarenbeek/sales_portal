'use strict';

var app = angular.module('salesPortal');

app.controller('locationIDCtrl', function($scope, $http, $routeParams, dataServices) {

  // $scope.documents = [];

  var id = $routeParams.id;

  $scope.newLocation = function() {
    dataServices.post().then(function successCallback(response){
      console.log('Made post');
    });
  };

  //GET the database information
  dataServices.get(id)
  .then(function successCallback(response) {
    $scope.customer = response.data;
  });

  //PUT the information
  $scope.saveLocation = function(id, customerData) {
    dataServices.put(id, customerData).then(function successCallback(response) {
      console.log(customerData);
      // console.log(response.data);
    })
  };

  //Delete the information
  $scope.deleteLocation = function(id) {
    dataServices.remove(id).then(function (repsonse) {
      console.log(response);
    })
  }
});
