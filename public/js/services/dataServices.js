'use strict';

var app = angular.module('salesPortal');

app.factory('dataServices', function($http) {
  return {
    //Get the location information from API
    get: function(id) {
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/locations/' + id
      })
    },
    post: function(id) {
      return $http({
        method: "POST",
        url: 'http://localhost:3000/locations/',
        data: {}
      })
    },
    put: function(id, data) {
      return $http({
        method: "PUT",
        url:  'http://localhost:3000/locations/' + id,
        headers: {
          "Access-Control-Allow-Headers":  "Origin, X-Requested-With, Content-Type, Accept",
          "Content-Type": "application/json charset=UTF-8"
        },
        data: data
      })
    },
    remove: function(id) {
      return $http({
        method: "DELETE",
        url: 'http://localhost:3000/locations/' + id
      })
    }
  }
});
