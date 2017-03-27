Parallx.namespace('Parallx.Lib.Cadgather.SeriesParser');

Parallx.Lib.Cadgather.SeriesParser = function (queriedData) {
    this.parse = function (observer) {
        observer.onData(observer.name, queriedData);
    }
}
