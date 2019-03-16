/**
 * 获取accesstoken 并保存
 */
var url = require('url');
var util = require('util');
var request = require('request');
var serverSerData = require('../serverSerData');

function GetAccessTokenSer () {
    //获取普通access_token
    this.getAccessToken = function (callback) {
        var appid = serverSerData.wxAppInfo['appid'];
        var appsecret = serverSerData.wxAppInfo['secret'];
        var uri = util.format(serverSerData.getAcessTokenUrl,appid,appsecret);
        //console.log(uri);
        //如果服务器初始化，则将时限直接设为3600
        if (serverSerData.wxCertData['timestamp']>0) {
            var starttime = new Date(serverSerData.wxCertData['timestamp']);
            var timestamp = new Date();
            var endtime = new Date(timestamp);
            var seconds = (endtime.getTime()-starttime.getTime())/1000;
        }
        else {
            var seconds = 3600;
        }
        console.log(seconds);
        if (seconds >= 3600) {
            request.get(uri,function (err,res,body) {
                if (!err && res['statusCode'] == 200) {
                    serverSerData.wxCertData['access_token'] = JSON.parse(body)['access_token'];
                    serverSerData.wxCertData['timestamp'] = new Date();//插入新记录的时间
                    callback();
                    console.log(serverSerData.wxCertData);
                } else {
                    //调用出错
                    console.log(err);
                }
            });
        }
        else {
            callback();
        }
    };

}
module.exports = GetAccessTokenSer;