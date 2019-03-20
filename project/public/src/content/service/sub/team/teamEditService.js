/**
 * create by lxc on 2019年03月17日
 */

var contentModule = angular.module('Angular.content');
contentModule.factory('TeamEditSer',function ($http, $window, $timeout, ContentDataSer, $location, OverallGeneralSer,
                                              OverallDataSer, ContentGeneralSer) {

    /**
     * 监测需要的成员字段是否填写完成
     * @returns {boolean}
     */
    var checkNewsInfo = function () {
        //检查内容是否全部填写完成
        var status = false;
        var name = ContentDataSer.teamData['editData']['data']['name'];
        var imgUrl = ContentDataSer.teamData['editData']['data']['imgUrl'];
        var optType = ContentDataSer.teamData['editData']['optType'];
        if (!OverallGeneralSer.checkDataNotEmpty(name)) {
            alert("请先填写完善人员姓名");

        } else if (!OverallGeneralSer.checkDataNotEmpty(imgUrl) && (optType == 1)) {
            alert("请先上传人员头像");

        } else {
            status = true;
        }
        return status;
    };

    /**
     * 保存文章数据
     */
    var saveTeam = function () {
        if (checkNewsInfo()) {
            var fd = new FormData();
            fd.append('id', ContentDataSer.teamData['editData']['data']['id']);
            fd.append('name', ContentDataSer.teamData['editData']['data']['name']);
            fd.append('status_cd', ContentDataSer.teamData['editData']['data']['status_cd']);
            fd.append('wx_user_id', ContentDataSer.teamData['editData']['data']['wx_user_id']);
            fd.append('wx_user_name', ContentDataSer.teamData['editData']['data']['wx_user_name']);
            fd.append('timestamp', ContentDataSer.teamData['editData']['data']['timestamp']);
            fd.append('content', ContentDataSer.teamData['editData']['data']['content']);
            fd.append('phone', ContentDataSer.teamData['editData']['data']['phone']);
            fd.append('mail', ContentDataSer.teamData['editData']['data']['mail']);

            //操作类型：创建、保存类型
            fd.append('optType', ContentDataSer.teamData['editData']['optType']);

            //如果封面图不为空则添加封面图
            if (OverallGeneralSer.checkDataNotEmpty(ContentDataSer.teamData['editData']['data']['imgUrl'])) {
                fd.append('imgUrl', ContentDataSer.teamData['editData']['data']['imgUrl']);
            }
            //提交表单数据
            $http.post(ContentDataSer.saveTeamData, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
            }).success(function (response) {
                //返回数据不进行alert操作，只做打印处理
                if (response['status_code'] == 200) {
                    //管理员编写审核完成，发布该消息,如果该条消息已发布，则不用再推送消息
                    ContentDataSer.navigation['team']['teamEdit']=false;
                    $location.search('subPage', "teamList");

                } else {
                    OverallGeneralSer.alertHttpRequestError("saveTeam", response['exception_code'], response['exception']);
                }

            }).error(function (err) {
                OverallGeneralSer.alertHttpRequestError("saveTeam", 600, err);
            })
        }
    };

    /***
     * 把blob数据传到后台保存
     */
    var saveCoverImage = function (obj,callback) {
        var fd = new FormData();
        var url = ContentDataSer.saveCoverImage;
        for (var i in obj) {
            fd.append(i, obj[i]);
        }
        $http.post(url,fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            callback(response);
        }).error(function (error) {
            alert("saveCoverImage error: "+JSON.stringify(error));
        })

    };

    return {
        saveTeam:saveTeam,
        saveCoverImage:saveCoverImage,
    }

});