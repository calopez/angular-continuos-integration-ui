/**
 * testInfoBox directive provides a witget to show information about the result of tests (functional/unittest)
 *
 * @module myapp
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <clopez@alertlogic.com>
 *
 * @returns instance of the testInfoBox directive
 *
 */
"use strict";


require('myapp/shared/partials/testInfoBox/testInfoBox.styl');
require('ngtemplate?relativeTo=/myapp/shared/partials/testInfoBox!myapp/shared/partials/testInfoBox/testInfoBox.html');


define([], function () {


    var testInfoBoxDirective = function () {
        return {
            templateUrl: '/testInfoBox.html',
            restrict: 'E',
            scope: {
                testInfo: '=testInfo'
            },
            controller: 'TestInfoBoxController',
            controllerAs: 'TestInfo',
            link: function (scope, $element) {


                //                {
                //                    succeed: undefined,
                //                    progress: 0,
                //                    passed: 4321,
                //                    failed: 2145,
                //                    coverage: 0.23
                //                }

                var jsElement = $element.children()[0],
                    bigNumber = jsElement.getElementsByClassName('big-number')[0],
                    test = scope.testInfo;

                test.coveragePercent =  Math.round(test.passed * 100 / (test.passed + test.failed));

                bigNumber.style.color = test.acceptanceCriteria * 100 > test.coveragePercent ? '#BE9026': '#A4C852';

//                jsElement.style.backgroundColor = scope.settings.backColor;
//                progressBar.style.backgroundColor = scope.settings.frontColor;

//acceptanceCriteria:
                //var myElement = document.querySelector("#superman");
                //myElement.style.backgroundColor = "#D93600";

                //                getCSSProperty = function (el, property) {
                //                var style = $window.getComputedStyle(el[0]);
                //                return style.getPropertyValue(property);
                //            };

                //                $element.css('width', $scope.percent + '%');
                //                $element.css('width', $scope.percent + '%');
            }
        };
    };

    testInfoBoxDirective.$inject = [];

    return testInfoBoxDirective;

});
