Parallx.namespace('Parallx.DataDriver');

Parallx.DataDriver = (function () {
    'use strict'

    var _isDirty = false;
    var observeList = [];

    // type: DataService
    var dataService = null;

    function addObserveFn(observe) {
        _isDirty = true;
        if (!(observe in observeList)) {
            observeList.push(observe)
        }
    }

    // param: observe class Observe
    function removeObserveFn(observe) {
        _isDirty = true;
        var find = observeList.indexOf(observe);
        if (find >= 0) {
            observeList.splice(find, 1);
        }
    }

    function flushUpdateFn() {
        if (!_isDirty)
            return;
        dataService.updateQuerySchema();
        _isDirty = false;
    }

    function setDataService(service) {
        dataService = service;
    }

    function queryDataFn() {
        if (_isDirty)
            flushUpdateFn()

        dataService.queryData(_parseData);
    }

    function _parseData(queriedData) {
        var parserDict = {}
        var parser = null;
        observeList.forEach(function (observe) {
            if (observe.seriesParserClass.name in parserDict) {
                parser = parserDict[observe.seriesParserClass.name]
            }else{
                parser = new observe.seriesParserClass(queriedData);
                parserDict[observe.seriesParserClass.name] = parser;
            }
            
            parser.parse(observe);
        });
    }

    return {
        addObserve: addObserveFn,
        removeObserve: removeObserveFn,
        flushUpdate: flushUpdateFn,
        setDataService: setDataServiceFn,

        queryData: queryDataFn,
    }

    /**
     *  Prototypes use in this class, the program not run to here normally
     * ***********************************************************************
     **/

    /**
     * Service connect toi data, tao query, call query tra lai data
     */
    function DataService() {
        // update lai khi them, bot observe, truyen vao meta cua observes de lay
        // thong tin
        this.updateQuerySchema = function (observeListMeta) { }

        // lay du lieu, dong thoi goi callback khi xong
        this.queryData = function (callback) { }
    }

    /**
        * observe chua thong tin: {
        *  callback
        *  SeriesParser: class object dung de parse du lieu, nhieu observe dung
        *              1 class se dung chung 1 object vi cach thuc parse giong nhau
        *  params: params truyen vao SeriesParser khi parse
        *  name truyen vao onData(name)
        * }
        */
    function Observe() {
        this.name = ""
        this.params = null;
        this.onData = null;
        this.seriesParserClass = null;
    }

    function SeriesParser(queriedData) {
        // build schema trong constructor de parse data

        this.parse = function (observe) {
            observe.onData(observe.name, null);
        }
    }
})();
