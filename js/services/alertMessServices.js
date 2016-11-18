'use strict';

var app = angular.module('salesPortal');

app.factory('alertMessServices', function($http) {

  var position = '.alert';

  return {
    success: function(message) {
      var successMessage = '<div class="alertbox alert-success"><button type="button" class="close">x</button><p><strong>Success!</strong> ' + message + '</p></div>'
      $(position).append(successMessage);
      setTimeout(deleteContent, 5000)
      function deleteContent() {
        $('.alert').find('.alertbox:first').remove();
      }
    },

    error: function(message) {
      var errorMessage = '<div class="alertbox alert-danger"><button type="button" class="close">x</button><p><strong>Sorry!</strong> ' + message + '</p></div>'
      $(position).append(errorMessage);
      setTimeout(deleteContent, 5000)
      function deleteContent() {
        $('.alert').find('.alertbox:first').remove();
      }
    }
  }
});
