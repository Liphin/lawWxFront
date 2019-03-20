/**
 * create by lxc in 2019-03-06
 */

//content 模块控制器

var contentModule = angular.module('Angular.content');
contentModule.factory('ContentSer',function ($http, $window, $routeParams, $timeout, $location, ContentDataSer, OverallGeneralSer,
                                             OverallDataSer, ContentGeneralSer, OverallSer,InterestListSer,InterestEditSer,
                                             StudyListSer,StudyEditSer,DynamicListSer,DynamicEditSer,
                                             TeamListSer,MsgListSer) {

    /**
     * 数据初始化操作
     */
    var dataInit = function () {
        //获取拼凑手机HTML的头部数据
        getResourceData();

    };

    /**
     * 进入页面解析路径操作
     */
    var parsePath = function () {
        //路径参数获取
        var targetType = $routeParams['option'];
        var targetSubPage = $location.search()['subPage'];

        //检查url路径数据
        if (!OverallGeneralSer.checkDataNotEmpty(targetSubPage) || !OverallGeneralSer.checkDataNotEmpty(targetType)) {
            //若路径数据不全则默认打开内容栏目的新闻列表页面
            $location.search({'subPage': 'interestList'});
            $location.path(OverallDataSer.redirect['contentInterestArticle']);
            return;

        } else {
            initSubPage(targetType, targetSubPage);
        }
    };


    /**
     * 打开目标子页面操作
     */
    var initSubPage = function (targetType, targetSubPage) {
        //先设置全部页面不显示
        for (var i in ContentDataSer.navigation) {
            for (var j in ContentDataSer.navigation[i]) {
                ContentDataSer.navigation[i][j] = false;
            }
        }
        //单独设置目标页面显示
        ContentDataSer.navigation[targetType]['status'] = true;
        ContentDataSer.navigation[targetType][targetSubPage] = true;
        console.log(targetSubPage);

        //根据目标页面和需求进行设置
        switch (targetSubPage) {
            //http请求加载获取列表数据
            case 'interestList' : {
                ContentDataSer.interestData['list'].length = 0; //清空之前数据，下次进入方法会重新获取数据
                ContentDataSer.overallData['pageType']=1;
                InterestListSer.getRangeInterestInfo();//获取一定范围内的新闻数据
                break;
            }
            //查看当前是否有选择了interst数据，若是则进行编辑，否则返回趣文列表界面
            case 'interestEdit': {
                ContentDataSer.overallData['pageType']=1;
                InterestEditSer.validateInterestEdit();
                break;
            }
            case 'studyList' : {
                ContentDataSer.studyData['list'].length = 0; //清空之前数据，下次进入方法会重新获取数据
                ContentDataSer.overallData['pageType']=2;
                StudyListSer.getRangeStudyInfo();//获取一定范围内的新闻数据
                break;
            }
            //查看当前是否有选择了study数据，若是则进行编辑，否则返回研究所列表界面
            case 'studyEdit': {
                ContentDataSer.overallData['pageType']=2;
                StudyEditSer.validateStudyEdit();
                break;
            }
            case 'dynamicList' : {
                ContentDataSer.dynamicData['list'].length = 0; //清空之前数据，下次进入方法会重新获取数据
                ContentDataSer.overallData['pageType']=3;
                DynamicListSer.getRangeDynamicInfo();//获取一定范围内的新闻数据
                break;
            }
            //查看当前是否有选择了dynamic数据，若是则进行编辑，否则返回研究所列表界面
            case 'dynamicEdit': {
                ContentDataSer.overallData['pageType']=3;
                DynamicEditSer.validateDynamicEdit();
                break;
            }
            case 'teamList' : {
                ContentDataSer.teamData['list'].length = 0; //清空之前数据，下次进入方法会重新获取数据
                ContentDataSer.overallData['pageType']=4;
                TeamListSer.getRangeTeamInfo();//获取一定范围内的新闻数据
                break;
            }
            case 'msgList' : {
                ContentDataSer.msgData['list'].length = 0; //清空之前数据，下次进入方法会重新获取数据
                ContentDataSer.overallData['pageType']=5;
                MsgListSer.getRangeMsgInfo();//获取一定范围内的新闻数据
                break;
            }
            default: {
                break;
            }
        }

        //滚动到页面最顶端
        $window.scrollTo(0, 0);
    };

    /**
     * 获取拼凑手机HTML的头部数据
     */
    var getResourceData = function () {
        /*获取手机头部数据请求url*/
        var viewHeadHtml = OverallDataSer.urlData['frontEndHttp']['getViewHeadHtml'];
        var phoneHtmlHead = OverallDataSer.urlData['frontEndHttp']['getPhoneHtmlHead'];
        var phoneHtmlEnd = OverallDataSer.urlData['frontEndHttp']['getPhoneHtmlEnd'];

        //如果尚未获取手机端头部转换数据则获取
        if (!OverallGeneralSer.checkDataNotEmpty(ContentDataSer.overallData['phoneView']['phoneHeadHtml'])) {
            OverallGeneralSer.httpGetFiles(phoneHtmlHead, function (response) {
                ContentDataSer.overallData['phoneView']['phoneHeadHtml'] = response;
            });
        }
        //如果尚未获取手机端尾部转换数据则获取
        if (!OverallGeneralSer.checkDataNotEmpty(ContentDataSer.overallData['phoneView']['phoneEndHtml'])) {
            OverallGeneralSer.httpGetFiles(phoneHtmlEnd, function (response) {
                ContentDataSer.overallData['phoneView']['phoneEndHtml'] = response;
            });
        }
        //如果尚未获取预览效果前端转换数据则获取
        if (!OverallGeneralSer.checkDataNotEmpty(ContentDataSer.overallData['phoneView']['viewHeadHtml'])) {
            OverallGeneralSer.httpGetFiles(viewHeadHtml, function (response) {
                ContentDataSer.overallData['phoneView']['viewHeadHtml'] = response;
            });
        }
    };


    /**
     * 下载目标图片资源
     */
    var downloadTargetImg = function (url) {
        if(url.startsWith('data:image')){
            //如果url装载的就是blob对象，则直接下载
            var blob = OverallSer.dataURItoBlob(url);
            var fileName = OverallGeneralSer.getTimeStamp() + ".png";
            saveAs(blob, fileName);

        }else {
            //用ajax异步加载url路径下的资源文件，设置processData为false才不会自动转string类型
            $.ajax({
                url: url,
                type: 'GET',
                dataType: "binary",
                processData: false,
                success: function (result) {
                    //从网络流中读入数据并保存文件
                    console.log(result)
                    var blob = new Blob([result], {type: 'application/octet-stream'});
                    var fileName = OverallGeneralSer.getTimeStamp() + ".png";
                    saveAs(blob, fileName);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    //打印错误消息体
                    console.error('error', errorThrown)
                }
            });
        }

    };

    /**
     * 上传资源文件信息
     * 用于提交文件操作，并开放callback函数接口
     */
    var uploadResource = function (file, timestamp, callback) {
        var fd = new FormData();
        fd.append('new_resource', file);
        fd.append('timestamp', timestamp);
        //提交表单数据
        $http.post(ContentDataSer.uploadResource, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            if (response['status_code'] == 200) {
                callback(response['data']);

            } else {
                OverallGeneralSer.alertHttpRequestError("uploadResource", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("uploadResource", 600, err);
        })
    };

    return {
        parsePath: parsePath,
        dataInit: dataInit,
        uploadResource:uploadResource,
        downloadTargetImg:downloadTargetImg,
    };

});