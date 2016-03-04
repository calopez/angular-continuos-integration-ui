/**
 * FakeResonseService service provides fake data about change list
 * I would like to have built something better like random data and may be implement state
 * pathern instead of 'if if if' but when I realized the complexity
 * it was too late I had to go on for the sake of get the job done.
 * @module noc
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <clopez@alertlogic.com>
 *
 * @returns instance of the FakeResonseService service
 *
 */

var FakeResonseService = function () {
    'use strict';

    var requestNumber = 0;

    var state = {
        PENDING: 'pending',
        RUNNING: 'running',
        ACCEPTED: 'accepted',
        COMPLETED: 'completed',
        REJECTED: 'rejected'
    };

    var step = {
        UNDEFINED: 'undefined',
        METRICS: 'metrics',
        BUILD: 'build',
        UNITTEST: 'unittest',
        FUNCTEST: 'functest'
    };

    var nextResponse = function () {

        var nextStep = function (nextStp) {
            if (this[this.step].progress >= 10) {

                this[this.step].succeed = true;

                if (this.step === this.endStep) {
                    this.state = this.endState;
                    if (this.endState === state.REJECTED) {
                        this[this.step].succeed = false;
                    }
                } else {
                    this.step = nextStp;
                }

                return;
            } else {
                this[this.step].progress += 2;
            }
        };

        // Apply delay if there is
        if (this.state === state.PENDING) {
            this.step = step.METRICS;

            if (this.delay > requestNumber) {
                return;
            }

        }

        if (this.step === step.METRICS) {
            this.state = state.RUNNING;
            nextStep.call(this, step.BUILD);
            return;
        }

        if (this.step === step.BUILD) {
            this.build.date = Date.now();
            nextStep.call(this, step.UNITTEST);
            return;
        }

        if (this.step === step.UNITTEST) {
            nextStep.call(this, step.FUNCTEST);
            return;
        }

        if (this.step === step.FUNCTEST) {
            nextStep.call(this, step.FUNCTEST);
            return;
        }

    };

    var createResponseObject = function () {

        var NewObj, responseObj;

        responseObj = Object.create(Response);

        // get a duplicated object
        NewObj = responseObj.toJson();

        // add functions
        NewObj.nextResponse = nextResponse;
        NewObj.toJson = responseObj.toJson;
        NewObj.init = function (type, id, owner, settings) {
            this.type = type;
            this.id = id;
            this.owner = owner;
            this.state = state.PENDING;
            this.timeStarted = Date.now();
            this.endStep = settings.step;
            this.endState = settings.state;
            this.step = step.UNDEFINED;
            this.delay = settings.delay || 0;

        };

        return Object.create(NewObj);
    };


    var Response = {
        timeStarted: undefined,
        metrics: {
            succeed: undefined,
            progress: 0,
            details: [
                {
                    name: 'test',
                    score: {
                        current: 64,
                        past: 60
                    }
                },
                {
                    name: 'maintainability',
                    score: {
                        current: 53,
                        past: 40
                    }
                },
                {
                    name: 'security',
                    score: {
                        current: 64,
                        past: 64
                    }
                },
                {
                    name: 'workmanship',
                    score: {
                        current: 72,
                        past: 72
                    }
                }
            ]
        },
        build: {
            succeed: undefined,
            progress: 0,
            date: Date.now()
        },
        unittest: {
            succeed: undefined,
            progress: 0,
            passed: 142,
            failed: 10,
            acceptanceCriteria: 0.7
        },
        functest: {
            succeed: undefined,
            progress: 0,
            passed: 4321,
            failed: 2145,
            acceptanceCriteria: 0.7

        },
        toJson: function () {
            var result = {
                id: this.id,
                type: this.type,
                owner: this.owner,
                state: this.state,
                timeStarted: this.timeStarted,
                metrics: this.metrics,
                build: this.build,
                unittest: this.unittest,
                functest: this.functest
            };

            return JSON.parse(JSON.stringify(result));
        }
    };


    var fw_432459,
        fw_432460,
        fw_432461,
        fw_432462,
        build_tenrox1234,
        build_tenrox12345;

    this.resetFakeData = function () {


        fw_432459 = createResponseObject();
        fw_432460 = createResponseObject();
        fw_432461 = createResponseObject();
        fw_432462 = createResponseObject();

        // Builds
        build_tenrox1234 = createResponseObject();
        build_tenrox12345 = createResponseObject();


        // FireWalls
        fw_432459.init('firewall', '432459', 'sammy', {
            step: step.FUNCTEST,
            state: state.ACCEPTED,
            delay: 5
        });
        fw_432460.init('firewall', '432460', 'sammy', {
            step: step.METRICS,
            state: state.REJECTED,
            delay: 30

        });
        fw_432461.init('firewall', '432461', 'sammy', {
            step: step.METRICS,
            state: state.REJECTED
        });
        fw_432462.init('firewall', '432462', 'jtuck', {
            step: step.FUNCTEST,
            state: state.ACCEPTED,
            delay: 25

        });
        // Builds
        build_tenrox1234.init('build', 'Tenrox-R1_1234', '', {
            step: step.FUNCTEST,
            state: state.COMPLETED,
            delay: 8
        });
        build_tenrox12345.init('build', 'Tenrox-R1_1235', '', {
            step: step.FUNCTEST,
            state: state.COMPLETED,
            delay: 50
        });

    };

    this.FakeRequest = function () {


        /**
         * @description get all current change list
         * @method  this.getList
         * @param   {object} list of changes
         * @returns {promise}
         */
        var response = function () {

            var list = [fw_432459, fw_432460, fw_432461, fw_432462, build_tenrox1234, build_tenrox12345];

            // Create response for the current request
            requestNumber++;
            fw_432459.nextResponse();
            fw_432460.nextResponse();
            fw_432461.nextResponse();
            fw_432462.nextResponse();
            build_tenrox1234.nextResponse();
            build_tenrox12345.nextResponse();
            // those completed accepted or rejected won't be returning next request

            // TODO: return info only of those that are pending or running

            // fake response
            return list.map(function (change) {
                return change.toJson();
            });

        };



        return {
            fakeResult: response
        };
    };
};

//FakeResonseService.$inject = ['$http', '$q'];

module.exports = FakeResonseService;
