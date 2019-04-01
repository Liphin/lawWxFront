/**
 * Created by Administrator on 2018/2/28.
 */
var overallModule = angular.module('Angular');

overallModule.factory('OverallDataSer', function ($rootScope) {

    //全局配置信息
    var overallData = {
        //屏幕宽高数据
        'screen': {'width': '', 'height': ''},
        //用户数据
        'userInfo': {
            'id': '',
            'manager_account': '',
            'manager_name': '',
            'lvl_cd': '',
            'wx_user_id': '',
            'mobile': '',
            'timestamp': '',
            'create_time': '',
            'update_time': '',
        },
        'maxHeight':'700',
        'targetHeight':'',
    };

    /* Url 系统各种文件获取的URL设置 */
    var baseUrlData = {
        //'backEndHttp': "http://127.0.0.1:8085/",
        //'frontEndHttp': "http://127.0.0.1:80/",
        'backEndHttp': "http://gntqant.com:8085/",
        'frontEndHttp': "http://gntqant.com:80/",
        'ossHttp': "",
        'resource_http_request': '',
    };

    var urlData = {

        'backEndHttp': {
            'managerLogin': baseUrlData['backEndHttp'] + 'managerLogin', //管理员登录操作
            'getUserInfoByIdAndSessionId': baseUrlData['backEndHttp'] + 'getUserInfoByIdAndSessionId', //根据用户id和sessionId获取用户信息

            //公用api
            'setDynamicStickInfo': baseUrlData['backEndHttp'] + 'setDynamicStickInfo', //设置文章的置顶功能
            'setTeamStickInfo': baseUrlData['backEndHttp'] + 'setTeamStickInfo', //设置人员的置顶功能
            'uploadResource': baseUrlData['backEndHttp'] + 'uploadResource', //上传资源文件操作


            //趣文api
            'getRangeInterestListToBg': baseUrlData['backEndHttp'] + 'getRangeInterestListToBg',
            'deleteInterest': baseUrlData['backEndHttp'] + 'deleteInterest',
            'deleteBatchInterest': baseUrlData['backEndHttp'] + 'deleteBatchInterest',
            'copyInterest': baseUrlData['backEndHttp'] + 'copyInterest', //拷贝文章数据
            'saveInterestData': baseUrlData['backEndHttp'] + 'saveInterestData', //保存文章数据
            'searchInterestData': baseUrlData['backEndHttp'] + 'searchInterestData', //搜索操作

            //研究所api
            'getRangeStudyListToBg': baseUrlData['backEndHttp'] + 'getRangeStudyListToBg',
            'deleteStudy': baseUrlData['backEndHttp'] + 'deleteStudy',
            'deleteBatchStudy': baseUrlData['backEndHttp'] + 'deleteBatchStudy',
            'copyStudy': baseUrlData['backEndHttp'] + 'copyStudy', //拷贝文章数据
            'saveStudyData': baseUrlData['backEndHttp'] + 'saveStudyData', //保存文章数据
            'searchStudyData': baseUrlData['backEndHttp'] + 'searchStudyData', //搜索操作

            //律所资讯api
            'getRangeDynamicListToBg': baseUrlData['backEndHttp'] + 'getRangeDynamicListToBg',
            'deleteDynamic': baseUrlData['backEndHttp'] + 'deleteDynamic',
            'deleteBatchDynamic': baseUrlData['backEndHttp'] + 'deleteBatchDynamic',
            'copyDynamic': baseUrlData['backEndHttp'] + 'copyDynamic', //拷贝文章数据
            'saveDynamicData': baseUrlData['backEndHttp'] + 'saveDynamicData', //保存文章数据
            'searchDynamicData': baseUrlData['backEndHttp'] + 'searchDynamicData', //搜索操作

            //团队成员api
            'getRangeTeamListToBg': baseUrlData['backEndHttp'] + 'getRangeTeamListToBg',
            'deleteTeam': baseUrlData['backEndHttp'] + 'deleteTeam',
            'deleteBatchTeam': baseUrlData['backEndHttp'] + 'deleteBatchTeam',
            'saveTeamData': baseUrlData['backEndHttp'] + 'saveTeamData', //保存文章数据
            'searchTeamData': baseUrlData['backEndHttp'] + 'searchTeamData', //搜索操作

            //留言api
            'getRangeMsgListToBg': baseUrlData['backEndHttp'] + 'getRangeMsgListToBg',
            'deleteMsg': baseUrlData['backEndHttp'] + 'deleteMsg',
            'deleteBatchMsg': baseUrlData['backEndHttp'] + 'deleteBatchMsg',
            'setupMsg': baseUrlData['backEndHttp'] + 'setupMsg',
            'setupBatchMsg': baseUrlData['backEndHttp'] + 'setupBatchMsg',
            'searchMsgData': baseUrlData['backEndHttp'] + 'searchMsgData', //搜索操作


        },

        'frontEndHttp': {
            //获取本地资源文件
            'getSqlKeyWord': baseUrlData['frontEndHttp'] + 'helper/sqlKeyWord.txt',
            'getViewHeadHtml': baseUrlData['frontEndHttp'] + 'helper/phone/viewHtmlHead.html',
            'getPhoneHtmlHead': baseUrlData['frontEndHttp'] + 'helper/phone/phoneHtmlHead.html',
            'getPhoneHtmlEnd': baseUrlData['frontEndHttp'] + 'helper/phone/phoneHtmlEnd.html',
            'uploadCrossOriginImg': baseUrlData['frontEndHttp'] + 'uploadCrossOriginImg',
            'getDynamicResource': baseUrlData['frontEndHttp'] + 'dynamicinfo/resource/',
            'saveCoverImage': baseUrlData['frontEndHttp'] + 'saveCoverImage', //保存图片操作
            'getCoverImage': baseUrlData['frontEndHttp'] + 'dynamicinfo/coverimg/',

        }
    };

    //用于sql注入filter
    var sqlVerify=[];


    var zIndexHelper = {
        'loading': 500000,
    };

    //location页面重定向
    var redirect = {
        'loginHome': '/login/home',
        'contentInterest': '/content/interestArticle',
    };

    //模态框消息提醒设置操作
    var modalSetting = {
        'lg': {
            'videoUrl': false,//填写多媒体的分享url
        },
        'sm': {}
    };


    return {
        urlData: urlData,
        redirect: redirect,
        sqlVerify:sqlVerify,
        overallData: overallData,
        baseUrlData: baseUrlData,
        zIndexHelper: zIndexHelper,
        modalSetting:modalSetting,
    }
});
