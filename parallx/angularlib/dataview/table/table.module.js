(function(){
    'use strict'

    angular
        .module('parallx.dataview.table', [])
        .directive('DataTable', DataTableFn)

    function DataTableFn(){
        return{
            restrict: "E",
            template: "<div></div>",
            scope: {
                'data': '=',
                'interval': '=',
            },
            link: linkFn,
        }

        function linkFn(scope, elem, attr){
            scope.$watch(scope.data, function(newVal, oldVal){
                if(newVal != oldVal){
                    updateTable();
                }
            })
        }
    }
})();
