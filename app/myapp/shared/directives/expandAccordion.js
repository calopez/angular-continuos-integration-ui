/**
 * expandAccordion directive
 *
 * @module myapp
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <clopez@alertlogic.com>
 *
 * @returns instance of the expandAccordion directive
 *
 */
"use strict";

define([], function () {


    var expandAccordionDirective = function () {
        return {
            restrict: 'A',
            scope: {
                expandClass: '@expandClass',
                accordionItemId: '@accordionItemId',
                current: '=current'
            },
            link: function ($scope, $element, $attrs) {
//                var lastOne;

                $scope.$on('change-list/item/expand-accordion', function (event, data) {


                    if(data.itemId === $scope.accordionItemId ) {
                        console.log('varias veces:'+$scope.accordionItemId);
//                        lastOne = $element;
                        $element.addClass($scope.expandClass);
                    }
                });



            }
        };
    };

    expandAccordionDirective.$inject = [];

    return expandAccordionDirective;

});
