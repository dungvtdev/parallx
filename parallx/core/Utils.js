Parallx.namespace('Parallx.Utils');

Parallx.Utils = {
    findInArray: function(array, callback){
        if(! array){
            return -1;
        }
        for(var i = 0;i<array.length;i++){
            if(callback(array[i])){
                return i;
            }
        }
        return -1;
    },
}
