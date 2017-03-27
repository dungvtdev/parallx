(function(){
    'use strict'

    angular
        .module('parallx.lib.cadgather', [])
        .factory('ParallxCadDataService', ParallxCadDataService);

    ParallxCadDataService.$inject = ["$http"]

    function ParallxCadDataService($http, dataAdapter){
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

                })
                .catch(function(error){
                    
                })
        }

        function getData(){
            
        }
    }
})();
