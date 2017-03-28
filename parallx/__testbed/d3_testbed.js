(function () {
    'use strict'

    d3.selectAll("circle").transition()
        .duration(750)
        .delay(function (d, i) { return i * 10; })
        .attr("r", function (d) { return Math.sqrt(d * scale); });
})();
