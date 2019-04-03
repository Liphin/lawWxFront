/**
 * create by lxc on 2019年03月17日
 */

var contentModule = angular.module('Angular.content');

contentModule.factory('TeamListSer',function ($http,$window, $timeout,ContentDataSer, $location, OverallGeneralSer,
                                              OverallDataSer, ContentGeneralSer) {

    //定义文章服务业务逻辑
    /**List页面****************************************************************************************************/

    /**
     * 获取指定起始范围及条目数目的成员信息
     */
    var getRangeTeamInfo = function () {
        //打开数据loading
        OverallDataSer.overallData['loadingData']=true;

        //发送请求获取指定范围和数目的新闻数据
        var fd = new FormData();
        if (ContentDataSer.teamData['list'] <= 0) {
            fd.append('create_time', ContentDataSer.overallData['teamListShow']['maxFromCreateTime']);

        } else {
            var lastIndex = ContentDataSer.teamData['list'][ContentDataSer.teamData['list'].length - 1]['create_time'];
            fd.append('create_time', lastIndex);
        }
        //http请求数据
        $http.post(ContentDataSer.getRangeTeamListToBg, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] = 200) {
                var totalNum = response['data']['totalNum'];
                var teamListData = response['data']['teamListData'];

                //设置全部新闻条目数目
                ContentDataSer.overallData['teamListShow']['totalNum'] = totalNum;
                //设置所有页面数目
                ContentDataSer.overallData['teamListShow']['totalPage'] =
                    Math.ceil(parseFloat(totalNum) / ContentDataSer.overallData['teamListShow']['screenNum']);

                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var newListSortedData = teamListData.sort(ContentGeneralSer.sortStickNum);
                //console.log(newListSortedData);

                //循环填充成员list数据
                for (var i in newListSortedData) {
                    //转换设置类型、状态、人群范围等数据
                    //设置消息状态信息
                    var statusCd = newListSortedData[i]['status_cd'];
                    newListSortedData[i]['status_cd_name'] = ContentDataSer.overallData['teamListShow']['statusType'][statusCd];
                    newListSortedData[i]['coverImage'] = ContentDataSer.getCoverImage + newListSortedData[i]['timestamp']+".png";
                    var imgURlArr = newListSortedData[i]['imgUrl'].split(":");

                    newListSortedData[i]['imageData'] = {
                        url: newListSortedData[i]['coverImage'],
                        bg_position_left: Number(imgURlArr[2])/2,
                        bg_position_top: Number(imgURlArr[1])/2,
                        bg_size: Number(imgURlArr[3]),
                        reposition: {status: false, x: 0, y: 0}, //记录上次重置图片位置时鼠标所在坐标
                        targetImgData: '' //截取的目标图片数据
                    };
                    //装载新闻list数据
                    ContentDataSer.teamData['list'].push(newListSortedData[i]);
                }
                console.log(ContentDataSer.teamData['list']);
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
            OverallGeneralSer.alertHttpRequestError("getRangeTeamInfo", 500, "system error");

        }).finally(function () {
            //关闭数据loading
            OverallDataSer.overallData['loadingData']=false;
        })
    };


    /**
     * 获取上一批次或下一批次成员数据
     * @param changeBatch
     */
    var getBatchRangeTeamInfo = function (changeBatch) {

        //对不允许获取下一批次或上一批次的数据时直接返回
        var paginationNum = ContentDataSer.overallData['teamListShow']['pagination']['num'];
        var lastPaginationNum = paginationNum[paginationNum.length - 1];
        var firstPaginationNum = paginationNum[0];

        //往后读取数据
        //如果选择获取下一批数据，且已是最后一页，则直接返回不处理
        if ((changeBatch == 1) && (ContentDataSer.overallData['teamListShow']['totalPage'] <= lastPaginationNum)) {
            return;
        }

        //往前读取数据
        //如果选择获取上一批数据，且已是第一页，则直接返回不处理
        if ((changeBatch == -1) && firstPaginationNum == 1) {
            return;
        }

        //设置页面开始下标号
        ContentDataSer.overallData['teamListShow']['pagination']['beginPageNum'] +=
            changeBatch * ContentDataSer.overallData['teamListShow']['maxShowPage'];
        //设置active装态的数据
        ContentGeneralSer.showTargetNumNewsList(0, ContentDataSer.overallData['teamListShow']['pagination']['beginPageNum']);

        //两个判断条件
        // A： 如果之前获取过的分页数据最大页数大于当前页面最大页数则说明下一批数据之前已经获取过，
        // B： 进行下一批数据获取操作
        // 此时改变数据显示指针即可。
        // 否则获取新数据
        if (ContentDataSer.overallData['teamListShow']['pagination']['loadedMaxPageNum'] <= lastPaginationNum && changeBatch == 1) {
            getRangeTeamInfo();

        } else {
            //装填分页展示信息
            ContentGeneralSer.loadPageInfo();
            //设置是否允许获取上一批次和下一批次数据
            ContentGeneralSer.setPreNextLoadBatchData();
        }
    };

    /**以下是针对每条文章的Opt操作***********************************************************************************************/

    /**
     * 创建新的成员数据
     */
    var createNewTeam = function () {
        //设置创建新闻数据开关
        ContentDataSer.teamData['editData']['optType'] = 1; //创建成员1，更新成员2
        //重置创建新闻数据
        for (var i in ContentDataSer.teamData['editData']['data']) {
            ContentDataSer.teamData['editData']['data'][i] = '';
        }
        //默认设置id参数为0
        ContentDataSer.teamData['editData']['data']['id'] = 0;
        //默认人员状态
        ContentDataSer.teamData['editData']['data']['status_cd'] = 1;
        //管理者id信息作为新增信息
        ContentDataSer.teamData['editData']['data']['wx_user_id'] = OverallDataSer.overallData['userInfo']['wx_user_id'];
        ContentDataSer.teamData['editData']['data']['wx_user_name'] = OverallDataSer.overallData['userInfo']['wx_user_name'];

        //设置创建时间
        ContentDataSer.teamData['editData']['data']['create_time'] = new Date().getTime();
        //资源时间戳
        ContentDataSer.teamData['editData']['data']['timestamp'] =
            OverallGeneralSer.getTimeStamp() + '_' + OverallDataSer.overallData['userInfo']['wx_user_id'];
        console.log(ContentDataSer.teamData['editData']);

        ContentDataSer.teamData['editData']['imageData'] = {
            url: '',
            bg_position_left: 0,
            bg_position_top: 0,
            bg_size: 101,
            reposition: {status: false, x: 0, y: 0}, //记录上次重置图片位置时鼠标所在坐标
            targetImgData: '' //截取的目标图片数据
        };

        //进行人员编辑页面
        ContentDataSer.navigation['team']['teamEdit'] = true;
    };

    /**
     * 批量删除特定成员数据
     */
    var deleteBatchTeam = function () {
        //装载需要删除的成员列表数据
        var toDeleteIdArrays = [];
        for (var i in  ContentDataSer.teamData['list']) {
            if (ContentDataSer.teamData['list'][i]['toDelete']) {
                toDeleteIdArrays.push({
                    'id': ContentDataSer.teamData['list'][i]['id'],
                    'timestamp': ContentDataSer.teamData['list'][i]['timestamp'],
                })
            }
        }

        var fd = new FormData();
        fd.append('deleteList', JSON.stringify(toDeleteIdArrays));
        //提交表单数据
        $http.post(ContentDataSer.deleteBatchTeam, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                ContentDataSer.teamData['list'].length = 0;
                ContentDataSer.overallData['teamListShow']['pagination']['loadedMaxPageNum'] = 0;
                getRangeTeamInfo();

            } else {
                OverallGeneralSer.alertHttpRequestError("deleteBatchTeam", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("deleteBatchTeam", 600, err)
        });
    };

    /**
     * 点击搜索成员数据
     */
    var searchTeam = function () {
        //如果搜索内容不为空则获取搜索内容，否则直接获取分页内容
        if (OverallGeneralSer.checkDataNotEmpty(ContentDataSer.overallData['teamListShow']['search'].trim()||ContentDataSer.overallData['teamListShow']['status_cd']>-1)) {
            ContentDataSer.overallData['teamListShow']['search_flag'] = 1;
            var url = ContentDataSer.searchTeamData;
            if (ContentDataSer.overallData['teamListShow']['status_cd']==99) {
                ContentDataSer.overallData['teamListShow']['status_cd']="0,1,2";
            }
            //如果是第一次搜素则清空当前数据集
            if (ContentDataSer.overallData['teamListShow']['search_first_flag'] == 0) {
                ContentDataSer.teamData['list'].length = 0;
            }
            if (ContentDataSer.teamData['list'] <= 0) {
                var sendData = {
                    'search': ContentDataSer.overallData['teamListShow']['search'].trim(),
                    'status_cd': ContentDataSer.overallData['teamListShow']['status_cd'],
                    'create_time':ContentDataSer.overallData['teamListShow']['maxFromCreateTime'],
                };

            } else {
                var lastIndex = ContentDataSer.teamData['list'][ContentDataSer.teamData['list'].length - 1]['create_time'];
                var sendData = {
                    'search': ContentDataSer.overallData['teamListShow']['search'].trim(),
                    'status_cd': ContentDataSer.overallData['teamListShow']['status_cd'],
                    'create_time':lastIndex,
                };
            }

            console.log(sendData);
            //获取搜索的内容
            OverallGeneralSer.httpPostData(url, sendData, function (response) {

                console.log(response)
                //执行过一次搜索，下一批再查询时不会清空teamListData列表
                ContentDataSer.overallData['teamListShow']['search_first_flag'] = 1;

                var totalNum = response['totalNum'];
                var teamListData = response['teamListData'];

                console.log(totalNum);
                //设置全部新闻条目数目
                ContentDataSer.overallData['teamListShow']['totalNum'] = totalNum;
                //设置所有页面数目
                ContentDataSer.overallData['teamListShow']['totalPage'] =
                    Math.ceil(parseFloat(totalNum) / ContentDataSer.overallData['teamListShow']['screenNum']);
                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var teamListSortedData = teamListData.sort(ContentGeneralSer.sortStickNum);
                //循环填充新闻list数据
                for (var i in teamListSortedData) {
                    //设置消息状态信息
                    var statusCd = teamListSortedData[i]['status_cd'];
                    teamListSortedData[i]['status_cd_name'] = ContentDataSer.overallData['teamListShow']['statusType'][statusCd];
                    teamListSortedData[i]['coverImage'] = ContentDataSer.getCoverImage + teamListSortedData[i]['timestamp']+".png";
                    //装载朋友圈list数据
                    ContentDataSer.teamData['list'].push(teamListSortedData[i]);
                }
                if (ContentDataSer.overallData['teamListShow']['status_cd']=="0,1,2") {
                    ContentDataSer.overallData['teamListShow']['status_cd']=99
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
            ContentDataSer.teamData['list'].length = 0;
            ContentDataSer.overallData['teamListShow']['pagination']['loadedMaxPageNum'] = 0;
            getRangeTeamInfo();
        }

    };

    /**
     * 新闻操作
     * @param optType
     * @param teamId
     * @param indexOffset
     */
    var teamOpt = function (optType, teamId, indexOffset) {
        var index = indexOffset + ContentDataSer.overallData['teamListShow']['pagination']['beginListIndex'];
        console.log(index, ContentDataSer.teamData['list'][index]);
        //关闭编辑操作菜单
        ContentDataSer.teamData['list'][index]['menu'] = false;
        //根据不同操作类型相应操作
        switch (optType) {
            case 'edit': {
                editTeam(index);
                break;
            }
            case 'delete': {
                deleteTeam(teamId, index);
                break;
            }
            case 'top': {
                topTeam(index);
                break;
            }
            default: {
                break;
            }
        }
    };

    /**
     * 进入编辑页面编辑成员数据
     * @param index
     */
    var editTeam = function (index) {
        //设置编辑index条目
        ContentDataSer.teamData['editData']['editIndex'] = index;
        //填充编辑的内容数据
        for (var i in ContentDataSer.teamData['list'][index]) {
            ContentDataSer.teamData['editData']['data'][i] = ContentDataSer.teamData['list'][index][i];
        }
        var imgURlArr = ContentDataSer.teamData['editData']['data']['imgUrl'].split(":");

        ContentDataSer.teamData['editData']['imageData'] = {
            url: ContentDataSer.teamData['editData']['data']['coverImage'],
            bg_position_left: Number(imgURlArr[2]),
            bg_position_top: Number(imgURlArr[1]),
            bg_size: Number(imgURlArr[3]),
            reposition: {status: false, x: 0, y: 0}, //记录上次重置图片位置时鼠标所在坐标
            targetImgData: '' //截取的目标图片数据
        };

        ContentDataSer.teamData['editData']['optType'] = 2; //2为编辑，1为

        ContentDataSer.navigation['team']['teamEdit'] = true;
    };

    /**
     * 删除指定成员数据
     */
    var deleteTeam = function (teamId, index) {
        var fd = new FormData();
        fd.append('id', teamId);
        fd.append('timestamp', ContentDataSer.teamData['list'][index]['timestamp']);

        //提交表单数据
        $http.post(ContentDataSer.deleteTeam, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                ContentDataSer.teamData['list'].length = 0;
                ContentDataSer.overallData['teamListShow']['pagination']['loadedMaxPageNum'] = 0;
                getRangeTeamInfo();

            } else {
                OverallGeneralSer.alertHttpRequestError("deleteTeam", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("deleteTeam", 600, err)
        });
    };


    /**
     * 成员置顶操作
     */
    var topTeam = function (index) {
        //1、发送http请求置顶该新闻操作
        var url = OverallDataSer.urlData['backEndHttp']['setTeamStickInfo'];
        var news = ContentDataSer.teamData['list'][index];
        var data = {
            'stick_cd': (news['stick_cd'] == 0 ? 1 : 0), //如果之前已经置顶了则设置为不置顶，否则设置置顶
            'stick_time': OverallGeneralSer.getTimeStamp(), //设置新的此时时间戳数据
            'timestamp': news['timestamp'], //用于标识该news
        };
        OverallGeneralSer.httpPostData(url, data, function (response) {
            //重新清空列表并获取数据操作
            ContentDataSer.teamData['list'].length = 0;
            ContentDataSer.overallData['teamListShow']['pagination']['loadedMaxPageNum'] = 0;
            getRangeTeamInfo();
        });
    };



    return  {
        getRangeTeamInfo:getRangeTeamInfo,
        getBatchRangeTeamInfo:getBatchRangeTeamInfo,
        createNewTeam:createNewTeam,
        deleteBatchTeam:deleteBatchTeam,
        searchTeam:searchTeam,
        teamOpt:teamOpt,
    }

});