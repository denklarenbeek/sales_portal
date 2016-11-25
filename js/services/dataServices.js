'use strict';

var app = angular.module('salesPortal');

// var url = 'http://localhost:5000';
var url = 'https://bbsalesapi.herokuapp.com';

app.factory('dataServices', function($http) {
  return {
    //Get the location information from API
    get: function(id) {
      return $http({
        method: 'GET',
        url:  url + id
      })
    },
    post: function(id, data) {
      var new_url = url + id
      return $http.post(new_url, data, null);
    },
    put: function(id, data) {
      var new_url = url + id;
      return $http.put(new_url, data, null);
    },
    remove: function(id) {
      return $http({
        method: "DELETE",
        url: url + id
      })
    }
  }
});
