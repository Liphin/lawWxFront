/**
 * create by lxc in 2019-03-06
 */
var contentModule = angular.module('Angular.content');

/**
 * 图片上传
 */
contentModule.directive('richTextEditorResourceUpload', ['ContentDataSer', 'ContentSer', 'OverallSer', function (ContentDataSer, ContentSer,OverallSer) {

    /**
     * 同步上传图片操作
     */
    var syncUploadResourceFiles = function (files, index, timestamp, dynamicResourceUrl, evt) {
        if (files.length > 0) {

            //压缩图片操作
            var canvas = document.createElement("canvas");
            var img = document.createElement("img");
            var reader = new FileReader();
            var IMG_MAX_WIDTH = 800;
            var filename = files[index].name;
            //console.log(filename);
            //console.log(files[index].size);
            reader.readAsDataURL(files[index]);
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

                    var file = new File([blob], filename, {type: "image/png", lastModified: Date.now()});
                    //console.log(file);
                    ContentSer.uploadResource(file, timestamp,
                        function (data) {
                            //获取富文本框的代码数据
                            var html = $("#newsEditor").summernote('code');
                            html += ('<p style="__PSTYLE__;text-align: center"><img img-click style="__IMGSTYLE__;width: 320px;height: auto" src="' + dynamicResourceUrl + data + '"></p>\n');

                            //递归重复调用直到index和files数组长度一致
                            if (++index < files.length) {
                                //继续添加其他图片
                                syncUploadResourceFiles(files, index, timestamp, dynamicResourceUrl, evt);

                            }else {
                                //若图片添加完毕则添加该换行以及文本消息
                                html+='<p style="__PSTYLE__;text-align: left"><br></p>\n';
                                evt.target.value = "";
                            }
                            //设置内容的HTML代码
                            $("#newsEditor").summernote('code', html);
                        });

                });
            }, true);

        }
    };


    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('change', function (evt) {
                scope.$apply(function () {
                    syncUploadResourceFiles(element[0].files, 0, ContentDataSer.interestData['editData']['data']['timestamp'], ContentDataSer.getDynamicResource, evt);

                });
            });
        }
    };
}]);



/**
 * 富文本编辑器
 */
contentModule.directive('richTextEditor', ['ContentDataSer', 'ContentSer', 'OverallGeneralSer', '$timeout', function (ContentDataSer, ContentSer, OverallGeneralSer, $timeout) {

    return {
        restrict: 'A',
        scope: {
            editorHeight: '@'
        },
        link: function (scope, ele, attrs) {

            // 上传图片按钮 button
            var myImage = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '图片',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        str += '<span class="glyphicon glyphicon-picture" aria-hidden="true" style="margin-right: 5px;color: grey;"></span>';
                        str += '图片</div>';
                        return str;
                    },
                    click: function () {
                        $("#richResourceUpload").trigger('click');
                    }
                });
                return button.render();
            };

            // 上传视频按钮 button
            var myVideo = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '视频',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        str += '<i class="fa fa-video-camera" style="margin-right: 5px;color: grey;"></i>';
                        str += '视频</div>';
                        return str;
                    },
                    click: function () {
                        //点击视频后展开填写url的模态框组件
                        OverallGeneralSer.modalInfoShow('lg', 'videoUrl');
                    }
                });
                return button.render();
            };

            // 上传音频按钮 button
            var myAudio = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '音频',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        str += '<i class="fa fa-music" style="margin-right: 5px;color: grey;"></i>';
                        str += '音频</div>';
                        return str;
                    },
                });
                return button.render();
            };


            /**
             * 加粗按钮
             * @param context
             */
            var myBold = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '加粗',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        str += '<span class="glyphicon glyphicon-bold" aria-hidden="true" style="margin-right: 5px;color: grey;"></span>';
                        str += '加粗</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('bold');
                    }
                });
                return button.render();
            };

            /**
             * 斜体字体
             * @param context
             */
            var myItalic = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '斜体',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        str += '<span class="glyphicon glyphicon-italic" aria-hidden="true" style="margin-right: 5px;color: grey;"></span>';
                        str += '斜体</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('italic');
                    }
                });
                return button.render();
            };

            /**
             * 下划线字体
             * @param context
             */
            var myUnderline = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '斜体',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        str += '<i class="fa fa-underline" style="margin-right: 5px;color: grey;"></i>';
                        str += '下划线</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('underline');
                    }
                });
                return button.render();
            };


            /**
             * 居左按钮
             * @param context
             */
            var myAlignLeft = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '居左',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        //str += '<i class="fa fa-align-left" style="margin-right: 5px;color: grey;"></i>';
                        str += '居左</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('justifyLeft');
                    }
                });
                return button.render();
            };

            /**
             * 下划线字体
             * @param context
             */
            var myAlignRight = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '居右',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        //str += '<i class="fa fa-align-right" style="margin-right: 5px;color: grey;"></i>';
                        str += '居右</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('justifyRight');
                    }
                });
                return button.render();
            };

            /**
             * 居中
             * @param context
             */
            var myAlignCenter = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '斜体',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        //str += '<i class="fa fa-align-center" style="margin-right: 5px;color: grey;"></i>';
                        str += '居中</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('justifyCenter');
                    }
                });
                return button.render();
            };


            ele.summernote({
                height: scope.editorHeight,
                fontNames: ['微软雅黑', '宋体', '黑体', '华文行楷', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
                fontSizes: ['12', '14', '16', '18', '20', '24', '28', '32'],

                toolbar: [
                    ['style', ['mybold', 'myitalic', 'myunderline']],
                    ['front', ['fontname', 'fontsize', 'color']],
                    ['para', ['myalignleft', 'myaligncenter', 'myalignright']],
                    ['media', ['myimage', 'myvideo']]
                ],
                buttons: {
                    mybold: myBold,
                    myitalic: myItalic,
                    myunderline: myUnderline,

                    myalignleft: myAlignLeft,
                    myalignright: myAlignRight,
                    myaligncenter: myAlignCenter,

                    myimage: myImage,
                    myvideo: myVideo,
                    myaudio: myAudio,
                }
            });
            ele.summernote('code', ContentDataSer.overallData['phoneView']['editHtml']); //加载初始化的code
        }
    }
}]);


/**
 * 富文本编辑器
 */
contentModule.directive('wxRichTextEditor', ['ContentDataSer', 'ContentSer', 'OverallGeneralSer', '$timeout', function (ContentDataSer, ContentSer, OverallGeneralSer, $timeout) {

    return {
        restrict: 'A',
        scope: {
            editorHeight: '@'
        },
        link: function (scope, ele, attrs) {

            // 上传图片按钮 button
            var myImage = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '图片',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        str += '<span class="glyphicon glyphicon-picture" aria-hidden="true" style="margin-right: 5px;color: grey;"></span>';
                        str += '图片</div>';
                        return str;
                    },
                    click: function () {
                        $("#richResourceUpload").trigger('click');
                    }
                });
                return button.render();
            };

            // // 上传视频按钮 button
            // var myVideo = function (context) {
            //     var ui = $.summernote.ui;
            //     var button = ui.button({
            //         //tooltip: '视频',
            //         contents: function () {
            //             var str = "";
            //             str += '<div style="display: inline-block">';
            //             str += '<i class="fa fa-video-camera" style="margin-right: 5px;color: grey;"></i>';
            //             str += '视频</div>';
            //             return str;
            //         },
            //         click: function () {
            //             //点击视频后展开填写url的模态框组件
            //             OverallGeneralSer.modalInfoShow('lg', 'videoUrl');
            //         }
            //     });
            //     return button.render();
            // };

            // 上传音频按钮 button
            var myAudio = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '音频',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        str += '<i class="fa fa-music" style="margin-right: 5px;color: grey;"></i>';
                        str += '音频</div>';
                        return str;
                    },
                });
                return button.render();
            };


            /**
             * 加粗按钮
             * @param context
             */
            var myBold = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '加粗',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        str += '<span class="glyphicon glyphicon-bold" aria-hidden="true" style="margin-right: 5px;color: grey;"></span>';
                        str += '加粗</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('bold');
                    }
                });
                return button.render();
            };

            /**
             * 斜体字体
             * @param context
             */
            var myItalic = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '斜体',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        str += '<span class="glyphicon glyphicon-italic" aria-hidden="true" style="margin-right: 5px;color: grey;"></span>';
                        str += '斜体</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('italic');
                    }
                });
                return button.render();
            };

            /**
             * 下划线字体
             * @param context
             */
            var myUnderline = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '斜体',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        str += '<i class="fa fa-underline" style="margin-right: 5px;color: grey;"></i>';
                        str += '下划线</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('underline');
                    }
                });
                return button.render();
            };


            /**
             * 居左按钮
             * @param context
             */
            var myAlignLeft = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '居左',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        //str += '<i class="fa fa-align-left" style="margin-right: 5px;color: grey;"></i>';
                        str += '居左</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('justifyLeft');
                    }
                });
                return button.render();
            };

            /**
             * 下划线字体
             * @param context
             */
            var myAlignRight = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '居右',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        //str += '<i class="fa fa-align-right" style="margin-right: 5px;color: grey;"></i>';
                        str += '居右</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('justifyRight');
                    }
                });
                return button.render();
            };

            /**
             * 居中
             * @param context
             */
            var myAlignCenter = function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    //tooltip: '斜体',
                    contents: function () {
                        var str = "";
                        str += '<div style="display: inline-block">';
                        //str += '<i class="fa fa-align-center" style="margin-right: 5px;color: grey;"></i>';
                        str += '居中</div>';
                        return str;
                    },
                    click: function () {
                        ele.summernote('justifyCenter');
                    }
                });
                return button.render();
            };


            ele.summernote({
                height: scope.editorHeight,
                fontNames: ['微软雅黑', '宋体', '黑体', '华文行楷', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
                fontSizes: ['12', '14', '16', '18', '20', '24', '28', '32'],

                toolbar: [
                    ['style', ['mybold', 'myitalic', 'myunderline']],
                    ['front', ['fontname', 'fontsize', 'color']],
                    ['para', ['myalignleft', 'myaligncenter', 'myalignright']],
                    ['media', ['myimage', 'myvideo']]
                ],
                buttons: {
                    mybold: myBold,
                    myitalic: myItalic,
                    myunderline: myUnderline,

                    myalignleft: myAlignLeft,
                    myalignright: myAlignRight,
                    myaligncenter: myAlignCenter,

                    myimage: myImage,
                    //myvideo: myVideo,
                    myaudio: myAudio,
                }
            });
            ele.summernote('code', ContentDataSer.overallData['phoneView']['editHtml']); //加载初始化的code
        }
    }
}]);
