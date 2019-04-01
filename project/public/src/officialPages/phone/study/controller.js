/**
 * create by lxc on 2019年03月20日
 */

var app = angular.module('myApp');
app.controller('MyCtrl',function ($scope, $http, $window, $location, MyData, MySer) {

    var ctrl = this;
    ctrl.newsList = MyData.newsList;
    ctrl.carouselList = MyData.carouselList;
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

    /**
     * 改变页面列表数据
     */
    ctrl.changePageList = function (subtype) {
        console.log(777777);
        for (var i in ctrl.overallData['listShow']['showFlag']) {
            ctrl.overallData['listShow']['showFlag'][i]=false;
        }
        switch (subtype) {
            case 20:
                ctrl.overallData['listShow']['showFlag']['20']=true;
                ctrl.overallData['listShow']['showNow'] = 20;
                break;
            case 21:
                ctrl.overallData['listShow']['showFlag']['21']=true;
                ctrl.overallData['listShow']['showNow'] = 21;
                break;
            case 22:
                ctrl.overallData['listShow']['showFlag']['22']=true;
                ctrl.overallData['listShow']['showNow'] = 22;
                break;
            default:
                break;
        }
    }

});