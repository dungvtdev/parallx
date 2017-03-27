Parallx.namespace('Parallx.DataDriver');

Parallx.DataDriver = function (service) {
    'use strict'

    var _isDirty = false;
    var observeList = [];

    // type: DataService
    var dataService = service || null;

    function hasObserversFn() {
        return observeList && observeList.length > 0;
    }

    function addObserversFn(observers) {
        _isDirty = true;
        if (observers instanceof Array) {
            for (var i = 0; i < observers.length; i++)
                _addOneObserver(observers[i]);
        } else {
            _addOneObserver(observers)
        }
    }

    function _addOneObserver(obs) {
        if (!(obs in observeList)) {
            observeList.push(obs)
        }
    }

    // param: observe class Observe
    function removeObserversFn(observers) {
        _isDirty = true;
        if (observers == undefined) {
            observeList = []
        } else if (observers instanceof Array) {
            for (var i = 0; i < observers.length; i++)
                _removeOneObserver(observers[i]);
        } else {
            _removeOneObserver(observers);
        }
    }

    function _removeOneObserver(obs) {
        var find = observeList.indexOf(obs);
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

    function setDataServiceFn(service) {
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
            } else {
                parser = new observe.seriesParserClass(queriedData);
                parserDict[observe.seriesParserClass.name] = parser;
            }
            parser.parse(observe);
        });
    }

    Parallx.export({
        addObservers: addObserversFn,
        removeObservers: removeObserversFn,
        flushUpdate: flushUpdateFn,
        setDataService: setDataServiceFn,

        hasObservers: hasObserversFn,

        queryData: queryDataFn,
    }, this)

    return;

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
        // observeListMeta: [params, ]
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
    function Observer() {
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
};
