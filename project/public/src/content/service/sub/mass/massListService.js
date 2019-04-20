
var contentModule = angular.module("Angular.content");
contentModule.factory('MassListSer',function ($http, $window, $timeout,ContentDataSer, $location, OverallGeneralSer,
                                              OverallDataSer, ContentGeneralSer) {

    //定义文章服务业务逻辑
    /**List页面****************************************************************************************************/

    /**
     * 获取指定起始范围及条目数目的新闻信息
     */
    var getRangeMassInfo = function () {
        //打开数据loading
        OverallDataSer.overallData['loadingData']=true;

        //发送请求获取指定范围和数目的新闻数据
        var fd = new FormData();
        if (ContentDataSer.massData['list'] <= 0) {
            fd.append('create_time', ContentDataSer.overallData['listShow']['maxFromCreateTime']);

        } else {
            var lastIndex = ContentDataSer.massData['list'][ContentDataSer.massData['list'].length - 1]['create_time'];
            fd.append('create_time', lastIndex);
        }
        //http请求数据
        $http.post(ContentDataSer.getRangeMassToBg, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] = 200) {
                var totalNum = response['data']['totalNum'];
                var massData = response['data']['massList'];

                //设置全部新闻条目数目
                ContentDataSer.overallData['listShow']['totalNum'] = totalNum;
                //设置所有页面数目
                ContentDataSer.overallData['listShow']['totalPage'] =
                    Math.ceil(parseFloat(totalNum) / ContentDataSer.overallData['listShow']['screenNum']);

                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var newListSortedData = massData.sort(ContentGeneralSer.sortMassNum);

                //循环填充新闻list数据
                for (var i in newListSortedData) {
                   //设置消息状态信息
                    var statusCd = newListSortedData[i]['status_cd'];
                    newListSortedData[i]['status_cd_name'] = ContentDataSer.overallData['listShow']['massType'][statusCd];
                    //装载新闻list数据
                    ContentDataSer.massData['list'].push(newListSortedData[i]);
                }
                console.log(ContentDataSer.massData['list'])
                //装填分页展示信息
                ContentGeneralSer.loadPageInfo();
                //设置是否允许获取上一批次和下一批次数据
                ContentGeneralSer.setPreNextLoadBatchData();
                //获取新数据后页面滚动到列表顶部
                angular.element("60InterestList").scrollTop = 0;
                //$("60newsList").animate({ scrollTop: 0 }, "fast");

            }

        }).error(function (error) {
            //提示系统出错
            OverallGeneralSer.alertHttpRequestError("getRangeMassInfo", 500, "system error");

        }).finally(function () {
            //关闭数据loading
            OverallDataSer.overallData['loadingData']=false;
        })
    };


    /**
     * 获取上一批次或下一批次新闻数据
     * @param changeBatch
     */
    var getBatchRangeMassInfo = function (changeBatch) {

        //对不允许获取下一批次或上一批次的数据时直接返回
        var paginationNum = ContentDataSer.overallData['listShow']['pagination']['num'];
        var lastPaginationNum = paginationNum[paginationNum.length - 1];
        var firstPaginationNum = paginationNum[0];

        //往后读取数据
        //如果选择获取下一批数据，且已是最后一页，则直接返回不处理
        if ((changeBatch == 1) && (ContentDataSer.overallData['listShow']['totalPage'] <= lastPaginationNum)) {
            return;
        }

        //往前读取数据
        //如果选择获取上一批数据，且已是第一页，则直接返回不处理
        if ((changeBatch == -1) && firstPaginationNum == 1) {
            return;
        }

        //设置页面开始下标号
        ContentDataSer.overallData['listShow']['pagination']['beginPageNum'] +=
            changeBatch * ContentDataSer.overallData['listShow']['maxShowPage'];
        //设置active装态的数据
        ContentGeneralSer.showTargetNumNewsList(0, ContentDataSer.overallData['listShow']['pagination']['beginPageNum']);

        //两个判断条件
        // A： 如果之前获取过的分页数据最大页数大于当前页面最大页数则说明下一批数据之前已经获取过，
        // B： 进行下一批数据获取操作
        // 此时改变数据显示指针即可。
        // 否则获取新数据
        if (ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] <= lastPaginationNum && changeBatch == 1) {
            getRangeMassInfo();

        } else {
            //装填分页展示信息
            ContentGeneralSer.loadPageInfo();
            //设置是否允许获取上一批次和下一批次数据
            ContentGeneralSer.setPreNextLoadBatchData();
        }
    };


    /**以下是针对每条文章的Opt操作***********************************************************************************************/

    /**
     * 创建新的新闻数据
     */
    var createNewMass = function () {
        //设置创建新闻数据开关
        ContentDataSer.massData['editData']['optType'] = 1; //创建新闻1，更新新闻2
        //重置创建新闻数据
        for (var i in ContentDataSer.massData['editData']['data']) {
            ContentDataSer.massData['editData']['data'][i] = '';
        }
        //默认设置id参数为0
        ContentDataSer.massData['editData']['data']['id'] = 0;
        //默认发布状态
        ContentDataSer.massData['editData']['data']['status_cd'] = 0;
        //设置创建时间
        //ContentDataSer.massData['editData']['data']['create_time'] = new Date().getTime();
        //资源时间戳
        ContentDataSer.massData['editData']['data']['timestamp'] =
            OverallGeneralSer.getTimeStamp() + '_' + OverallDataSer.overallData['userInfo']['wx_user_id'];
        //进行新闻编辑页面
        ContentDataSer.massListData['editData']['editIndex'] = 1; //创建新闻1，更新新闻2
        $location.search({'subPage': 'massEdit'});
    };

    /**
     * 新闻操作
     * @param optType
     * @param interestId
     * @param indexOffset
     */
    var massOpt = function (optType, massId, indexOffset) {
        var index = indexOffset + ContentDataSer.overallData['listShow']['pagination']['beginListIndex'];
        console.log(index, ContentDataSer.massData['list'][index]);
        //关闭编辑操作菜单
        ContentDataSer.massData['list'][index]['menu'] = false;
        //根据不同操作类型相应操作
        switch (optType) {
            case 'view': {
                viewMass(index);
                break;
            }
            case 'send': {
                massSend(index);
                break;
            }
            case 'delete': {
                deleteMass(massId, index);
                break;
            }
            default: {
                break;
            }
        }
    };

    /**
     * 群发消息
     */
    var massSend = function (index) {
        var massInfo = ContentDataSer.massData['list'][index];

        var formData = {
            "filter":{
                "is_to_all":true,
            },
            "mpnews":{
                "media_id":massInfo['media_id'],
            },
            "msgtype":"mpnews",
            "send_ignore_reprint":0
        };

        var url = ContentDataSer.wxMassSendInfo;
        var fd = new FormData();
        for (var i in formData) {
            fd.append(i, formData[i]);
        }
        $http.post(url,fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            if(response['errcode']==0) {
                updateMassResult(response,massInfo['id']);
            }
            else {
                alert("massSend error: "+response['errmsg']);
            }
        }).error(function (err) {
            alert("massSend error: "+JSON.stringify(err));
        });
        
    };

    var updateMassResult = function (result,id) {
        var url = ContentDataSer.updateMassResult;
        var formData = {
            msg_id:result['msg_id'],
            msg_data_id:result['msg_data_id'],
            id:id
        };
        OverallGeneralSer.httpPostData(url,formData,function (result) {
            console.log("成功更新发送结果");
            //重新清空列表并获取数据操作
            ContentDataSer.massData['list'].length = 0;
            ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] = 0;
            getRangeMassInfo();
        });
    };

    /**
     * 预览新闻数据
     */
    var viewMass = function (index) {
        //直接预览项目文件
    };

    /**
     * 删除指定新闻数据
     */
    var deleteMass = function (massId, index) {
        var massInfo = ContentDataSer.massData['list'][index];

        if (massInfo['status_cd']!=0) {
            alert("已群发成功的记录不能删除");
            return;
        }

        var fd = new FormData();
        fd.append('id', massId);
        fd.append('media_id', massInfo['media_id']);

        //提交表单数据
        $http.post(ContentDataSer.deleteMass, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                ContentDataSer.massData['list'].length = 0;
                ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] = 0;
                getRangeMassInfo();

            } else {
                OverallGeneralSer.alertHttpRequestError("deleteMass", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("deleteMass", 600, err)
        });
    };



    return {
        //页面展示相关函数
        getRangeMassInfo: getRangeMassInfo,
        getBatchRangeMassInfo: getBatchRangeMassInfo,
        createNewMass: createNewMass,
        massOpt: massOpt,
    }
});
