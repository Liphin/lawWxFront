
var fs = require('fs');
var url = require('url');
var util = require('util');
var request = require('request');
var crypto = require('crypto');
var serverSerData = require('../serverSerData');
var ServerSer = require('../serverSer');
var GetAccessTokenSer = require('../tokenServer/getAccessTokenSer');
var getAccessTokenSer = new GetAccessTokenSer();
var serverSer = new ServerSer();

function WxMassInfo() {

    this.wxUploadCoverImg =function (req,res) {
        console.log("上传微信");
        getAccessTokenSer.getAccessToken(function () {
            console.log(req['body']);
            var uri = util.format(serverSerData.uploadMediaUrl,serverSerData.wxCertData['access_token']);
            var file = fs.createReadStream(serverSerData.loadFilePath+req['body']['fileUrl']+"/"+req['body']['fileName']);
            //var file = req['body']['file'];
            const options = {
                method:"post",
                url:uri,
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                formData:{
                    'media':file
                }
            };

            request(options,function (err,response,body) {
                console.log(JSON.parse(body));
                if (!err && response['statusCode']==200) {
                    res.send(JSON.parse(body));
                }
                else {
                    console.log(err);
                    res.send(400);
                }
            });

        });
    };

    this.wxUploadImgUrl =function (req,res) {
        console.log("上传微信URL");
        getAccessTokenSer.getAccessToken(function () {
            console.log(req['body']);
            var uri = util.format(serverSerData.uploadImageUrl,serverSerData.wxCertData['access_token']);
            var file = fs.createReadStream(serverSerData.loadFilePath+"resource/"+req['body']['src']);
            //var file = req['body']['file'];
            const options = {
                method:"post",
                url:uri,
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                formData:{
                    'media':file
                }
            };

            request(options,function (err,response,body) {
                console.log(body);
                if (!err && response['statusCode']==200) {
                    res.send(body);
                }
                else {
                    console.log(err);
                    res.send(400);
                }
            });

        });
    };

    this.wxMassUploadInfo = function (req,res) {
        var arg = req.body;
        console.log(arg);
        serverSerData.uploadMediaData='';
        serverSerData.uploadMediaData = arg;
        var length = arg['articles'].length;
        var index = 0;
        readFile(index,length,res);
    };

    var readFile = function (index,length,res) {
        if (index>=length) {
            return UploadFile(res);
        }
        var filePath = serverSerData.loadFilePath+"html/"+serverSerData.uploadMediaData['articles'][index]['content'];
        console.log("666");
        fs.readFile(filePath, function read(err, data) {
            if (err) {
                console.log(err)
                res.send(400);
                return;
            }
            serverSerData.uploadMediaData['articles'][index]['content'] = data.toString();
            index=index+1;
            return readFile(index,length,res);
        });
    };

    var UploadFile = function (res) {
        var uri = util.format(serverSerData.uploadInfoUrl,serverSerData.wxCertData['access_token']);
        console.log(serverSerData.uploadMediaData);
        getAccessTokenSer.getAccessToken(function () {
            request.post({
                url:uri,
                json:serverSerData.uploadMediaData
            },function (err,response,body) {
                if (!err && response['statusCode']==200) {
                    console.log(body);
                    res.send(body);
                }
                else {
                    console.log(err);
                    res.send(400);
                }
            });
        });
    };

    this.wxMassSendInfo = function (req,res) {
        var arg = req.body;
        getAccessTokenSer.getAccessToken(function () {
            var uri = util.format(serverSerData.sendMassInfoUrl,serverSerData.wxCertData['access_token']);
            request.post({
                url:uri,
                json:arg
            },function (err,response,body) {
                //console.log(response);
                if (!err && response['statusCode']==200) {
                    res.send(body);
                }
                else {
                    console.log(err);
                    res.send(400);
                }
            })
        });

    };


    this.viewSendInfoUrl = function (req,res) {
        var arg = req.body;
        console.log(arg);
        getAccessTokenSer.getAccessToken(function () {
            var uri = util.format(serverSerData.viewSendInfoUrl,serverSerData.wxCertData['access_token']);
            request.post({
                url:uri,
                json:arg
            },function (err,response,body) {
                console.log(body);
                if (!err && response['statusCode']==200) {
                    res.send(body);
                }
                else {
                    console.log(err);
                    res.send(400);
                }
            })
        });

    };
}

module.exports = WxMassInfo;
