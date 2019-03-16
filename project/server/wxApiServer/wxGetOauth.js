/**
 * 进行oauth授权获取用户openid
 */
var url = require('url');
var util = require('util');
var request = require('request');
var serverSerData = require('../serverSerData');
function WxGetOauth() {
    this.getOauthToken = function (req,response) {
        var arg = url.parse(req.url, true).query;
        var code = arg['code'];
        console.log(code);
        var uri = util.format(serverSerData.getOauthTokenUrl,serverSerData.wxAppInfo['appid'],serverSerData.wxAppInfo['secret'],code);
        request.get(uri,function (err,res,body) {
            if (!err && res['statusCode'] == 200) {
                serverSerData.wxCertData['oauth_token'] = JSON.parse(body)['access_token'];
                response.send(JSON.parse(body)['openid']);
            } else {
                //调用出错
                console.log(err);
                response.send(400);
            }
        });
    };

    
}
module.exports = WxGetOauth;