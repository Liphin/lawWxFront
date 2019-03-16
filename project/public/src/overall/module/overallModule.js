/**
 * Created by Administrator on 2018/2/28.
 */
var overallModule = angular.module('Angular',
    [
        'ngRoute',
        'ngAnimate',
        'ngCookies',
        'Angular.login', //登录模块
        'Angular.content', //登录进入后文章与信息模块
    ]);
