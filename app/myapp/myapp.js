/**
 * Creates the "myapp" AngularJS module
 *
 * @module myapp
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <clopez@alertlogic.com>
 *
 * @returns instance of myapp module
 *
 */
'use strict';

/* ----------------------------------------------------------------------------
*                           SERVICES
* -----------------------------------------------------------------------------*/

var services = angular.module("myapp.services", []);

services.service("ChangesAPIService", require('./shared/services/ChangesAPIService'));
services.service("PollingService", require('./shared/services/PollingService'));
services.service("FakeResponseService", require('./shared/services/FakeResponseService'));


/* ----------------------------------------------------------------------------
*                           CONTROLLERS
* -----------------------------------------------------------------------------*/

var controllers = angular.module("myapp.controllers", []);

controllers.controller("ChangeListController", require('./components/changeList/ChangeListController'));
controllers.controller("TestInfoBoxController", require('./shared/partials/testInfoBox/TestInfoBoxController'));


/* ----------------------------------------------------------------------------
*                           DIRECTIVES
* -----------------------------------------------------------------------------*/

var directives = angular.module("myapp.directives", []);

//shared
directives.directive("progressPercent", require('./shared/directives/progressPercent'));
directives.directive("simplePieChart", require('./shared/directives/simplePieChart'));
directives.directive("progressBar", require('./shared/directives/progressBar'));
directives.directive("testInfoBox", require('./shared/directives/testInfoBox'));
directives.directive("expandAccordion", require('./shared/directives/expandAccordion'));



/* ----------------------------------------------------------------------------
*                           FILTERS
* -----------------------------------------------------------------------------*/

var directives = angular.module("myapp.filters", []);

//shared
directives.filter("capitalize", require('./shared/filters/capitalize'));


/* ----------------------------------------------------------------------------
*                           APPLICATION
* -----------------------------------------------------------------------------*/

var myapp = angular.module("myapp", ['myapp.controllers' , 'myapp.services', 'myapp.directives', 'myapp.filters' ]);

module.exports = myapp;
