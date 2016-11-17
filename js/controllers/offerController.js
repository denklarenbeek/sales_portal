var app = angular.module('salesPortal');

//OFFER CONTROLLER
app.controller('offerController', function($scope, $http, $routeParams, dataServices, offerInfoServices, $rootScope, alertMessServices) {

  $scope.articles = ['19inch', 'mini-Watch'];

  function getByValue(arr, value) {
    for (var i=0, iLen=arr.length; i<iLen; i++) {
      if (arr[i].type == value) return arr[i];
    }
  }

  $scope.offer = getByValue($scope.customer.documents, 'offer');;

  $scope.deleteItem = function(pId, index, type) {
    var x = getByValue($scope.customer.documents, 'offer');
    var id = offerInfoServices.deleteItem($routeParams.id, x._id, type, pId);
    console.log(id);
    dataServices.remove(id).then(function(response){
      alertMessServices.success('PumpWatch is verwijderd', '.container-content');
    })
    $scope.offer.pw.splice(index, 1);
  };

  $scope.addItem = function(type) {
    var x = getByValue($scope.customer.documents, 'offer');
    var a = offerInfoServices.addItem($routeParams.id, x._id, type);
    var id = 'https://bbsalesapi.herokuapp.com/locations/' + a;
    console.log(id);
    dataServices.post(id).then(function(response){
      alertMessServices.success('PumpWatch is toegevoegd', '.container-content');
      $scope.offer.pw.push({});
    })
  }

});
