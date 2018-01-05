var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;
var loadFromAWS = require('../src/diagramBuilder/loadFromAWS');

var region = 'us-east-1';
var tag = 'PROD_SERVER';

describe('loadFromAWS', function () {
    describe('EC2', function () {
        it('should return data for Elastic Load Balances', function () {
            return loadFromAWS(region, tag, "EC2").then(function (allData) {
                assert.isObject(allData);
                assert.isAbove(allData.Tags.length, 0);
            });
        });
    });

    describe('ELB', function () {
        it('should return data for Elastic Load Balances', function () {
            return loadFromAWS(region, tag, "ELB").then(function (allData) {
                assert.isObject(allData);
            });
        });
    });

    describe('RDS', function () {
        it('should return data for Elastic Load Balances', function () {
            return loadFromAWS(region, tag, "RDS").then(function (allData) {
                console.log(allData);
                assert.isAbove(allData.DBSecurityGroups.length, 0);
            });
        });
    });

    describe('other', function () {
        it('AWS should return data for Elastic Load Balances', function () {
            return loadFromAWS(region, tag, "other").then(function (allData) {
                assert.isObject(allData);
                assert.isAbove(allData.ResourceTagMappingList.length, 0);
            });
        });
    });
});