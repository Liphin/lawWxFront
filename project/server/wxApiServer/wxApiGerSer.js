/**
 * 微信API接口调用函数模块
 */
var url = require('url');
var util = require('util');
var request = require('request');
var crypto = require('crypto');
var XML2JS = require('xml2js');
//解析，将xml解析为json
var parser = new XML2JS.Parser();
//重组，将json重组为xml
var builder = new XML2JS.Builder();
var serverSerData = require('../serverSerData');
var wxApiGerSerData = require('./wxApiGerSerData');
function WxApiGerSer() {
    //微信公众号创建菜单
    this.createWxMenu = function () {
        var menuData = wxApiGerSerData.wxMeunJson;
        var access_token = serverSerData.wxCertData['access_token'];
        var uri = util.format(serverSerData.createWxMenuUrl,access_token);
        console.log(uri);
        request.post({
            url: uri,
            json: menuData,
        }, function (err, res, body) {
            console.log(body)
        });
    };

    //验证token，并触发微信事件交互业务
    this.getTokenSign = function (req,res,callback) {
        var arg = url.parse(req.url, true).query;
        var signature = arg['signature'];
        var timestamp = arg['timestamp'];
        var nonce = arg['nonce'];
        var echostr = arg['echostr'];
        var token = serverSerData.wxAppInfo['token'];

        /**
         * 获取url中包含的signature，timestamp，nonce，echostr。
         * 然后将token，timestamp，nonce按照字典序排列。
         * 并且加密，再与接收到的signature进行比对，如果相同，则是来自微信的请求，反之则不是。
         */
        var currSign,tmp;
        tmp = [token,timestamp,nonce].sort().join("");
        currSign = crypto.createHash("sha1").update(tmp).digest("hex");
        if(currSign === signature){
            callback(echostr);
        }else {
            res.send("It is not a weixin server");
        }
    };

    this.getWxAPiSer = function (req,res) {
        this.getTokenSign(req,res,function (echostr) {
            req.on('data',function (data) {
                //将xml解析
                parser.parseString(data.toString(), function(err, result) {
                    console.log(result)
                    var body = result.xml;
                    var messageType = body['MsgType'];
                    console.log(messageType)
                    //用户点击菜单响应事件
                    if(messageType == 'event') {
                        var eventName = body['Event'];
                        EventFunction(eventName,body, req, res);
                    }else if(messageType == 'text') {
                        //自动回复消息
                        EventFunction("text",body, req, res);
                    }else {
                        res.send("success");
                    }
                });
            });
        });
    };

    //根据不同条件执行不同的微信事件交互
    var EventFunction = function (type,body,req,res) {
        console.log(type)
        switch (type) {
            case "CLICK":
                wxMenuClickSer(body,req,res,function () {
                    console.log("点击事件成功返回");
                    res.send("success");
                });
                break;
            case "text":
                wxReplyMsgSer(body,req,res,function (xml) {
                    console.log("消息返回成功");
                    res.send(xml);
                });
                break;
            default:
                res.send("success");
        }
    };

    //响应用户菜单点击事件
    var wxMenuClickSer = function (body,req,res,callback) {
        console.log(body);
        window.location.href = "https://www.runoob.com;";
        callback();
    };

    //自动回复用户消息
    var wxReplyMsgSer = function (body,req,res,callback) {
        //组装微信需要的json
        // var json = {
        //     ToUserName: body['FromUserName'],
        //     FromUserName: body['ToUserName'],
        //     CreateTime: new Date(),
        //     MsgType: 'text',
        //     Content: '您好'
        // };
        //
        // var xml = builder.buildObject(json);
        var xml = '<xml><ToUserName>'+body['FromUserName']+
                  '</ToUserName><FromUserName>'+body['ToUserName']+
                  '</FromUserName><CreateTime>'+(new Date())+
                  '</CreateTime><MsgType>'+'text'+
                  '</MsgType><Content>'+'您好'+
                  '</Content></xml>';
        //res.writeHead(200, {'Content-Type': 'application/xml'});
        callback(xml);
    };

}

module.exports = WxApiGerSer;