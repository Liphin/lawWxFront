/**
 * create by lxc on 2019年03月20日
 */

var app = angular.module('myApp');
app.controller('MyCtrl',function ($scope, $http, $window, $location, MyData, MySer) {

    var ctrl = this;
    ctrl.newsList = MyData.newsList;
    ctrl.carouselData = MyData.carouselData;
    ctrl.overallData = MyData.overallData;

    MySer.initData();

    ctrl.viewNewsDetail= function(news) {
        location.href = MyData.htmlBaseUrl + news['timestamp']+"-index.html"+"?timestamp="+news['timestamp'];
    };

    /**
     * 搜索新闻
     * @see MySer.searchNews
     */
    ctrl.searchNews = function () {
        MySer.searchNews();
    }

});