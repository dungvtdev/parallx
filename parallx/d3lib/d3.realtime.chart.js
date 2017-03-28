/**
 * Require d3js version 3.1.6
 * don vi: seconds
 */

Parallx.namespace('Parallx.d3lib.Chart.RealTimeChart');

Parallx.d3lib.Chart.RealTimeChart = function (params) {
    var _width = params['width'] || 500,
        _height = params['height'] || 200,
        _limit = params['limit'] || 60,
        _duration = params['duration'] || 0.75,
        _timeNow = params['timeNow'] || Date.now() / 1000,
        _element = params['element'];

    if (!_element) {
        throw new ReferenceError("Parallx Chart must have element in params");
    }

    d3.select(_element).attr('class', 'graph');

    // dinh nghia groups
    var groups = {
        name: {
            value: 0,
            color: 'orange',
            data: [],
            dataPool: [],
        }
    }

    groups = {}

    var colorGenerate = Parallx.d3lib.Color.ColorFactory.getSimpleColor();

    // init

    // x do rong = _limit -1 de che di phan tu cuoi cung, giam cam giac bi giat
    var x = d3.time.scale()
        .domain([_timeNow - (_limit - 1) * _duration, _timeNow - _duration])
        .range([0, _width]);

    var y = d3.scale.linear()
        .domain([0, 100])
        .range([_height, 0])

    var line = d3.svg.line()
        .interpolate('basis')
        .x(function (d, i) {
            return x(d[0]);
        })
        .y(function (d) {
            return y(d[1]);
        })

    var svg = d3.select(_element).append('svg')
        .attr('class', 'chart')
        .attr('width', _width)
        .attr('height', _height + 50)

    var axis = svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + _height + ')')
        .call(x.axis = d3.svg.axis().scale(x).orient('bottom'))

    var paths = svg.append('g')

    // test
    var values_ = [];
    var t_ = 0;
    for (var i = 0; i < 100; i++) {
        values_.push([t_, Math.random() * 100]);
        t_ += Math.floor(Math.random() * 2) + 1;
    }
    updateGroups({
        "test": {
            values: values_
        }
    });
    _timeNow = 0;

    setInterval(tick, _duration * 1000);
    // tick()

    // method

    function updateGroups(ingroups) {
        for (name in ingroups) {
            _addGroup(name, ingroups[name].values);
        }
    }

    function tick() {
        _timeNow += _duration;

        for (var name in groups) {
            // add new values
            var group = groups[name];
            var cur = null;
            while (group.dataPool.length > 0) {
                cur = group.dataPool[0];
                if (cur[0] <= _timeNow) {
                    console.log("push");
                    console.log(cur);
                    group.data.push(cur);
                    group.dataPool.shift();
                } else {
                    break;
                }
            }
            while (group.data.length > _limit) {
                group.data.shift();
            }

            // redraw
            group.path.attr('d', line);
        }

        // Shift domain
        x.domain([_timeNow - (_limit - 1) * _duration, _timeNow - _duration])

        // Slide x-axis left
        axis.transition()
            .duration(_duration * 1000)
            .ease('linear')
            .call(x.axis)

        // Slide paths left
        paths.attr('transform', 'transform(0,0)')
            .transition()
            .duration(_duration * 1000)
            .ease('linear')
            // translate = - duration/(do dai x)
            .attr('transform', 'translate(' + x(_timeNow - _limit * _duration) + ')')

        // console.log(x(_timeNow - (_limit - 2) * _duration))
    }

    function _addGroup(name, values) {
        if (name in groups) {
            _appendData(groups[name], values);
        } else {
            var group = groups[name] = {
                value: 0,
                color: colorGenerate(),
                dataPool: values,
                data: [],
            }
            group.path = paths.append('path')
                .data([group.data])
                .attr('class', 'group')
                .style('stroke', group.color);
        }
    }

    // them data neu moi
    function _appendData(group, values) {
        if (!(group && values))
            return;

        var last = null;
        if (group.dataPool.length > 0)
            last = group.dataPool[group.dataPool.length - 1];
        else if (group.data.length > 0) {
            last = group.data[group.data.length - 1];
        }

        if (!last)
            group.dataPool = values;
        else {
            for (var i = 0; i < values.length; i++) {
                if (values[i][0] > last[0]) {
                    group.dataPool.concat(values.slice(i));
                    break;
                }
            }
        }
    }
}
