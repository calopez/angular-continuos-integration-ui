/**
 * BubbleChart directive provides facilities to create bubble charts
 * source: http://bl.ocks.org/mbostock/3887235
 * @module noc
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <clopez@alertlogic.com>
 *
 * @returns instance of the bubbleChart directive
 *
 * @copyright Alert Logic, Inc 2015
 *
 */
"use strict";

define([], function () {

    var simplePieChartDirective = function () {

        var restrict = 'A',
            scope = {
                data: '=chartData',
                settings: '=settings',
                colors: '=chartColors'
            },
            simplePieChartLink;

        simplePieChartLink = function (scope, element) {

            var d3 = require('d3');

            var drawPieChart = function (chart) {
                /** -----------------------------------------------------------
                 *  Pie Chart
                 ** -----------------------------------------------------------*/
                var width = scope.settings.width,
                    height = scope.settings.height,
                    radius = Math.min(width, height) / 2;

                var color = d3.scale.ordinal()
                    .range(scope.colors);

                var arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function (d) {
                        return d.number;
                    });

                var svg = d3.select(element[0]).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


                chart.data.forEach(function (d) {
                    d.number = +d.number;
                });

                var g = svg.selectAll(".arc")
                    .data(pie(chart.data))
                    .enter().append("g")
                    .attr("stroke", scope.settings.strokeColor);

                g.append("path")
                    .attr("d", arc)
                    .style("fill", function (d) {
                        return color(d.data.result);
                    });

                g.append("text")
                    .attr("transform", function (d) {
                        return "translate(" + arc.centroid(d) + ")";
                    })
                    .attr("dy", ".35em")
                    .style({ // someone could help with this bold text (rage-guy)
                        "text-anchor": "middle",
                        "font-size": ".7rem",
                        "font-width": "100",
                        //                   "stroke-width": "1px",
                        "stroke": "#000"
                    })
                    .text(function (d) {
                        return d.data.number;
                    });
            };

            /** -----------------------------------------------------------
             *  Watch
             ** -----------------------------------------------------------*/

            var data = function () {
                return scope.data;
            };

            scope.$watch(data, function (data) {
                drawPieChart({data: data});
            });



        };

        simplePieChartLink.$inject = [];

        return {

            restrict: restrict,
            scope: scope,
            link: simplePieChartLink
        };


    };

    simplePieChartDirective.$inject = [];

    return simplePieChartDirective;

});
