Parallx.namespace('Parallx.d3lib.Color.ColorFactory');

Parallx.d3lib.Color.ColorFactory = (function () {
    return{
        getSimpleColor: getSimpleColor,
    }

    function getSimpleColor() {
        var spectrum2001 = [
            '#2f243f',
            '#3c2c55',
            '#4a3768',
            '#565270',
            '#6b6b7c',
            '#72957f',
            '#86ad6e',
            '#a1bc5e',
            '#b8d954',
            '#d3e04e',
            '#ccad2a',
            '#cc8412',
            '#c1521d',
            '#ad3821',
            '#8a1010',
            '#681717',
            '#531e1e',
            '#3d1818',
            '#320a1b'
        ];
        var index = 0;
        return function () {
            return spectrum2001[index++];
        }
    };
})();

