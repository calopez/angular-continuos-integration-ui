/**
 * ChangesAPIService service provides functions to fetch information from CD System
 *
 * @module noc
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <clopez@alertlogic.com>
 *
 * @returns instance of the ChangesAPIService service
 *
 */

var ChangesAPIService = function ($http, $q, FakeResponseService) {
    'use strict';

    var url = 'https://crossover.continous.delivery.com/changes/v1';

    var fakeResponse;
    FakeResponseService.resetFakeData();
    fakeResponse = FakeResponseService.FakeRequest();

    this.Changes = function () {


        /**
         * @description get all current change list
         * @method  this.getList
         * @param   {object} list of changes
         * @returns {promise}
         */
        var getList = function () {
            var req, response, changeListDefered;

            changeListDefered = $q.defer();

            req = {
                method: 'GET',
                url: url + '/list'
            };

            response = {
                data: fakeResponse.fakeResult(),
                meta: {
                    request: req
                }
            };

            changeListDefered.resolve(response);

            //return $http(req); if we had a real api
            return changeListDefered.promise;

        };

        /**
         * @description get information of a change by id
         * @method  this.getChange
         * @param   {object} list of changes
         * @returns {promise}
         */
        var getChange = function (id) {
            var req, response, changeListDefered;

            changeListDefered = $q.defer();

            if (id === undefined) {
                throw new Error('Invalid Change Id');
            }

            req = {
                method: 'GET',
                url: url + '/change/' + id
            };

            response = {
                data: require('json!myapp/mocks/changelist.get.all.json'),
                meta: {
                    request: req
                }
            };

            changeListDefered.resolve(response);

            //return $http(req); if we had a real api
            return changeListDefered.promise;
        };

        return {
            getChangeList: getList,
            getChangeInfo: getChange
        };
    };
};

ChangesAPIService.$inject = ['$http', '$q', 'FakeResponseService'];

module.exports = ChangesAPIService;
