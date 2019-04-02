
var app = angular.module('myApp');
app.controller('MyCtrl',function ($scope, $http, $window, $location, MyData, MySer) {

    var ctrl =this;
    ctrl.teamList = MyData.teamList;
    ctrl.overallData = MyData.overallData;

    MySer.initData();

});