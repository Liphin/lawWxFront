
var fs = require('fs');
var url = require('url');
var util = require('util');
var http = require('http');
var https = require('https');
var request = require('request');
var crypto = require('crypto');
var GetAccessTokenSer = require('../tokenServer/getAccessTokenSer');
var getAccessTokenSer = new GetAccessTokenSer();
var serverSerData = require('../serverSerData');

function resourceLocalize() {
    /**
     * 把异源加载的资源download到本地
     * @param req
     * @param response
     */
    this.copyCrossResourceToLocal = function (req, response) {
        //从url中读取并获取异源数据
        var arg = url.parse(req.url, true).query;
        var croUrl = decodeURIComponent(arg['croUrl']);
        var fileUrl = serverSerData.basePath + "/dynamicinfo/resource/" + decodeURIComponent(arg['fileName']);
        console.log(croUrl,fileUrl);
        //logger.debug(JSON.stringify(croUrl)+" "+JSON.stringify(fileUrl));

        //download该异源数据到本地
        request.head(croUrl, function (err, res, body) {
            request(croUrl).pipe(fs.createWriteStream(fileUrl)).on('close', function () {
                response.send(true)
            });
        });
    };

    this.clearQuato =function (req,res) {
        var arg = url.parse(req.url, true).query;
        var pass = arg['pass'];
        console.log(pass);
        if (pass=="qidai6968") {
            getAccessTokenSer.getAccessToken(function () {
                var uri = util.format(serverSerData.clearAPiQuatoUrl,serverSerData.wxCertData['access_token']);
                request.post({
                    url:uri,
                    json:{
                        "appid":serverSerData.wxAppInfo['appid'],
                    }
                },function (err,response,body) {
                    if (!err && response['statusCode']==200) {
                        res.send(JSON.parse(body));
                    }
                    else {
                        console.log(err);
                        res.send(JSON.parse(body));
                    }
                });
            });

        }
        else {
            res.send("请输入正确的密码参数");
        }
    };


}

module.exports = resourceLocalize;