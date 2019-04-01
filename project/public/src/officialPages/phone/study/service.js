/**
 * create by lxc on 2019年03月20日
 */

var app = angular.module('myApp');
app.factory('MySer',function ($window, $document, $http, MyData, $location, MyGeneralSer) {

    /**
     * 监测网页向下滚动滑动触发的操作
     */
    // angular.element($window).on("scroll", function (e) {
    //     if ($window.pageYOffset + $window.innerHeight + 20 >= $document.height()) {
    //         //若正在加载数据，则需等待加载完成后再进行获取数据
    //         if (!MyData.overallData['loadData']) {
    //             getNewsRangeData();
    //         }
    //     }
    // });

    var initData = function () {
        getNewsRangeData();

    };

    /**
     * 获取指定范围新闻
     */
    var getNewsRangeData = function () {
        //标识正在加载数据
        MyData.overallData['loadData'] = true;
        //装载表单数据
        var fd = new FormData();
        fd.append('type',2);
        fd.append('create_time', MyData.maxNum);
        //设置从某id字段开始查找news数据
        // if (MyData.newsList.length <= 0) {
        //     fd.append('create_time', MyData.maxNum);
        //
        // } else {
        //     var lastIndex = MyData.newsList[MyData.newsList.length - 1]['create_time'];
        //     fd.append('create_time', lastIndex);
        // }

        //http请求数据
        $http.post(MyData.getNewsListToPh, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {

                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var newListSortedData = response['data'].sort(sortStickNum);

                //正常返回数据，则进行填充操作
                for (var i in newListSortedData) {
                    var subType = newListSortedData[i]['subtype'];
                    //展示数据转换
                    newListSortedData[i]['url'] = MyData.coverImgBaseUrl + newListSortedData[i]['timestamp'] + ".png";
                    newListSortedData[i]['time'] = MyGeneralSer.generateShowTime(newListSortedData[i]['create_time']);
                    //展示数据填充
                    MyData.newsList.push(newListSortedData[i]);
                    MyData.carouselList[subType].push(newListSortedData[i]);

                }
                console.log(MyData.carouselList);

                //赋值轮播组件
                for (var j=0;j<MyData.newsList.length;j++) {
                    switch (j) {
                        case 0:
                            MyData.carouselData['carousel_1']['url']=MyData.newsList[0]['url'];
                            MyData.carouselData['carousel_1']['title']=MyData.newsList[0]['title'];
                            MyData.carouselData['carousel_1']['timestamp']=MyData.newsList[0]['timestamp'];
                            MyData.carouselData['carousel_1']['flag_1']=true;
                            break;
                        case 1:
                            MyData.carouselData['carousel_2']['url']=MyData.newsList[1]['url'];
                            MyData.carouselData['carousel_2']['title']=MyData.newsList[1]['title'];
                            MyData.carouselData['carousel_2']['timestamp']=MyData.newsList[1]['timestamp'];
                            MyData.carouselData['carousel_2']['flag_2']=true;
                            break;
                        case 2:
                            MyData.carouselData['carousel_3']['url']=MyData.newsList[2]['url'];
                            MyData.carouselData['carousel_3']['title']=MyData.newsList[2]['title'];
                            MyData.carouselData['carousel_3']['timestamp']=MyData.newsList[2]['timestamp'];
                            MyData.carouselData['carousel_3']['flag_3']=true;
                            break;
                        default:
                            break;
                    }
                }
                console.log(MyData.carouselData);

            } else {
                alert("尊敬的客户，服务器异常，请稍后重试..")
            }
        }).error(function (err) {
            alert("尊敬的客户，服务器异常，请稍后重试...")

        }).finally(function () {
            //标识加载数据完成
            MyData.overallData['loadData'] = false;
        })
    }

    /**
     * 重置数据顺序：
     *  1、根据置顶标签排在前面，
     *  2、置顶的数据中根据置顶时间戳进行排序
     */
    var sortStickNum = function (a, b) {
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

    var searchNews = function () {
        var url = MyData.searchNews;
        var sendData = {
            'type':2,
            'search': MyData.overallData['search'], //搜索内容
        };
        MyGeneralSer.httpPostData(url, sendData, function (data) {
            MyData.overallData['searchFlag'] = true;
            //清空之前新闻数据
            MyData.newsList.length = 0;

            //对返回的新闻数据进行排序
            var newListSortedData = data.sort(sortStickNum);

            //正常返回数据，则进行填充操作
            for (var i in newListSortedData) {
                //展示数据转换
                newListSortedData[i]['url'] = MyData.coverImgBaseUrl + newListSortedData[i]['timestamp'] + ".png";
                newListSortedData[i]['time'] = MyGeneralSer.generateShowTime(newListSortedData[i]['create_time']);
                //展示数据填充
                MyData.newsList.push(newListSortedData[i]);
            }
        })
    };


    return {
        initData:initData,
        searchNews:searchNews,
    }
    
});