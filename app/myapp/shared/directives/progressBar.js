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


require('myapp/shared/partials/progressBar/progressBar.styl');
require('ngtemplate?relativeTo=/myapp/shared/partials/progressBar!myapp/shared/partials/progressBar/progressBar.html');


define([], function () {


    var progressBarDirective = function () {
        return {
            templateUrl: '/progressBar.html',
            restrict: 'E',
            scope: {
                barInfo: '=barInfo'
            },
            link: function (scope, $element) {

                var jsElement = $element.children()[0];

                var progressBar = jsElement.getElementsByClassName('progress-bar')[0],
                    progressBarNumber = jsElement.getElementsByClassName('p-bar-number')[0],
                    progresBarDesc = jsElement.getElementsByClassName('p-bar-desc')[0],
                    bar = scope.barInfo;


                jsElement.style.backgroundColor = scope.barInfo.backColor;
                jsElement.style.width = scope.barInfo.width;
                jsElement.style.height = scope.barInfo.height;

                progressBar.style.backgroundColor = scope.barInfo.frontColor;
                progressBar.style.width = scope.barInfo.coverage + '%'; // it could be dynamic but ... not necessary this time
                progressBar.style.height = scope.barInfo.height;

                progressBarNumber.style.color = scope.barInfo.coverage < 50 ? '#71AF52': '#803108';

                progressBarNumber.style.color = scope.barInfo.percentColor;
                progressBarNumber.style.width = scope.barInfo.width;

                progresBarDesc.style.width = scope.barInfo.width;
                progresBarDesc.style.color = scope.barInfo.labelColor;


            }
        };
    };

    progressBarDirective.$inject = [];

    return progressBarDirective;

});
