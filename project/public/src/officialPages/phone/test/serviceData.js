
var app = angular.module('myApp');

app.factory('MyData',function () {
    var overallData = {
        coverImageFlag: false,
        url:'',
        wxConfigData:{
            appid:'',
            secret: '',
        },
        loadData:false,
        loadDataText:'',
        timestamp:'',
        localIds:'',
        images:{
          'url':'',
          'name':'',
          'coverUrl':'',
        },
        imgBase:'',
    };
    var backHttpUrl= 'http://gntqant.com:8085/';
    var frontHttpUrl= 'http://gntqant.com:80/';
    var getJsSign = frontHttpUrl+'getJsSign';
    var copyTempResourceToLocal = frontHttpUrl + 'copyTempResourceToLocal';
    var resourceUrl = frontHttpUrl + "dynamicinfo/resource/";
    var coverImgUrl = frontHttpUrl + "dynamicinfo/coverimg/";
    var saveCoverImage = frontHttpUrl + "saveCoverImage";

    return {
        overallData:overallData,
        getJsSign:getJsSign,
        copyTempResourceToLocal:copyTempResourceToLocal,
        resourceUrl:resourceUrl,
        coverImgUrl:coverImgUrl,
        saveCoverImage:saveCoverImage,
    };
});