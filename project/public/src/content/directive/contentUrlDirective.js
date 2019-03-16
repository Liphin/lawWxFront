/**
 * create by lxc in 2019-03-06
 */

var contentModule = angular.module('Angular.content');

/**
 * 设置见识闻趣页面
 */
contentModule.directive('contentInterestArticle', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/news/interestArticle.html'
    };
}]);

contentModule.directive('interestArticleEdit', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/news/opt/interestArticleEdit.html'
    };
}]);

contentModule.directive('interestArticleList', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/news/opt/interestArticleList.html'
    };
}]);


/**
 * 设置研究所页面
 */
contentModule.directive('contentStudyArticle', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/news/studyArticle.html'
    };
}]);

contentModule.directive('studyArticleEdit', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/news/opt/studyArticleEdit.html'
    };
}]);

contentModule.directive('studyArticleList', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/news/opt/studyArticleList.html'
    };
}]);


/**
 * 设置律所互动页面
 */
contentModule.directive('contentLawfirmDynamic', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/news/lawfirmDynamic.html'
    };
}]);

contentModule.directive('lawfirmDynamicEdit', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/news/opt/lawfirmDynamicEdit.html'
    };
}]);

contentModule.directive('lawfirmDynamicList', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/news/opt/lawfirmDynamicList.html'
    };
}]);

/**
 * 设置团队人员页面
 */
contentModule.directive('contentTeam', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/team/team.html'
    };
}]);

contentModule.directive('teamEdit', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/team/opt/teamEdit.html'
    };
}]);

contentModule.directive('teamList', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/team/opt/teamList.html'
    };
}]);

/**
 * 设置留言页面
 */
contentModule.directive('contentMsg', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/msg/msg.html'
    };
}]);

contentModule.directive('msgEdit', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/msg/opt/msgEdit.html'
    };
}]);

contentModule.directive('msgList', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/sub/msg/opt/msgList.html'
    };
}]);

/**
 * 设置手机预览页面
 */
contentModule.directive('phoneView', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/common/phoneView.html'
    };
}]);

/**
 * 公共页面方法
 */
contentModule.directive('info', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/common/info.html'
    };
}]);
contentModule.directive('downloadImg', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/content/tmpl/common/downloadImg.html'
    };
}]);
