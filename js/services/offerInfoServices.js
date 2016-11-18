'use strict';

var app = angular.module('salesPortal');

app.factory('offerInfoServices', function($http) {

  return {
    deleteItem: function(loc, doc, name, array) {
      var id = loc + "/documents/" + doc + '/' + name + '/' + array;
      return id;
    },
    addItem: function(loc, doc, name) {
      var id = loc + "/documents/" + doc + '/' + name;
      return id;
    }
  }

});
