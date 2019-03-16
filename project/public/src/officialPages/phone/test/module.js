

var app = angular.module('myApp',[]);

//重置HTML的url即，可以无需hash情况使用$location
app.config(function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        rewriteLinks: false,
        requireBase: false
    });
});
