/**
 * Created by Administrator on 2018/8/20.
 */
var overallModule = angular.module('Angular');

overallModule.factory('OverallGeneralSer', function (OverallDataSer, $http,$timeout, $rootScope, $cookies, $location) {


    /**
     * 设置cookie三小时的生存时间
     * @returns {Date}
     */
    var getNewCookiesExpireDate = function () {
        var expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 3, expireDate.getMinutes(), expireDate.getSeconds(), expireDate.getMilliseconds());
        return expireDate;
    };

    /**
     * 对数据进行判空处理
     * @param data
     */
    var checkDataNotEmpty = function (data) {
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
     * 对每个sql key word进行监测是否在content中出现，
     * 若出现则返回false验证，否则返回true通过
     * @param content
     */
    var sqlInjectFilter = function (content) {
        //循环每个sql key word进行监测
        for (var i in OverallDataSer.sqlVerify) {
            if (String(content).indexOf(OverallDataSer.sqlVerify[i]) >= 0) {
                return false;
            }
        }
        return true;
    };


    /**
     * 返回当前时间的timestamp
     * 若有前缀则添加前缀，否则直接返回时间戳数据
     */
    var getTimeStamp = function (prefix) {
        if (checkDataNotEmpty(prefix)) {
            return prefix + '' + (new Date()).valueOf();

        } else {
            return (new Date()).valueOf();
        }
    };


    /**
     * 设置需要添加完成动画时添加此句
     */
    var setSubmitAnimateSuccess = function (successWord) {
        $rootScope['saveAnimate'] = true;
        if (OverallGeneralSer.checkDataNotEmpty(successWord)) {
            $rootScope['successWord'] = successWord;
        } else {
            $rootScope['successWord'] = "Save Successfully";
        }
        /*设置timeout时间为2秒，2秒后该$rootScope['saveAnimate']变为false，下次可通过再次变为true继续出现动画*/
        $timeout(function () {
            $rootScope['saveAnimate'] = false;
        }, 1700);
    };


    /**
     * http 请求错误返回的处理
     * @param errFunction
     * @param errCode
     * @param err
     */
    var alertHttpRequestError = function (errFunction, errCode, err) {
        //请求出错打印错误消息和弹出alert视窗提醒客户
        console.error(errFunction, errCode, err);
        alert("Sorry, service error please try again later.\n很抱歉，服务异常，请稍后重试");
    };

    /**
     * http get获取资源数据
     */
    var httpGetFiles = function (url, callback) {
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            if (response['status'] == 200) {
                //返回正确操作后执行回调函数
                callback(response['data'])

            } else {
                alertHttpRequestError("httpGetFiles", response['exception_code'], response['exception']);
            }
        }, function errorCallback(err) {
            alertHttpRequestError("httpGetFiles", 500, err);
        });
    };

    /**
     * http post获取资源数据
     */
    var httpPostData = function (url, obj, callback) {
        var fd = new FormData();
        //动态装载数据
        for (var i in obj) {
            fd.append(i, obj[i]);
        }
        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //返回正确操作后执行回调函数
                callback(response['data']);

            } else {
                alertHttpRequestError("httpPostData", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            alertHttpRequestError("httpPostData", 600, err)
        });
    };

    /**
     * 获取动态信息的数据
     */
    var getDynamicInfoNews = function (timestamp, type) {
        var httpFileName = "";
        //根据不同类型返回相应http获取数据文件地址
        switch (type) {
            case 'coverimg': {
                httpFileName = OverallDataSer.baseUrlData['frontEndHttp'] + "dynamicinfo/coverimg/" + timestamp + ".png?param=" + getTimeStamp();
                break;
            }
            case 'html': {
                httpFileName = OverallDataSer.baseUrlData['frontEndHttp'] + "dynamicinfo/html/" + timestamp + "-index.html?param=" + getTimeStamp();
            }
        }
        return httpFileName;
    };

    /**
     * 模态框弹出及隐藏，展示提示信息数据
     * @param modalType 'lg'/'sm'，分别为显示大或小的模态框
     * @param showItem 模态框展示条目
     */
    var modalInfoShow = function (modalType, showItem) {
        //遍历每个模态框使其状态为隐藏
        for (var type in OverallDataSer.modalSetting) {
            for (var info in OverallDataSer.modalSetting[type]) {
                if (OverallDataSer.modalSetting[type][info]) {
                    OverallDataSer.modalSetting[type][info] = false;
                }
            }
        }
        OverallDataSer.modalSetting[modalType][showItem] = true; //单独设置展示某条模态框
        //根据不同模态框类型展示不同大小模态框面板
        if (modalType == 'lg') {
            $('#modal_info_lg').modal({keyboard: true});
            $('.modal-backdrop.in').css('z-index', OverallDataSer.zIndexHelper['info_background']);

        } else if (modalType == 'sm') {
            $('#modal_info_sm').modal({keyboard: true});
            $('.modal-backdrop.in').css('z-index', OverallDataSer.zIndexHelper['modelInfo']);
        }
        console.log(OverallDataSer.modalSetting)
    };

    /**
     * 返回指定时间戳的日期点
     * @returns {string}
     */
    var getTargetDateTime = function (timestamp) {
        // var replaceTime = createTime.replace(/\-/g, "/");
        // var targetTime = new Date(replaceTime);
        //
        // return targetTime.getFullYear() + "-" + (targetTime.getMonth() + 1) + "-" + targetTime.getDate();
        var date = new Date(timestamp);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    };


    return {
        httpGetFiles: httpGetFiles,
        httpPostData: httpPostData,
        getDynamicInfoNews: getDynamicInfoNews,
        getTimeStamp: getTimeStamp,
        sqlInjectFilter: sqlInjectFilter,
        modalInfoShow: modalInfoShow,
        checkDataNotEmpty: checkDataNotEmpty,
        getTargetDateTime: getTargetDateTime,
        alertHttpRequestError: alertHttpRequestError,
        setSubmitAnimateSuccess:setSubmitAnimateSuccess,
        getNewCookiesExpireDate:getNewCookiesExpireDate,
    }
});
