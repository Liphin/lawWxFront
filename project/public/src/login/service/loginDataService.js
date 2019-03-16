/**
 * Created by Administrator on 2018/2/28.
 */
var loginModule = angular.module('Angular.login');

loginModule.factory('LoginDataSer', function (OverallDataSer) {

    //后台请求api
    var managerLogin = OverallDataSer.urlData['backEndHttp']['managerLogin'];

    //登录信息
    var loginInfo = {
        'account': '',
        'password': '',
    };

    return {
        loginInfo: loginInfo,

        //后台请求api
        managerLogin:managerLogin,
    }
});
