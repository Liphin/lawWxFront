/**
 * Created by Administrator on 2018/5/15.
 */
var schedule = require('node-schedule');
var GetAccessTokenSer = require('./tokenServer/getAccessTokenSer');
var WxApiGerSer = require('./wxApiServer/wxApiGerSer');
var getAccessTokenSer = new GetAccessTokenSer();
var wxApiGerSer = new WxApiGerSer();
var serverSerData = require('./serverSerData');

function ServerSer() {

    /**
     * 设置异源访问策略
     * @param req
     * @param res
     * @param next
     */
    this.setCrossOrigin=function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    };

    /**
     * 服务器初始化
     */
    this.dataInit = function () {
        getAccessTokenSer.getAccessToken(function () {
            console.log("创建菜单");
            wxApiGerSer.createWxMenu(function () {
                console.log("完成创建菜单");
            });
        });

        //配置每10分钟的定时任务
        schedule.scheduleJob(serverSerData.schedule_time,function () {
            console.log("检查access_token是否过时");
            getAccessTokenSer.getAccessToken(function () {
                console.log(serverSerData.wxCertData);
            });
        });

    }


    /**
     * 公用实用方法，统一判空检测
     * @param data
     * @returns {boolean}
     */
    this.checkDataNotEmpty = function (data) {
        var status = false;
        if (data != null && data != undefined) {
            //根据变量的不同类型进行判空处理
            switch (Object.prototype.toString.call(data)) {
                /*String类型数据*/
                case '[object String]': {
                    if (data.trim() != '') {
                        status = true;
                    }
                    break;
                }
                /*Array类型*/
                case '[object Array]': {
                    if (data.length > 0) {
                        status = true;
                    }
                    break;
                }
                /*Object类型*/
                case '[object Object]': {
                    if (Object.keys(data).length > 0) {
                        status = true;
                    }
                    break;
                }
                /*其他类型状态默认设置为true，分别为Number和Boolean类型*/
                default: {
                    status = true;
                    break;
                }
            }
        }
        return status;
    };

    /**
     * 获取时间戳函数
     * @returns {string}
     */
    this.getTimestamp = function () {
        return parseInt(new Date().getTime()/1000).toString();
    };

    /**
     * 获取字符串
     * @returns {string}
     */
    this.getRandomStr = function () {
        return Math.random().toString(36).substring(7);
    }
}

module.exports = ServerSer;