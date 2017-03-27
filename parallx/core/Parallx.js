var Parallx = {
    namespace: function (namespace, obj) {

        var parts = namespace.split('.');

        var parent = Rickshaw;

        for (var i = 1, length = parts.length; i < length; i++) {
            var currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }
        return parent;
    },

    keys: function (obj) {
        var keys = [];
        for (var key in obj) keys.push(key);
        return keys;
    },

    extend: function (destination, source) {

        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    },

    clone: function (obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    export: function(exportObject, this_obj){
        for(var key in exportObject){
            this_obj[key] = exportObject[key];
        }
    },

    inherit: function(prototype, extend){
        Parallx.export(extend, Parallx.clone(prototype));
    },

    create: function(ctor, options){
        Parallx.export(options, new ctor());
    }
}
