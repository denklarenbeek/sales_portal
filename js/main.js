'use strict';

var app = angular.module('salesPortal', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider){
  $routeProvider
    .when("/", {
      controller: "locationsCtrl",
      templateUrl: "templates/home.html"
    })
    .when("/locations/:id", {
      controller: "locationIDCtrl",
      templateUrl: "templates/customer.html"
    })
    .when("/locations", {
      controller: "locationIDCtrl",
      templateUrl: "templates/customer.html"
    })
    .when("/locations/:id/documents/:id", {
      templateUrl: "templates/document.html"

    })
    .otherwise({redirectTo: "/locations"})

});
