(function(){
    'use strict'

    angular
        .module('data.local', [])
        .factory('DataFileService', DataFileServiceFn)

    DataFileServiceFn.$inject = ['$http', "$log"]

    function DataFileServiceFn($http, $log){
        return {
            getData: getDataFn,
        }

        function getDataFn(fileName){
            url = "/data/"+fileName;
            
            $http.get(url)
                .then(successCallbackFn)
                .catch(failCallbackFn);
            
            function successCallbackFn(response){
                return response.data;
            }

            function failCallbackFn(error){
                $log.error("XHR Failed for getData "+ error.data);
            }
        }
    }
})();
