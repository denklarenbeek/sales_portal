var app = angular.module('salesPortal');

app.controller('locationsCtrl', function($scope, $http, $resource, dataServices, $location, $rootScope, alertMessServices) {
  var url = '/locations'
  //The scope of all locations
  $scope.locations = [];

  //Get all the locations
  dataServices.get(url)
    .then(function successCallback(response) {
      $scope.locations = response.data;
    }, function errorCallback(repsonse) {
    console.error(response);
  });

  $scope.newLocation = function() {
    dataServices.post(url).then(function successCallback(response){
      console.log(response.data._id);
      var idLocation = response.data._id;
      $rootScope.editing = true;
      $location.path('/locations/' + idLocation);
    });
  };

});
