/**
 * create by lxc in 2019-03-06
 */

var contentModule = angular.module('Angular.content');
contentModule.factory('ContentDataSer', function (OverallDataSer) {
    //数据获取api


    //var getRangeFriendCircleListToBg = OverallDataSer.urlData['backEndHttp']['getRangeFriendCircleListToBg'];
    var getPhoneHtmlHead = OverallDataSer.urlData['backEndHttp']['getPhoneHtmlHead'];



    // var copyFriend = OverallDataSer.urlData['backEndHttp']['copyFriend'];
    //
    // var deleteFriend = OverallDataSer.urlData['backEndHttp']['deleteFriend'];
    //
    // var deleteBatchFriend = OverallDataSer.urlData['backEndHttp']['deleteBatchFriend'];
    //
    // var saveFriendCircle = OverallDataSer.urlData['backEndHttp']['saveFriendCircle'];
    // var searchFriendCircle = OverallDataSer.urlData['backEndHttp']['searchFriendCircle'];
    //
    // var searchNewsList = OverallDataSer.urlData['backEndHttp']['searchNewsList'];
    // var selectFriendCircleUpdateTime = OverallDataSer.urlData['backEndHttp']['selectFriendCircleUpdateTime'];

    //趣文数据操作api
    var getRangeInterestListToBg = OverallDataSer.urlData['backEndHttp']['getRangeInterestListToBg'];
    var deleteInterest = OverallDataSer.urlData['backEndHttp']['deleteInterest'];
    var deleteBatchInterest = OverallDataSer.urlData['backEndHttp']['deleteBatchInterest'];
    var searchInterestData = OverallDataSer.urlData['backEndHttp']['searchInterestData'];
    var copyInterest = OverallDataSer.urlData['backEndHttp']['copyInterest'];
    var saveInterestData = OverallDataSer.urlData['backEndHttp']['saveInterestData'];

    //研究所api
    var getRangeStudyListToBg = OverallDataSer.urlData['backEndHttp']['getRangeStudyListToBg'];
    var deleteStudy = OverallDataSer.urlData['backEndHttp']['deleteStudy'];
    var deleteBatchStudy = OverallDataSer.urlData['backEndHttp']['deleteBatchStudy'];
    var searchStudyData = OverallDataSer.urlData['backEndHttp']['searchStudyData'];
    var copyStudy = OverallDataSer.urlData['backEndHttp']['copyStudy'];
    var saveStudyData = OverallDataSer.urlData['backEndHttp']['saveStudyData'];

    //律所资讯api
    var getRangeDynamicListToBg = OverallDataSer.urlData['backEndHttp']['getRangeDynamicListToBg'];
    var deleteDynamic = OverallDataSer.urlData['backEndHttp']['deleteDynamic'];
    var deleteBatchDynamic = OverallDataSer.urlData['backEndHttp']['deleteBatchDynamic'];
    var searchDynamicData = OverallDataSer.urlData['backEndHttp']['searchDynamicData'];
    var copyDynamic = OverallDataSer.urlData['backEndHttp']['copyDynamic'];
    var saveDynamicData = OverallDataSer.urlData['backEndHttp']['saveDynamicData'];

    //团队成员api
    var getRangeTeamListToBg = OverallDataSer.urlData['backEndHttp']['getRangeTeamListToBg'];
    var deleteTeam = OverallDataSer.urlData['backEndHttp']['deleteTeam'];
    var deleteBatchTeam = OverallDataSer.urlData['backEndHttp']['deleteBatchTeam'];
    var searchTeamData = OverallDataSer.urlData['backEndHttp']['searchTeamData'];
    var saveTeamData = OverallDataSer.urlData['backEndHttp']['saveTeamData'];

    //留言api
    var getRangeMsgListToBg = OverallDataSer.urlData['backEndHttp']['getRangeMsgListToBg'];
    var deleteMsg = OverallDataSer.urlData['backEndHttp']['deleteMsg'];
    var deleteBatchMsg = OverallDataSer.urlData['backEndHttp']['deleteBatchMsg'];
    var searchMsgData = OverallDataSer.urlData['backEndHttp']['searchMsgData'];
    var setupMsg = OverallDataSer.urlData['backEndHttp']['setupMsg'];
    var setupBatchMsg = OverallDataSer.urlData['backEndHttp']['setupBatchMsg'];


    //公用api
    var uploadResource = OverallDataSer.urlData['backEndHttp']['uploadResource'];
    var getDynamicResource = OverallDataSer.urlData['frontEndHttp']['getDynamicResource'];
    var saveCoverImage = OverallDataSer.urlData['frontEndHttp']['saveCoverImage'];
    var getCoverImage = OverallDataSer.urlData['frontEndHttp']['getCoverImage'];
    var fileUrl = "coverimg";

    //全局数据
    var overallData = {
        'ctrlKeyDown':false,//记录ctrl按键是否有按下

        //公共列表展示区域
        'listShow': {
            'maxFromCreateTime': '2088-01-01 00:00:00',  //最大值，用于起始页操作
            'screenNum': 12, //文章列表每次获取的数量
            'maxShowPage': 10, //一次性最多展示10页数据

            'totalNum': 0, //所有文章条目数据
            'totalPage': 0, //一共多少分页

            'search': '',//搜索页面内容
            'status_cd': 99,

            'search_flag': 0,//0--获取一定范围的数据 1--搜素一定范围的数据
            'search_first_flag': 0,//0--第一次搜索 1--非第一次搜索

            'pagination': {
                'loadedMaxPageNum': 0,//已加载过的最大page number
                'beginPageNum': 1,//页面开始的下标号
                'activeIndex': 0, //激活状态的分页index
                'beginListIndex': 0, //文章list列表，开始展示数据的下标条目
                'num': [], //所有装填分页数据
                'pre': false, //是否可选择上一批次
                'next': true, //是否可选择下一批次
            },

            'statusType': {
                99: '全部',
                0: '草稿',
                1: '发布',
            },

            'pageType':1,//1-趣文 2-研究所 3-律所动态 4-团队管理 5-留言代办

            // 'netURL':'gntqant.com',
            'netURL':'127.0.0.1',


        },

        'teamListShow': {
            'maxFromCreateTime': '2088-01-01 00:00:00',  //最大值，用于起始页操作
            'screenNum': 12, //人员列表每次获取的数量
            'maxShowPage': 10, //一次性最多展示10页数据

            'totalNum': 0, //所有新闻条目数据
            'totalPage': 0, //一共多少分页

            'search': '',//搜索页面内容
            'status_cd': 99,

            'search_flag': 0,//0--获取一定范围的数据 1--搜素一定范围的数据
            'search_first_flag': 0,//0--第一次搜索 1--非第一次搜索

            'pagination': {
                'loadedMaxPageNum': 0,//已加载过的最大page number
                'beginPageNum': 1,//页面开始的下标号
                'activeIndex': 0, //激活状态的分页index
                'beginListIndex': 0, //新闻list列表，开始展示数据的下标条目
                'num': [], //所有装填分页数据
                'pre': false, //是否可选择上一批次
                'next': true, //是否可选择下一批次
            },

            'statusType': {
                99: '全部',
                1: '在职',
                0: '离职',
            },
        },

        'msgListShow': {
            'maxFromCreateTime': '2088-01-01 00:00:00',  //最大值，用于起始页操作
            'screenNum': 12, //新闻或朋友圈列表每次获取的数量
            'maxShowPage': 10, //一次性最多展示10页数据

            'totalNum': 0, //所有新闻条目数据
            'totalPage': 0, //一共多少分页

            'search': '',//搜索页面内容
            'status_cd': 99,

            'search_flag': 0,//0--获取一定范围的数据 1--搜素一定范围的数据
            'search_first_flag': 0,//0--第一次搜索 1--非第一次搜索

            'pagination': {
                'loadedMaxPageNum': 0,//已加载过的最大page number
                'beginPageNum': 1,//页面开始的下标号
                'activeIndex': 0, //激活状态的分页index
                'beginListIndex': 0, //新闻list列表，开始展示数据的下标条目
                'num': [], //所有装填分页数据
                'pre': false, //是否可选择上一批次
                'next': true, //是否可选择下一批次
            },

            'statusType': {
                99: '全部',
                0: '待办',
                1: '已办',
            },
        },
        //生成的页面手机版本预览
        'phoneView': {
            'status': false,
            'title': '', //标题, TODO
            'coverImage': '', //封面图片对象 TODO
            'coverImageSrc': '', //预览的HTML文件的src TODO
            'defaultTitle': '__TITLE__', //框架拼装默认的title，用来替换处理
            'defaultName': '__NAME__', //框架拼装默认的消息发送人，用来替换处理
            'defaultDate': '__DATE__', //框架拼装默认的消息发送时间，用来替换处理
            'viewHeadHtml': '', //预览时前端
            'phoneHeadHtml': '', //手机端拼凑的头部数据
            'phoneEndHtml': '', //手机端拼凑的尾部数据
            'html': '',//生成的网页html数据
            'height': '',//手机展示区的高度
            'maxHeight': '700',//手机展示区的最大高度为700px

            'editHtml': '<p><br></p>',
        },
        //可选择下载的图片
        'imagesDownload': {
            'array': [],
            'status': false, //是否展开页面
        },
    };

    //内部页面跳转展示
    var navigation = {
        'interestArticle': {
            'status': true,
            'interestList': false,
            'interestEdit': false,
        },
        'studyArticle': {
            'status': false,
            'studyList': false,
            'studyEdit': false,
        },
        'lawfirmDynamic': {
            'status': false,
            'dynamicList': false,
            'dynamicEdit': false,
        },
        'team': {
            'status': false,
            'teamList': false,
            'teamEdit': false,
        },
        'msg': {
            'status': false,
            'msgList': false,
            'msgEdit': false,
        }
    };

    //文章信息管理
    //趣文
    var interestData = {
        'mapData': {
            'subtype': {
                10: '见识闻趣',
            },
        },
        'editData': {
            'videoUrl': '', //媒体url
            'optType': 2, //1为创建文章操作，2为更新文章操作
            'editIndex': '',
            'org_status_cd': 0,
            'htmlStyle': '<p><span style="font-size: 16px;">﻿</span><br></p>', //初始化数据
            'data': {
                'id':'',
                'title': '',
                'type': 1,
                'subtype':10,
                'wx_user_id': '',
                'wx_user_name': '',
                'status_cd': '',
                'view_count': '',
                'timestamp': '',
                'create_time': '',
                'update_time': '',

                'coverImage': '',
                'coverImageSrc': '',
            },
        },
        'list': [],
    };

    //研究文
    var studyData = {
        'mapData': {
            'subtype': {
                20: '婚姻专栏',
                21: '房产专栏',
                22: '公司专栏',
            },
        },
        'editData': {
            'videoUrl': '', //媒体url
            'optType': 2, //1为创建文章操作，2为更新文章操作
            'editIndex': '',
            'org_status_cd': 0,
            'htmlStyle': '<p><span style="font-size: 16px;">﻿</span><br></p>', //初始化数据
            'data': {
                'id':'',
                'title': '',
                'type': 2,
                'subtype': 20,
                'wx_user_id': '',
                'wx_user_name': '',
                'status_cd': '',
                'view_count': '',
                'timestamp': '',
                'create_time': '',
                'update_time': '',

                'coverImage': '',
                'coverImageSrc': '',
            },
        },
        'list': [],
    };

    //互动文
    var dynamicData = {
        'mapData': {
            'subtype': {
                30: '律所资讯',
            },

        },
        'editData': {
            'videoUrl': '', //媒体url
            'optType': 2, //1为创建文章操作，2为更新文章操作
            'editIndex': '',
            'org_status_cd': 0,
            'htmlStyle': '<p><span style="font-size: 16px;">﻿</span><br></p>', //初始化数据
            'data': {
                'id':'',
                'title': '',
                'type': 3,
                'subtype':30,
                'wx_user_id': '',
                'wx_user_name': '',
                'status_cd': '',
                'view_count': '',
                'timestamp': '',
                'create_time': '',
                'update_time': '',

                'coverImage': '',
                'coverImageSrc': '',
            },
        },
        'list': [],
    };

    //团队成员信息管理
    var teamData = {
        'mapData': {
            'businessType': {
                0: '刑事辩护',
                1: '婚姻继承',
                2: '合同债务',
                3: '交通事故',
                4: '劳动工伤',
                5: '行政诉讼',
                6: '商标专利',
                7: '房产拆迁',
                8: '建设工程',
                9: '医疗事故',
                10: '清算破产',
                11: '金融财税',
                12: '海商外贸',
                13: '三农权益',
                14: '法律顾问',
            },
            'subType': {
                1: '在职',
                2: '离职',
            }
        },
        'editData': {
            'optType': 2, //1为创建人员操作，2为更新人员操作
            'editIndex': '',
            'data': {
                'id':'',
                'wx_user_id': '',
                'wx_user_name': '',
                'imgUrl': '',
                'name': '',
                'lvl_cd': '',
                'phone': '',
                'mail': '',
                'content': '',
                'status_cd': '',
                'business_type_list': '',
                'timestamp': '',
                'create_time': '',
                'update_time': '',
                'coverImage': '',
                'coverImageSrc': '',
                'coverCrop':'',
            },
        },
        'list': [],
    };

    //留言信息管理
    var msgData = {
        'mapData': {
            'msgType': {
                0: '刑事辩护',
                1: '婚姻继承',
                2: '合同债务',
                3: '交通事故',
                4: '劳动工伤',
                5: '行政诉讼',
                6: '商标专利',
                7: '房产拆迁',
                8: '建设工程',
                9: '医疗事故',
                10: '清算破产',
                11: '金融财税',
                12: '海商外贸',
                13: '三农权益',
                14: '法律顾问',
            },
            'subType':{
                0: '待办',
                1: '已办',
            }

        },
        'editData': {
            'optType': 2, //2为更新留言操作
            'editIndex': '',
            'org_status_cd': 0,
            'data': {
                'id':'',
                'name': '',
                'phone': '',
                'mail':'',
                'type': '',
                'content': '',
                'status_cd': '',
                'timestamp': '',
                'create_time': '',
                'update_time': '',
            },
        },
        'list': [],
    };




    return {
        //数据获取api
        getDynamicResource: getDynamicResource,
        getPhoneHtmlHead: getPhoneHtmlHead,

        //趣文数据操作api
        getRangeInterestListToBg: getRangeInterestListToBg,
        deleteInterest: deleteInterest,
        deleteBatchInterest: deleteBatchInterest,
        searchInterestData: searchInterestData,
        copyInterest: copyInterest,
        saveInterestData: saveInterestData,

        //研究所api
        getRangeStudyListToBg: getRangeStudyListToBg,
        deleteStudy: deleteStudy,
        deleteBatchStudy: deleteBatchStudy,
        searchStudyData: searchStudyData,
        copyStudy: copyStudy,
        saveStudyData: saveStudyData,

        //律所资讯api
        getRangeDynamicListToBg: getRangeDynamicListToBg,
        deleteDynamic: deleteDynamic,
        deleteBatchDynamic: deleteBatchDynamic,
        searchDynamicData: searchDynamicData,
        copyDynamic: copyDynamic,
        saveDynamicData: saveDynamicData,

        //团队成员api
        getRangeTeamListToBg: getRangeTeamListToBg,
        deleteTeam: deleteTeam,
        deleteBatchTeam: deleteBatchTeam,
        searchTeamData: searchTeamData,
        saveTeamData: saveTeamData,

        //留言api
        getRangeMsgListToBg: getRangeMsgListToBg,
        deleteMsg: deleteMsg,
        deleteBatchMsg: deleteBatchMsg,
        searchMsgData: searchMsgData,
        setupMsg: setupMsg,
        setupBatchMsg: setupBatchMsg,

        //公用api
        uploadResource: uploadResource,
        saveCoverImage: saveCoverImage,
        getCoverImage:getCoverImage,

        //数据定义
        interestData: interestData,
        studyData: studyData,
        dynamicData: dynamicData,
        teamData: teamData,
        msgData: msgData,
        overallData: overallData,
        navigation: navigation,
        fileUrl: fileUrl,
    }
});