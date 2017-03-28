(function () {
    'use strict'

    angular
        .module('data.local', [])
        .factory('DataFileService', DataFileServiceFn)

    DataFileServiceFn.$inject = ['$http', "$log"]

    function DataFileServiceFn($http, $log) {
        return {
            getData: getDataFn,
        }

        function getDataFn() {
            var fileName = 'data01';

            var url = "/data_test/" + fileName + ".txt";

            return $http.get(url)
                .then(successCallbackFn)
                .catch(failCallbackFn);

            function successCallbackFn(response) {
                return response.data;
            }

            function failCallbackFn(error) {
                $log.error("XHR Failed for getData " + error.data);
            }
        }
    }
})();
