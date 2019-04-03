
var app = angular.module('myApp');

app.factory('MySer',function ($window, $document, $http, MyData, $location, MyGeneralSer) {

    var initData = function () {
        getTeamListToPh();
    };

    var getTeamListToPh = function () {
        MyData.overallData['loadData'] = false;
        var fd = new FormData();
        fd.append('status_cd',1);
        fd.append('create_time',MyData.maxNum);

        $http.post(MyData.getTeamListToPh,fd , {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            if (response['status_code']==200) {

                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var teamListSortedData = response['data'].sort(sortStickNum);

                for (var i in teamListSortedData) {
                    teamListSortedData[i]['url']= MyData.coverImgBaseUrl + teamListSortedData[i]['timestamp'] + ".png";
                    var imgURlArr = teamListSortedData[i]['imgUrl'].split(":");

                    teamListSortedData[i]['imageData'] = {
                        url:teamListSortedData[i]['url'],
                        bg_position_top:imgURlArr[1],
                        bg_position_left:imgURlArr[2],
                        bg_size:imgURlArr[3],
                    };
                    MyData.teamList.push(teamListSortedData[i]);
                };

            }
        }).error(function (err) {
            alert("尊敬的客户，服务器异常，请稍后重试..")
        }).finally(function () {
            //标识加载数据完成
            MyData.overallData['loadData'] = false;
        })


    };

    /**
     * 重置数据顺序：
     *  1、根据置顶标签排在前面，
     *  2、置顶的数据中根据置顶时间戳进行排序
     */
    var sortStickNum = function (a,b) {
        if (a['stick_cd'] == 1 && b['stick_cd'] == 1) {
            //若两者均为置顶状态，则比较置顶时间
            return b['stick_time'] - a['stick_time']

        } else if (b['stick_cd'] != a['stick_cd']) {
            //若两者置顶数据不一样，则置顶作为比较条件
            return b['stick_cd'] - a['stick_cd'];

        } else {
            //无置顶要求数据根据创建时间进行排列
            return new Date(b['create_time']) - new Date(a['create_time']);
        }
    };

    return {
        initData:initData,
    }
});