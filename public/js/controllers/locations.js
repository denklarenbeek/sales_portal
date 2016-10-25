var app = angular.module('salesPortal');

app.controller('locationsCtrl', function($scope, $http, $resource) {

  $scope.locations = [];

  // $httpProvider.defaults.headers = {"Access-Control-Allow-Origin": "*"};

  $http({
    method: 'GET',
    url: 'http://localhost:3000/locations'
  }).then(function successCallback(response) {
    $scope.locations = response.data;
  }, function errorCallback(response) {
    console.error(reponse);
  });

});
