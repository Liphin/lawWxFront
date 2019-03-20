/**
 * create by lxc on 2019-03-08
 */


var contentModule = angular.module('Angular.content');

contentModule.factory('ContentGeneralSer', function ($http, ContentDataSer, $window, OverallDataSer, OverallGeneralSer) {

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


    /**
     * 替换生成的HTML特殊符号
     * @param text
     * @returns {*|string|void|XML}
     */
    var replaceSpecialCharacters = function (text) {
        text = text.replace(/&quot;/g, '');  //替换占转义字符
        //text = text.replace(/<img/g, ContentDataSer.overallData['phoneView']['imgStyleHtml']); //给每个image添加width属性
        return text;
    };


    /**
     * 装填分页展示信息
     */
    var loadPageInfo = function () {
        if(ContentDataSer.overallData['pageType']==4){
            //清空之前分页number数据
            ContentDataSer.overallData['teamListShow']['pagination']['num'].length = 0;
            //装填分页展示信息
            for (var j = ContentDataSer.overallData['teamListShow']['pagination']['beginPageNum'], i = 1;
                 j <= ContentDataSer.overallData['teamListShow']['totalPage'] &&
                 i <= ContentDataSer.overallData['teamListShow']['maxShowPage']; j++, i++) {
                ContentDataSer.overallData['teamListShow']['pagination']['num'].push(j);
            }

            //记录当前最大的已获取分页数
            var paginationNum = ContentDataSer.overallData['teamListShow']['pagination']['num'];
            var lastPaginationNum = paginationNum[paginationNum.length - 1];
            if (ContentDataSer.overallData['teamListShow']['pagination']['loadedMaxPageNum'] < lastPaginationNum) {
                ContentDataSer.overallData['teamListShow']['pagination']['loadedMaxPageNum'] = lastPaginationNum;
            }
        }
        else if (ContentDataSer.overallData['pageType']==5) {
            //清空之前分页number数据
            ContentDataSer.overallData['msgListShow']['pagination']['num'].length = 0;
            //装填分页展示信息
            for (var j = ContentDataSer.overallData['msgListShow']['pagination']['beginPageNum'], i = 1;
                 j <= ContentDataSer.overallData['msgListShow']['totalPage'] &&
                 i <= ContentDataSer.overallData['msgListShow']['maxShowPage']; j++, i++) {
                ContentDataSer.overallData['msgListShow']['pagination']['num'].push(j);
            }

            //记录当前最大的已获取分页数
            var paginationNum = ContentDataSer.overallData['msgListShow']['pagination']['num'];
            var lastPaginationNum = paginationNum[paginationNum.length - 1];
            if (ContentDataSer.overallData['msgListShow']['pagination']['loadedMaxPageNum'] < lastPaginationNum) {
                ContentDataSer.overallData['msgListShow']['pagination']['loadedMaxPageNum'] = lastPaginationNum;
            }
        }
        else {
            //清空之前分页number数据
            ContentDataSer.overallData['listShow']['pagination']['num'].length = 0;
            //装填分页展示信息
            for (var j = ContentDataSer.overallData['listShow']['pagination']['beginPageNum'], i = 1;
                 j <= ContentDataSer.overallData['listShow']['totalPage'] &&
                 i <= ContentDataSer.overallData['listShow']['maxShowPage']; j++, i++) {
                ContentDataSer.overallData['listShow']['pagination']['num'].push(j);
            }

            //记录当前最大的已获取分页数
            var paginationNum = ContentDataSer.overallData['listShow']['pagination']['num'];
            var lastPaginationNum = paginationNum[paginationNum.length - 1];
            if (ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] < lastPaginationNum) {
                ContentDataSer.overallData['listShow']['pagination']['loadedMaxPageNum'] = lastPaginationNum;
            }
        }

    };


    /**
     *  设置是否允许获取上一批次和下一批次数据
     */
    var setPreNextLoadBatchData = function () {
        if(ContentDataSer.overallData['pageType']==4){
            //分别获取当前最大和最小页面page数值
            var paginationNum = ContentDataSer.overallData['teamListShow']['pagination']['num'];
            var lastPaginationNum = paginationNum[paginationNum.length - 1];
            var firstPaginationNum = paginationNum[0];

            //如果展示区已有最后一页，则设置允许获取下一批次数据为false
            if (ContentDataSer.overallData['teamListShow']['totalPage'] <= lastPaginationNum) {
                ContentDataSer.overallData['teamListShow']['pagination']['next'] = false;

            } else {
                ContentDataSer.overallData['teamListShow']['pagination']['next'] = true;
            }
            //如果展示区已有第一页数据，则设置允许获取上一批次数据为false
            if (firstPaginationNum == 1) {
                ContentDataSer.overallData['teamListShow']['pagination']['pre'] = false;

            } else {
                ContentDataSer.overallData['teamListShow']['pagination']['pre'] = true;
            }
        }
        else if(ContentDataSer.overallData['pageType']==5){
            //分别获取当前最大和最小页面page数值
            var paginationNum = ContentDataSer.overallData['msgListShow']['pagination']['num'];
            var lastPaginationNum = paginationNum[paginationNum.length - 1];
            var firstPaginationNum = paginationNum[0];

            //如果展示区已有最后一页，则设置允许获取下一批次数据为false
            if (ContentDataSer.overallData['msgListShow']['totalPage'] <= lastPaginationNum) {
                ContentDataSer.overallData['msgListShow']['pagination']['next'] = false;

            } else {
                ContentDataSer.overallData['msgListShow']['pagination']['next'] = true;
            }
            //如果展示区已有第一页数据，则设置允许获取上一批次数据为false
            if (firstPaginationNum == 1) {
                ContentDataSer.overallData['msgListShow']['pagination']['pre'] = false;

            } else {
                ContentDataSer.overallData['msgListShow']['pagination']['pre'] = true;
            }
        }
        else {
            //分别获取当前最大和最小页面page数值
            var paginationNum = ContentDataSer.overallData['listShow']['pagination']['num'];
            var lastPaginationNum = paginationNum[paginationNum.length - 1];
            var firstPaginationNum = paginationNum[0];

            //如果展示区已有最后一页，则设置允许获取下一批次数据为false
            if (ContentDataSer.overallData['listShow']['totalPage'] <= lastPaginationNum) {
                ContentDataSer.overallData['listShow']['pagination']['next'] = false;

            } else {
                ContentDataSer.overallData['listShow']['pagination']['next'] = true;
            }
            //如果展示区已有第一页数据，则设置允许获取上一批次数据为false
            if (firstPaginationNum == 1) {
                ContentDataSer.overallData['listShow']['pagination']['pre'] = false;

            } else {
                ContentDataSer.overallData['listShow']['pagination']['pre'] = true;
            }
        }

    };


    /**
     * 鼠标点击选择展示某目标页面的新闻列表数据
     */
    var showTargetNumNewsList = function (index, pageNum) {
        if(ContentDataSer.overallData['pageType']==4) {
            //设置该页的选择状态为active
            ContentDataSer.overallData['teamListShow']['pagination']['activeIndex'] = index;
            //设置该页的起始展示index是，页面(pageNum-1) * 每页展示数目
            ContentDataSer.overallData['teamListShow']['pagination']['beginListIndex'] =
                (pageNum - 1) * ContentDataSer.overallData['teamListShow']['screenNum'];
        }
        else if(ContentDataSer.overallData['pageType']==5) {
            //设置该页的选择状态为active
            ContentDataSer.overallData['msgListShow']['pagination']['activeIndex'] = index;
            //设置该页的起始展示index是，页面(pageNum-1) * 每页展示数目
            ContentDataSer.overallData['msgListShow']['pagination']['beginListIndex'] =
                (pageNum - 1) * ContentDataSer.overallData['msgListShow']['screenNum'];
        }
        else {
            //设置该页的选择状态为active
            ContentDataSer.overallData['listShow']['pagination']['activeIndex'] = index;
            //设置该页的起始展示index是，页面(pageNum-1) * 每页展示数目
            ContentDataSer.overallData['listShow']['pagination']['beginListIndex'] =
                (pageNum - 1) * ContentDataSer.overallData['listShow']['screenNum'];
        }

        //滚动到页面最顶端
        $window.scrollTo(0, 0);
    };


    /**
     * 发送消息的方法
     */
    var sendDynamicInfo = function (data, type, callback, finallyCallback) {
        var param = {
            'data': JSON.stringify(data), //发送请求json数据
            'type': type, //新闻类型
        };
        $http({
            method: 'POST',
            url: OverallDataSer.urlData['frontEndHttp']['sendDynamicInfo'],
            data: ($.param(param)),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (response) {
            callback(response['data']);

        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("sendDynamicInfo: ", 600, err);

        }).finally(function () {
            finallyCallback();
        });
    };


    /**
     * 生成HTML网页头部信息
     */
    var generalHtmlHead = function (title, userName, targetCreateTime, isProduct) {
        //分别替换title，name，和 date
        var htmlHead='';
        if(isProduct){
            htmlHead = ContentDataSer.overallData['phoneView']['phoneHeadHtml'];
        }else {
            htmlHead = ContentDataSer.overallData['phoneView']['viewHeadHtml'];
        }
        var defaultTitle = ContentDataSer.overallData['phoneView']['defaultTitle'];
        var defaultName = ContentDataSer.overallData['phoneView']['defaultName'];
        var defaultDate = ContentDataSer.overallData['phoneView']['defaultDate'];
        htmlHead = htmlHead.replace(new RegExp(defaultTitle, 'g'), title);
        htmlHead = htmlHead.replace(defaultName, userName);
        htmlHead = htmlHead.replace(defaultDate, OverallGeneralSer.getTargetDateTime(targetCreateTime));
        return htmlHead
    };




    return {
        sortStickNum: sortStickNum,
        loadPageInfo: loadPageInfo,
        sendDynamicInfo: sendDynamicInfo,
        generalHtmlHead: generalHtmlHead,
        showTargetNumNewsList: showTargetNumNewsList,
        setPreNextLoadBatchData: setPreNextLoadBatchData,
        replaceSpecialCharacters: replaceSpecialCharacters,
    }
});