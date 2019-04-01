

var app = angular.module('myApp');
app.factory('MySer',function ($window, $rootScope, $document, $http, MyData, $location, MyGeneralSer) {


    // var initData = function () {
    // };

    var saveMsgInfo = function () {
        if(!MyGeneralSer.checkDataNotEmpty(MyData.msgInfo['name'])) {
            alert("请输入您的称呼");
            return;
        }
        else if(!MyGeneralSer.checkDataNotEmpty(MyData.msgInfo['phone'])&&!MyGeneralSer.checkDataNotEmpty(MyData.msgInfo['mail'])) {
            alert("请输入您的联系电话或邮箱");
            return;
        }
        else if(!MyGeneralSer.checkDataNotEmpty(MyData.msgInfo['content'])) {
            alert("请输入您需要咨询的问题");
            return;
        }

        var timestamp = (new Date()).valueOf();
        MyData.overallData['loadData'] = true;
        MyData.overallData['loadDataText'] = '正在提交信息...';
        MyData.msgInfo['timestamp'] = timestamp;

        MyGeneralSer.httpPostData(MyData.saveMsgInfo,MyData.msgInfo,function (response) {
            MyData.overallData['loadData'] = false;
            alert("感谢您的信任，我们会尽快安排专业的律师与您联系");
            console.log(MyData.miniMainHtml)
            location.href = MyData.miniMainHtml;
        });
    }

    var cancleInfo = function () {
        MyData.msgInfo['name']='';
        MyData.msgInfo['phone']='';
        MyData.msgInfo['mail']='';
        MyData.msgInfo['content']='';
        $rootScope.$apply();
    }



    return {
        saveMsgInfo:saveMsgInfo,
        cancleInfo:cancleInfo,
    }

});