/**
 * Created by Administrator on 2018/5/15.
 */


/**
 *服务器静态文件路径信息配置
 */

var projectPath, port, basePath, loadFilePath;
//测试环境和生产环境配置
if (global.env == 'dev') {
    basePath = "E:\\work_program\\law_wx_lf\\front\\lawWxFront"; //项目根文件目录
    port = 80; //本地port
} else if(global.env == 'lxctest') {
    basePath = "/root/wxpublic/front"; //远程项目根文件目录
    port = 80;
} else if(global.env == 'bin') {
    basePath = "G:\\SoftwareOutSourcing\\qidailaw\\front\\lawWxFront"; //远程项目根文件目录
    port = 80;
}else {
    basePath = "/root/lawWxPublic/front/output/"; //远程项目根文件目录
    port = 80;
}
projectPath = basePath + "/project"; //公共目录文件
loadFilePath = basePath + "/dynamicinfo/";

/**服务器http请求容量配置
 *
 */
var httpDataLimit = '25mb';

/**
 * 服务器定时任务schedule
 */
var schedule_time = "* / 5 * * * *";

/**
 * 服务器url配置
 */
var getAcessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";
var createWxMenuUrl = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s";
var getOauthTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code";
var getJsSignUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi";
var copyResourceUrl = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=%s&media_id=%s";
var uploadInfoUrl = "https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=%s";
var uploadImageUrl = "https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=%s";
var uploadMediaUrl = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=%s&type=image";
//var sendMassInfoUrl = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=%s";
var viewSendInfoUrl = "https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=%s";
var sendMassInfoUrl = "https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=%s";

var clearAPiQuatoUrl = "https://api.weixin.qq.com/cgi-bin/clear_quota?access_token=%s";
// var jsSdkSignUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi";

/**
 * 微信公众平台信息配置
 */
var wxAppInfo = {
    //微信公众测试号信息
    "appid":  "wxf52fc57535c3d13b",
    "secret": "47f0bc5a4e0678d7dcee33115a6de819",
    "token": "qant108",
    "code": "",
};

/**
 * 微信公众平台凭证
 */
var wxCertData = {
  "access_token":"",
  "timestamp":0,
  "oauth_token":"",
  "js_api_ticket":"",
  "js_timestamp":"",
};

/**
 * 上传图文信息
 * @type {{}}
 */
var uploadMediaData = '';

module.exports = {
    projectPath: projectPath,
    basePath: basePath,
    loadFilePath:loadFilePath,
    port: port,
    httpDataLimit: httpDataLimit,
    schedule_time: schedule_time,
    getAcessTokenUrl: getAcessTokenUrl,
    createWxMenuUrl: createWxMenuUrl,
    getOauthTokenUrl: getOauthTokenUrl,
    getJsSignUrl:getJsSignUrl,
    copyResourceUrl:copyResourceUrl,
    uploadInfoUrl:uploadInfoUrl,
    uploadMediaUrl:uploadMediaUrl,
    sendMassInfoUrl:sendMassInfoUrl,
    clearAPiQuatoUrl:clearAPiQuatoUrl,
    uploadImageUrl:uploadImageUrl,
    viewSendInfoUrl:viewSendInfoUrl,
    wxAppInfo: wxAppInfo,
    wxCertData: wxCertData,
    uploadMediaData:uploadMediaData,
};