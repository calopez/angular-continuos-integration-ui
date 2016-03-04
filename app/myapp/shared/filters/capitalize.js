/**
 * capitalize filter
 *
 * @module myapp
 *
 * @author Carlos A. Lopez <clopez@alertlogic.com>
 *
 * @returns instance of the capitalize filter
 *
 */

define([], function () {
"use strict";

    var capitalizeFilter = function () {
        return function (input) {

            if (input !== null){
                input = input.toLowerCase();
            }
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        };
    };

    return capitalizeFilter;

});
