'use strict';

var app = angular.module('salesPortal');

app.controller('locationIDCtrl', function($scope, $http, $routeParams, dataServices, $location, $rootScope, alertMessServices) {

  var id = $routeParams.id;
  $scope.selectedNav = "customer"

  //GET the database information
    dataServices.get(id)
    .then(function successCallback(response) {
      $scope.customer = response.data;
      $rootScope.data = response.data;
    });

  //PUT the information
  $scope.saveLocation = function(id, customerData) {
    dataServices.put(id, customerData).then(function successCallback(response) {
      if(response.status = 200) {
        var message = response.config.data.company + " is bijgewerkt";
        alertMessServices.success(message, '.container-content');
        console.log(response);
        $rootScope.editing = false;
      }

    })
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

  //Show offer information




});
