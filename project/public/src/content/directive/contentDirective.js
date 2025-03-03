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
                        var fileName = ContentDataSer.interestData['editData']['data']['timestamp']+".png";
                        //强制渲染操作才可现实在前端
                        scope.$apply(function () {
                            if(ContentDataSer.overallData['pageType']==1) {
                                //生成blob数据到前端url
                                ContentDataSer.interestData['editData']['data']['coverImageSrc'] = dataUrl;
                                //对进行拷贝保存该文件装载
                                ContentDataSer.interestData['editData']['data']['coverImage'] = blob;
                                //保存文件路径
                                ContentDataSer.interestData['editData']['data']['fileName'] = fileName;
                            }
                            else if(ContentDataSer.overallData['pageType']==2) {
                                //生成blob数据到前端url
                                ContentDataSer.studyData['editData']['data']['coverImageSrc'] = dataUrl;
                                //对进行拷贝保存该文件装载
                                ContentDataSer.studyData['editData']['data']['coverImage'] = blob;
                                //保存文件路径
                                ContentDataSer.studyData['editData']['data']['fileName'] = fileName;
                            }
                            else if(ContentDataSer.overallData['pageType']==3) {
                                //生成blob数据到前端url
                                ContentDataSer.dynamicData['editData']['data']['coverImageSrc'] = dataUrl;
                                //对进行拷贝保存该文件装载
                                ContentDataSer.dynamicData['editData']['data']['coverImage'] = blob;
                                //保存文件路径
                                ContentDataSer.dynamicData['editData']['data']['fileName'] = fileName;
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
 * 头像上传
 */
contentModule.directive('imgModel', ['$parse', 'ContentDataSer', 'OverallSer', 'TeamEditSer', function ($parse, ContentDataSer, OverallSer,TeamEditSer) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('change', function (evt) {

                //压缩图片操作
                var canvas = document.createElement("canvas");
                var img = document.createElement("img");
                var reader = new FileReader();
                var IMG_MAX_WIDTH = 800;

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

                        var fileName = ContentDataSer.teamData['editData']['data']['timestamp']+".png";

                        //强制渲染操作才可现实在前端
                        scope.$apply(function () {
                            ContentDataSer.teamData['editData']['data']['imgUrl'] = fileName;
                            ContentDataSer.teamData['editData']['data']['coverImage'] = dataUrl;
                            ContentDataSer.teamData['editData']['imageData'].url = dataUrl;
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

contentModule.directive('ngMouseWheel', function () {
    return {
        scope: {
            bgSize: '='
        },
        link: function (scope, element, attrs) {
            element.bind("DOMMouseScroll mousewheel onmousewheel", function (event) {
                // cross-browser wheel delta
                var event = window.event || event; // old IE support
                var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

                //对图片进行background-size的操作
                scope.$apply(function () {
                    scope.bgSize = scope.bgSize + 10 * delta;
                });

                //禁止默认的页面滚动操作
                // for IE
                event.returnValue = false;
                // for Chrome and Firefox
                if (event.preventDefault) {
                    event.preventDefault();
                }
            });
        }
    }
});


