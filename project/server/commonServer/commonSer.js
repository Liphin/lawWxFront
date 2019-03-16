
var fs = require('fs');
var url = require('url');
var util = require('util');
var http = require('http');
var https = require('https');
var request = require('request');
var crypto = require('crypto');
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


}

module.exports = resourceLocalize;