(function () {
    'use strict'

    angular.module('parallx.datacontroller')
        .factory('DataBus', DataBusFn);


    DataBusFn.$inject = ['$log']

    function DataBusFn() {
        var chanels = []

        return {
            registerChanel: registerChanelFn,
            registerObserver: registerObserverFn,
            flush: flushFn,
        }

        function registerChanelFn(dataService, interval) {
            var index = _findChanelWithService(dataService);

            if (index < 0) {
                chanels.push(Parallx.create(Chanels,{
                    dataServiceAsKey: dataService,
                    driver: new Parallx.DataDriver(dataService),
                    interval: interval,
                }));
            }
            // } else {
            //     $log.warn('Duplicate register Chanel to DataBus, DataService: ' + dataService);
            // }
        }

        function registerObserverFn(dataService, observers) {
            var index = _findChanelWithService(dataService);

            if (index >= 0) {
                chanels[index].driver.addObservers(observers);
            } else {
                $log.error('Chanel must be register first, DataService: ' + dataService);
            }
        }

        function flush() {
            // run loop of chanel if not running, or stop it
            chanels.forEach(function(cl) {
                if(cl.driver.hasObservers()){
                    //start it
                    if(!cl.isRunning){
                        loop(cl);
                        cl.loopId = setInterval(loop(cl), cl.interval);
                        cl.isRunning = true;
                    }
                }else{
                    // else stop it
                    if(cl.isRunning){
                        clearInterval(cl.loopId);
                        cl.isRunning = false;
                    }
                }
            });
        }

        function loop(chanel){
            chanel.driver.queryData();
        }

        function _findChanelWithService(dataService) {
            return Parallx.Utils.findInArray(chanels, function (chanel) {
                return chanel.dataServiceAsKey == dataService;
            })
        }

        /**
         * Prototype objects, code not run to here
         */

        function Chanels() {
            this.dataServiceAsKey = null;
            // DataDriver
            this.driver = null;
            // seconds
            this.interval = 0;
            this.loopId = 0;
            this.isRunning = false;
        }
    }
})();
