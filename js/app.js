var app = angular.module('app', ['ui.router']);

app. config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/home/");
    $stateProvider
    .state('home',{
        url: "/home/",
        templateUrl: "templates/home.html",
    })
    .state('login',{
        url: "/login/",
        templateUrl: "templates/login.html",
    })
    .state('registration',{
        url: "/registration/",
        templateUrl: "templates/registration.html",
    })
})
