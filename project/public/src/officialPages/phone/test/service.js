
var app = angular.module('myApp');

app.factory('MySer',function ($http, $rootScope,$window, $timeout, $location, MyData,MyGeneralSer) {


    var initData = function () {
        //console.log($location.href);
        MyData.overallData['timestamp']=(new Date()).valueOf();
        var url = MyData.getJsSign+"?url="+window.location.href;
        $http({
            method:'GET', 
            url:url,
        }).then(function successCallback(response) {
            if (response['status'] == 200) {
                //执行签名
                //配置签名信息
                var data = response['data'];
                console.log(data);
                wx.config({
                    debug: true, //关闭debug模式，调试信息不弹出
                    appId: data['appid'],
                    timestamp: data['timestamp'],
                    nonceStr: data['noncestr'],
                    signature: data['signature'],
                    jsApiList: [
                        'chooseImage',
                        'uploadImage',
                    ]
                });


            } else {
                alert("获取js签名失败");
            }
        })
    };

    var getPhoneImg = function () {
        MyData.overallData['loadData'] = true;
        MyData.overallData['loadDataText'] = "正在加载图片...";
        $(':focus').blur(); //手动失去焦点操作

        //打开摄像头拍照或手机内置相册，如果打开相册则加载缩略图
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                MyData.overallData['uploadImgNum'] = 0; //重置已上传图片的数目
                MyData.overallData['localIds'] = res['localIds'];

                uploadWxLocalImgIndex(MyData.overallData['localIds'],function () {

                    new AlloyCrop({
                        circle:false,
                        image_src: MyData.overallData['images']['url'],
                        width: 235,
                        height: 100,
                        output: 2,
                        ok: function (base64, canvas) {
                            MyData.overallData['loadData'] = false;
                            // crop_result.appendChild(canvas);
                            // crop_result.querySelector("canvas").style.borderRadius = "0%";
                            //console.log(base64);
                            MyData.overallData['imgBase']=base64;

                            var blob = MyGeneralSer.dataURItoBlob(base64);
                            var fileName = MyData.overallData['timestamp']+".png";
                            var fileUrl = MyData.fileUrl;

                            var formData = {
                                'fileUrl': fileUrl,
                                'fileName': fileName,
                                'fileBlob': blob
                            };

                            MyGeneralSer.saveCoverImage(formData,function (response) {
                                console.log(response);
                                MyData.overallData['images']['coverUrl']=MyData.coverImgUrl+fileName;
                                $rootScope.$apply();
                            });

                        },
                        cancel: function () {
                            MyData.overallData['loadData'] = false;
                            $rootScope.$apply();
                        }
                    });
                });




            },
            cancel: function () {
                //用户取消上传图片操作
                MyData.overallData['loadData'] = false;
                $rootScope.$apply();
            },
            fail: function (res) {
                alert("微信服务繁忙，请稍后重试");
                MyData.overallData['loadData'] = false;
            }
            //不能加complete，因为success里面还有异步操作
        });
    };

    //var crop_btn = document.querySelector("#crop_btn");


    // new AlloyFinger(crop_btn, {
    //     tap: function () {
    //         var crop_result = document.querySelector("#crop_result");
    //         crop_btn.style.display = "none";
    //         crop_result.style.display = "none";
    //         crop_result.innerHTML = "";
    //         new AlloyCrop({
    //             image_src: MyData.overallData['images']['url'],
    //             width: 470,
    //             height: 200,
    //             output: 1.5,
    //             ok: function (base64, canvas) {
    //                 crop_result.appendChild(canvas);
    //                 crop_result.querySelector("canvas").style.borderRadius = "0%";
    //                 crop_btn.style.display = "inline-block";
    //                 crop_result.style.display = "block";
    //             },
    //             cancel: function () {
    //                 crop_btn.style.display = "inline-block";
    //                 crop_result.style.display = "block";
    //             }
    //         });
    //     }
    // });

    /**
     * 递归上传选择的图片资源到企业微信资源管理云端
     */
    var uploadWxLocalImgIndex = function (localId,callback) {
        //定义图片名称
        var fileName = MyData.overallData['timestamp'] + "_" + MyGeneralSer.generateUUID() + ".png";
        wx.uploadImage({
            localId: localId.toString(),
            isShowProgressTips: 0, // 默认为1，显示进度提示, 0表示不显示进度条
            success: function (res) {
                //从企业微信资源管理云端拷贝图片到本地resource中
                var uri = MyData.copyTempResourceToLocal;
                var data = {
                    'media_id': res.serverId,
                    'file_name': fileName,
                };
                MyGeneralSer.httpPostFrontServer(uri, data, function (responseData) {
                    if (responseData) {
                        MyData.overallData['images']['url']=MyData.resourceUrl + fileName;
                        MyData.overallData['images']['name']=fileName;
                        callback();
                    }

                })
            },
            fail: function (res) {
                MyData.overallData['loadData'] = false;
                alert("微信服务繁忙，请稍后重试");
            },
        });
    };

    return {
        initData:initData,
        getPhoneImg:getPhoneImg,
    };
});