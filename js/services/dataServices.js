'use strict';

var app = angular.module('salesPortal');

// var url = 'http://localhost:5000/locations';
var url = 'https://bbsalesapi.herokuapp.com/locations';

app.factory('dataServices', function($http) {
  return {
    //Get the location information from API
    getAll: function() {
      return $http({
        method: 'GET',
        url:  url
      })
    },

    get: function(id) {
      return $http({
        method: 'GET',
        url:  url + '/' + id
      })
    },
    post: function(data) {
      return $http.post(url, data, null);
    },
    put: function(id, data) {
      var new_url = url + '/' + id;
      return $http.put(new_url, data, null);
    },
    remove: function(id) {
      return $http({
        method: "DELETE",
        url: url + '/' + id
      })
    }
  }
});
