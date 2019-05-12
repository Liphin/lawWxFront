var app = angular.module('myApp');

app.factory('MyData',function () {
    //var serverHost = 'http://qidailaw.liphin.com';
    // var serverHost = 'http://gntqant.com';
    // var frontSerPort = 80;
    var serverHost = 'http://qidailaw.liphin.com';
    var frontSerPort = 3100;
    var backSerPort = 8085;

    var saveMsgInfo = serverHost+":"+backSerPort+"/saveMsgInfo";
    var miniMainHtml = serverHost+":"+frontSerPort+"/src/officialPages/phone/mini/index.html";


    var requestDataErrorMsg = "尊敬的客户，服务异常，请稍后重试";

    var overallData = {
        title: '一键留言',
        param: [], //记录类型
        loadData: false, //标识是否正在加载新闻数据
    };

    var msgInfo = {
        'name':'',
        'phone':'',
        'mail':'',
        'content':'',
        'status_cd':0,
        'timestamp':'',
    };

    return {
        overallData:overallData,
        msgInfo:msgInfo,
        saveMsgInfo:saveMsgInfo,
        miniMainHtml:miniMainHtml,
        requestDataErrorMsg:requestDataErrorMsg,
    }

});