var fs = require('fs');
var url = require('url');
var util = require('util');
var request = require('request');
var https = require('https');
var serverSerData = require('../serverSerData');
var GetAccessTokenSer = require('../tokenServer/getAccessTokenSer');
var getAccessTokenSer = new GetAccessTokenSer();


function CompanyResourceLocalize() {
    this.copyResource = function (req,res) {
        var arg = req.body;
        var media_id = arg['media_id'];
        var file_name = arg['file_name'];

        var file = fs.createWriteStream(serverSerData.basePath + "/dynamicinfo/resource/" + file_name);

        getAccessTokenSer.getAccessToken(function () {
            var uri = util.format(serverSerData.copyResourceUrl,serverSerData.wxCertData['access_token'],media_id);
            // request.get(uri,function (err,response,body) {
            //     response.pipe(file);
            //     response.send(true);
            // })
            console.log(uri);
            https.get(uri, function (imgResponse) {
                imgResponse.pipe(file);
                res.send(true);

            }).on('error', function (e) {
                console.log(e);
                res.send(false);
            })
        })
    };
    
    // this.saveCoverImage = function (req,res) {
    //     var arg = req.body;
    //     var BLOB = arg['blob'];
    //     var file_name = arg['file_name'];
    //
    //
    //     var file = serverSerData.basePath + "/dynamicinfo/coverimg/" + file_name;
    //
    //     fs.writefile(file,BLOB,function (err) {
    //         console.log(err);
    //         res.send(file);
    //     });
    // }
}
module.exports = CompanyResourceLocalize;