
var app = angular.module('myApp');

app.factory('MyData',function () {

    // var serverHost = 'http://gntqant.com';
    // var frontSerPort = 80;
    var serverHost = 'http://qidailaw.liphin.com';
    var frontSerPort = 3100;
    var backSerPort = 8085;

    var maxNum = '2088-01-01 00:00:00';
    var getTeamListToPh = serverHost+":"+backSerPort+"/getTeamListToPh";
    var coverImgBaseUrl = serverHost+":"+frontSerPort+"/dynamicinfo/coverimg/";

    var teamList = [];

    var overallData = {
        title: '专业团队',
        param: [], //记录类型
        loadData: false, //标识是否正在加载新闻数据
        agentId: '',//新闻的应用号
        search: '',//内容搜索功能
        searchFlag: false, //判断是否搜索
    };

    return {
        maxNum:maxNum,
        overallData: overallData,
        teamList:teamList,
        getTeamListToPh:getTeamListToPh,
        coverImgBaseUrl:coverImgBaseUrl,
    }

});