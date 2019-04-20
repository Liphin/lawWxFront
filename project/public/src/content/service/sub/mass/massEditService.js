/**
 * create by lxc on 2019 04 14
 * @type {angular.Module}
 */

var contentModule = angular.module('Angular.content');
contentModule.factory('MassEditSer', function ($http, $window, $timeout, ContentDataSer, $location, OverallGeneralSer,
                                                   OverallDataSer, ContentGeneralSer) {
    //定义文章服务业务逻辑
    /**List页面****************************************************************************************************/

    /**
     * 获取指定起始范围及条目数目的新闻信息
     */
    var getRangeMassListInfo = function () {
        //打开数据loading
        OverallDataSer.overallData['loadingData']=true;

        //发送请求获取指定范围和数目的新闻数据
        var fd = new FormData();
        if (ContentDataSer.massListData['list'] <= 0) {
            fd.append('create_time', ContentDataSer.overallData['listShow']['maxFromCreateTime']);

        } else {
            var lastIndex = ContentDataSer.massListData['list'][ContentDataSer.massListData['list'].length - 1]['create_time'];
            fd.append('create_time', lastIndex);
        }
        //http请求数据
        $http.post(ContentDataSer.getRangeMassListToBg, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            if (response['status_code'] = 200) {
                var totalNum = response['data']['totalNum'];
                var massListData = response['data']['massListData'];

                //设置全部新闻条目数目
                ContentDataSer.overallData['listShow']['totalNum'] = totalNum;
                //设置所有页面数目
                ContentDataSer.overallData['listShow']['totalPage'] =
                    Math.ceil(parseFloat(totalNum) / ContentDataSer.overallData['listShow']['screenNum']);

                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var newListSortedData = massListData.sort(ContentGeneralSer.sortStickNum);

                //循环填充新闻list数据
                for (var i in newListSortedData) {
                    //转换设置类型、状态、人群范围等数据
                    var dynamicinfoType = newListSortedData[i]['subtype'];
                    newListSortedData[i]['type_name'] = ContentDataSer.massListData['mapData']['subtype'][dynamicinfoType];
                    //设置消息状态信息
                    var statusCd = newListSortedData[i]['status_cd'];
                    newListSortedData[i]['status_cd_name'] = ContentDataSer.overallData['listShow']['massStatusType'][statusCd];
                    //装载新闻list数据
                    ContentDataSer.massListData['list'].push(newListSortedData[i]);
                }
                console.log(ContentDataSer.massListData['list'])
                //装填分页展示信息
                ContentGeneralSer.loadPageInfo();
                //设置是否允许获取上一批次和下一批次数据
                ContentGeneralSer.setPreNextLoadBatchData();
                //获取新数据后页面滚动到列表顶部
                angular.element("60MassList").scrollTop = 0;
                //$("60newsList").animate({ scrollTop: 0 }, "fast");

            }

        }).error(function (error) {
            //提示系统出错
            OverallGeneralSer.alertHttpRequestError("getRangeMassListInfo", 500, "system error");

        }).finally(function () {
            //关闭数据loading
            OverallDataSer.overallData['loadingData']=false;
        })
    };


    /**
     * 获取上一批次或下一批次新闻数据
     * @param changeBatch
     */
    var getBatchRangeMassListInfo = function (changeBatch) {

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
            getRangeMassListInfo();

        } else {
            //装填分页展示信息
            ContentGeneralSer.loadPageInfo();
            //设置是否允许获取上一批次和下一批次数据
            ContentGeneralSer.setPreNextLoadBatchData();
        }
    };


    /**以下是针对每条文章的Opt操作***********************************************************************************************/

    /**
     * 点击搜索趣文数据
     */
    var searchMassList = function () {
        //如果搜索内容不为空则获取搜索内容，否则直接获取分页内容
        if (OverallGeneralSer.checkDataNotEmpty(ContentDataSer.overallData['listShow']['search'].trim()||ContentDataSer.overallData['listShow']['status_cd']>-1)) {
            ContentDataSer.overallData['listShow']['search_flag'] = 1;
            var url = ContentDataSer.searchMassListData;
            if (ContentDataSer.overallData['listShow']['status_cd']==99) {
                ContentDataSer.overallData['listShow']['status_cd']="0,1,2";
            }
            //如果是第一次搜素则清空当前数据集
            if (ContentDataSer.overallData['listShow']['search_first_flag'] == 0) {
                ContentDataSer.massListData['list'].length = 0;
            }
            if (ContentDataSer.massListData['list'] <= 0) {
                var sendData = {
                    'search': ContentDataSer.overallData['listShow']['search'].trim(),
                    'status_cd': ContentDataSer.overallData['listShow']['status_cd'],
                    'create_time':ContentDataSer.overallData['listShow']['maxFromCreateTime'],
                };

            } else {
                var lastIndex = ContentDataSer.massListData['list'][ContentDataSer.massListData['list'].length - 1]['create_time'];
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
                //执行过一次搜索，下一批再查询时不会清空massListData列表
                ContentDataSer.overallData['listShow']['search_first_flag'] = 1;

                var totalNum = response['totalNum'];
                var massListData = response['massListData'];

                console.log(totalNum);
                //设置全部新闻条目数目
                ContentDataSer.overallData['listShow']['totalNum'] = totalNum;
                //设置所有页面数目
                ContentDataSer.overallData['listShow']['totalPage'] =
                    Math.ceil(parseFloat(totalNum) / ContentDataSer.overallData['listShow']['screenNum']);
                //重置数据顺序：1、根据置顶标签排在前面，2、置顶的数据中根据置顶时间戳进行排序
                var massListSortedData = massListData.sort(ContentGeneralSer.sortStickNum);
                //循环填充新闻list数据
                for (var i in massListSortedData) {
                    //设置消息状态信息
                    var statusCd = massListSortedData[i]['status_cd'];
                    massListSortedData[i]['status_cd_name'] = ContentDataSer.overallData['listShow']['statusType'][statusCd];
                    //装载朋友圈list数据
                    ContentDataSer.massListData['list'].push(massListSortedData[i]);
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
                angular.element("60MassList").scrollTop = 0;
            })

        } else {
            //否则清空朋友圈list，并重新获取朋友圈数据
            ContentDataSer.massListData['list'].length = 0;
            ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] = 0;
            getRangeMassListInfo();
        }

    };


    /**
     * 新闻操作
     * @param optType
     * @param interestId
     * @param indexOffset
     */
    var massListOpt = function (optType, massListId, indexOffset) {
        var index = indexOffset + ContentDataSer.overallData['listShow']['pagination']['beginListIndex'];
        console.log(index, ContentDataSer.massListData['list'][index]);
        //关闭编辑操作菜单
        ContentDataSer.massListData['list'][index]['menu'] = false;
        //根据不同操作类型相应操作
        switch (optType) {
            case 'view': {
                viewMassList(index);
                break;
            }
            case 'top': {
                topMassList(index);
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
    var viewMassList = function (index) {
        //直接预览项目文件
        var targetNews = ContentDataSer.massListData['list'][index];
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
     * 新闻置顶操作
     */
    var topMassList = function (index) {
        //1、发送http请求置顶该新闻操作
        var url = OverallDataSer.urlData['backEndHttp']['setDynamicStickInfo'];
        var news = ContentDataSer.massListData['list'][index];
        var data = {
            'stick_cd': (news['stick_cd'] == 0 ? 1 : 0), //如果之前已经置顶了则设置为不置顶，否则设置置顶
            'stick_time': OverallGeneralSer.getTimeStamp(), //设置新的此时时间戳数据
            'timestamp': news['timestamp'], //用于标识该news
        };
        OverallGeneralSer.httpPostData(url, data, function (response) {
            //重新清空列表并获取数据操作
            ContentDataSer.massListData['list'].length = 0;
            ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] = 0;
            getRangeMassListInfo();
        });
    };

    /**
     * 批量上传图文进行预群发
     */

    var uploadBatchMedia = function () {
        OverallDataSer.overallData['loadingData']=true;
        for (var i in ContentDataSer.massListData['list']) {
            if (ContentDataSer.massListData['list'][i]['toUpload']) {
                ContentDataSer.massListData['mediaData'] = {
                    "thumb_media_id":"",
                    "content":"",
                    "show_cover_pic":0,
                    "need_open_comment":1,
                    "only_fans_can_comment":1
                };
                //获取图文相关信息
                ContentDataSer.massListData['mediaData']['content']=ContentDataSer.massListData['list'][i]['timestamp'] + "-index.html";
                ContentDataSer.massListData['mediaData']['thumb_media_id']=ContentDataSer.massListData['list'][i]['cover_media_id'];
                ContentDataSer.massListData['toUploadListData']['articles'].push(ContentDataSer.massListData['mediaData']);
                ContentDataSer.massListData['toSelectListArray'].push(ContentDataSer.massListData['list'][i]);
                // OverallGeneralSer.httpGetFiles(url, function (response) {
                //     ContentDataSer.massListData['mediaData']['content']=encodeURIComponent(response);
                //     ContentDataSer.massListData['mediaData']['thumb_media_id']=ContentDataSer.massListData['list'][i]['cover_media_id'];
                //     ContentDataSer.massListData['toUploadListData']['articles'].push(ContentDataSer.massListData['mediaData']);
                //     ContentDataSer.massListData['toSelectListArray'].push(ContentDataSer.massListData['list'][i]);
                // });
            }
        }

        ContentGeneralSer.uploadMedia(ContentDataSer.massListData['toUploadListData'],function (response) {
            if (response['errcode']||!response['media_id']) {
                alert("素材上传失败"+response['errcode']);
                return;
            }
            else {
                var fd = new FormData();
                for (var i in ContentDataSer.massListData['toSelectListArray']) {
                    ContentDataSer.massListData['toSelectListArray'][i]['media_id']=response['media_id'];
                }
                fd.append('updateList',JSON.stringify(ContentDataSer.massListData['toSelectListArray']));
                fd.append('id', ContentDataSer.massData['editData']['data']['id']);
                fd.append('media_id', response['media_id']);
                fd.append('news_count', ContentDataSer.massListData['toSelectListArray'].length);
                fd.append('status_cd', 0);
                fd.append('timestamp', ContentDataSer.massData['editData']['data']['timestamp']);
                //fd.append('create_time', ContentDataSer.massData['editData']['data']['create_time']);

                var url = ContentDataSer.updateMassUpload;
                $http.post(url,fd,{
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined},
                }).success(function (response) {
                    if (response['status_code'] == 200) {
                        //管理员编写审核完成，发布该消息,如果该条消息已发布，则不用再推送消息
                        OverallDataSer.overallData['loadingData']=false;
                        $location.search('subPage', "massList");

                    } else {
                        OverallGeneralSer.alertHttpRequestError("uploadBatchMedia", response['exception_code'], response['exception']);
                    }

                }).error(function (err) {
                    OverallDataSer.overallData['loadingData']=false;
                    OverallGeneralSer.alertHttpRequestError("uploadBatchMedia", 600, err);
                });

            }
        });
    };

    /**
     * 检查是否符合进入编辑页面条件，若否则返回到list界面
     */
    var validateMassEdit = function () {
        //查看当前是否有选中的interest数据
        var editIndex = ContentDataSer.massListData['editData']['editIndex'];
        //如果不是新增interest或编辑interest，则返回interestList界面
        if (!OverallGeneralSer.checkDataNotEmpty(editIndex) && ContentDataSer.massListData['editData']['optType'] != 1) {
            $location.search({'subPage': 'massList'});
        }
        getRangeMassListInfo();//获取一定范围内的新闻数据
    };


    return {
        //页面展示相关函数
        getRangeMassListInfo: getRangeMassListInfo,
        getBatchRangeMassListInfo: getBatchRangeMassListInfo,
        searchMassList: searchMassList,
        massListOpt: massListOpt,
        uploadBatchMedia:uploadBatchMedia,
        validateMassEdit:validateMassEdit,
    }

});