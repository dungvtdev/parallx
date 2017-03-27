(function(){
    'use strict'

    angular
        .module('parallx.lib.cadgather', [])
        .factory('ParallxCadDataService', ParallxCadDataService);

    ParallxCadDataService.$inject = ["$http", "$log", 'DataFileService']

    function ParallxCadDataService($http, $log, dataAdapter){
        dataAdapter = dataAdapter || {
            getData : getData,
        }

        return {
            // default dataservice
            updateQuerySchema: updateQuerySchemaFn,
            queryData: queryDataFn,
        }

        function updateQuerySchemaFn(observeListMeta){

        }

        function queryDataFn(callback){
            dataAdapter.getData()
                .then(function(data){
                    callback(data);
                })
        }

        function getData(){
            
        }
    }
})();
