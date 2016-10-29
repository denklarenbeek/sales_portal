'use strict';

var app = angular.module('salesPortal');

app.controller('geoLocationCtrl', function($scope, findLocationService, $http) {

  $scope.geoLocation = function() {
    //Get GPS location
    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      $scope.latitude = latitude;
      $scope.longitude = longitude;
      console.log(latitude);
    }

    function error() {
      console.log("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(success, error)

  };

  $scope.calculateDistance = function() {
    var url = 'https://maps.googleapis.com/maps/api/distancematrix/';
    var type = 'json';
    var units = 'units=metric';
    var start = 'origins=52.027145,5.6338212';
    var end = 'destinations=52.0379049,5.6612124';
    var apikey = 'key=' + 'AIzaSyA-EC5gPzIkrIyN6O9W-zmV6KVAlOD-8Pw';
    var requestUrl = url + type + '?' + units + '&' + start + '&' + end + '&' + apikey;
    $http.get(requestUrl).then(function successCallback(response){
      console.log(response.data.rows[0].elements[0].distance.value);
    });
    console.log(requestUrl);
  }

});
