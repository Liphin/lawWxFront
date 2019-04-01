

var app = angular.module('myApp',[]);
//定义路由路径
app.config(function ($locationProvider) {
    //重置HTML的url即，可以无需hash情况使用$location
    $locationProvider.html5Mode({
        enabled: true,
        rewriteLinks: false,
        requireBase: false
    });
});