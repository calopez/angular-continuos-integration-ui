/**
 * progressPercent directive provides a why to update the widht of an element
 *
 * @module myapp
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <clopez@alertlogic.com>
 *
 * @returns instance of the progressPercent directive
 *
 */
"use strict";

define([], function () {


    var progressPercentDirective = function () {
        return {
            restrict: 'A',
            scope: {
                percent: '=percent',
            },
            link: function (scope, $element ) {
                $element.css('width', scope.percent + '%');

            var percent = function () {
                return scope.percent;
            };

            scope.$watch(percent, function (percent) {
                $element.css('width', scope.percent + '%');
            });

            }
        };
    };

    progressPercentDirective.$inject = [];

    return progressPercentDirective;

});
