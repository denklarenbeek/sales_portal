'use strict';

var app = angular.module('salesPortal');

app.controller('geoLocationCtrl', function($scope, findLocationService, $http) {

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

    //Variables to request
    var url = 'https://maps.googleapis.com/maps/api/distancematrix/';
    var type = 'json';
    var units = 'units=metric';
    var start = 'origins=52.027145,5.6338212';
    var end = 'destinations=' + $scope.latitude + "," + $scope.longitude;
    // var end = 'destinations=52.0379049,5.6612124';
    var key = 'key=' + apikey;
    var requestUrl = url + type + '?' + units + '&' + start + '&' + end + '&' + key;

    //Get request to API Maps to get distance back
    $http.get(requestUrl).then(function successCallback(response){
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
    });
    console.log(requestUrl);
  }

});
