'use strict';

require('angular');
require('ngResource');
require('ngSanitize');
require('ngRoute');
require('ngAnimate');
require('./myapp/myapp');

var app = angular.module('app', ['ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'myapp']);

app.constant('angularMomentConfig', {
    preprocess: 'unix', // optional
});

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        template: require('./myapp/components/changeList/changeList.html'),
        controller: 'ChangeListController',
        controllerAs: 'ChangeList'
    }).otherwise({ /*  Catch-all */
        template: "404 Page Stub"
    });

}]);


module.exports = app;


/*
 Before install compass-loader
 ==================================
 brew install Caskroom/cask/xquartz
 brew install cairo

 PKG_CONFIG_PATH should be set so it reads from Xquartz path so we need to add it to ~/.profile.
 $ echo "export PKG_CONFIG_PATH=/opt/X11/lib/pkgconfig" >> ~/.profile
 $ source ~/.profile
*/
