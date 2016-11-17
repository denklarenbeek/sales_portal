'use strict';

var app = angular.module('salesPortal');

app.factory('sortDocumentsServices', function($http) {

  return {
    getDocuments: function(data, value) {
      var documents = []
      for (var i=0, iLen=data.length; i<iLen; i++) {
        if (data[i].type == value){
           documents.push(data[i]);
         }
      }
      return documents
    },
    getServices: function(data, value) {
      var documents = []
      for (var i=0, iLen=data.length; i<iLen; i++) {
        if (data[i].category == value){
           documents.push(data[i]);
         }
      }
      return documents
    }
  }
});
