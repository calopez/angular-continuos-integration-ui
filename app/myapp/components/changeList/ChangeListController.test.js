/**
 * the controller needs to be loaded explicitly with require as the normal application only registers the
 * controllers inside the route definitions, which are not evaluated during testing, so they are not known to angularJS
 */
define([
    'myapp/components/change/ChangeListController'
 ],
    function (ChangeListController) {
        "use strict";
        describe("the home controller", function () {
            var ChangeList, scope ;

            beforeEach(function () {

                /**
                 * Load the required modules
                 */

                /**
                 * Injection
                 */
                angular.mock.inject(["$rootScope", "$controller", function ( $rootScope, $controller) {


                        scope = $rootScope.$new();
                        ChangeList = $controller(ChangeListController, {
                            $scope: $rootScope
                        });
        }]);
            });

            /*
             * Test default initialization variables
             */
            it("should have matching defaults", function () {

                expect(ChangeList.title).toBe('My App');

            });


        });
    }
);
