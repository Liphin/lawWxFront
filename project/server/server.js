﻿/**
 * Created by Administrator on 2017/2/21.
 */
//获取目标environment，若无则默认赋值global变量为dev
global.env = process.env.TARGET_ENV;
if (env == undefined || env == '' || env == null) {
    global.env = 'dev';
}
var fs = require('fs');
var http = require('http');
var request = require('request');
var multer = require('multer');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var device = require('express-device');
var ServerSer = require('./serverSer');
var WxApiGerSer = require('./wxApiServer/wxApiGerSer');
var WxGetOauth = require('./wxApiServer/wxGetOauth');
var WxGetJsSign = require('./wxApiServer/wxGetJsSign');
var WxMassInfo = require('./wxApiServer/wxMassInfo');
var WxApiTest = require('./wxApiServer/wxApiTest');
var ResourceLocalize = require('./commonServer/commonSer');
var CompanyResourceLocalize = require('./wxApiServer/wxLoadResoures');
var serverSerData = require('./serverSerData');

/*设置全局变量*/
var app = express();
// var serverSerData = new ServerSerData();
var serverSer = new ServerSer();
var wxApiGerSer = new WxApiGerSer();
var wxGetOauth = new WxGetOauth();
var resourceLocalize = new ResourceLocalize();
var wxGetJsSign = new WxGetJsSign();
var wxMassInfo = new WxMassInfo();
var wxApiTest = new WxApiTest();
var companyResourceLocalize = new CompanyResourceLocalize();
// var upload = multer({dest: 'pic/'});
var PORT = serverSerData.port;

//设置http请求接收数据最大限额
app.use(device.capture());
app.use(bodyParser.json({limit: serverSerData.httpDataLimit}));
app.use(bodyParser.urlencoded({limit: serverSerData.httpDataLimit, extended: true}));
/**
 * 设置跨域通信
 * @see serHelper.setCrossOrigin
 */
app.use(serverSer.setCrossOrigin);

/**
 * 服务器初始化
 */
serverSer.dataInit();

// app.get('/',function (req,res) {
//     console.log("8888");
// });

//服务器token验证
app.get('/wxpublic',function(req,res) {
    wxApiGerSer.getTokenSign(req,res,function (echostr) {
        console.log("验证成功");
        res.send(echostr);
    });
});

//微信事务响应与交互
app.post('/wxpublic',function(req,res) {
    //wxApiGerSer.getWxAPiSer(req,res);
    wxApiGerSer.getWxAPiSer(req,res);
});

//进行oauth2.0授权获取用户的基本信息
app.get('/getWxOauthToken',function(req,res) {
    wxGetOauth.getOauthToken(req,res);
});

//进行js应用签名
app.get('/getJsSign',function(req,res) {
    wxGetJsSign.getJsSign(req,res);
});

app.get("/test", function (req, res) {
    res.send('hello')
});
/**
 * 发送动态信息数据的方法
 */
app.get('/uploadCrossOriginImg', function (req, res) {
    resourceLocalize.copyCrossResourceToLocal(req, res);
});

/**
 * 拷贝微信临时素材到本地
 */
app.post('/copyTempResourceToLocal',function (req, res) {
    companyResourceLocalize.copyResource(req, res)
});

/**
 * 清除公众号的调用上限，每月只能10次
 */
// app.get('/clearQuato',function (req, res) {
//     resourceLocalize.clearQuato(req, res);
// });


/**
 * 上传微信临时图文消息
 */
// var upload2 = multer();
// var multipartMiddleware = multipart();
app.post('/wxMassUploadInfo',function (req, res) {
    wxMassInfo.wxMassUploadInfo(req, res);
});

/**
 * 测试上传微信图文消息
 */
app.get('/wxMassUploadInfoTest',function (req, res) {
    wxApiTest.wxMassUploadInfoTest(req,res);
});

/**
 * 群发微信图文消息
 */

app.post('/wxMassSendInfo',function (req, res) {
    wxMassInfo.wxMassSendInfo(req, res);
});

/**
 * 预览群发微信图文消息
 */

app.post('/viewSendInfoUrl',function (req, res) {
    wxMassInfo.viewSendInfoUrl(req, res);
});

/**
 * 测试群发微信图文消息
 */
app.get('/wxMassSendInfoTest',function (req, res) {
    wxApiTest.wxMassSendInfoTest(req,res);
});

/**
 * 上传缩略图
 */
app.post('/uploadCoverImage',function (req, res) {
    console.log(req.body);
    wxMassInfo.wxUploadCoverImg(req, res);
});

/**
 * 上传图片URL
 */
app.post('/uploadImageUrl',function (req, res) {
    wxMassInfo.wxUploadImgUrl(req, res);
});


/**
 * 用户上传资源文件数据
 */
var storage = multer.diskStorage({
    //指定保存的文件夹
    destination: function (req, file, cb) {
        cb(null, serverSerData.loadFilePath+req['body']['fileUrl'])
    },
    //指定保存的文件名
    filename: function (req, file, cb) {
        cb(null, req['body']['fileName'])
    }
});

/**
 * 拷贝保存前端传送BLOB数据到本地
 */
var upload = multer({storage: storage});
app.post('/saveCoverImage',upload.single('fileBlob'),function (req, res) {
    res.send("OK");

});


var upload2 = multer();
app.post('/saveWxHtml',upload2.none(),function (req, res) {
    var filePath = serverSerData.loadFilePath+req['body']['fileUrl']+"/"+req['body']['fileName'];
    var wstream = fs.createWriteStream(filePath);
    var data = decodeURIComponent(req['body']['fileData']);
    wstream.write(data);
    wstream.on('error', function(err) {
        console.log(err);
        wstream.end();
        res.send(err);
    });
    res.send("OK");
});



//资源文件获取
app.use('/dynamicinfo',express.static(serverSerData.basePath + '/dynamicinfo'));
// app.use('/favicon.ico', express.static(serverSerData.publicPath + '/favicon.ico'));
app.use('/assets', express.static(serverSerData.projectPath + '/assets'));
app.use('/desktop', express.static(serverSerData.projectPath + '/public/src/officialPages/desktop'));
app.use("/", express.static(serverSerData.projectPath + '/public'));
app.listen(PORT);
console.log("Server is running at port: " + PORT + " , and at environment: " + global.env);

