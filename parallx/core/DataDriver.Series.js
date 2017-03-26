Parallx.namespace("Parallx.DataDriver.Series");

Parallx.DataDirver.Series = function (args) {
    'use strict'

    args = args || {};

    if (!args.name)
        throw new Parallx.Exceptions.InvalidParamsError('Data Series must have name');

    this.name = args.name;
    this.caption = args.caption || "";

    this.values = args.values || [];
}

Parallx.namespace("Parallx.DataDriver.TimeValueParseFactory");

Parallx.DataDriver.TimeValueParseFactory = (function () {
    'use strict'

    var Type = {
        xy: 0,
        array: 1,
    }
    function getParser(type) {
        if(type == Type.xy){
            return new TypeXY();
        }else{
            return new TypeArray();
        }
    }

    function TypeXY(){
        this.time = function(item){
            return item.x;
        }
        this.value = function(item){
            return item.y;
        }
    }

    function TypeArray(){
        this.time = function(item){
            return item[0];
        }
        this.value = function(item){
            return item[1];
        }
    }

    return {
        getParser: getParserFn,
        Type : Type
    }
})();
