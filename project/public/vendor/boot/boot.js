/**
 * Created by Administrator on 2016/10/12.
 */
head.load(
    '/assets/js/jquery/jquery-1.11.0.min.js',
    //'http://cdn.static.runoob.com/libs/jquery/1.11.0/jquery.min.js',

    '/assets/js/angularjs/angular.js',
    //'https://cdn.bootcss.com/angular.js/1.5.8/angular.js',

    //'vendor/angular/messages/angular-messages.min.js',
    //'https://cdn.bootcss.com/angular.js/1.5.8/angular-messages.min.js',

    '/assets/js/angularjs/angular-route.min.js',
    //'https://cdn.bootcss.com/angular.js/1.5.8/angular-route.min.js',

    '/assets/js/angularjs/angular-animate.min.js',
    //'https://cdn.bootcss.com/angular.js/1.5.8/angular-animate.min.js',

    '/assets/js/angularjs/angular-cookies.min.js',
    //'https://cdn.bootcss.com/angular.js/1.5.8/angular-cookies.min.js',

    '/assets/js/bootstrap/bootstrap.min.js',
    //'https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js',

    '/assets/js/others/md5.min.js',//md5加密
    //'https://cdn.bootcss.com/blueimp-md5/2.5.0/js/md5.min.js',//md5加密

    //富文本编辑器
    //'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.min.js', //富文本编辑器
    '/assets/js/summernote/summernote.js', //富文本编辑器, 一定要用本地的summernote.js文件，因为更改过代码库文件

    // '/assets/js/jquery/jquery-ui.js', //jquery UI 用来图片组件拖动移动操作
    // '/assets/js/jquery/jqueryui-touch-punch.js', //jquery UI 用来图片组件拖动移动操作

    /*jquery下载文件script引用*/
    'http://viewcoder.beansonbar.cn/cdn/js/jquery/Blob.js',
    'http://viewcoder.beansonbar.cn/cdn/js/jquery/FileSaver.js',
    'http://viewcoder.beansonbar.cn/cdn/js/jquery/jqueryBinaryTransport.js',

    /*overall part Angular框架全局设置*/
    'src/overall/module/overallModule.js',
    'src/overall/controller/overallController.js',
    'src/overall/service/overallDataService.js',
    'src/overall/service/overallSettingService.js',
    'src/overall/service/overallConfigService.js',
    'src/overall/service/overallGeneralService.js',
    'src/overall/service/overallService.js',
    'src/overall/directive/overallDirective.js',
    'src/overall/directive/overallUrlDirective.js',

    /*login 登录模块*/
    'src/login/module/loginModule.js',
    'src/login/controller/loginController.js',
    'src/login/service/loginDataService.js',
    'src/login/service/loginGeneralService.js',
    'src/login/service/loginService.js',
    'src/login/directive/loginDirective.js',
    'src/login/directive/loginUrlDirective.js',

    /*content 内容模块*/
    'src/content/module/contentModule.js',
    'src/content/service/contentService.js',
    'src/content/service/contentDataService.js',
    'src/content/service/contentGeneralService.js',

    'src/content/service/sub/news/interestListService.js',
    'src/content/service/sub/news/interestEditService.js',
    'src/content/service/sub/news/studyListService.js',
    'src/content/service/sub/news/studyEditService.js',
    'src/content/service/sub/news/dynamicListService.js',
    'src/content/service/sub/news/dynamicEditService.js',
    'src/content/service/sub/team/teamListService.js',
    'src/content/service/sub/team/teamEditService.js',
    'src/content/service/sub/msg/msgListService.js',
    'src/content/service/sub/msg/msgEditService.js',

    'src/content/directive/contentDirective.js',
    'src/content/directive/richTextEditorDirective.js',
    'src/content/directive/contentUrlDirective.js',
    'src/content/controller/contentController.js'


);
