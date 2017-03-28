/**
 * don vi seconds
 */
(function(){
    'use strict'

    angular
        .module('parallx.dataview.timeSeriesChart')
        .directive('timeSeriesChart', TimeSeriesChartFn);

    function TimeSeriesChartFn(){
        return{
            restrict: "E",
            template: "<div></div><p>Chart Here</p>",
            scope:{
                timeStartBack: '=',
            },
            link: linkFn,
        }

        function linkFn(scope, elem, attrs){
            var width = attrs['chart-width'];
            var height = attrs['chart-height'];
            var limit = attrs['chart-x-limit'];
            var duration = attrs['chart-duration'];
            var chart_element = elem.children()[0];
            var timeStart = Date.now()-scope.timeStartBack;

            var chart = new Parallx.d3lib.Chart.RealTimeChart({
                width: width,
                height: height,
                limit: limit,
                duration: duration,
                element: chart_element,
                timeNow: timeStart,
            })
        }
    }
})();
