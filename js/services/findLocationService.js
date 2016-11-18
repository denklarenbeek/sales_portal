'use strict';

var app = angular.module('salesPortal');

app.factory('mapsApiServices', function($http) {

  var url = 'https://maps.googleapis.com/maps/api/distancematrix/';
  var apikey = "AIzaSyA-EC5gPzIkrIyN6O9W-zmV6KVAlOD-8Pw"

  return {
    calcDistance: function(type, units, startLat, startLong, endLat, endLong) {
      var units = 'units=' + units
      var start = 'origins=' + startLat + "," + startLong;
      var end = 'destinations=' + endLat + "," + endLong;
      var requestUrl = url + type + '?' + units + '&' + start + '&' + end + '&' + apikey;
      console.log(requestUrl);
      return $http.get(requestUrl);

    }
  };
});
