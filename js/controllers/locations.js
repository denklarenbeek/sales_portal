var app = angular.module('salesPortal');

app.controller('locationsCtrl', function($scope, $http, $resource, dataServices) {

  //The scope of all locations
  $scope.locations = [];

  //Get all the locations
  dataServices.getAll().then(function successCallback(response) {
    $scope.locations = response.data;
  }, function errorCallback(repsonse) {
    console.error(response);
  });

});
