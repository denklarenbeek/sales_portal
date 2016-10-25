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
  // .then(function(){
  //   var documents = $scope.customer.documents
  //   console.log(Array.isArray(documents));
  //   documents.forEach(function(item){
  //     console.log(Object.values(documents));
  //   })
  // });

  //PUT the information
  $scope.saveLocation = function(id, data) {
    console.log("This is the id" + id);
    console.log(data);
  };

  //Delete the information
  $scope.deleteLocation = function(id) {
    dataServices.remove(id).then(function (repsonse) {
      console.log(response);
    })
  }
});
