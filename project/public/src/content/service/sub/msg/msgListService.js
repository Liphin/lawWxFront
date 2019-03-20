/**
 * create by lxc on 2019年
 */


var contentModule = angular.module('Angular.content');

contentModule.factory('MsgListSer',function ($http, $window, $timeout,ContentDataSer, $location, OverallGeneralSer,
                                              OverallDataSer, ContentGeneralSer) {

    //定义文章服务业务逻辑
    /**List页面****************************************************************************************************/

    /**
     * 获取指定起始范围及条目数目的留言信息
     */
    var getRangeMsgInfo = function () {
        //打开数据loading
        OverallDataSer.overallData['loadingData']=true;

        //发送请求获取指定范围和数目的新闻数据
        var fd = new FormData();
        if (ContentDataSer.msgData['list'] <= 0) {
            fd.append('create_time', ContentDataSer.overallData['msgListShow']['maxFromCreateTime']);

        } else {
            var lastIndex = ContentDataSer.msgData['list'][ContentDataSer.msgData['list'].length - 1]['create_time'];
            fd.append('create_time', lastIndex);
        }
        //http请求数据
        $http.post(ContentDataSer.getRangeMsgListToBg, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] = 200) {
                var totalNum = response['data']['totalNum'];
                var msgListData = response['data']['msgListData'];

                //设置全部新闻条目数目
                ContentDataSer.overallData['msgListShow']['totalNum'] = totalNum;
                //设置所有页面数目
                ContentDataSer.overallData['msgListShow']['totalPage'] =
                    Math.ceil(parseFloat(totalNum) / ContentDataSer.overallData['msgListShow']['screenNum']);

                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var newListSortedData = msgListData.sort(ContentGeneralSer.sortStickNum);
                console.log(newListSortedData);

                //循环填充成员list数据
                for (var i in newListSortedData) {
                    //转换设置类型、状态、人群范围等数据
                    var peopleType = newListSortedData[i]['status_cd'];
                    //设置消息状态信息
                    var statusCd = newListSortedData[i]['status_cd'];
                    newListSortedData[i]['status_cd_name'] = ContentDataSer.overallData['msgListShow']['statusType'][statusCd];
                    //装载新闻list数据
                    ContentDataSer.msgData['list'].push(newListSortedData[i]);
                }
                console.log(ContentDataSer.msgData['list']);
                //装填分页展示信息
                ContentGeneralSer.loadPageInfo();
                //设置是否允许获取上一批次和下一批次数据
                ContentGeneralSer.setPreNextLoadBatchData();
                //获取新数据后页面滚动到列表顶部
                angular.element("60NewsList").scrollTop = 0;
                //$("60newsList").animate({ scrollTop: 0 }, "fast");

            }

        }).error(function (error) {
            //提示系统出错
            OverallGeneralSer.alertHttpRequestError("getRangeMsgInfo", 500, "system error");

        }).finally(function () {
            //关闭数据loading
            OverallDataSer.overallData['loadingData']=false;
        })
    };


    /**
     * 获取上一批次或下一批次成员数据
     * @param changeBatch
     */
    var getBatchRangeMsgInfo = function (changeBatch) {

        //对不允许获取下一批次或上一批次的数据时直接返回
        var paginationNum = ContentDataSer.overallData['msgListShow']['pagination']['num'];
        var lastPaginationNum = paginationNum[paginationNum.length - 1];
        var firstPaginationNum = paginationNum[0];

        //往后读取数据
        //如果选择获取下一批数据，且已是最后一页，则直接返回不处理
        if ((changeBatch == 1) && (ContentDataSer.overallData['msgListShow']['totalPage'] <= lastPaginationNum)) {
            return;
        }

        //往前读取数据
        //如果选择获取上一批数据，且已是第一页，则直接返回不处理
        if ((changeBatch == -1) && firstPaginationNum == 1) {
            return;
        }

        //设置页面开始下标号
        ContentDataSer.overallData['msgListShow']['pagination']['beginPageNum'] +=
            changeBatch * ContentDataSer.overallData['msgListShow']['maxShowPage'];
        //设置active装态的数据
        ContentGeneralSer.showTargetNumNewsList(0, ContentDataSer.overallData['msgListShow']['pagination']['beginPageNum']);

        //两个判断条件
        // A： 如果之前获取过的分页数据最大页数大于当前页面最大页数则说明下一批数据之前已经获取过，
        // B： 进行下一批数据获取操作
        // 此时改变数据显示指针即可。
        // 否则获取新数据
        if (ContentDataSer.overallData['msgListShow']['pagination']['loadedMaxPageNum'] <= lastPaginationNum && changeBatch == 1) {
            getRangeMsgInfo();

        } else {
            //装填分页展示信息
            ContentGeneralSer.loadPageInfo();
            //设置是否允许获取上一批次和下一批次数据
            ContentGeneralSer.setPreNextLoadBatchData();
        }
    };

    /**以下是针对每条文章的Opt操作***********************************************************************************************/

    /**
     * 批量置办特定留言数据
     */
    var setupBatchMsg = function () {
        //装载需要删除的成员列表数据
        var toSetupIdArrays = [];
        for (var i in  ContentDataSer.msgData['list']) {
            if (ContentDataSer.msgData['list'][i]['toSelect']) {
                toSetupIdArrays.push({
                    'id': ContentDataSer.msgData['list'][i]['id'],
                    'timestamp': ContentDataSer.msgData['list'][i]['timestamp'],
                    'status_cd': 1,
                })
            }
        }
        console.log(ContentDataSer.msgData['list']);
        console.log(toSetupIdArrays);

        var fd = new FormData();
        fd.append('setupList', JSON.stringify(toSetupIdArrays));
        //提交表单数据
        $http.post(ContentDataSer.setupBatchMsg, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                ContentDataSer.msgData['list'].length = 0;
                ContentDataSer.overallData['msgListShow']['pagination']['loadedMaxPageNum'] = 0;
                getRangeMsgInfo();

            } else {
                OverallGeneralSer.alertHttpRequestError("setupBatchMsg", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("setupBatchMsg", 600, err)
        });
    };

    /**
     * 批量删除特定成员数据
     */
    var deleteBatchMsg = function () {
        //装载需要删除的成员列表数据
        var toDeleteIdArrays = [];
        for (var i in  ContentDataSer.msgData['list']) {
            if (ContentDataSer.msgData['list'][i]['toSelect']) {
                toDeleteIdArrays.push({
                    'id': ContentDataSer.msgData['list'][i]['id'],
                    'timestamp': ContentDataSer.msgData['list'][i]['timestamp'],
                })
            }
        }

        var fd = new FormData();
        fd.append('deleteList', JSON.stringify(toDeleteIdArrays));
        //提交表单数据
        $http.post(ContentDataSer.deleteBatchMsg, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                ContentDataSer.msgData['list'].length = 0;
                ContentDataSer.overallData['msgListShow']['pagination']['loadedMaxPageNum'] = 0;
                getRangeMsgInfo();

            } else {
                OverallGeneralSer.alertHttpRequestError("deleteBatchMsg", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("deleteBatchMsg", 600, err)
        });
    };

    /**
     * 点击搜索留言数据
     */
    var searchMsg = function () {
        //如果搜索内容不为空则获取搜索内容，否则直接获取分页内容
        if (OverallGeneralSer.checkDataNotEmpty(ContentDataSer.overallData['msgListShow']['search'].trim()||ContentDataSer.overallData['msgListShow']['status_cd']>-1)) {
            ContentDataSer.overallData['msgListShow']['search_flag'] = 1;
            var url = ContentDataSer.searchMsgData;
            if (ContentDataSer.overallData['msgListShow']['status_cd']==99) {
                ContentDataSer.overallData['msgListShow']['status_cd']="0,1,2";
            }
            //如果是第一次搜素则清空当前数据集
            if (ContentDataSer.overallData['msgListShow']['search_first_flag'] == 0) {
                ContentDataSer.msgData['list'].length = 0;
            }
            if (ContentDataSer.msgData['list'] <= 0) {
                var sendData = {
                    'search': ContentDataSer.overallData['msgListShow']['search'].trim(),
                    'status_cd': ContentDataSer.overallData['msgListShow']['status_cd'],
                    'create_time':ContentDataSer.overallData['msgListShow']['maxFromCreateTime'],
                };

            } else {
                var lastIndex = ContentDataSer.msgData['list'][ContentDataSer.msgData['list'].length - 1]['create_time'];
                var sendData = {
                    'search': ContentDataSer.overallData['msgListShow']['search'].trim(),
                    'status_cd': ContentDataSer.overallData['msgListShow']['status_cd'],
                    'create_time':lastIndex,
                };
            }

            console.log(sendData);
            //获取搜索的内容
            OverallGeneralSer.httpPostData(url, sendData, function (response) {

                console.log(response)
                //执行过一次搜索，下一批再查询时不会清空msgListData列表
                ContentDataSer.overallData['msgListShow']['search_first_flag'] = 1;

                var totalNum = response['totalNum'];
                var msgListData = response['msgListData'];

                console.log(totalNum);
                //设置全部新闻条目数目
                ContentDataSer.overallData['msgListShow']['totalNum'] = totalNum;
                //设置所有页面数目
                ContentDataSer.overallData['msgListShow']['totalPage'] =
                    Math.ceil(parseFloat(totalNum) / ContentDataSer.overallData['msgListShow']['screenNum']);
                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var msgListSortedData = msgListData.sort(ContentGeneralSer.sortStickNum);
                //循环填充新闻list数据
                for (var i in msgListSortedData) {
                    //设置消息状态信息
                    var statusCd = msgListSortedData[i]['status_cd'];
                    msgListSortedData[i]['status_cd_name'] = ContentDataSer.overallData['msgListShow']['statusType'][statusCd];
                    msgListSortedData[i]['coverImage'] = ContentDataSer.getCoverImage + msgListSortedData[i]['timestamp']+".png";
                    //装载朋友圈list数据
                    ContentDataSer.msgData['list'].push(msgListSortedData[i]);
                }
                if (ContentDataSer.overallData['msgListShow']['status_cd']=="0,1,2") {
                    ContentDataSer.overallData['msgListShow']['status_cd']=99
                }
                //设置total_num为0，取消分页
                //ContentDataSer.overallData['listShow']['totalNum']=0;
                //装填分页展示信息
                ContentGeneralSer.loadPageInfo();
                //设置是否允许获取上一批次和下一批次数据
                ContentGeneralSer.setPreNextLoadBatchData();
                //获取新数据后页面滚动到列表顶部
                angular.element("60NewsList").scrollTop = 0;
            })

        } else {
            //否则清空朋友圈list，并重新获取朋友圈数据
            ContentDataSer.msgData['list'].length = 0;
            ContentDataSer.overallData['msgListShow']['pagination']['loadedMaxPageNum'] = 0;
            getRangeMsgInfo();
        }

    };

    /**
     * 留言操作
     * @param optType
     * @param msgId
     * @param indexOffset
     */
    var msgOpt = function (optType, msgId, indexOffset) {
        var index = indexOffset + ContentDataSer.overallData['msgListShow']['pagination']['beginListIndex'];
        console.log(index, ContentDataSer.msgData['list'][index]);
        //关闭编辑操作菜单
        ContentDataSer.msgData['list'][index]['menu'] = false;
        //根据不同操作类型相应操作
        switch (optType) {
            case 'edit': {
                editMsg(index);
                break;
            }
            case 'delete': {
                deleteMsg(msgId, index);
                break;
            }
            case 'top': {
                topMsg(index);
                break;
            }
            case 'setup': {
                setupMsg(msgId, index);
                break;
            }
            default: {
                break;
            }
        }
    };

    /**
     * 进入编辑页面编辑留言数据
     * @param index
     */
    var editMsg = function (index) {
        //设置编辑index条目
        ContentDataSer.msgData['editData']['editIndex'] = index;
        //填充编辑的内容数据
        for (var i in ContentDataSer.msgData['list'][index]) {
            ContentDataSer.msgData['editData']['data'][i] = ContentDataSer.msgData['list'][index][i];
        }
        ContentDataSer.msgData['editData']['optType'] = 2; //2为编辑，1为创建

        ContentDataSer.navigation['msg']['msgEdit'] = true;
    };

    /**
     * 删除指定留言数据
     */
    var deleteMsg = function (msgId, index) {
        var fd = new FormData();
        fd.append('id', msgId);
        fd.append('timestamp', ContentDataSer.msgData['list'][index]['timestamp']);

        //提交表单数据
        $http.post(ContentDataSer.deleteMsg, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                ContentDataSer.msgData['list'].length = 0;
                ContentDataSer.overallData['msgListShow']['pagination']['loadedMaxPageNum'] = 0;
                getRangeMsgInfo();

            } else {
                OverallGeneralSer.alertHttpRequestError("deleteMsg", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("deleteMsg", 600, err)
        });
    };

    /**
     * 置办指定留言数据
     */
    var setupMsg = function (msgId, index) {
        var fd = new FormData();
        fd.append('id', msgId);
        fd.append('status_cd', 1);

        //提交表单数据
        $http.post(ContentDataSer.setupMsg, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                ContentDataSer.msgData['list'].length = 0;
                ContentDataSer.overallData['msgListShow']['pagination']['loadedMaxPageNum'] = 0;
                getRangeMsgInfo();

            } else {
                OverallGeneralSer.alertHttpRequestError("setupMsg", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("setupMsg", 600, err)
        });
    };


    /**
     * 留言置顶操作
     */
    var topMsg = function (index) {
        //1、发送http请求置顶该新闻操作
        var url = OverallDataSer.urlData['backEndHttp']['setMsgStickInfo'];
        var news = ContentDataSer.msgData['list'][index];
        var data = {
            'stick_cd': (news['stick_cd'] == 0 ? 1 : 0), //如果之前已经置顶了则设置为不置顶，否则设置置顶
            'stick_time': OverallGeneralSer.getTimeStamp(), //设置新的此时时间戳数据
            'timestamp': news['timestamp'], //用于标识该news
        };
        OverallGeneralSer.httpPostData(url, data, function (response) {
            //重新清空列表并获取数据操作
            ContentDataSer.msgData['list'].length = 0;
            ContentDataSer.overallData['msgListShow']['pagination']['loadedMaxPageNum'] = 0;
            getRangeMsgInfo();
        });
    };



    return  {
        getRangeMsgInfo:getRangeMsgInfo,
        getBatchRangeMsgInfo:getBatchRangeMsgInfo,
        deleteBatchMsg:deleteBatchMsg,
        setupBatchMsg:setupBatchMsg,
        searchMsg:searchMsg,
        msgOpt:msgOpt,
    }

});