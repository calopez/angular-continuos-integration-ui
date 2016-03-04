/**
 * TestInfoBoxController
 *
 * @module myapp
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <karloslopez@me.com>
 *
 * @returns instance of the TestInfoBoxController
 *
 */
'use strict';

require('./testInfoBox.styl');

var TestInfoBoxController = function ($scope) {

    /** ------------------------------------------------------------------------------
     *                                SCOPE
     * -------------------------------------------------------------------------------- */

    var TestInfo = this;

    TestInfo.data = $scope.testInfo;

    TestInfo.coveragePercent = Math.round(TestInfo.data.passed * 100 / (TestInfo.data.passed + TestInfo.data.failed));

    TestInfo.pieChartData = [
        {
            result: 'succeed',
            number: $scope.testInfo.passed
            },
        {
            result: 'passed',
            number: $scope.testInfo.failed
            }
    ];

    TestInfo.chartSettings = {
        height: 105,
        width: 110,
        strokeColor: '#fff'
    };

    TestInfo.progressBarSettings = {
        height: '29px',
        width: '160px',
        backColor: '#F5CCB1',
        frontColor: '#C7E1B8',
        coverage: TestInfo.coveragePercent,
        percentColor: '#314C1A',
        labelColor: '#53625C'
    };




    /** ------------------------------------------------------------------------------
     *                                HELPERS
     * -------------------------------------------------------------------------------- */

};

TestInfoBoxController.$inject = ['$scope'];

module.exports = TestInfoBoxController;
