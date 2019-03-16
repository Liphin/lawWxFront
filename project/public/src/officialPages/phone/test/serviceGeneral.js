var app = angular.module('myApp');

app.factory('MyGeneralSer',function ($window, $document, $http, MyData) {
    /**
     * 创建位移UUID
     * @returns {string}
     */
    var generateUUID = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    /**
     * http的post方式获取前端数据
     * @param path
     * @param data
     * @param callback
     */
    var httpPostFrontServer = function (path, data, callback) {
        $http({
            method: 'POST',
            url: path,
            data: ($.param(data)),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (response) {
            callback(response);

        }).error(function (err) {
            alert("服务器出错，请稍后重试/")
        });
    };

    /**
     * 把image的data数据转化为blob数据
     * @param dataURI
     * @returns {Blob}
     */
    var dataURItoBlob = function(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = decodeURI(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type: mimeString});

    };

    /***
     * 把blob数据传到后台保存
     */
    var saveCoverImage = function (obj,callback) {
        var fd = new FormData();
        var url = MyData.saveCoverImage;
        for (var i in obj) {
            fd.append(i, obj[i]);
        }
        $http.post(url,fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            callback(response);
        }).error(function (error) {
            alert("saveCoverImage error: "+JSON.stringify(error));
        })

    };


    return {
        generateUUID:generateUUID,
        httpPostFrontServer:httpPostFrontServer,
        dataURItoBlob:dataURItoBlob,
        saveCoverImage:saveCoverImage,
    }

});