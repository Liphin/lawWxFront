/**
 * create by lxc on 2019-03-08
 */
var contentModule = angular.module('Angular.content');
contentModule.factory('DynamicListSer', function ($http, $window, $timeout, ContentDataSer, $location, OverallGeneralSer,
                                                OverallDataSer, ContentGeneralSer) {
    //定义文章服务业务逻辑
    /**List页面****************************************************************************************************/

    /**
     * 获取指定起始范围及条目数目的新闻信息
     */
    var getRangeDynamicInfo = function () {
        //打开数据loading
        OverallDataSer.overallData['loadingData']=true;

        //发送请求获取指定范围和数目的新闻数据
        var fd = new FormData();
        if (ContentDataSer.dynamicData['list'] <= 0) {
            fd.append('create_time', ContentDataSer.overallData['listShow']['maxFromCreateTime']);

        } else {
            var lastIndex = ContentDataSer.dynamicData['list'][ContentDataSer.dynamicData['list'].length - 1]['create_time'];
            fd.append('create_time', lastIndex);
        }
        //http请求数据
        $http.post(ContentDataSer.getRangeDynamicListToBg, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] = 200) {
                var totalNum = response['data']['totalNum'];
                var dynamicListData = response['data']['dynamicListData'];

                //设置全部新闻条目数目
                ContentDataSer.overallData['listShow']['totalNum'] = totalNum;
                //设置所有页面数目
                ContentDataSer.overallData['listShow']['totalPage'] =
                    Math.ceil(parseFloat(totalNum) / ContentDataSer.overallData['listShow']['screenNum']);

                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var newListSortedData = dynamicListData.sort(ContentGeneralSer.sortStickNum);

                //循环填充新闻list数据
                for (var i in newListSortedData) {
                    //转换设置类型、状态、人群范围等数据
                    var dynamicinfoType = newListSortedData[i]['subtype'];
                    newListSortedData[i]['type_name'] = ContentDataSer.dynamicData['mapData']['subtype'][dynamicinfoType];
                    //设置消息状态信息
                    var statusCd = newListSortedData[i]['status_cd'];
                    newListSortedData[i]['status_cd_name'] = ContentDataSer.overallData['listShow']['statusType'][statusCd];
                    //装载新闻list数据
                    ContentDataSer.dynamicData['list'].push(newListSortedData[i]);
                }
                console.log(ContentDataSer.dynamicData['list'])
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
            OverallGeneralSer.alertHttpRequestError("getRangeDynamicInfo", 500, "system error");

        }).finally(function () {
            //关闭数据loading
            OverallDataSer.overallData['loadingData']=false;
        })
    };


    /**
     * 获取上一批次或下一批次新闻数据
     * @param changeBatch
     */
    var getBatchRangeDynamicInfo = function (changeBatch) {

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
            getRangeDynamicInfo();

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
    var createNewDynamic = function () {
        //设置创建新闻数据开关
        ContentDataSer.dynamicData['editData']['optType'] = 1; //创建新闻1，更新新闻2
        //重置创建新闻数据
        for (var i in ContentDataSer.dynamicData['editData']['data']) {
            ContentDataSer.dynamicData['editData']['data'][i] = '';
        }
        //默认设置id参数为0
        ContentDataSer.dynamicData['editData']['data']['id'] = 0;
        ContentDataSer.dynamicData['editData']['data']['type'] = 3;
        //显示默认的文章类型
        ContentDataSer.dynamicData['editData']['data']['subtype'] = 30;
        //管理者id信息作为新增信息
        ContentDataSer.dynamicData['editData']['data']['wx_user_id'] = OverallDataSer.overallData['userInfo']['wx_user_id'];
        ContentDataSer.dynamicData['editData']['data']['wx_user_name'] = OverallDataSer.overallData['userInfo']['wx_user_name'];
        //默认发布状态
        ContentDataSer.dynamicData['editData']['data']['status_cd'] = 1;
        ContentDataSer.dynamicData['editData']['org_status_cd'] = 0;
        //设置创建时间
        ContentDataSer.dynamicData['editData']['data']['create_time'] = new Date().getTime();
        //资源时间戳
        ContentDataSer.dynamicData['editData']['data']['timestamp'] =
            OverallGeneralSer.getTimeStamp() + '_' + OverallDataSer.overallData['userInfo']['wx_user_id'];
        //初始化代码
        ContentDataSer.overallData['phoneView']['editHtml'] = '<p><br></p>';
        //进行新闻编辑页面
        $location.search({'subPage': 'dynamicEdit'});
    };

    /**
     * 批量删除特定新闻数据
     */
    var deleteBatchDynamic = function () {
        //装载需要删除的新闻列表数据
        var toDeleteIdArrays = [];
        for (var i in  ContentDataSer.dynamicData['list']) {
            if (ContentDataSer.dynamicData['list'][i]['toDelete']) {
                toDeleteIdArrays.push({
                    'id': ContentDataSer.dynamicData['list'][i]['id'],
                    'timestamp': ContentDataSer.dynamicData['list'][i]['timestamp'],
                })
            }
        }

        var fd = new FormData();
        fd.append('deleteList', JSON.stringify(toDeleteIdArrays));
        //提交表单数据
        $http.post(ContentDataSer.deleteBatchDynamic, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                ContentDataSer.dynamicData['list'].length = 0;
                ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] = 0;
                getRangeDynamicInfo();

            } else {
                OverallGeneralSer.alertHttpRequestError("deleteBatchDynamic", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("deleteBatchDynamic", 600, err)
        });
    };

    /**
     * 点击搜索趣文数据
     */
    var searchDynamic = function () {
        //如果搜索内容不为空则获取搜索内容，否则直接获取分页内容
        if (OverallGeneralSer.checkDataNotEmpty(ContentDataSer.overallData['listShow']['search'].trim()||ContentDataSer.overallData['listShow']['status_cd']>-1)) {
            ContentDataSer.overallData['listShow']['search_flag'] = 1;
            var url = ContentDataSer.searchDynamicData;
            if (ContentDataSer.overallData['listShow']['status_cd']==99) {
                ContentDataSer.overallData['listShow']['status_cd']="0,1,2";
            }
            //如果是第一次搜素则清空当前数据集
            if (ContentDataSer.overallData['listShow']['search_first_flag'] == 0) {
                ContentDataSer.dynamicData['list'].length = 0;
            }
            if (ContentDataSer.dynamicData['list'] <= 0) {
                var sendData = {
                    'search': ContentDataSer.overallData['listShow']['search'].trim(),
                    'status_cd': ContentDataSer.overallData['listShow']['status_cd'],
                    'create_time':ContentDataSer.overallData['listShow']['maxFromCreateTime'],
                };

            } else {
                var lastIndex = ContentDataSer.dynamicData['list'][ContentDataSer.dynamicData['list'].length - 1]['create_time'];
                var sendData = {
                    'search': ContentDataSer.overallData['listShow']['search'].trim(),
                    'status_cd': ContentDataSer.overallData['listShow']['status_cd'],
                    'create_time':lastIndex,
                };
            }

            console.log(sendData);
            //获取搜索的内容
            OverallGeneralSer.httpPostData(url, sendData, function (response) {

                console.log(response)
                //执行过一次搜索，下一批再查询时不会清空dynamicListData列表
                ContentDataSer.overallData['listShow']['search_first_flag'] = 1;

                var totalNum = response['totalNum'];
                var dynamicListData = response['dynamicListData'];

                console.log(totalNum);
                //设置全部新闻条目数目
                ContentDataSer.overallData['listShow']['totalNum'] = totalNum;
                //设置所有页面数目
                ContentDataSer.overallData['listShow']['totalPage'] =
                    Math.ceil(parseFloat(totalNum) / ContentDataSer.overallData['listShow']['screenNum']);
                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var dynamicListSortedData = dynamicListData.sort(ContentGeneralSer.sortStickNum);
                //循环填充新闻list数据
                for (var i in dynamicListSortedData) {
                    //设置消息状态信息
                    var statusCd = dynamicListSortedData[i]['status_cd'];
                    dynamicListSortedData[i]['status_cd_name'] = ContentDataSer.overallData['listShow']['statusType'][statusCd];
                    //装载朋友圈list数据
                    ContentDataSer.dynamicData['list'].push(dynamicListSortedData[i]);
                }
                if (ContentDataSer.overallData['listShow']['status_cd']=="0,1,2") {
                    ContentDataSer.overallData['listShow']['status_cd']=99
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
            ContentDataSer.dynamicData['list'].length = 0;
            ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] = 0;
            getRangeDynamicInfo();
        }

    };


    /**
     * 新闻操作
     * @param optType
     * @param dynamicId
     * @param indexOffset
     */
    var dynamicOpt = function (optType, dynamicId, indexOffset) {
        var index = indexOffset + ContentDataSer.overallData['listShow']['pagination']['beginListIndex'];
        console.log(index, ContentDataSer.dynamicData['list'][index]);
        //关闭编辑操作菜单
        ContentDataSer.dynamicData['list'][index]['menu'] = false;
        //根据不同操作类型相应操作
        switch (optType) {
            case 'view': {
                viewDynamic(index);
                break;
            }
            case 'edit': {
                editDynamic(index);
                break;
            }
            case 'copy': {
                //拷贝新闻数据
                copyDynamic(index);
                break;
            }
            case 'delete': {
                deleteDynamic(dynamicId, index);
                break;
            }
            case 'top': {
                topDynamic(index);
                break;
            }
            default: {
                break;
            }
        }
    };

    /**
     * 预览新闻数据
     */
    var viewDynamic = function (index) {
        //直接预览项目文件
        var targetNews = ContentDataSer.dynamicData['list'][index];
        var url = OverallGeneralSer.getDynamicInfoNews(targetNews['timestamp'], 'html');
        OverallGeneralSer.httpGetFiles(url, function (response) {

            //装载HTML核心前端代码数据
            var data = response;
            var beginIndex = data.indexOf('<mark>');
            var endIndex = data.indexOf('</mark>');
            var keyCode = data.substring((beginIndex + 6), endIndex);

            //拼凑头部和尾部生成最终展示数据
            var viewHtmlHead = ContentGeneralSer.generalHtmlHead(targetNews['title'], targetNews['wx_user_name'], targetNews['create_time']);
            var viewHtmlEnd = '\n    </div>\n</div>\n</body>\n</html>';

            //拼接HTML文件
            var phoneHtml = viewHtmlHead + keyCode + viewHtmlEnd;

            //装载文件数据到div展示区中
            ContentDataSer.overallData['phoneView']['html'] = phoneHtml;
            //打开手机预览标签
            ContentDataSer.overallData['phoneView']['status'] = true;
        });
    };


    /**
     * 进入编辑页面编辑文章数据
     * @param index
     */
    var editDynamic = function (index) {
        //设置编辑index条目
        ContentDataSer.dynamicData['editData']['editIndex'] = index;
        //填充编辑的内容数据
        for (var i in ContentDataSer.dynamicData['list'][index]) {
            ContentDataSer.dynamicData['editData']['data'][i] = ContentDataSer.dynamicData['list'][index][i];
        }
        //http获取HTML数据
        var timestamp = ContentDataSer.dynamicData['list'][index]['timestamp'];

        //设置封面图数据
        ContentDataSer.dynamicData['editData']['data']['coverImageSrc'] = OverallGeneralSer.getDynamicInfoNews(timestamp, 'coverimg');
        ContentDataSer.dynamicData['editData']['data']['coverImage'] = '';
        ContentDataSer.dynamicData['editData']['optType'] = 2; //2为编辑，1为创建
        ContentDataSer.dynamicData['editData']['org_status_cd']=ContentDataSer.dynamicData['editData']['data']['status_cd'];

        //设置编辑对象数据
        var url = OverallGeneralSer.getDynamicInfoNews(timestamp, 'html');
        OverallGeneralSer.httpGetFiles(url, function (response) {
            //装载html数据到edit页面
            var data = response;
            var beginIndex = data.indexOf('<mark>');
            var endIndex = data.indexOf('</mark>');
            ContentDataSer.overallData['phoneView']['editHtml'] = data.substring((beginIndex + 6), endIndex);
            //打开编辑页面
            $location.search({'subPage': 'dynamicEdit'});
        });
    };


    /**
     * 拷贝新闻数据
     */
    var copyDynamic = function (index) {
        var fd = new FormData();
        //添加该条记录信息的所有数据
        for (var i in ContentDataSer.dynamicData['list'][index]) {
            fd.append(i, ContentDataSer.dynamicData['list'][index][i]);
        }

        //删除不需要的提交数据
        fd.delete('type_name');
        fd.delete('status_cd_name');
        fd.delete('menu');
        fd.delete('toDelete');

        //提交表单数据
        $http.post(ContentDataSer.copyDynamic, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                ContentDataSer.dynamicData['list'].length = 0;
                ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] = 0;
                getRangeDynamicInfo();

            } else {
                OverallGeneralSer.alertHttpRequestError("copyDynamic", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("copyDynamic", 600, err)
        });
    };


    /**
     * 删除指定新闻数据
     */
    var deleteDynamic = function (dynamicId, index) {
        var fd = new FormData();
        fd.append('id', dynamicId);
        fd.append('timestamp', ContentDataSer.dynamicData['list'][index]['timestamp']);

        //提交表单数据
        $http.post(ContentDataSer.deleteDynamic, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] == 200) {
                //重新清空列表并获取数据操作
                ContentDataSer.dynamicData['list'].length = 0;
                ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] = 0;
                getRangeDynamicInfo();

            } else {
                OverallGeneralSer.alertHttpRequestError("deleteDynamic", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("deleteDynamic", 600, err)
        });
    };


    /**
     * 新闻置顶操作
     */
    var topDynamic = function (index) {
        //1、发送http请求置顶该新闻操作
        var url = OverallDataSer.urlData['backEndHttp']['setDynamicStickInfo'];
        var news = ContentDataSer.dynamicData['list'][index];
        var data = {
            'stick_cd': (news['stick_cd'] == 0 ? 1 : 0), //如果之前已经置顶了则设置为不置顶，否则设置置顶
            'stick_time': OverallGeneralSer.getTimeStamp(), //设置新的此时时间戳数据
            'timestamp': news['timestamp'], //用于标识该news
        };
        OverallGeneralSer.httpPostData(url, data, function (response) {
            //重新清空列表并获取数据操作
            ContentDataSer.dynamicData['list'].length = 0;
            ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] = 0;
            getRangeDynamicInfo();
        });
    };


    return {
        //页面展示相关函数
        getRangeDynamicInfo: getRangeDynamicInfo,
        getBatchRangeDynamicInfo: getBatchRangeDynamicInfo,
        createNewDynamic: createNewDynamic,
        deleteBatchDynamic: deleteBatchDynamic,
        searchDynamic: searchDynamic,
        dynamicOpt: dynamicOpt,
    }

});