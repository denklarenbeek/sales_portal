'use strict';

var app = angular.module('salesPortal');

app.controller('geoLocationCtrl', function($scope, mapsApiServices, $http) {

  var apikey = "AIzaSyA-EC5gPzIkrIyN6O9W-zmV6KVAlOD-8Pw";

  $scope.geoLocation = function() {
    //Get GPS location
    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      $scope.latitude = latitude;
      $scope.longitude = longitude;
      console.log("geoLocation is " + latitude + " " + longitude);
    }

    function error() {
      console.log("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(success, error)

  };

  $scope.calculateDistance = function() {

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


});
