var assert = require('chai').assert;
var loadEC2 = require('../src/diagramBuilder/loadEC2');

var region = 'us-east-1';
var tag = 'PROD_SERVER';

describe('testLoadEC2', function () {
    describe('EC2', function () {
        it('should return data for EC2 instances', function () {
            return loadEC2(region, tag).then(function (allData) {
                assert.isArray(allData);
                assert.isAbove(allData.length, 0);
            });
        });
    });
})
