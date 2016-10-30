'use strict';

var app = angular.module('salesPortal');

app.factory('alertMessServices', function($http) {

  return {
    success: function(message, position) {
      var successMessage = '<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Success!</strong> ' + message + '</div>'
      $(position).prepend(successMessage);
    },

    error: function(message, position) {
      var errorMessage = '<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> ' + message + '</div>'
      $(position).prepend(errorMessage);
    }
  }
});
