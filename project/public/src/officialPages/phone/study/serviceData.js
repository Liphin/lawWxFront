/**
 * create by lxc on 2019年03月20日
 */

var app = angular.module('myApp');

app.factory('MyData',function () {
    //var serverHost = 'http://qidailaw.liphin.com';
    var serverHost = 'http://gntqant.com';
    var frontSerPort = 80;
    var backSerPort = 8085;

    var maxNum = '2088-01-01 00:00:00';
    var htmlBaseUrl = serverHost+":"+frontSerPort+"/dynamicinfo/html/";
    var getNewsListToPh = serverHost+":"+backSerPort+"/getNewsListToPh";
    var searchNews = serverHost + ":" + backSerPort + "/searchNews"; //搜索标题新闻
    var coverImgBaseUrl = serverHost+":"+frontSerPort+"/dynamicinfo/coverimg/";


    var requestDataErrorMsg = "尊敬的客户，服务异常，请稍后重试";

    var overallData = {
        title: '研究所',
        param: [], //记录类型
        loadData: false, //标识是否正在加载新闻数据
        agentId: '',//新闻的应用号
        search: '',//内容搜索功能
        listShow: {
            'subType':[
                {key:20,name: '婚姻继承'},
                {key:21,name: '房产建筑'},
                {key:22,name: '劳动交通'},
            ],
            'showFlag':{
                20:true,
                21:false,
                22:false,
            },
            'showNow': 20,
        },
        searchFlag: false, //判断是否搜索
    };

    var carouselList = {
        20:[],
        21:[],
        22:[],
    };

    var newsList = [];

    var carouselData = {
        carousel_1:{
            'url':'',
            'title':'',
            'timestamp':'',
            'flag_1':false,
        },
        carousel_2:{
            'url':'',
            'title':'',
            'timestamp':'',
            'flag_2':false,
        },
        carousel_3:{
            'url':'',
            'title':'',
            'timestamp':'',
            'flag_3':false,
        },
    };



    return {
        overallData:overallData,
        maxNum:maxNum,
        newsList:newsList,
        carouselList:carouselList,
        carouselData:carouselData,
        htmlBaseUrl:htmlBaseUrl,
        coverImgBaseUrl:coverImgBaseUrl,
        getNewsListToPh:getNewsListToPh,
        searchNews:searchNews,
        requestDataErrorMsg:requestDataErrorMsg,
    }
    
});