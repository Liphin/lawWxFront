var app = angular.module('myApp');
app.controller('MyCtrl',function ($scope, $http, $window, $location, MyData, MySer) {

    var ctrl = this;
    ctrl.msgInfo = MyData.msgInfo;
    ctrl.overallData = MyData.overallData;

    //MySer.initData();

    /**
     * 保存留言
     * @see MySer.saveMsgInfo
     */
    ctrl.saveMsgInfo = function () {
        MySer.saveMsgInfo();
    }
    /**
     * 重置面板
     * @see MySer.cancleInfo
     */
    ctrl.cancleInfo = function () {
        MySer.cancleInfo();
    }

});