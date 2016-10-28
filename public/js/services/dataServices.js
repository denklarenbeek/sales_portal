'use strict';

var app = angular.module('salesPortal');

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
    post: function(id) {
      return $http({
        method: "POST",
        url: url,
        data: {}
      })
    },
    put: function(id, data) {
      return $http({
        method: "PUT",
        url:  url + '/' + id,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8080/",
          "Access-Control-Allow-Headers":  "Origin, X-Requested-With, Content-Type, Accept",
          "Content-Type": "application/json charset=UTF-8"
        },
        data: data
      })
    },
    remove: function(id) {
      return $http({
        method: "DELETE",
        url: url + '/' + id
      })
    }
  }
});
