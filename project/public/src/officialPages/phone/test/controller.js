
var app = angular.module('myApp');

app.controller('MyCtrl',function ($scope, $http, $window, $timeout, $location, MyData,MySer) {


    var ctrl = this;
    ctrl.overallData = MyData.overallData;

    MySer.initData();

    ctrl.getPhoneImg = function () {
        MySer.getPhoneImg();
    };

    // ctrl.cropImg = function () {
    //     MySer.cropImg();
    // };


});