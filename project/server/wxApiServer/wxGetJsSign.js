
var url = require('url');
var util = require('util');
var request = require('request');
var crypto = require('crypto');
var serverSerData = require('../serverSerData');
var ServerSer = require('../serverSer');
var GetAccessTokenSer = require('../tokenServer/getAccessTokenSer');
var getAccessTokenSer = new GetAccessTokenSer();
var serverSer = new ServerSer();

function WxGetJsSign() {

    this.getJsSign = function (req,res) {
        //解析url参数
        var arg = url.parse(req.url, true).query;
        var webUrl = arg['url'];
        console.log('get Param: ', arg, 'url: ' ,webUrl);

        //如果服务器初始化，则将时限直接设为3600
        if (serverSerData.wxCertData['js_timestamp']>0) {
            var starttime = new Date(serverSerData.wxCertData['js_timestamp']);
            var timestamp = new Date();
            var endtime = new Date(timestamp);
            var seconds = (endtime.getTime()-starttime.getTime())/1000;
        }
        else {
            var seconds = 3600;
        }
        if(seconds >= 3600) {
            getAccessTokenSer.getAccessToken(function () {
                console.log(serverSerData.wxCertData['access_token']);
                var uri = util.format(serverSerData.getJsSignUrl,serverSerData.wxCertData['access_token']);
                request.get(uri,function (err,response,body) {
                    if(!err && response['statusCode']==200){
                        var data = JSON.parse(body);
                        serverSerData.wxCertData['js_api_ticket'] = data['ticket']; //赋值ticket
                        serverSerData.wxCertData['js_timestamp'] = new Date(); //设置新的插入记录时间
                        creatSign(res,webUrl);
                    }
                    else {
                        console.log("getJsSign error");
                        res.send('error');
                    }
                })
            });

        }
        else {
            creatSign(res,webUrl);
        }
    };

    var creatSign = function (res,webUrl) {
        var getSignConcat = 'jsapi_ticket=%s&noncestr=%s&timestamp=%s&url=%s';
        var js_api_ticket = serverSerData.wxCertData['js_api_ticket'];
        var noncestr = serverSer.getRandomStr();
        var timestamp = serverSer.getTimestamp();

        //获取ticket数据
        var concatStr = util.format(getSignConcat, js_api_ticket, noncestr, timestamp, webUrl);
        console.log(concatStr);
        var hash = crypto.createHash('sha1').update(concatStr).digest('hex');

        //返回数据回传
        var toSign = {
            'appid': serverSerData.wxAppInfo['appid'],
            'noncestr': noncestr,
            'jsapi_ticket': serverSerData.wxCertData['js_api_ticket'],
            'timestamp': timestamp,
            'signature': hash
        };

        console.log('response toSign',toSign);
        res.send(toSign);

    }
}
module.exports = WxGetJsSign;