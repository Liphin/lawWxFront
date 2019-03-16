/**
 * Created by Administrator on 2018/2/28.
 */
var overallModule = angular.module('Angular');

/**
 * Select默认绑定的是字符串，需要把数字和字符串相互转换
 */
overallModule.directive('convertToNumber', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return val != null ? parseInt(val, 10) : null;
            });
            ngModel.$formatters.push(function (val) {
                return val != null ? '' + val : null;
            });
        }
    };
}]);

/**
 * 页面resize时调用该方法
 */
overallModule.directive('resize', ['$window', 'OverallDataSer', 'ContentDataSer','ContentHqDataSer', function ($window, OverallDataSer, ContentDataSer,ContentHqDataSer) {

    /**
     * 屏幕宽高变换
     * @param w
     */
    var resizeUpdateInfo = function (w) {
        //对Overall数值进行重新复制
        OverallDataSer.overallData['screen']['width'] = w.innerWidth;
        OverallDataSer.overallData['screen']['height'] = w.innerHeight;
        var targetHeight = w.innerHeight > OverallDataSer.overallData['maxHeight'] ?
            OverallDataSer.overallData['maxHeight'] : w.innerHeight;
        OverallDataSer.overallData['targetHeight'] = targetHeight;
        console.log(OverallDataSer.overallData);
    };

    return function (scope, element) {
        var w = angular.element($window);
        //bind 和 resize事件都
        w.bind('load , resize', function () {
            scope.$apply(function () {
                //传递$window，和传递w，结果不一样
                resizeUpdateInfo($window);
            });
        });
    }
}]);


/**
 * 按钮设置是否为禁止状态
 */
overallModule.directive('btnDisableSetting', [function () {
    return {
        restrict: 'A',
        scope: {
            btnDisableSetting: '@',
        },

        link: function (scope, element, attrs) {
            scope.$watch('btnDisableSetting', function (newValue, oldValue) {
                newValue=='true'? element.removeAttr('disabled'):element.attr('disabled', 'disabled');
            });
        }
    }
}]);


