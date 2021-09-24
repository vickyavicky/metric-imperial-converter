const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    suite('Function convertHandler.getNum(input)', function () {

        test('Whole number input', function (done) {
            let input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });

        test('Decimal number input', function (done) {
            let input = '32.2L';
            assert.equal(convertHandler.getNum(input), 32.2);
            done();
        });

        test('Fractional input', function (done) {
            let input = '1/3L';
            assert.equal(convertHandler.getNum(input), 1 / 3);
            done();
        });

        test('Fractional input with decimal', function (done) {
            let input = '1.2/3.5L';
            assert.equal(convertHandler.getNum(input), 1.2 / 3.5);
            done();
        });

        test('Error on a double-fraction', function (done) {
            let input = '1/3/3L';
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });

        test('Default to a numerical input of 1 when no numerical input is provided', function (done) {
            let input = 'L';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });

    });

    suite('Function convertHandler.getNum(input)', function () {

        test('For Each Valid Unit Inputs', function (done) {
            let input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG",];
            let output = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg",];
            input.forEach(function (unit, index) {
                assert.equal(convertHandler.getUnit(unit), output[index]);
            });
            done();
        });

        test('Error for an invalid input unit', function (done) {
            let input = "gallon"
            assert.equal(convertHandler.getUnit(input), undefined);
            done();
        });

        test('Correct return unit for each valid input unit', function (done) {
            let input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG",];
            let output = ["L", "gal", "km", "mi", "kg", "lbs", "L", "gal", "km", "mi", "kg", "lbs",];
            input.forEach(function (unit, index) {
                assert.equal(convertHandler.getReturnUnit(unit), output[index]);
            });
            done();
        });

        test('Correctly return the spelled-out string unit for each valid input unit', function (done) {
            let input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG",];
            let output = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms", "gallons", "liters", "miles", "kilometers", "pounds", "kilograms",];
            input.forEach(function (unit, index) {
                assert.equal(convertHandler.spellOutUnit(unit), output[index]);
            });
            done();
        });

    });

    suite('Function convertHandler.convert(num, unit)', function() {
        test('correctly convert gal to L', function (done) {
            let input = [5, "gal"];
            assert.equal(convertHandler.convert(input[0], input[1]), 18.92705)
            done();
        });

        test('correctly convert L to gal', function (done) {
            let input = [18.92705, "l"];
            assert.equal(convertHandler.convert(input[0], input[1]), 5)
            done();
        });

        test('correctly convert mi to km', function (done) {
            let input = [3.1, "mi"];
            assert.equal(convertHandler.convert(input[0], input[1]), 4.98895)
            done();
        });

        test('correctly convert km to mi', function (done) {
            let input = [4.98895, "km"];
            assert.equal(convertHandler.convert(input[0], input[1]), 3.1)
            done();
        });

        test('correctly convert lbs to kg', function (done) {
            let input = [2, "lbs"];
            assert.equal(convertHandler.convert(input[0], input[1]), 0.90718)
            done();
        });

        test('correctly convert kg to lbs', function (done) {
            let input = [0.907184, "kg"];
            assert.equal(convertHandler.convert(input[0], input[1]), 2)
            done();
        });
    });

});