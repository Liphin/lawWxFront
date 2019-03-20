/**
 * create by lxc on 2019年03月19日
 */


var contentModule = angular.module('Angular.content');
contentModule.factory('MsgEditSer',function ($http, $window, $timeout, ContentDataSer, $location, OverallGeneralSer,
                                              OverallDataSer, ContentGeneralSer) {



    /**
     * 保存文章数据
     */
    var saveMsg = function () {
        var fd = new FormData();
        fd.append('id', ContentDataSer.msgData['editData']['data']['id']);
        fd.append('status_cd', ContentDataSer.msgData['editData']['data']['status_cd']);

        //操作类型：创建、保存类型
        if (ContentDataSer.msgData['editData']['optType']==2) {
            var url = ContentDataSer.setupMsg;
        }

        //提交表单数据
        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            //返回数据不进行alert操作，只做打印处理
            if (response['status_code'] == 200) {
                //管理员编写审核完成，发布该消息,如果该条消息已发布，则不用再推送消息
                ContentDataSer.navigation['msg']['msgEdit']=false;
                $location.search('subPage', "msgList");

            } else {
                OverallGeneralSer.alertHttpRequestError("saveMsg", response['exception_code'], response['exception']);
            }

        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("saveMsg", 600, err);
        })
    };

    return {
        saveMsg:saveMsg,
    }

});