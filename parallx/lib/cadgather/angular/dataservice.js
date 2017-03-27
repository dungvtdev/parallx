(function(){
    'use strict'

    angular
        .module('parallx.lib.cadgather', [])
        .factory('ParallxCadDataService', ParallxCadDataService);

    ParallxCadDataService.$inject = ["$http", "$log"]

    function ParallxCadDataService($http, $log, dataAdapter){
        dataAdapter = dataAdapter || {
            getData : getData,
        }

        return {

            // default dataservice
            updateQuerySchema: updateQuerySchemaFn,
            queryFn: queryFn,
        }

        function updateQuerySchemaFn(observeListMeta){

        }

        function queryFn(callback){
            dataAdapter.getData()
                .then(function(data){
                    callback(data);
                })
                .catch(function(error){
                    $log.warn("Can't get data in ParallxCadDataService.")
                    callback(null);
                })
        }

        function getData(){
            
        }
    }
})();
