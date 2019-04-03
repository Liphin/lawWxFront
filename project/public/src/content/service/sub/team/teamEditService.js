/**
 * create by lxc on 2019年03月17日
 */

var contentModule = angular.module('Angular.content');
contentModule.factory('TeamEditSer',function ($http, $window, $timeout, ContentDataSer, $location, OverallGeneralSer,OverallSer,
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
     * 保存团队数据
     */
    var saveTeam = function () {
        var blob = OverallSer.dataURItoBlob(ContentDataSer.teamData['editData']['data']['coverImage']);
        var fileName = ContentDataSer.teamData['editData']['data']['imgUrl'];
        var fileUrl = ContentDataSer.fileUrl;

        var formData = {
            'fileUrl': fileUrl,
            'fileName': fileName,
            'fileBlob': blob
        };
        console.log(formData);

        saveCoverImage(formData,function (response) {
            console.log(response);
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

                var targetData = {
                    bg_position_top: ContentDataSer.teamData['editData']['imageData']['bg_position_top'],
                    bg_position_left: ContentDataSer.teamData['editData']['imageData']['bg_position_left'],
                    bg_size: ContentDataSer.teamData['editData']['imageData']['bg_size']
                };
                //console.log(targetData);
                var imgURlArr = ContentDataSer.teamData['editData']['data']['imgUrl'].split(":");

                ContentDataSer.teamData['editData']['data']['imgUrl']=imgURlArr[0]+ ":"+targetData.bg_position_top+ ":"+targetData.bg_position_left+ ":"+targetData.bg_size;
                //console.log(ContentDataSer.teamData['editData']['data']['imgUrl']);


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
                        $window.location.reload();

                    } else {
                        OverallGeneralSer.alertHttpRequestError("saveTeam", response['exception_code'], response['exception']);
                    }

                }).error(function (err) {
                    OverallGeneralSer.alertHttpRequestError("saveTeam", 600, err);
                })
            }
        });
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

    var picShotMouseDown = function (event) {
        ContentDataSer.teamData['editData']['imageData'].reposition.status = true; //开始检测鼠标拖拽移动事件
        ContentDataSer.teamData['editData']['imageData'].reposition.y = event.pageY + event.target.scrollTop; //设置此时上偏移
        ContentDataSer.teamData['editData']['imageData'].reposition.x = event.pageX + event.target.scrollLeft; //设置此时左偏移
    };

    var picShotMouseMove = function (event) {
        //开始监听鼠标拖拽图片移动后才进行拖拽操作
        if (ContentDataSer.teamData['editData']['imageData'].reposition.status) {
            //获取上偏移和左偏移两次之差
            var topOffset = event.pageY + event.target.scrollTop - ContentDataSer.teamData['editData']['imageData'].reposition.y;
            var leftOffset = event.pageX + event.target.scrollLeft - ContentDataSer.teamData['editData']['imageData'].reposition.x;

            //设置图片位置的上偏移和左偏移
            ContentDataSer.teamData['editData']['imageData'].bg_position_top += topOffset;
            ContentDataSer.teamData['editData']['imageData'].bg_position_left += leftOffset;

            //重新赋值上偏移和左偏移
            ContentDataSer.teamData['editData']['imageData'].reposition.y = event.pageY + event.target.scrollTop;
            ContentDataSer.teamData['editData']['imageData'].reposition.x = event.pageX + event.target.scrollLeft;
        }
    };


    var picShotMouseUp = function (event) {
        ContentDataSer.teamData['editData']['imageData'].reposition.status = false;
    };

    return {
        saveTeam:saveTeam,
        saveCoverImage:saveCoverImage,
        picShotMouseDown:picShotMouseDown,
        picShotMouseMove:picShotMouseMove,
        picShotMouseUp:picShotMouseUp,
    }

});