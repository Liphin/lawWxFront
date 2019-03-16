/**
 * create by lxc on 2019-03-08
 */

var contentModule = angular.module('Angular.content');
contentModule.factory('InterestEditSer',function ($http, $window, $timeout, ContentDataSer, $location, OverallGeneralSer,
                                                  OverallDataSer, ContentGeneralSer) {


    /**
     * 监测需要的新闻字段是否填写完成
     * @returns {boolean}
     */
    var checkNewsInfo = function () {
        //检查内容是否全部填写完成
        var status = false;
        var title = ContentDataSer.interestData['editData']['data']['title'];
        var coverImage = ContentDataSer.interestData['editData']['data']['coverImage'];
        var optType = ContentDataSer.interestData['editData']['optType'];
        if (!OverallGeneralSer.checkDataNotEmpty(title)) {
            alert("请先填写完善文章标题");

        } else if (!OverallGeneralSer.checkDataNotEmpty(coverImage) && (optType == 1)) {
            alert("请先上传文章封面图片");

        } else {
            status = true;
        }
        return status;
    };

    /**
     * 编辑页面中预览文章数据
     */
    var viewInterest = function () {
        if (checkNewsInfo()) {
            var html = $("#newsEditor").summernote('code');
            var viewHtmlHead = ContentGeneralSer.generalHtmlHead(ContentDataSer.interestData['editData']['data']['title'],
                ContentDataSer.interestData['editData']['data']['wx_user_name'], ContentDataSer.interestData['editData']['data']['create_time'], false);
            var viewHtmlEnd = '\n    </div>\n</div>\n</body>\n</html>';

            //拼装HTML文件
            var phoneHtml = viewHtmlHead + html + viewHtmlEnd;

            ContentDataSer.overallData['phoneView']['html'] = ContentGeneralSer.replaceSpecialCharacters(phoneHtml);
            //展开手机渲染面板
            ContentDataSer.overallData['phoneView']['status'] = true;
        }
    };



    /**
     * 保存文章数据
     */
    var saveInterest = function () {
        if (checkNewsInfo()) {
            //异源完成后继续进行保存操作
            var html = $("#newsEditor").summernote('code');
            //拼接保存的最终版数据
            var phoneHtmlHead = ContentGeneralSer.generalHtmlHead(ContentDataSer.interestData['editData']['data']['title'],
                ContentDataSer.interestData['editData']['data']['wx_user_name'], ContentDataSer.interestData['editData']['data']['create_time'], true);
            var phoneHtmlEnd = ContentDataSer.overallData['phoneView']['phoneEndHtml'];

            //拼装HTML文件
            var phoneHtml = phoneHtmlHead + html + phoneHtmlEnd;
            //var phoneHtml = phoneHtmlHead + html.replace(new RegExp(ContentDataSer.newsData['editData']['htmlStyle']), '') + phoneHtmlEnd;

            //特殊字符串转换并赋值
            ContentDataSer.overallData['phoneView']['html'] = ContentGeneralSer.replaceSpecialCharacters(phoneHtml);
            //提交保存，并携带标识新建、跟新新闻操作标识符
            saveInterestHtmlData(ContentDataSer.interestData['editData']['optType']);
            //console.log('phoneHtml', html);
        }
    };

    /**
     * 保存文章数据
     * @param optType
     */
    var saveInterestHtmlData = function (optType) {
        var fd = new FormData();
        fd.append('id', ContentDataSer.interestData['editData']['data']['id']);
        fd.append('type', ContentDataSer.interestData['editData']['data']['type']);
        fd.append('subtype', ContentDataSer.interestData['editData']['data']['subtype']);
        fd.append('wx_user_id', ContentDataSer.interestData['editData']['data']['wx_user_id']);
        fd.append('wx_user_name', ContentDataSer.interestData['editData']['data']['wx_user_name']);
        fd.append('timestamp', ContentDataSer.interestData['editData']['data']['timestamp']);
        fd.append('title', ContentDataSer.interestData['editData']['data']['title']);
        fd.append('status_cd', ContentDataSer.interestData['editData']['data']['status_cd']);

        //操作类型：创建、保存类型
        fd.append('optType', optType);
        fd.append('html', ContentDataSer.overallData['phoneView']['html']);

        //如果封面图不为空则添加封面图
        if (OverallGeneralSer.checkDataNotEmpty(ContentDataSer.interestData['editData']['data']['coverImage'])) {
            fd.append('coverImage', ContentDataSer.interestData['editData']['data']['coverImage']);
        }
        //提交表单数据
        $http.post(ContentDataSer.saveInterestData, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            //返回数据不进行alert操作，只做打印处理
            if (response['status_code'] == 200) {
                //管理员编写审核完成，发布该消息,如果该条消息已发布，则不用再推送消息
                $location.search('subPage', "interestList");

            } else {
                OverallGeneralSer.alertHttpRequestError("saveInterestHtmlData", response['exception_code'], response['exception']);
            }

        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("saveInterestHtmlData", 600, err);
        })
    };

    /**
     * 检测在富文本框内按键按下情况
     * @param event
     */
    var checkRichEditorKeyDown = function (event) {
        console.log(event.keyCode);
        //检测是否ctrl键按下
        if (event.keyCode == 17) {
            ContentDataSer.overallData['ctrlKeyDown'] = true;
        }
        //检测是否v键按下
        else if (event.keyCode == 86) {
            //如果此时监测到ctrl键也同时按下则触发异源图片监测并下载到本地操作
            if (ContentDataSer.overallData['ctrlKeyDown'] == true) {
                //暂停600毫秒进行赋值
                setTimeout(function () {
                    var index = 0;
                    $("img", $('#49')).each(function () {
                        var target = $(this);
                        var imgSrc = target[0].src;
                        if (imgSrc.indexOf('127.0.0.1') <= -1 && imgSrc.indexOf(ContentDataSer.overallData['netURL']) <= -1) {
                            var imgSrcArray = imgSrc.split('.');
                            var fileName = OverallGeneralSer.getTimeStamp(++index) + "." + imgSrcArray[imgSrcArray.length - 1].split('?')[0];
                            var url = OverallDataSer.urlData['frontEndHttp']['uploadCrossOriginImg'] + "?croUrl=" + encodeURIComponent(imgSrc) + "&fileName=" + encodeURIComponent(fileName);
                            OverallGeneralSer.httpGetFiles(url, function (responseData) {
                                if (responseData) {
                                    target.attr('src', OverallDataSer.urlData['frontEndHttp']['getDynamicResource'] + fileName);
                                }
                            })
                        }
                    });
                }, 600);
            }
        }
    };
    /**
     * 检测在富文本框内按键弹起情况
     * @param event
     */
    var checkRichEditorKeyUp = function (event) {
        ContentDataSer.overallData['ctrlKeyDown'] = false;
    };

    /**
     * 打开网页图片视图，下载新闻数据的所有图片
     */
    var downloadInterestImages = function () {
        //初始化操作，打开下载页面并，清空之前装载的图片数据，
        ContentDataSer.overallData['imagesDownload']['array'].length = 0;
        ContentDataSer.overallData['imagesDownload']['status'] = true;

        if (OverallGeneralSer.checkDataNotEmpty(ContentDataSer.interestData['editData']['data']['coverImageSrc'])) {
            //1、封面图提供选择
            ContentDataSer.overallData['imagesDownload']['array'] = [ContentDataSer.interestData['editData']['data']['coverImageSrc']];
        }

        //2、对富文本框的内容进行抽取img
        $("#49").find("img").each(function () {
            ContentDataSer.overallData['imagesDownload']['array'].push($(this).attr("src"));
        });
    };

    /**
     * 添加外部引用视频到富文本框面板
     */
    var addVideoUrlToEditor = function () {
        //获取之前editor的HTML数据
        var newsEditor = $("#newsEditor");
        var originHtml = newsEditor.summernote('code');

        //添加视频url，并换行处理
        var finalHtml = originHtml + '<br>' + ContentDataSer.interestData['editData']['videoUrl'] + '\n';
        newsEditor.summernote('code', finalHtml);
    };

    /**
     * 检查是否符合进入编辑页面条件，若否则返回到list界面
     */
    var validateInterestEdit = function () {
        //查看当前是否有选中的interest数据
        var editIndex = ContentDataSer.interestData['editData']['editIndex'];
        //如果不是新增interest或编辑interest，则返回interestList界面
        if (!OverallGeneralSer.checkDataNotEmpty(editIndex) && ContentDataSer.interestData['editData']['optType'] != 1) {
            $location.search({'subPage': 'interestList'});
        }
    };

    return {
        viewInterest:viewInterest,
        saveInterest:saveInterest,
        checkRichEditorKeyUp:checkRichEditorKeyUp,
        checkRichEditorKeyDown:checkRichEditorKeyDown,
        downloadInterestImages:downloadInterestImages,
        addVideoUrlToEditor: addVideoUrlToEditor,
        validateInterestEdit:validateInterestEdit,

    };

});