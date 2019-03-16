/**
 * create by lxc in 2019-03-06
 */

var contentModule = angular.module('Angular.content');

/**
 * 趣文封面图片上传
 */
contentModule.directive('fileModel', ['$parse', 'ContentDataSer', 'OverallSer', function ($parse, ContentDataSer, OverallSer) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('change', function (evt) {

                //压缩图片操作
                var canvas = document.createElement("canvas");
                var img = document.createElement("img");
                var reader = new FileReader();
                var IMG_MAX_WIDTH = 600;

                reader.readAsDataURL(element[0].files[0]);
                //添加reader的load事件，在捕获阶段进行设置portrait_url
                reader.addEventListener("load", function () {
                    //赋值数据
                    img.src = reader.result;
                    img.addEventListener('load', function () {
                        var width = img.width;
                        var height = img.height;
                        if (width > IMG_MAX_WIDTH) {
                            height = height * IMG_MAX_WIDTH / width;
                            width = IMG_MAX_WIDTH;
                        }
                        //在画布上画东西
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(this, 0, 0, width, height);
                        var dataUrl = canvas.toDataURL();
                        var blob = OverallSer.dataURItoBlob(dataUrl);

                        //强制渲染操作才可现实在前端
                        scope.$apply(function () {
                            if(ContentDataSer.overallData['pageType']==1) {
                                //生成blob数据到前端url
                                ContentDataSer.interestData['editData']['data']['coverImageSrc'] = dataUrl;
                                //对进行拷贝保存该文件装载
                                ContentDataSer.interestData['editData']['data']['coverImage'] = blob;
                            }
                            else if(ContentDataSer.overallData['pageType']==2) {
                                //生成blob数据到前端url
                                ContentDataSer.studyData['editData']['data']['coverImageSrc'] = dataUrl;
                                //对进行拷贝保存该文件装载
                                ContentDataSer.studyData['editData']['data']['coverImage'] = blob;
                            }
                            else if(ContentDataSer.overallData['pageType']==3) {
                                //生成blob数据到前端url
                                ContentDataSer.dynamicData['editData']['data']['coverImageSrc'] = dataUrl;
                                //对进行拷贝保存该文件装载
                                ContentDataSer.dynamicData['editData']['data']['coverImage'] = blob;
                            }
                        })
                    });
                }, true);
                //清空该target file则下次选择相同的file也可以上传
                evt.target.value = "";
            });
        }
    };
}]);



/**
 * 富文本框图片点击后效果
 */
contentModule.directive('imgClick', ['ContentDataSer', function (ContentDataSer) {
    return {
        restrict: 'A',
        link: function (scope, ele, attrs) {
            ele.css()
        }
    }
}]);



/**
 * 展示手机端的HTML渲染效果
 */
contentModule.directive('viewPhoneHtml', ['ContentDataSer', function (ContentDataSer) {
    return {
        restrict: 'A',
        link: function (scope, ele, attrs) {
            ele.html(ContentDataSer.overallData['phoneView']['html']);
        }
    }
}]);


