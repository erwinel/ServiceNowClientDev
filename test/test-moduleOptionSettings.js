"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsTypeCommander_1 = require("../compiled/JsTypeCommander");
describe("Testing module options settings", function () {
    describe("Testing JsTypeCommander.getDefaultLineSeparatorSequence()", function () {
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).toBeDefined();
            expect(result).toBe("\n");
        });
    });
    describe("Testing JsTypeCommander.setDefaultLineSeparatorSequence()", function () {
        it('JsTypeCommander.setDefaultLineSeparatorSequence("\\r\\n") should return "\\r\\n"', function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.setDefaultLineSeparatorSequence("\r\n");
            expect(result).toBeDefined();
            expect(result).toBe("\r\n");
        });
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\r\\n"', function () {
            JsTypeCommander_1.x_44813_util.JsTypeCommander.setDefaultLineSeparatorSequence("\r\n");
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).toBeDefined();
            expect(result).toBe("\r\n");
        });
        it('JsTypeCommander.setDefaultLineSeparatorSequence() should return "\\n"', function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.setDefaultLineSeparatorSequence();
            expect(result).toBeDefined();
            expect(result).toBe("\n");
        });
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function () {
            JsTypeCommander_1.x_44813_util.JsTypeCommander.setDefaultLineSeparatorSequence();
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).toBeDefined();
            expect(result).toBe("\n");
        });
    });
    describe("Testing JsTypeCommander.getPatternOptions()", function () {
        it('JsTypeCommander.getPatternOptions() should not return nil', function () {
            var regexOptionResult = JsTypeCommander_1.x_44813_util.JsTypeCommander.getPatternOptions();
            expect(regexOptionResult).toBeDefined();
            expect(regexOptionResult).not.toBeNull();
        });
    });
    describe("Checking JsTypeCommander.getPatternOptions() properties", function () {
        var regexOptionResult;
        try {
            regexOptionResult = JsTypeCommander_1.x_44813_util.JsTypeCommander.getPatternOptions();
        }
        catch (_a) {
            regexOptionResult = undefined;
        }
        it('onlyWhitespace property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else {
                expect(regexOptionResult.onlyWhitespace).toBeDefined();
                expect(regexOptionResult.onlyWhitespace).not.toBeNull();
            }
        });
        it('trimStart property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else {
                expect(regexOptionResult.trimStart).toBeDefined();
                expect(regexOptionResult.trimStart).not.toBeNull();
            }
        });
        it('trimEnd property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else {
                expect(regexOptionResult.trimEnd).toBeDefined();
                expect(regexOptionResult.trimEnd).not.toBeNull();
            }
        });
        it('lineSeparator property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else {
                expect(regexOptionResult.lineSeparator).toBeDefined();
                expect(regexOptionResult.lineSeparator).not.toBeNull();
            }
        });
        it('booleanText property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else {
                expect(regexOptionResult.booleanText).toBeDefined();
                expect(regexOptionResult.booleanText).not.toBeNull();
            }
        });
        it('firstLetterLc property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else {
                expect(regexOptionResult.firstLetterLc).toBeDefined();
                expect(regexOptionResult.firstLetterLc).not.toBeNull();
            }
        });
        it('abnormalWhitespace property should be defined', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else {
                expect(regexOptionResult.abnormalWhitespace).toBeDefined();
                expect(regexOptionResult.abnormalWhitespace).not.toBeNull();
            }
        });
    });
    describe("Test JsTypeCommander.setPatternOptions() expressions", function () {
        var regexOptionResult;
        try {
            regexOptionResult = JsTypeCommander_1.x_44813_util.JsTypeCommander.setPatternOptions();
        }
        catch (_a) {
            regexOptionResult = undefined;
        }
        var originals;
        var testRe = /.*/;
        var testDataArr = [
            { name: 'abnormalWhitespace', original: testRe, getRegexp: function (r) { return r.abnormalWhitespace; }, setRegexp: function (r, v) { r.abnormalWhitespace = v; } },
            { name: 'booleanText', original: testRe, getRegexp: function (r) { return r.booleanText; }, setRegexp: function (r, v) { r.booleanText = v; } },
            { name: 'lineSeparator', original: testRe, getRegexp: function (r) { return r.lineSeparator; }, setRegexp: function (r, v) { r.lineSeparator = v; } },
            { name: 'onlyWhitespace', original: testRe, getRegexp: function (r) { return r.onlyWhitespace; }, setRegexp: function (r, v) { r.onlyWhitespace = v; } },
            { name: 'trimEnd', original: testRe, getRegexp: function (r) { return r.trimEnd; }, setRegexp: function (r, v) { r.trimEnd = v; } },
            { name: 'trimStart', original: testRe, getRegexp: function (r) { return r.trimStart; }, setRegexp: function (r, v) { r.trimStart = v; } }
        ];
        testDataArr.forEach(function (d) {
            if (typeof (regexOptionResult) == "undefined")
                return;
            var r = d.getRegexp(regexOptionResult);
            if (typeof (r) !== "undefined")
                d.original = r;
        });
        testDataArr.forEach(function (testData) {
            it('setPatternOptions({ ' + testData.name + ': /.*/ }) should return object with just that property changed.', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else {
                    var arg = {};
                    testData.setRegexp(arg, /.*/);
                    var result_1 = JsTypeCommander_1.x_44813_util.JsTypeCommander.setPatternOptions(arg);
                    expect(result_1).toBeDefined();
                    expect(result_1).not.toBeNull();
                    testDataArr.forEach(function (d) {
                        if (typeof (result_1) == "undefined")
                            return;
                        var existing = d.getRegexp(result_1);
                        expect(existing).toBeDefined();
                        expect(existing).not.toBeNull();
                        if (typeof (existing) == "undefined")
                            return;
                        if (d.name == testData.name) {
                            expect(existing.toString()).not.toBe(testData.original.toString(), "Change failed.");
                            expect(existing.toString()).toBe(testRe.toString(), "Unexpected value on changed item");
                        }
                        else {
                            expect(existing.toString()).not.toBe(testRe.toString(), "Change unexpectedly affected item " + d.name);
                            expect(existing.toString()).toBe(d.original.toString(), "Unexpected value on unchanged item " + d.name);
                        }
                    });
                    testData.setRegexp(arg, testData.original);
                    result_1 = JsTypeCommander_1.x_44813_util.JsTypeCommander.setPatternOptions(arg);
                    expect(result_1).toBeDefined();
                    expect(result_1).not.toBeNull();
                    testDataArr.forEach(function (d) {
                        if (typeof (result_1) == "undefined")
                            return;
                        var existing = d.getRegexp(result_1);
                        expect(existing).toBeDefined();
                        expect(existing).not.toBeNull();
                        if (typeof (existing) == "undefined")
                            return;
                        var originalRe = d.original;
                        if (d.name == testData.name)
                            expect(existing.toString()).toBe(originalRe.toString(), "Value restore failed");
                        else
                            expect(existing.toString()).toBe(originalRe.toString(), "Value restore unexpectedly affected item " + d.name);
                    });
                }
            });
        });
        it('setPatternOptions() should return object with property values restored.', function () {
            if (typeof (regexOptionResult) == "undefined")
                this.skip();
            else {
                var result_2 = JsTypeCommander_1.x_44813_util.JsTypeCommander.setPatternOptions();
                expect(result_2).toBeDefined();
                expect(result_2).not.toBeNull();
                testDataArr.forEach(function (d) {
                    if (typeof (result_2) == "undefined")
                        return;
                    var existing = d.getRegexp(result_2);
                    expect(existing).toBeDefined();
                    expect(existing).not.toBeNull();
                    if (typeof (existing) == "undefined")
                        return;
                    var originalRe = d.original;
                    expect(existing.toString()).toBe(originalRe.toString(), "Unexpected value on item " + d.name);
                });
            }
        });
    });
});
