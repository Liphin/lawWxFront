var fs = require('fs');
var url = require('url');
var util = require('util');
var request = require('request');
var crypto = require('crypto');
var serverSerData = require('../serverSerData');
var ServerSer = require('../serverSer');
var WxMassInfo = require('./wxMassInfo');
var wxMassInfo = new WxMassInfo();
var GetAccessTokenSer = require('../tokenServer/getAccessTokenSer');
var getAccessTokenSer = new GetAccessTokenSer();
var serverSer = new ServerSer();

function WxApiTest() {
    this.wxMassUploadInfoTest = function (req,res) {
        console.log("测试");
        var url="http://gntqant.com/dynamic";
        req.body = {
            "articles": [
                {
                    "thumb_media_id":"JvuYoL--FE8q9sp8jEWzNcZCY2OAenlCrPzX8_Hs20iMuxSBLcIBTtQOGvG71btA",
                    "title":"66",
                    "content":"<!DOCTYPE html>\n" +
                        "<html lang=\"en\" ng-app=\"myApp\" ng-controller=\"MyCtrl as ctrl\">\n" +
                        "<head>\n" +
                        "    <script src=\"http://cdn.static.runoob.com/libs/jquery/1.11.0/jquery.min.js\"></script>\n" +
                        "    <script src=\"http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.js\"></script>\n" +
                        "    <script src=\"https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js\"></script>\n" +
                        "    <script src=\"http://res2.wx.qq.com/open/js/jweixin-1.4.0.js\"></script>\n" +
                        "    <link rel=\"stylesheet\" href=\"http://gntqant.com:80/assets/css/bootstrap/bootstrap.min.css\">\n" +
                        "    <link rel=\"stylesheet\" href=\"http://gntqant.com:80/assets/css/font-awesome/font-awesome.min.css\">\n" +
                        "    <!--<link rel=\"stylesheet\" href=\"http://127.0.0.1:80/assets/css/bootstrap/bootstrap.min.css\">-->\n" +
                        "    <!--<link rel=\"stylesheet\" href=\"http://127.0.0.1:80/assets/css/font-awesome/font-awesome.min.css\">-->\n" +
                        "    <meta charset=\"UTF-8\">\n" +
                        "    <title>66</title>\n" +
                        "    <meta name=\"viewport\" content=\"width=device-width\">\n" +
                        "    <style>\n" +
                        "        img {\n" +
                        "            width: 100% !important;\n" +
                        "            height: auto !important;\n" +
                        "            display: inherit;\n" +
                        "            margin-top: 15px;\n" +
                        "            text-indent: 0;\n" +
                        "        }\n" +
                        "        mark {\n" +
                        "            background: white;\n" +
                        "            border: none;\n" +
                        "        }\n" +
                        "        iframe, embed {\n" +
                        "            width: 100%;\n" +
                        "            height: auto;\n" +
                        "        }\n" +
                        "        p {\n" +
                        "            text-align: left;\n" +
                        "            padding: 0 10px;\n" +
                        "            font-size: 17px;\n" +
                        "            width: 100%;\n" +
                        "            text-indent: 2em;\n" +
                        "            letter-spacing: 1px;\n" +
                        "            line-height: 150%;\n" +
                        "            color: #4b4b4b;\n" +
                        "        }\n" +
                        "    </style>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "\n" +
                        "<div ng-if=\"ctrl.overallData['showPageInfo']\" style=\"width: 100%; position: relative;display: inline-block\">\n" +
                        "    <!--新闻标题数据-->\n" +
                        "    <div style=\"width: 100%; text-align: left; font-size: 20px;padding: 15px 15px 5px 15px;font-weight: bold;color: #585858\">\n" +
                        "        <span>66</span>\n" +
                        "    </div>\n" +
                        "\n" +
                        "    <!--新闻发送人和发送时间-->\n" +
                        "    <div style=\"width: 100%; text-align: left; padding: 5px 15px 0 15px; font-size: 12px\">\n" +
                        "        <span>期待律师事务所</span>\n" +
                        "        <span style=\"margin-left: 10px\">2019-4-10</span>\n" +
                        "    </div>\n" +
                        "\n" +
                        "    <!--新闻数据展示-->\n" +
                        "    <div id=\"content\" style=\"padding: 0 0 55px 0;width: 100%;text-align: left;font: 15px/1.5 Microsoft YaHei,arial,SimSun,宋体;margin-top: -20px\">\n" +
                        "        <mark>\n" +
                        "<p>777</p>    </mark></div>\n" +
                        "\n" +
                        "<div>\n" +
                        "    <!--放置二维码地方及关注我们的描述-->\n" +
                        "    <div style=\"font-family: 微软雅黑;color: #7f559c; font-size: 18px;margin-left: 20px; font-weight: bold\">长按识别下方二维吗，关注我们吧</div>\n" +
                        "    <div style=\"border: 1px solid gainsboro; border-width: 1px 0 1px 0; margin: 20px;display: flex; flex-direction: row;padding: 20px 0\">\n" +
                        "        <div style=\"flex: 1; margin-right: 20px; display: inline-block\">及关注我们的描述放置二维码地方及关注我们的描述放置二维码地方及关注我们的描述放置二维码地方及关注我们的描述放置二维码地方及关注我们的描述</div>\n" +
                        "        <img style=\"width: 100px; height: 100px;\" src=\"\">\n" +
                        "    </div>\n" +
                        "</div>\n" +
                        "\n" +
                        "<!--展示总阅读量和允许点赞操作-->\n" +
                        "<div style=\"font-family: 微软雅黑; font-size: 15px; color: grey; background: white;position: fixed; bottom: 0; left: 0;right: 0;height: 50px;border: 1px solid #d8d8d8;border-width: 1px 0 0 0;padding: 13px;\">\n" +
                        "    <span>阅读 {{ctrl.dynamicDetail['view_count']}}</span>\n" +
                        "    <div style=\"display: inline-block; position: relative; left: 20px;\" ng-click=\"ctrl.updatePitchCount()\">\n" +
                        "        <i ng-if=\"ctrl.userDynamic['dynamic_pitch']!=1\" class=\"fa fa-heart-o\" style=\"color: grey\"></i>\n" +
                        "        <i ng-if=\"ctrl.userDynamic['dynamic_pitch']==1\" class=\"fa fa-heart\" style=\"color: #ff4e66\"></i>\n" +
                        "        <span>点赞 {{ctrl.dynamicDetail['pitch_count']}}</span>\n" +
                        "        <span ng-if=\"ctrl.overallData['markSubmitPitchOpt']\" style=\"position: relative; left: 20px\">提交中...</span>\n" +
                        "    </div>\n" +
                        "</div>\n" +
                        "</div>\n" +
                        "    <script>\n" +
                        "        var app = angular.module('myApp', []);\n" +
                        "        //重置HTML的url即，可以无需hash情况使用$location\n" +
                        "        app.config(function ($locationProvider) {\n" +
                        "            $locationProvider.html5Mode({\n" +
                        "                enabled: true,\n" +
                        "                rewriteLinks: false,\n" +
                        "                requireBase: false\n" +
                        "            });\n" +
                        "        });\n" +
                        "        /*控制器*/\n" +
                        "        app.controller('MyCtrl', function ($scope, $http, $window, $location, MyData, MySer) {\n" +
                        "            //数据初始化操作\n" +
                        "            var ctrl = this;\n" +
                        "            ctrl.overallData = MyData.overallData;\n" +
                        "            ctrl.dynamicDetail = MyData.dynamicDetail;\n" +
                        "            ctrl.userDynamic = MyData.userDynamic;\n" +
                        "            MySer.initData();\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 点赞操作\n" +
                        "             */\n" +
                        "            ctrl.updatePitchCount = function () {\n" +
                        "                MySer.updatePitchCount();\n" +
                        "            }\n" +
                        "        });\n" +
                        "\n" +
                        "\n" +
                        "        /*数据集*/\n" +
                        "        app.factory('MyData', function () {\n" +
                        "            var serverHost = 'http://gntqant.com';\n" +
                        "            //var serverHost = 'http://127.0.0.1';\n" +
                        "            var frontSerPort = 80;\n" +
                        "            var backSerPort = 8085;\n" +
                        "            var requestDataErrorMsg = \"尊敬的客户，服务器异常，请稍后分享\";\n" +
                        "\n" +
                        "            var userInfo = {};\n" +
                        "            var userDynamic = {}; //用户_新闻行为表\n" +
                        "            var dynamicDetail = {}; //进入新闻详情页面后，记录新闻详细信息\n" +
                        "            var getUserDynamicInfo = serverHost + \":\" + backSerPort + \"/getUserDynamicInfo\"; //获取某条新闻详情\n" +
                        "            var updatePitchCount = serverHost + \":\" + backSerPort + \"/updatePitchCount\"; //更新用户点赞数\n" +
                        "            var getWxOauthToken = serverHost + \":\" + frontSerPort + \"/getWxOauthToken\";\n" +
                        "            var getJsSign = serverHost + \":\" + frontSerPort + '/getJsSign';\n" +
                        "            var coverImgUrl = serverHost + \":\" + frontSerPort + \"/dynamicinfo/coverimg/\";\n" +
                        "\n" +
                        "\n" +
                        "            var viewNewsDetailSetting = {\n" +
                        "                'appid': 'wxf52fc57535c3d13b',\n" +
                        "                'redirect_uri': '',\n" +
                        "                'response_type': 'code',\n" +
                        "                'scope': 'snsapi_base',\n" +
                        "            };\n" +
                        "\n" +
                        "            //设置对象数据\n" +
                        "            var overallData = {\n" +
                        "                param: '', //记录类型\n" +
                        "                showPageInfo: false, //是否允许查看本消息体的开关\n" +
                        "            };\n" +
                        "\n" +
                        "            return {\n" +
                        "                userInfo: userInfo,\n" +
                        "                getJsSign: getJsSign,\n" +
                        "                userDynamic: userDynamic,\n" +
                        "                dynamicDetail: dynamicDetail,\n" +
                        "                coverImgUrl: coverImgUrl,\n" +
                        "                overallData: overallData,\n" +
                        "                updatePitchCount: updatePitchCount,\n" +
                        "                getWxOauthToken: getWxOauthToken,\n" +
                        "                getUserDynamicInfo: getUserDynamicInfo,\n" +
                        "                viewNewsDetailSetting: viewNewsDetailSetting,\n" +
                        "                requestDataErrorMsg: requestDataErrorMsg,\n" +
                        "            }\n" +
                        "        });\n" +
                        "\n" +
                        "\n" +
                        "        app.factory('MySer', function ($window, $document, $http, MyData, $location) {\n" +
                        "            /**\n" +
                        "             * 初始化页面数据操作\n" +
                        "             */\n" +
                        "            var initData = function () {\n" +
                        "                //设置标题数据\n" +
                        "                var parameters = $location.search();\n" +
                        "                MyData.overallData['param'] = parameters; //装载参数数据\n" +
                        "\n" +
                        "                //获取用户数据，从本地的cookie中读取数据\n" +
                        "                var userInfo = Cookies.getJSON('userInfo');\n" +
                        "                console.log('userInfo: ',userInfo);\n" +
                        "                if (checkDataNotEmpty(userInfo)) {\n" +
                        "                    //装载openid\n" +
                        "                    for (var i in userInfo) {\n" +
                        "                        MyData.userInfo[i] = userInfo[i];\n" +
                        "                    }\n" +
                        "                    //获取新闻相关数据\n" +
                        "                    getUserDynamicInfo();\n" +
                        "\n" +
                        "                } else {\n" +
                        "                    //根据url是否有code参数逻辑处理\n" +
                        "                    if (checkDataNotEmpty(parameters['code'])) {\n" +
                        "                        //如果有code则进行code请求user数据\n" +
                        "                        getUserInfo(parameters);\n" +
                        "\n" +
                        "                    } else {\n" +
                        "                        //如果无code则进行code请求，并redirect回该页面\n" +
                        "                        reloadPageAndGetCompanyCode();\n" +
                        "                    }\n" +
                        "                }\n" +
                        "            };\n" +
                        "\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 先获取用户信息，如果该用户是本公司员工则允许查看消息，否则不允许查看消息\n" +
                        "             */\n" +
                        "            var getUserInfo = function (parameters) {\n" +
                        "                console.log(parameters);\n" +
                        "                //http请求获取user信息数据\n" +
                        "                var url = MyData.getWxOauthToken + '?code=' + parameters['code'];\n" +
                        "                $http({method: 'GET', url: url}).then(function successCallback(response) {\n" +
                        "                    console.log('response: ',response);\n" +
                        "                    if (response['status'] == 200) {\n" +
                        "                        var data = response['data'];\n" +
                        "                        if (data == '400') {\n" +
                        "                            alert('很抱歉，微信服务有异常，请稍后再试--');\n" +
                        "\n" +
                        "                        } else {\n" +
                        "                            //装载每个user info数据\n" +
                        "                            for (var i in response['data']) {\n" +
                        "                                MyData.userInfo[i] = response['data'][i];\n" +
                        "                            }\n" +
                        "                            //装载userInfo数据到cookies\n" +
                        "                            Cookies.set('userInfo', data, {expires: 1});\n" +
                        "                            //获取用户和消息相关数据\n" +
                        "                            getUserDynamicInfo();\n" +
                        "                        }\n" +
                        "                    }\n" +
                        "                }, function errorCallback(err) {\n" +
                        "                    alert(\"尊敬的客户，微信服务有异常，请稍后重试.,\")\n" +
                        "                });\n" +
                        "            };\n" +
                        "\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 进入预览新闻数据\n" +
                        "             */\n" +
                        "            var reloadPageAndGetCompanyCode = function () {\n" +
                        "                MyData.viewNewsDetailSetting['redirect_uri'] = $location.absUrl();\n" +
                        "                //MyData.viewNewsDetailSetting['redirect_uri'] = \"http://gntqant.com/getWxOauthToken\";\n" +
                        "                console.log(\"绝对路径\");\n" +
                        "                console.log(MyData.viewNewsDetailSetting['redirect_uri']);\n" +
                        "                location.href = \"https://open.weixin.qq.com/connect/oauth2/authorize?\" + jQuery.param(MyData.viewNewsDetailSetting) + \"#wechat_redirect\"\n" +
                        "            };\n" +
                        "\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 进入新闻详情页面后，获取新闻详细信息和该用户操作新闻的行为数据\n" +
                        "             */\n" +
                        "            var getUserDynamicInfo = function () {\n" +
                        "                //允许用户查看该消息体\n" +
                        "                MyData.overallData['showPageInfo'] = true;\n" +
                        "\n" +
                        "                //装载表单数据\n" +
                        "                var fd = new FormData();\n" +
                        "                fd.append('wx_user_id', MyData.userInfo['openid']);\n" +
                        "                fd.append('dynamic_timestamp', MyData.overallData['param']['timestamp']);\n" +
                        "                var url = MyData.getUserDynamicInfo;\n" +
                        "                //http请求数据\n" +
                        "                $http.post(url, fd, {\n" +
                        "                    transformRequest: angular.identity,\n" +
                        "                    headers: {'Content-Type': undefined},\n" +
                        "                }).success(function (response) {\n" +
                        "                    if (response['status_code'] == 200) {\n" +
                        "\n" +
                        "                        //initWxConfig();\n" +
                        "\n" +
                        "                        //装载每个用户操作新闻表数据\n" +
                        "                        for (var i in response['data']['user_dynamic']) {\n" +
                        "                            MyData.userDynamic[i] = response['data']['user_dynamic'][i];\n" +
                        "                        }\n" +
                        "                        //装载每个动态消息数据\n" +
                        "                        for (var i in response['data']['dynamicinfo']) {\n" +
                        "                            MyData.dynamicDetail[i] = response['data']['dynamicinfo'][i];\n" +
                        "                        }\n" +
                        "\n" +
                        "                    } else {\n" +
                        "                        alert(\"尊敬的客户，服务器异常，请稍后重试,.\")\n" +
                        "                    }\n" +
                        "                }).error(function (err) {\n" +
                        "                    alert(\"尊敬的客户，服务器异常，请稍后重试.\")\n" +
                        "                })\n" +
                        "            };\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 调用企业微信JS Api需满足config需求\n" +
                        "             */\n" +
                        "            // var initWxConfig = function () {\n" +
                        "            //\n" +
                        "            //     var url = MyData.getJsSign + \"?type=\" + MyData.overallData['param']['type'] + \"&webUrl=\" + encodeURIComponent($location.absUrl());\n" +
                        "            //     var title = document.title;\n" +
                        "            //     if (MyData.overallData['param']['type']==7) {\n" +
                        "            //         var imgurl = $('img').eq(0).attr('src');\n" +
                        "            //     }\n" +
                        "            //     else {\n" +
                        "            //         var imgurl = MyData.coverImgUrl + MyData.overallData['param']['timestamp'] + \".png\";\n" +
                        "            //     }\n" +
                        "            //\n" +
                        "            //\n" +
                        "            //     var htmlurl = $location.absUrl();\n" +
                        "            //\n" +
                        "            //     httpGetFiles(url, function (data) {\n" +
                        "            //         //配置签名信息\n" +
                        "            //         wx.config({\n" +
                        "            //             beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题\n" +
                        "            //             debug: false, //关闭debug模式，调试信息不弹出\n" +
                        "            //             appId: data['appId'],\n" +
                        "            //             timestamp: data['timestamp'],\n" +
                        "            //             nonceStr: data['noncestr'],\n" +
                        "            //             signature: data['signature'],\n" +
                        "            //             jsApiList: [\n" +
                        "            //                 'onMenuShareAppMessage',\n" +
                        "            //             ]\n" +
                        "            //         });\n" +
                        "            //         wx.ready(function(){\n" +
                        "            //             wx.onMenuShareAppMessage({\n" +
                        "            //                 title: title, // 分享标题\n" +
                        "            //                 desc: '', // 分享描述\n" +
                        "            //                 link: htmlurl, // 分享链接\n" +
                        "            //                 imgUrl: imgurl, // 分享图标\n" +
                        "            //                 success: function () {\n" +
                        "            //                     // 用户确认分享后执行的回调函数\n" +
                        "            //                 },\n" +
                        "            //                 cancel: function () {\n" +
                        "            //                     // 用户取消分享后执行的回调函数\n" +
                        "            //                 }\n" +
                        "            //             });\n" +
                        "            //         });\n" +
                        "            //     });\n" +
                        "            // };\n" +
                        "\n" +
                        "            /**\n" +
                        "             * http get获取资源数据\n" +
                        "             */\n" +
                        "            // var httpGetFiles = function (url, callback) {\n" +
                        "            //     //设置loading状态\n" +
                        "            //     //MyData.overallData['loadData'] = true;\n" +
                        "            //     $http({\n" +
                        "            //         method: 'GET',\n" +
                        "            //         url: url\n" +
                        "            //     }).then(function successCallback(response) {\n" +
                        "            //         if (response['status'] == 200) {\n" +
                        "            //             //返回正确操作后执行回调函数\n" +
                        "            //             callback(response['data'])\n" +
                        "            //\n" +
                        "            //         } else {\n" +
                        "            //             alert(MyData.requestDataErrorMsg + \",.\");\n" +
                        "            //         }\n" +
                        "            //     }, function errorCallback(err) {\n" +
                        "            //         alert(MyData.requestDataErrorMsg + \".,\" + err);\n" +
                        "            //\n" +
                        "            //     }).finally(function () {\n" +
                        "            //         //重置loading状态\n" +
                        "            //         //MyData.overallData['loadData'] = false;\n" +
                        "            //     });\n" +
                        "            // };\n" +
                        "\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 用户点赞和取消点赞操作\n" +
                        "             */\n" +
                        "            var updatePitchCount = function () {\n" +
                        "                if (!MyData.overallData['markSubmitPitchOpt']) {\n" +
                        "                    //设置提交点赞为true\n" +
                        "                    MyData.overallData['markSubmitPitchOpt'] = true;\n" +
                        "\n" +
                        "                    //装载表单数据\n" +
                        "                    var fd = new FormData();\n" +
                        "                    fd.append('wx_user_id', MyData.userInfo['openid']);\n" +
                        "                    fd.append('dynamic_timestamp', MyData.overallData['param']['timestamp']);\n" +
                        "                    MyData.userDynamic['dynamic_pitch'] = (MyData.userDynamic['dynamic_pitch'] == 1 ? 0 : 1);\n" +
                        "                    fd.append('dynamic_pitch', MyData.userDynamic['dynamic_pitch']);\n" +
                        "\n" +
                        "                    var url = MyData.updatePitchCount;\n" +
                        "\n" +
                        "                    //http请求数据\n" +
                        "                    $http.post(url, fd, {\n" +
                        "                        transformRequest: angular.identity,\n" +
                        "                        headers: {'Content-Type': undefined},\n" +
                        "                    }).success(function (response) {\n" +
                        "                        if (response['status_code'] == 200) {\n" +
                        "                            //更新点赞数\n" +
                        "                            MyData.dynamicDetail['pitch_count'] = response['data'];\n" +
                        "                        }\n" +
                        "\n" +
                        "                    }).error(function (err) {\n" +
                        "                        alert(\"尊敬的客户，服务器异常，请稍后重试._\")\n" +
                        "\n" +
                        "                    }).finally(function () {\n" +
                        "                        MyData.overallData['markSubmitPitchOpt'] = false;\n" +
                        "                    })\n" +
                        "\n" +
                        "                } else {\n" +
                        "                    alert(\"正在执行点赞更新操作，请稍后重试\");\n" +
                        "                }\n" +
                        "            };\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 对数据进行判空处理\n" +
                        "             * @param data\n" +
                        "             */\n" +
                        "            var checkDataNotEmpty = function (data) {\n" +
                        "                var status = false;\n" +
                        "                if (data != null && data != undefined) {\n" +
                        "                    //根据变量的不同类型进行判空处理\n" +
                        "                    switch (Object.prototype.toString.call(data)) {\n" +
                        "                        /*String类型数据*/\n" +
                        "                        case '[object String]': {\n" +
                        "                            if (data.trim() != '') {\n" +
                        "                                status = true;\n" +
                        "                            }\n" +
                        "                            break;\n" +
                        "                        }\n" +
                        "                        /*Array类型*/\n" +
                        "                        case '[object Array]': {\n" +
                        "                            if (data.length > 0) {\n" +
                        "                                status = true;\n" +
                        "                            }\n" +
                        "                            break;\n" +
                        "                        }\n" +
                        "                        /*Object类型*/\n" +
                        "                        case '[object Object]': {\n" +
                        "                            if (Object.keys(data).length > 0) {\n" +
                        "                                status = true;\n" +
                        "                            }\n" +
                        "                            break;\n" +
                        "                        }\n" +
                        "                        /*其他类型状态默认设置为true，分别为Number和Boolean类型*/\n" +
                        "                        default: {\n" +
                        "                            status = true;\n" +
                        "                            break;\n" +
                        "                        }\n" +
                        "                    }\n" +
                        "                }\n" +
                        "                return status;\n" +
                        "            };\n" +
                        "\n" +
                        "\n" +
                        "            return {\n" +
                        "                initData: initData,\n" +
                        "                updatePitchCount:updatePitchCount,\n" +
                        "            }\n" +
                        "        });\n" +
                        "    </script>\n" +
                        "</body>\n" +
                        "</html>",
                    "show_cover_pic":1,
                    "need_open_comment":1,
                    "only_fans_can_comment":1
                },
                {
                    "thumb_media_id":"JvuYoL--FE8q9sp8jEWzNcZCY2OAenlCrPzX8_Hs20iMuxSBLcIBTtQOGvG71btA",
                    "title":"测试1",
                    "content":"<!DOCTYPE html>\n" +
                        "<html lang=\"en\" ng-app=\"myApp\" ng-controller=\"MyCtrl as ctrl\">\n" +
                        "<head>\n" +
                        "    <script src=\"http://cdn.static.runoob.com/libs/jquery/1.11.0/jquery.min.js\"></script>\n" +
                        "    <script src=\"http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.js\"></script>\n" +
                        "    <script src=\"https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js\"></script>\n" +
                        "    <script src=\"http://res2.wx.qq.com/open/js/jweixin-1.4.0.js\"></script>\n" +
                        "    <link rel=\"stylesheet\" href=\"http://gntqant.com:80/assets/css/bootstrap/bootstrap.min.css\">\n" +
                        "    <link rel=\"stylesheet\" href=\"http://gntqant.com:80/assets/css/font-awesome/font-awesome.min.css\">\n" +
                        "    <!--<link rel=\"stylesheet\" href=\"http://127.0.0.1:80/assets/css/bootstrap/bootstrap.min.css\">-->\n" +
                        "    <!--<link rel=\"stylesheet\" href=\"http://127.0.0.1:80/assets/css/font-awesome/font-awesome.min.css\">-->\n" +
                        "    <meta charset=\"UTF-8\">\n" +
                        "    <title>66</title>\n" +
                        "    <meta name=\"viewport\" content=\"width=device-width\">\n" +
                        "    <style>\n" +
                        "        img {\n" +
                        "            width: 100% !important;\n" +
                        "            height: auto !important;\n" +
                        "            display: inherit;\n" +
                        "            margin-top: 15px;\n" +
                        "            text-indent: 0;\n" +
                        "        }\n" +
                        "        mark {\n" +
                        "            background: white;\n" +
                        "            border: none;\n" +
                        "        }\n" +
                        "        iframe, embed {\n" +
                        "            width: 100%;\n" +
                        "            height: auto;\n" +
                        "        }\n" +
                        "        p {\n" +
                        "            text-align: left;\n" +
                        "            padding: 0 10px;\n" +
                        "            font-size: 17px;\n" +
                        "            width: 100%;\n" +
                        "            text-indent: 2em;\n" +
                        "            letter-spacing: 1px;\n" +
                        "            line-height: 150%;\n" +
                        "            color: #4b4b4b;\n" +
                        "        }\n" +
                        "    </style>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "\n" +
                        "<div ng-if=\"ctrl.overallData['showPageInfo']\" style=\"width: 100%; position: relative;display: inline-block\">\n" +
                        "    <!--新闻标题数据-->\n" +
                        "    <div style=\"width: 100%; text-align: left; font-size: 20px;padding: 15px 15px 5px 15px;font-weight: bold;color: #585858\">\n" +
                        "        <span>66</span>\n" +
                        "    </div>\n" +
                        "\n" +
                        "    <!--新闻发送人和发送时间-->\n" +
                        "    <div style=\"width: 100%; text-align: left; padding: 5px 15px 0 15px; font-size: 12px\">\n" +
                        "        <span>期待律师事务所</span>\n" +
                        "        <span style=\"margin-left: 10px\">2019-4-10</span>\n" +
                        "    </div>\n" +
                        "\n" +
                        "    <!--新闻数据展示-->\n" +
                        "    <div id=\"content\" style=\"padding: 0 0 55px 0;width: 100%;text-align: left;font: 15px/1.5 Microsoft YaHei,arial,SimSun,宋体;margin-top: -20px\">\n" +
                        "        <mark>\n" +
                        "<p>777</p>    </mark></div>\n" +
                        "\n" +
                        "<div>\n" +
                        "    <!--放置二维码地方及关注我们的描述-->\n" +
                        "    <div style=\"font-family: 微软雅黑;color: #7f559c; font-size: 18px;margin-left: 20px; font-weight: bold\">长按识别下方二维吗，关注我们吧</div>\n" +
                        "    <div style=\"border: 1px solid gainsboro; border-width: 1px 0 1px 0; margin: 20px;display: flex; flex-direction: row;padding: 20px 0\">\n" +
                        "        <div style=\"flex: 1; margin-right: 20px; display: inline-block\">及关注我们的描述放置二维码地方及关注我们的描述放置二维码地方及关注我们的描述放置二维码地方及关注我们的描述放置二维码地方及关注我们的描述</div>\n" +
                        "        <img style=\"width: 100px; height: 100px;\" src=\"\">\n" +
                        "    </div>\n" +
                        "</div>\n" +
                        "\n" +
                        "<!--展示总阅读量和允许点赞操作-->\n" +
                        "<div style=\"font-family: 微软雅黑; font-size: 15px; color: grey; background: white;position: fixed; bottom: 0; left: 0;right: 0;height: 50px;border: 1px solid #d8d8d8;border-width: 1px 0 0 0;padding: 13px;\">\n" +
                        "    <span>阅读 {{ctrl.dynamicDetail['view_count']}}</span>\n" +
                        "    <div style=\"display: inline-block; position: relative; left: 20px;\" ng-click=\"ctrl.updatePitchCount()\">\n" +
                        "        <i ng-if=\"ctrl.userDynamic['dynamic_pitch']!=1\" class=\"fa fa-heart-o\" style=\"color: grey\"></i>\n" +
                        "        <i ng-if=\"ctrl.userDynamic['dynamic_pitch']==1\" class=\"fa fa-heart\" style=\"color: #ff4e66\"></i>\n" +
                        "        <span>点赞 {{ctrl.dynamicDetail['pitch_count']}}</span>\n" +
                        "        <span ng-if=\"ctrl.overallData['markSubmitPitchOpt']\" style=\"position: relative; left: 20px\">提交中...</span>\n" +
                        "    </div>\n" +
                        "</div>\n" +
                        "</div>\n" +
                        "    <script>\n" +
                        "        var app = angular.module('myApp', []);\n" +
                        "        //重置HTML的url即，可以无需hash情况使用$location\n" +
                        "        app.config(function ($locationProvider) {\n" +
                        "            $locationProvider.html5Mode({\n" +
                        "                enabled: true,\n" +
                        "                rewriteLinks: false,\n" +
                        "                requireBase: false\n" +
                        "            });\n" +
                        "        });\n" +
                        "        /*控制器*/\n" +
                        "        app.controller('MyCtrl', function ($scope, $http, $window, $location, MyData, MySer) {\n" +
                        "            //数据初始化操作\n" +
                        "            var ctrl = this;\n" +
                        "            ctrl.overallData = MyData.overallData;\n" +
                        "            ctrl.dynamicDetail = MyData.dynamicDetail;\n" +
                        "            ctrl.userDynamic = MyData.userDynamic;\n" +
                        "            MySer.initData();\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 点赞操作\n" +
                        "             */\n" +
                        "            ctrl.updatePitchCount = function () {\n" +
                        "                MySer.updatePitchCount();\n" +
                        "            }\n" +
                        "        });\n" +
                        "\n" +
                        "\n" +
                        "        /*数据集*/\n" +
                        "        app.factory('MyData', function () {\n" +
                        "            var serverHost = 'http://gntqant.com';\n" +
                        "            //var serverHost = 'http://127.0.0.1';\n" +
                        "            var frontSerPort = 80;\n" +
                        "            var backSerPort = 8085;\n" +
                        "            var requestDataErrorMsg = \"尊敬的客户，服务器异常，请稍后分享\";\n" +
                        "\n" +
                        "            var userInfo = {};\n" +
                        "            var userDynamic = {}; //用户_新闻行为表\n" +
                        "            var dynamicDetail = {}; //进入新闻详情页面后，记录新闻详细信息\n" +
                        "            var getUserDynamicInfo = serverHost + \":\" + backSerPort + \"/getUserDynamicInfo\"; //获取某条新闻详情\n" +
                        "            var updatePitchCount = serverHost + \":\" + backSerPort + \"/updatePitchCount\"; //更新用户点赞数\n" +
                        "            var getWxOauthToken = serverHost + \":\" + frontSerPort + \"/getWxOauthToken\";\n" +
                        "            var getJsSign = serverHost + \":\" + frontSerPort + '/getJsSign';\n" +
                        "            var coverImgUrl = serverHost + \":\" + frontSerPort + \"/dynamicinfo/coverimg/\";\n" +
                        "\n" +
                        "\n" +
                        "            var viewNewsDetailSetting = {\n" +
                        "                'appid': 'wxf52fc57535c3d13b',\n" +
                        "                'redirect_uri': '',\n" +
                        "                'response_type': 'code',\n" +
                        "                'scope': 'snsapi_base',\n" +
                        "            };\n" +
                        "\n" +
                        "            //设置对象数据\n" +
                        "            var overallData = {\n" +
                        "                param: '', //记录类型\n" +
                        "                showPageInfo: false, //是否允许查看本消息体的开关\n" +
                        "            };\n" +
                        "\n" +
                        "            return {\n" +
                        "                userInfo: userInfo,\n" +
                        "                getJsSign: getJsSign,\n" +
                        "                userDynamic: userDynamic,\n" +
                        "                dynamicDetail: dynamicDetail,\n" +
                        "                coverImgUrl: coverImgUrl,\n" +
                        "                overallData: overallData,\n" +
                        "                updatePitchCount: updatePitchCount,\n" +
                        "                getWxOauthToken: getWxOauthToken,\n" +
                        "                getUserDynamicInfo: getUserDynamicInfo,\n" +
                        "                viewNewsDetailSetting: viewNewsDetailSetting,\n" +
                        "                requestDataErrorMsg: requestDataErrorMsg,\n" +
                        "            }\n" +
                        "        });\n" +
                        "\n" +
                        "\n" +
                        "        app.factory('MySer', function ($window, $document, $http, MyData, $location) {\n" +
                        "            /**\n" +
                        "             * 初始化页面数据操作\n" +
                        "             */\n" +
                        "            var initData = function () {\n" +
                        "                //设置标题数据\n" +
                        "                var parameters = $location.search();\n" +
                        "                MyData.overallData['param'] = parameters; //装载参数数据\n" +
                        "\n" +
                        "                //获取用户数据，从本地的cookie中读取数据\n" +
                        "                var userInfo = Cookies.getJSON('userInfo');\n" +
                        "                console.log('userInfo: ',userInfo);\n" +
                        "                if (checkDataNotEmpty(userInfo)) {\n" +
                        "                    //装载openid\n" +
                        "                    for (var i in userInfo) {\n" +
                        "                        MyData.userInfo[i] = userInfo[i];\n" +
                        "                    }\n" +
                        "                    //获取新闻相关数据\n" +
                        "                    getUserDynamicInfo();\n" +
                        "\n" +
                        "                } else {\n" +
                        "                    //根据url是否有code参数逻辑处理\n" +
                        "                    if (checkDataNotEmpty(parameters['code'])) {\n" +
                        "                        //如果有code则进行code请求user数据\n" +
                        "                        getUserInfo(parameters);\n" +
                        "\n" +
                        "                    } else {\n" +
                        "                        //如果无code则进行code请求，并redirect回该页面\n" +
                        "                        reloadPageAndGetCompanyCode();\n" +
                        "                    }\n" +
                        "                }\n" +
                        "            };\n" +
                        "\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 先获取用户信息，如果该用户是本公司员工则允许查看消息，否则不允许查看消息\n" +
                        "             */\n" +
                        "            var getUserInfo = function (parameters) {\n" +
                        "                console.log(parameters);\n" +
                        "                //http请求获取user信息数据\n" +
                        "                var url = MyData.getWxOauthToken + '?code=' + parameters['code'];\n" +
                        "                $http({method: 'GET', url: url}).then(function successCallback(response) {\n" +
                        "                    console.log('response: ',response);\n" +
                        "                    if (response['status'] == 200) {\n" +
                        "                        var data = response['data'];\n" +
                        "                        if (data == '400') {\n" +
                        "                            alert('很抱歉，微信服务有异常，请稍后再试--');\n" +
                        "\n" +
                        "                        } else {\n" +
                        "                            //装载每个user info数据\n" +
                        "                            for (var i in response['data']) {\n" +
                        "                                MyData.userInfo[i] = response['data'][i];\n" +
                        "                            }\n" +
                        "                            //装载userInfo数据到cookies\n" +
                        "                            Cookies.set('userInfo', data, {expires: 1});\n" +
                        "                            //获取用户和消息相关数据\n" +
                        "                            getUserDynamicInfo();\n" +
                        "                        }\n" +
                        "                    }\n" +
                        "                }, function errorCallback(err) {\n" +
                        "                    alert(\"尊敬的客户，微信服务有异常，请稍后重试.,\")\n" +
                        "                });\n" +
                        "            };\n" +
                        "\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 进入预览新闻数据\n" +
                        "             */\n" +
                        "            var reloadPageAndGetCompanyCode = function () {\n" +
                        "                MyData.viewNewsDetailSetting['redirect_uri'] = $location.absUrl();\n" +
                        "                //MyData.viewNewsDetailSetting['redirect_uri'] = \"http://gntqant.com/getWxOauthToken\";\n" +
                        "                console.log(\"绝对路径\");\n" +
                        "                console.log(MyData.viewNewsDetailSetting['redirect_uri']);\n" +
                        "                location.href = \"https://open.weixin.qq.com/connect/oauth2/authorize?\" + jQuery.param(MyData.viewNewsDetailSetting) + \"#wechat_redirect\"\n" +
                        "            };\n" +
                        "\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 进入新闻详情页面后，获取新闻详细信息和该用户操作新闻的行为数据\n" +
                        "             */\n" +
                        "            var getUserDynamicInfo = function () {\n" +
                        "                //允许用户查看该消息体\n" +
                        "                MyData.overallData['showPageInfo'] = true;\n" +
                        "\n" +
                        "                //装载表单数据\n" +
                        "                var fd = new FormData();\n" +
                        "                fd.append('wx_user_id', MyData.userInfo['openid']);\n" +
                        "                fd.append('dynamic_timestamp', MyData.overallData['param']['timestamp']);\n" +
                        "                var url = MyData.getUserDynamicInfo;\n" +
                        "                //http请求数据\n" +
                        "                $http.post(url, fd, {\n" +
                        "                    transformRequest: angular.identity,\n" +
                        "                    headers: {'Content-Type': undefined},\n" +
                        "                }).success(function (response) {\n" +
                        "                    if (response['status_code'] == 200) {\n" +
                        "\n" +
                        "                        //initWxConfig();\n" +
                        "\n" +
                        "                        //装载每个用户操作新闻表数据\n" +
                        "                        for (var i in response['data']['user_dynamic']) {\n" +
                        "                            MyData.userDynamic[i] = response['data']['user_dynamic'][i];\n" +
                        "                        }\n" +
                        "                        //装载每个动态消息数据\n" +
                        "                        for (var i in response['data']['dynamicinfo']) {\n" +
                        "                            MyData.dynamicDetail[i] = response['data']['dynamicinfo'][i];\n" +
                        "                        }\n" +
                        "\n" +
                        "                    } else {\n" +
                        "                        alert(\"尊敬的客户，服务器异常，请稍后重试,.\")\n" +
                        "                    }\n" +
                        "                }).error(function (err) {\n" +
                        "                    alert(\"尊敬的客户，服务器异常，请稍后重试.\")\n" +
                        "                })\n" +
                        "            };\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 调用企业微信JS Api需满足config需求\n" +
                        "             */\n" +
                        "            // var initWxConfig = function () {\n" +
                        "            //\n" +
                        "            //     var url = MyData.getJsSign + \"?type=\" + MyData.overallData['param']['type'] + \"&webUrl=\" + encodeURIComponent($location.absUrl());\n" +
                        "            //     var title = document.title;\n" +
                        "            //     if (MyData.overallData['param']['type']==7) {\n" +
                        "            //         var imgurl = $('img').eq(0).attr('src');\n" +
                        "            //     }\n" +
                        "            //     else {\n" +
                        "            //         var imgurl = MyData.coverImgUrl + MyData.overallData['param']['timestamp'] + \".png\";\n" +
                        "            //     }\n" +
                        "            //\n" +
                        "            //\n" +
                        "            //     var htmlurl = $location.absUrl();\n" +
                        "            //\n" +
                        "            //     httpGetFiles(url, function (data) {\n" +
                        "            //         //配置签名信息\n" +
                        "            //         wx.config({\n" +
                        "            //             beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题\n" +
                        "            //             debug: false, //关闭debug模式，调试信息不弹出\n" +
                        "            //             appId: data['appId'],\n" +
                        "            //             timestamp: data['timestamp'],\n" +
                        "            //             nonceStr: data['noncestr'],\n" +
                        "            //             signature: data['signature'],\n" +
                        "            //             jsApiList: [\n" +
                        "            //                 'onMenuShareAppMessage',\n" +
                        "            //             ]\n" +
                        "            //         });\n" +
                        "            //         wx.ready(function(){\n" +
                        "            //             wx.onMenuShareAppMessage({\n" +
                        "            //                 title: title, // 分享标题\n" +
                        "            //                 desc: '', // 分享描述\n" +
                        "            //                 link: htmlurl, // 分享链接\n" +
                        "            //                 imgUrl: imgurl, // 分享图标\n" +
                        "            //                 success: function () {\n" +
                        "            //                     // 用户确认分享后执行的回调函数\n" +
                        "            //                 },\n" +
                        "            //                 cancel: function () {\n" +
                        "            //                     // 用户取消分享后执行的回调函数\n" +
                        "            //                 }\n" +
                        "            //             });\n" +
                        "            //         });\n" +
                        "            //     });\n" +
                        "            // };\n" +
                        "\n" +
                        "            /**\n" +
                        "             * http get获取资源数据\n" +
                        "             */\n" +
                        "            // var httpGetFiles = function (url, callback) {\n" +
                        "            //     //设置loading状态\n" +
                        "            //     //MyData.overallData['loadData'] = true;\n" +
                        "            //     $http({\n" +
                        "            //         method: 'GET',\n" +
                        "            //         url: url\n" +
                        "            //     }).then(function successCallback(response) {\n" +
                        "            //         if (response['status'] == 200) {\n" +
                        "            //             //返回正确操作后执行回调函数\n" +
                        "            //             callback(response['data'])\n" +
                        "            //\n" +
                        "            //         } else {\n" +
                        "            //             alert(MyData.requestDataErrorMsg + \",.\");\n" +
                        "            //         }\n" +
                        "            //     }, function errorCallback(err) {\n" +
                        "            //         alert(MyData.requestDataErrorMsg + \".,\" + err);\n" +
                        "            //\n" +
                        "            //     }).finally(function () {\n" +
                        "            //         //重置loading状态\n" +
                        "            //         //MyData.overallData['loadData'] = false;\n" +
                        "            //     });\n" +
                        "            // };\n" +
                        "\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 用户点赞和取消点赞操作\n" +
                        "             */\n" +
                        "            var updatePitchCount = function () {\n" +
                        "                if (!MyData.overallData['markSubmitPitchOpt']) {\n" +
                        "                    //设置提交点赞为true\n" +
                        "                    MyData.overallData['markSubmitPitchOpt'] = true;\n" +
                        "\n" +
                        "                    //装载表单数据\n" +
                        "                    var fd = new FormData();\n" +
                        "                    fd.append('wx_user_id', MyData.userInfo['openid']);\n" +
                        "                    fd.append('dynamic_timestamp', MyData.overallData['param']['timestamp']);\n" +
                        "                    MyData.userDynamic['dynamic_pitch'] = (MyData.userDynamic['dynamic_pitch'] == 1 ? 0 : 1);\n" +
                        "                    fd.append('dynamic_pitch', MyData.userDynamic['dynamic_pitch']);\n" +
                        "\n" +
                        "                    var url = MyData.updatePitchCount;\n" +
                        "\n" +
                        "                    //http请求数据\n" +
                        "                    $http.post(url, fd, {\n" +
                        "                        transformRequest: angular.identity,\n" +
                        "                        headers: {'Content-Type': undefined},\n" +
                        "                    }).success(function (response) {\n" +
                        "                        if (response['status_code'] == 200) {\n" +
                        "                            //更新点赞数\n" +
                        "                            MyData.dynamicDetail['pitch_count'] = response['data'];\n" +
                        "                        }\n" +
                        "\n" +
                        "                    }).error(function (err) {\n" +
                        "                        alert(\"尊敬的客户，服务器异常，请稍后重试._\")\n" +
                        "\n" +
                        "                    }).finally(function () {\n" +
                        "                        MyData.overallData['markSubmitPitchOpt'] = false;\n" +
                        "                    })\n" +
                        "\n" +
                        "                } else {\n" +
                        "                    alert(\"正在执行点赞更新操作，请稍后重试\");\n" +
                        "                }\n" +
                        "            };\n" +
                        "\n" +
                        "            /**\n" +
                        "             * 对数据进行判空处理\n" +
                        "             * @param data\n" +
                        "             */\n" +
                        "            var checkDataNotEmpty = function (data) {\n" +
                        "                var status = false;\n" +
                        "                if (data != null && data != undefined) {\n" +
                        "                    //根据变量的不同类型进行判空处理\n" +
                        "                    switch (Object.prototype.toString.call(data)) {\n" +
                        "                        /*String类型数据*/\n" +
                        "                        case '[object String]': {\n" +
                        "                            if (data.trim() != '') {\n" +
                        "                                status = true;\n" +
                        "                            }\n" +
                        "                            break;\n" +
                        "                        }\n" +
                        "                        /*Array类型*/\n" +
                        "                        case '[object Array]': {\n" +
                        "                            if (data.length > 0) {\n" +
                        "                                status = true;\n" +
                        "                            }\n" +
                        "                            break;\n" +
                        "                        }\n" +
                        "                        /*Object类型*/\n" +
                        "                        case '[object Object]': {\n" +
                        "                            if (Object.keys(data).length > 0) {\n" +
                        "                                status = true;\n" +
                        "                            }\n" +
                        "                            break;\n" +
                        "                        }\n" +
                        "                        /*其他类型状态默认设置为true，分别为Number和Boolean类型*/\n" +
                        "                        default: {\n" +
                        "                            status = true;\n" +
                        "                            break;\n" +
                        "                        }\n" +
                        "                    }\n" +
                        "                }\n" +
                        "                return status;\n" +
                        "            };\n" +
                        "\n" +
                        "\n" +
                        "            return {\n" +
                        "                initData: initData,\n" +
                        "                updatePitchCount:updatePitchCount,\n" +
                        "            }\n" +
                        "        });\n" +
                        "    </script>\n" +
                        "</body>\n" +
                        "</html>",
                    "show_cover_pic":0,
                    "need_open_comment":1,
                    "only_fans_can_comment":1
                }
            ]
        }
        wxMassInfo.wxMassUploadInfo(req,res);


    };

    this.wxMassSendInfoTest = function (req,res) {
        // req.body = {
        //     "filter":{
        //         "is_to_all":false,
        //         "tag_id":"1",
        //     },
        //     "mpnews":{
        //         "media_id":"qYCnYmu_WVvJl1JmYh0hkDyqrhS-9s0Oy-Db6xbmZmD0ycWb6qCN8O_ZQj5cDCXL"
        //     },
        //     "msgtype":"mpnews",
        //     "send_ignore_reprint":0
        // }
        req.body = {
            "touser":"o9S-61dYqEBPxK4eV3ZcO46Ikaeg",
            "mpnews":{
                "media_id":"qYCnYmu_WVvJl1JmYh0hkDyqrhS-9s0Oy-Db6xbmZmD0ycWb6qCN8O_ZQj5cDCXL"
            },
            "msgtype":"mpnews",
            "send_ignore_reprint":0
        }
        //wxMassInfo.wxMassSendInfo(req,res);
        wxMassInfo.viewSendInfoUrl(req,res);
    };
}
module.exports = WxApiTest;