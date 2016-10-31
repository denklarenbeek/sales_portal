'use strict';

var app = angular.module('salesPortal');

app.controller('geoLocationCtrl', function($scope, mapsApiServices, $http, alertMessServices) {

  $scope.calcGpsDistance = function() {

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      $scope.latitude = latitude;
      $scope.longitude = longitude;

      mapsApiServices.calcDistance('json', 'metric', 52.027145, 5.6338212, $scope.latitude, $scope.longitude).then(function(response){
        var distance = response.data.rows[0].elements[0].distance.value
        if(distance <= 20000)  {
          $scope.customer.distance = "<20km";
        } else if(distance < 60000 && distance > 20000) {
          $scope.customer.distance = "20 - 60km";
        } else if (distance < 100000 && distance > 60000) {
          $scope.customer.distance = "60 - 100km";
        } else {
          $scope.customer.distance = ">100km";
        }
        console.log(distance);
      })
    };

    function error() {
      var message = "Unable to retrieve your location";
      alertMessServices.error(message, '.container-content');
    };

    navigator.geolocation.getCurrentPosition(success, error);

  };

  $scope.calcInfoDistance = function() {
    if($scope.customer.street === undefined || $scope.customer.city === undefined) {
      alertMessServices.error('Please fill in the street and/or address', '.container-content');
    } else {
        mapsApiServices.calcDistance('json', 'metric', 52.027145, 5.6338212, $scope.customer.street, $scope.customer.city).then(function(response){
          if(response.data.rows[0].elements[0].status === "NOT_FOUND") {
            var message = 'Location is ' + response.data.rows[0].elements[0].status;
            alertMessServices.error(message, '.container-content');
          } else {
            var distance = response.data.rows[0].elements[0].distance.value
            if(distance <= 20000)  {
              $scope.customer.distance = "<20km";
            } else if(distance < 60000 && distance > 20000) {
              $scope.customer.distance = "20 - 60km";
            } else if (distance < 100000 && distance > 60000) {
              $scope.customer.distance = "60 - 100km";
            } else {
              $scope.customer.distance = ">100km";
            }
            console.log(distance);
          }
        })
      }
    };
});
