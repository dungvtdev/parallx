(function () {
    'use strict'

    /**
     * scope.observers co dang {
     *  method: "put"/"delete"/"post"
     * values: [ob1, ob2]}
     */
    angular.module('parallx.datacontroller')
        .directive('dataBusCore', DataBusCoreFn);

    function DataBusCoreFn() {
        return {
            restrict: 'E',
            scope: {
                dataDriver: "=",
                observers: "=",
                controllerAs: "@",
                interval: "="
            },
            template: "<div></div>",
            link: linkFn,
        }

        function linkFn(scope, elem, attrs) {
            scope.watch(scope.observers, function (newVal, oldVal) {
                if (newVal != oldVal) {
                    updateObservers(newVal);
                }
            })

            scope.watch(scope.dataDriver, function (newVal, oldVal) {
                if (newVal != oldVal) {
                    updateObservers(scope.observers)
                }
            })

            function updateObservers(observersData) {
                switch (observersData.method) {
                    case "post":
                    case "put":
                    case "delete":
                }
            }

            scope.a = 10;

            // scope[scope.controllerAs] = { a: 10 };

            setInterval(loop, scope.interval);
        }
    }

    angular.module('parallx.datacontroller')
        .directive("testDataBusCoreChart", TestDataBusCoreChart);

    function TestDataBusCoreChart(){
        return{
            restrict: "E",
            template: "<div></div>",
            scope:{
                data: "=",
            },
            link: function(scope, elem, attrs){
                scope.watch(scope.data, function(n,o){
                    elem.text(n);
                })
            }
        }
    }
})();
