/**
 * create by lxc in 2019-03-06
 */

//content 模块控制器

var contentModule = angular.module('Angular.content');
contentModule.controller('ContentCtrl', function (check, $cookies, $http,$window, $location,ContentSer,ContentDataSer,
                                                  OverallDataSer, OverallGeneralSer,InterestListSer,InterestEditSer,
                                                  StudyListSer,StudyEditSer,DynamicListSer,DynamicEditSer) {
    //检查是否登录状态
    if(!check) return;
    var content = this;
    content.navigation = ContentDataSer.navigation;
    content.overallData = ContentDataSer.overallData;
    content.interestData = ContentDataSer.interestData;
    content.studyData = ContentDataSer.studyData;
    content.dynamicData = ContentDataSer.dynamicData;

    ContentSer.parsePath(); //解析路径操作
    ContentSer.dataInit(); //数据初始化操作


    /************************** 全局配置设置 **********************************/
    /**
     * 跳转到新的路由newPath
     */
    content.chooseProjectPanel = function (newPath, subPage) {
        $location.search('subPage', subPage);
        $location.path(newPath);
    };

    /**
     * 进行栏目内部页面跳转
     * @param subPage
     */
    content.chooseProjectSubPage = function (subPage) {
        $location.search('subPage', subPage);
    };

    /**
     * 根据是否置顶的数据返回相应左偏移量
     */
    content.stickLeftOffset = function (status_cd) {
        return status_cd == 1 ? '-312px' : '-286px';
    };

    /**
     * 打开下载通道
     */
    content.downloadTargetImg = function (url) {
        ContentSer.downloadTargetImg(url);
    };


    /************************ 文章管理公共部分设置 ***************************/
    /**
     * pagination分页中，展示某页的新闻列表数据
     * @see ContentGeneralSer.showTargetNumNewsList
     */
    content.showTargetNumNewsList = function (index, pageNum) {
        ContentGeneralSer.showTargetNumNewsList(index, pageNum);
    };

    /************************ 趣文列表List设置 *****************************/
    /**
     * pagination分页中， 获取上一批次或下一批次数据
     * @see InterestListSer.getBatchRangeNewsInfo
     */
    content.getBatchRangeInterestInfo = function (changeBatch) {
        InterestListSer.getBatchRangeInterestInfo(changeBatch);
    };

    /**
     * 新创建趣文数据
     * @see InterestListSer.createNewInterest
     */
    content.createNewInterest = function () {
        InterestListSer.createNewInterest();
    };

    /**
     * 批量删除趣文操作
     * @see InterestListSer.deleteBatchNews
     */
    content.deleteBatchInterest = function () {
        InterestListSer.deleteBatchInterest();
    };

    /**
     * 搜索趣文数据
     * @see InterestListSer.searchInterest
     */
    content.searchInterest = function () {
        //点击搜素按钮的操作都视为第一次搜索
        ContentDataSer.overallData['listShow']['search_first_flag'] = 0;
        InterestListSer.searchInterest();
    };

    /**
     * 按下enter进行搜索
     * @see NewsListSer.searchNewsList()
     */
    content.searchInterestKeyDown = function (event) {
        var keyObj = event.key.toLowerCase();
        if (keyObj == 'enter') InterestListSer.searchInterest();
    };

    /**
     * 文章列表中针对每条文章的操作：如编辑，预览等
     * @see InterestListSer.interestOpt
     */
    content.interestOpt = function (optType, interestId, index) {
        InterestListSer.interestOpt(optType, interestId, index);
    };

    /************************ 见识闻趣管理编辑Edit设置 ******************************/
    /**
     * 查看预览文章数据
     * @see InterestEditSer.viewInterest
     */
    content.viewInterest = function () {
        InterestEditSer.viewInterest();
    };

    /**
     * 保存文章数据
     * @see InterestEditSer.saveInterest
     */
    content.saveInterest = function () {
        InterestEditSer.saveInterest();
    };

    /**
     * 添加外部引用视频到富文本框面板
     * @see InterestEditSer.addVideoUrlToEditor
     */
    content.addVideoUrlToEditor = function () {
        InterestEditSer.addVideoUrlToEditor();
    };

    /**
     * 检测富文本框按键按下和弹起的操作
     */
    content.checkRichEditorKeyDown = function (event) {
        InterestEditSer.checkRichEditorKeyDown(event);
    };
    content.checkRichEditorKeyUp = function (event) {
        InterestEditSer.checkRichEditorKeyUp(event);
    };

    /**
     * 打开网页图片视图，下载文章数据的所有图片
     */
    content.downloadInterestImages = function () {
        InterestEditSer.downloadInterestImages();
    };


    /************************ 研究所列表List设置 *****************************/
    /**
     * pagination分页中， 获取上一批次或下一批次数据
     * @see StudyListSer.getBatchRangeStudyInfo
     */
    content.getBatchRangeStudyInfo = function (changeBatch) {
        StudyListSer.getBatchRangeStudyInfo(changeBatch);
    };

    /**
     * 新创建研究所数据
     * @see StudyListSer.createNewStudy
     */
    content.createNewStudy = function () {
        StudyListSer.createNewStudy();
    };

    /**
     * 批量删除研究所操作
     * @see StudyListSer.deleteBatchStudy
     */
    content.deleteBatchStudy = function () {
        StudyListSer.deleteBatchStudy();
    };

    /**
     * 搜索研究所数据
     * @see StudyListSer.searchStudy
     */
    content.searchStudy = function () {
        //点击搜素按钮的操作都视为第一次搜索
        ContentDataSer.overallData['listShow']['search_first_flag'] = 0;
        StudyListSer.searchStudy();
    };

    /**
     * 按下enter进行搜索
     * @see StudyListSer.searchStudyKeyDown()
     */
    content.searchStudyKeyDown = function (event) {
        var keyObj = event.key.toLowerCase();
        if (keyObj == 'enter') StudyListSer.searchStudy();
    };

    /**
     * 文章列表中针对每条文章的操作：如编辑，预览等
     * @see StudyListSer.interestOpt
     */
    content.studyOpt = function (optType, interestId, index) {
        StudyListSer.studyOpt(optType, interestId, index);
    };

    /************************ 研究所编辑Edit设置 ******************************/
    /**
     * 查看预览文章数据
     * @see StudyEditSer.viewStudy
     */
    content.viewStudy = function () {
        StudyEditSer.viewStudy();
    };

    /**
     * 保存文章数据
     * @see StudyEditSer.saveStudy
     */
    content.saveStudy = function () {
        StudyEditSer.saveStudy();
    };

    /**
     * 添加外部引用视频到富文本框面板
     * @see StudyEditSer.addVideoUrlToEditor
     */
    content.addVideoUrlToEditor = function () {
        StudyEditSer.addVideoUrlToEditor();
    };

    /**
     * 检测富文本框按键按下和弹起的操作
     */
    content.checkRichEditorKeyDown = function (event) {
        StudyEditSer.checkRichEditorKeyDown(event);
    };
    content.checkRichEditorKeyUp = function (event) {
        StudyEditSer.checkRichEditorKeyUp(event);
    };

    /**
     * 打开网页图片视图，下载文章数据的所有图片
     */
    content.downloadStudyImages = function () {
        StudyEditSer.downloadStudyImages();
    };

    /************************ 资讯列表List设置 *****************************/
    /**
     * pagination分页中， 获取上一批次或下一批次数据
     * @see DynamicListSer.getBatchRangeDynamicInfo
     */
    content.getBatchRangeDynamicInfo = function (changeBatch) {
        DynamicListSer.getBatchRangeDynamicInfo(changeBatch);
    };

    /**
     * 新创建律所资讯数据
     * @see DynamicListSer.createNewDynamic
     */
    content.createNewDynamic = function () {
        DynamicListSer.createNewDynamic();
    };

    /**
     * 批量删除律所资讯操作
     * @see DynamicListSer.deleteBatchDynamic
     */
    content.deleteBatchDynamic = function () {
        DynamicListSer.deleteBatchDynamic();
    };

    /**
     * 搜索律所资讯数据
     * @see DynamicListSer.searchDynamic
     */
    content.searchDynamic = function () {
        //点击搜素按钮的操作都视为第一次搜索
        ContentDataSer.overallData['listShow']['search_first_flag'] = 0;
        DynamicListSer.searchDynamic();
    };

    /**
     * 按下enter进行搜索
     * @see DynamicListSer.searchDynamicKeyDown()
     */
    content.searchDynamicKeyDown = function (event) {
        var keyObj = event.key.toLowerCase();
        if (keyObj == 'enter') DynamicListSer.searchDynamic();
    };

    /**
     * 文章列表中针对每条文章的操作：如编辑，预览等
     * @see DynamicListSer.dynamicOpt
     */
    content.dynamicOpt = function (optType, dynamicId, index) {
        DynamicListSer.dynamicOpt(optType, dynamicId, index);
    };

    /************************ 资讯编辑Edit设置 ******************************/
    /**
     * 查看预览文章数据
     * @see DynamicEditSer.viewDynamic
     */
    content.viewDynamic = function () {
        DynamicEditSer.viewDynamic();
    };

    /**
     * 保存文章数据
     * @see DynamicEditSer.saveDynamic
     */
    content.saveDynamic = function () {
        DynamicEditSer.saveDynamic();
    };

    /**
     * 添加外部引用视频到富文本框面板
     * @see DynamicEditSer.addVideoUrlToEditor
     */
    content.addVideoUrlToEditor = function () {
        DynamicEditSer.addVideoUrlToEditor();
    };

    /**
     * 检测富文本框按键按下和弹起的操作
     */
    content.checkRichEditorKeyDown = function (event) {
        DynamicEditSer.checkRichEditorKeyDown(event);
    };
    content.checkRichEditorKeyUp = function (event) {
        DynamicEditSer.checkRichEditorKeyUp(event);
    };

    /**
     * 打开网页图片视图，下载文章数据的所有图片
     */
    content.downloadDynamicImages = function () {
        DynamicEditSer.downloadDynamicImages();
    };

});