(function(){
    'use strict'

    angular
        .module('testapp', [
            'parallx',
            'data.local',
        ])
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['DataBus', 'ParallxCadDataService']

    function MainCtrl(dataBus, dataService){
        console.log("hello world")

        dataBus.registerChanel(dataService, 2000);

        var observer1 = {
            name : "data1",
            params : null,
            onData : function(){},
            seriesParserClass: Parallx.Lib.Cadgather.SeriesParser,
        }

        dataBus.registerObserver(dataService, observer1);
        dataBus.flush();
    }
})();