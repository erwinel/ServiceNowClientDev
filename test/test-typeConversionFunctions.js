"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsTypeCommander_1 = require("../compiled/JsTypeCommander");
var TL = require("./testLib");
describe("Testing type conversion functions", function () {
    var functionTypeGroups = [
        TL.functionTypeGroup('string conversion', TL.testFunction(JsTypeCommander_1.x_44813_util.JsTypeCommander.asString, 'asString', '(obj?: TDefined): Nilable<string>, ifWhitespace?: boolean): Nilable<string>', TL.expectIsA('undefined', TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined')), TL.expectIsA('null', TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined')), TL.expectEqualTo('""', function () { return ""; }, TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [[""]]; }, '[""]'), TL.argSet(function () { return ["", undefined]; }, '"", undefined'), TL.argSet(function () { return ["", null]; }, '"", null'), TL.argSet(function () { return [undefined, ""]; }, 'undefined, ""'), TL.argSet(function () { return [null, ""]; }, 'null, ""'), TL.argSet(function () { return ["", Symbol.iterator]; }, '"", Symbol.iterator'), TL.argSet(function () { return ["", Symbol.iterator, false]; }, '"", Symbol.iterator, false'), TL.argSet(function () { return ["", "\t\n\r "]; }, '"", "\\t\\n\\r "'), TL.argSet(function () { return ["\t\n\r ", "", true]; }, '"\\t\\n\\r ", "", true'), TL.argSet(function () { return ["", "\t\n\r ", false]; }, '"", "\\t\\n\\r ", false')), TL.expectEqualTo('"true"', function () { return "true"; }, TL.argSet(function () { return ["true"]; }, '"true"'), TL.argSet(function () { return [true,]; }, 'true')), TL.expectEqualTo('"false"', function () { return "false"; }, TL.argSet(function () { return ["false"]; }, '"false"'), TL.argSet(function () { return [false,]; }, 'false')), TL.expectEqualTo('"Symbol(Symbol.iterator)"', function () { return "Symbol(Symbol.iterator)"; }, TL.argSet(function () { return [Symbol.iterator]; }, 'Symbol.iterator'), TL.argSet(function () { return [[Symbol.iterator]]; }, '[Symbol.iterator]'), TL.argSet(function () { return [undefined, Symbol.iterator]; }, 'undefined, Symbol.iterator'), TL.argSet(function () { return [null, Symbol.iterator]; }, 'null, Symbol.iterator'), TL.argSet(function () { return ["", Symbol.iterator, true]; }, '"", Symbol.iterator, true'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator, true]; }, '"\\t\\n\\r ", Symbol.iterator, true')), TL.expectEqualTo('"\\t\\n\\r "', function () { return "\t\n\r "; }, TL.argSet(function () { return ["\t\n\r ", " "]; }, '"\\t\\n\\r ", " "'), TL.argSet(function () { return ["\t\n\r ", " "]; }, '"\\t\\n\\r ", " "'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator]; }, '"\\t\\n\\r ", Symbol.iterator'), TL.argSet(function () { return ["", "\t\n\r ", true]; }, '"", "\\t\\n\\r ", true'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator, false]; }, '"\\t\\n\\r ", Symbol.iterator, false'))), TL.testFunction(JsTypeCommander_1.x_44813_util.JsTypeCommander.toString, 'toString', '(obj?: TDefined): Nilable<string>, ifWhitespace?: boolean): string', TL.expectEqualTo('""', function () { return ""; }, TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined'), TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [[""]]; }, '[""]'), TL.argSet(function () { return ["", undefined]; }, '"", undefined'), TL.argSet(function () { return ["", null]; }, '"", null'), TL.argSet(function () { return [undefined, ""]; }, 'undefined, ""'), TL.argSet(function () { return [null, ""]; }, 'null, ""'), TL.argSet(function () { return ["", Symbol.iterator]; }, '"", Symbol.iterator'), TL.argSet(function () { return ["", Symbol.iterator, false]; }, '"", Symbol.iterator, false'), TL.argSet(function () { return ["", "\t\n\r "]; }, '"", "\\t\\n\\r "'), TL.argSet(function () { return ["\t\n\r ", "", true]; }, '"\\t\\n\\r ", "", true'), TL.argSet(function () { return ["", "\t\n\r ", false]; }, '"", "\\t\\n\\r ", false')), TL.expectEqualTo('"true"', function () { return "true"; }, TL.argSet(function () { return ["true"]; }, '"true"'), TL.argSet(function () { return [true,]; }, 'true')), TL.expectEqualTo('"false"', function () { return "false"; }, TL.argSet(function () { return ["false"]; }, '"false"'), TL.argSet(function () { return [false,]; }, 'false')), TL.expectEqualTo('"iterator"', function () { return "Symbol(Symbol.iterator)"; }, TL.argSet(function () { return [Symbol.iterator]; }, 'Symbol.iterator'), TL.argSet(function () { return [[Symbol.iterator]]; }, '[Symbol.iterator]'), TL.argSet(function () { return [undefined, Symbol.iterator]; }, 'undefined, Symbol.iterator'), TL.argSet(function () { return [null, Symbol.iterator]; }, 'null, Symbol.iterator'), TL.argSet(function () { return ["", Symbol.iterator, true]; }, '"", Symbol.iterator, true'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator, true]; }, '"\\t\\n\\r ", Symbol.iterator, true')), TL.expectEqualTo('"\\t\\n\\r "', function () { return "\t\n\r "; }, TL.argSet(function () { return ["\t\n\r ", " "]; }, '"\\t\\n\\r ", " "'), TL.argSet(function () { return ["\t\n\r ", " "]; }, '"\\t\\n\\r ", " "'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator]; }, '"\\t\\n\\r ", Symbol.iterator'), TL.argSet(function () { return ["", "\t\n\r ", true]; }, '"", "\\t\\n\\r ", true'), TL.argSet(function () { return ["\t\n\r ", Symbol.iterator, false]; }, '"\\t\\n\\r ", Symbol.iterator, false')))),
        TL.functionTypeGroup('boolean conversion', TL.testFunction(JsTypeCommander_1.x_44813_util.JsTypeCommander.asBoolean, 'asBoolean', '(obj?: TDefined): Nilable<boolean>): Nilable<boolean>', TL.expectIsA('undefined', TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return ["talse"]; }, '"talse"'), TL.argSet(function () { return ["nes"]; }, '""nes'), TL.argSet(function () { return ["yo"]; }, '"yo"'), TL.argSet(function () { return ["frue"]; }, '"frue"'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined')), TL.expectIsA('null', TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined')), TL.expectEqualTo('true', function () { return true; }, TL.argSet(function () { return [true]; }, 'true'), TL.argSet(function () { return [1]; }, '1'), TL.argSet(function () { return [-1]; }, '-1'), TL.argSet(function () { return [100]; }, '100'), TL.argSet(function () { return [Number.POSITIVE_INFINITY]; }, 'Number.POSITIVE_INFINITY'), TL.argSet(function () { return [Number.NEGATIVE_INFINITY]; }, 'Number.NEGATIVE_INFINITY'), TL.argSet(function () { return ["t"]; }, '"t"'), TL.argSet(function () { return ["T"]; }, '"T"'), TL.argSet(function () { return ["true"]; }, '"true"'), TL.argSet(function () { return ["TRUE"]; }, '"TRUE"'), TL.argSet(function () { return ["True"]; }, '"True"'), TL.argSet(function () { return ["tRuE"]; }, '"tRuE"'), TL.argSet(function () { return ["y"]; }, '"y"'), TL.argSet(function () { return ["Y"]; }, '"Y"'), TL.argSet(function () { return ["yes"]; }, '"yes"'), TL.argSet(function () { return ["YES"]; }, '"YES"'), TL.argSet(function () { return ["Yes"]; }, '"Yes"'), TL.argSet(function () { return ["yEs"]; }, '"yEs"'), TL.argSet(function () { return [[true]]; }, '[true]'), TL.argSet(function () { return [true, undefined]; }, 'true, undefined'), TL.argSet(function () { return [true, null]; }, 'true, null'), TL.argSet(function () { return [undefined, true]; }, 'undefined, true'), TL.argSet(function () { return [null, true]; }, 'null, true'), TL.argSet(function () { return [null, -0.0001]; }, 'null, -0.0001'), TL.argSet(function () { return [true, false]; }, 'true, false')), TL.expectEqualTo('false', function () { return false; }, TL.argSet(function () { return [false]; }, 'false'), TL.argSet(function () { return [0]; }, '0'), TL.argSet(function () { return ["-0.0000"]; }, '"-0.0000"'), TL.argSet(function () { return [NaN]; }, 'NaN'), TL.argSet(function () { return ["f"]; }, '"f"'), TL.argSet(function () { return ["F"]; }, '"F"'), TL.argSet(function () { return ["false"]; }, '"false"'), TL.argSet(function () { return ["FALSE"]; }, '"FALSE"'), TL.argSet(function () { return ["False"]; }, '"False"'), TL.argSet(function () { return ["fAlSe"]; }, '"fAlSe"'), TL.argSet(function () { return [[false]]; }, '[false]'), TL.argSet(function () { return [false, undefined]; }, 'false, undefined'), TL.argSet(function () { return [false, null]; }, 'false, null'), TL.argSet(function () { return [undefined, false]; }, 'undefined, false'), TL.argSet(function () { return [null, false]; }, 'null, false'), TL.argSet(function () { return [false, true]; }, 'false, true'))), TL.testFunction(JsTypeCommander_1.x_44813_util.JsTypeCommander.toBoolean, 'toBoolean', '(obj?: TDefined): Nilable<boolean>): boolean', TL.expectEqualTo('true', function () { return true; }, TL.argSet(function () { return [true]; }, 'true'), TL.argSet(function () { return [1]; }, '1'), TL.argSet(function () { return [-1]; }, '-1'), TL.argSet(function () { return [100]; }, '100'), TL.argSet(function () { return [Number.POSITIVE_INFINITY]; }, 'Number.POSITIVE_INFINITY'), TL.argSet(function () { return [Number.NEGATIVE_INFINITY]; }, 'Number.NEGATIVE_INFINITY'), TL.argSet(function () { return ["t"]; }, '"t"'), TL.argSet(function () { return ["T"]; }, '"T"'), TL.argSet(function () { return ["true"]; }, '"true"'), TL.argSet(function () { return ["TRUE"]; }, '"TRUE"'), TL.argSet(function () { return ["True"]; }, '"True"'), TL.argSet(function () { return ["tRuE"]; }, '"tRuE"'), TL.argSet(function () { return ["y"]; }, '"y"'), TL.argSet(function () { return ["Y"]; }, '"Y"'), TL.argSet(function () { return ["yes"]; }, '"yes"'), TL.argSet(function () { return ["YES"]; }, '"YES"'), TL.argSet(function () { return ["Yes"]; }, '"Yes"'), TL.argSet(function () { return ["yEs"]; }, '"yEs"'), TL.argSet(function () { return [[true]]; }, '[true]'), TL.argSet(function () { return [true, undefined]; }, 'true, undefined'), TL.argSet(function () { return [true, null]; }, 'true, null'), TL.argSet(function () { return [undefined, true]; }, 'undefined, true'), TL.argSet(function () { return [null, true]; }, 'null, true'), TL.argSet(function () { return [null, -0.0001]; }, 'null, -0.0001'), TL.argSet(function () { return [true, false]; }, 'true, false')), TL.expectEqualTo('false', function () { return false; }, TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return ["talse"]; }, '"talse"'), TL.argSet(function () { return ["nes"]; }, '""nes'), TL.argSet(function () { return ["yo"]; }, '"yo"'), TL.argSet(function () { return ["frue"]; }, '"frue"'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined'), TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined'), TL.argSet(function () { return [false]; }, 'false'), TL.argSet(function () { return [0]; }, '0'), TL.argSet(function () { return ["-0.0000"]; }, '"-0.0000"'), TL.argSet(function () { return [NaN]; }, 'NaN'), TL.argSet(function () { return ["f"]; }, '"f"'), TL.argSet(function () { return ["F"]; }, '"F"'), TL.argSet(function () { return ["false"]; }, '"false"'), TL.argSet(function () { return ["FALSE"]; }, '"FALSE"'), TL.argSet(function () { return ["False"]; }, '"False"'), TL.argSet(function () { return ["fAlSe"]; }, '"fAlSe"'), TL.argSet(function () { return [[false]]; }, '[false]'), TL.argSet(function () { return [false, undefined]; }, 'false, undefined'), TL.argSet(function () { return [false, null]; }, 'false, null'), TL.argSet(function () { return [undefined, false]; }, 'undefined, false'), TL.argSet(function () { return [null, false]; }, 'null, false'), TL.argSet(function () { return [false, true]; }, 'false, true')))),
        TL.functionTypeGroup('number conversion', TL.testFunction(JsTypeCommander_1.x_44813_util.JsTypeCommander.asNumber, 'asNumber', '(obj?: TDefined): Nilable<number>): Nilable<number>', TL.expectIsA('undefined', TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined')), TL.expectIsA('null', TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined')), TL.expectEqualTo('1', function () { return 1; }, TL.argSet(function () { return [1]; }, '1'), TL.argSet(function () { return [true]; }, 'true'), TL.argSet(function () { return ["1"]; }, '"1"'), TL.argSet(function () { return ["0001.00"]; }, '"0001.00"'), TL.argSet(function () { return [undefined, 1]; }, 'undefined, 1'), TL.argSet(function () { return [undefined, true]; }, 'undefined, true'), TL.argSet(function () { return [undefined, "1"]; }, 'undefined, "1"'), TL.argSet(function () { return [undefined, "0001.00"]; }, 'undefined, "0001.00"'), TL.argSet(function () { return [null, 1]; }, 'null, 1'), TL.argSet(function () { return [null, true]; }, 'null, true'), TL.argSet(function () { return [null, "1"]; }, 'null, "1"'), TL.argSet(function () { return [null, "0001.00"]; }, 'null, "0001.00"'), TL.argSet(function () { return ["x2", 1]; }, '"x2", 1'), TL.argSet(function () { return ["x2", true]; }, '"x2", true'), TL.argSet(function () { return [null, "1"]; }, 'null, "1"'), TL.argSet(function () { return [null, "0001.00"]; }, 'null, "0001.00"')), TL.expectEqualTo('0', function () { return 0; }, TL.argSet(function () { return [0]; }, '0'), TL.argSet(function () { return ["0"]; }, '"0"'), TL.argSet(function () { return ["+0"]; }, '"+0"'), TL.argSet(function () { return [false]; }, 'false'), TL.argSet(function () { return ["-0.0000"]; }, '"-0.0000"'), 
        //TL.argSet(() => ["false"], '"false"'),
        //TL.argSet(() => [[false]], '[false]'),
        TL.argSet(function () { return [false, undefined]; }, 'false, undefined'), TL.argSet(function () { return [false, null]; }, 'false, null'), TL.argSet(function () { return [undefined, false]; }, 'undefined, false'), TL.argSet(function () { return [null, false]; }, 'null, false'), TL.argSet(function () { return [false, true]; }, 'false, true')), TL.expectEqualTo('100', function () { return 100; }, TL.argSet(function () { return [100]; }, '100'), TL.argSet(function () { return ["100"]; }, '"100"'), TL.argSet(function () { return ["+00100.0000"]; }, '"+00100.0000"')), TL.expectEqualTo('-100.0001', function () { return -100.0001; }, TL.argSet(function () { return [-100.0001]; }, '-100.0001'), TL.argSet(function () { return ["-100.0001"]; }, '"-100.0001"'), TL.argSet(function () { return ["-00100.000100"]; }, '"-00100.000100"')), TL.expectEqualTo('0.0001', function () { return 0.0001; }, TL.argSet(function () { return [0.0001]; }, '0.0001'), TL.argSet(function () { return ["0.0001"]; }, '"0.0001"'), TL.argSet(function () { return ["+00000.000100"]; }, '"+00000.000100"'))), TL.testFunction(JsTypeCommander_1.x_44813_util.JsTypeCommander.toNumber, 'toNumber', '(obj?: TDefined): Nilable<number>): number', TL.expectEqualTo('0', function () { return 0; }, TL.argSet(function () { return [undefined]; }, 'undefined'), TL.argSet(function () { return [""]; }, '""'), TL.argSet(function () { return [[]]; }, '[]'), TL.argSet(function () { return [undefined, undefined]; }, 'undefined, undefined'), TL.argSet(function () { return [null]; }, 'null'), TL.argSet(function () { return [undefined, null]; }, 'undefined, null'), TL.argSet(function () { return [null, undefined]; }, 'null, undefined'), TL.argSet(function () { return [0]; }, '0'), TL.argSet(function () { return ["0"]; }, '"0"'), TL.argSet(function () { return ["+0"]; }, '"+0"'), TL.argSet(function () { return [false]; }, 'false'), TL.argSet(function () { return ["-0.0000"]; }, '"-0.0000"'), TL.argSet(function () { return ["false"]; }, '"false"'), 
        //TL.argSet(() => [[false]], '[false]'),
        TL.argSet(function () { return [false, undefined]; }, 'false, undefined'), TL.argSet(function () { return [false, null]; }, 'false, null'), TL.argSet(function () { return [undefined, false]; }, 'undefined, false'), TL.argSet(function () { return [null, false]; }, 'null, false'), TL.argSet(function () { return [false, true]; }, 'false, true')), TL.expectEqualTo('1', function () { return 1; }, TL.argSet(function () { return [1]; }, '1'), TL.argSet(function () { return [true]; }, 'true'), TL.argSet(function () { return ["1"]; }, '"1"'), TL.argSet(function () { return ["0001.00"]; }, '"0001.00"'), TL.argSet(function () { return [undefined, 1]; }, 'undefined, 1'), TL.argSet(function () { return [undefined, true]; }, 'undefined, true'), TL.argSet(function () { return [undefined, "1"]; }, 'undefined, "1"'), TL.argSet(function () { return [undefined, "0001.00"]; }, 'undefined, "0001.00"'), TL.argSet(function () { return [null, 1]; }, 'null, 1'), TL.argSet(function () { return [null, true]; }, 'null, true'), TL.argSet(function () { return [null, "1"]; }, 'null, "1"'), TL.argSet(function () { return [null, "0001.00"]; }, 'null, "0001.00"'), TL.argSet(function () { return ["x2", 1]; }, '"x2", 1'), TL.argSet(function () { return ["x2", true]; }, '"x2", true'), TL.argSet(function () { return [null, "1"]; }, 'null, "1"'), TL.argSet(function () { return [null, "0001.00"]; }, 'null, "0001.00"')), TL.expectEqualTo('100', function () { return 100; }, TL.argSet(function () { return [100]; }, '100'), TL.argSet(function () { return ["100"]; }, '"100"'), TL.argSet(function () { return ["+00100.0000"]; }, '"+00100.0000"')), TL.expectEqualTo('-100.0001', function () { return -100.0001; }, TL.argSet(function () { return [-100.0001]; }, '-100.0001'), TL.argSet(function () { return ["-100.0001"]; }, '"-100.0001"'), TL.argSet(function () { return ["-00100.000100"]; }, '"-00100.000100"')), TL.expectEqualTo('0.0001', function () { return 0.0001; }, TL.argSet(function () { return [0.0001]; }, '0.0001'), TL.argSet(function () { return ["0.0001"]; }, '"0.0001"'), TL.argSet(function () { return ["+00000.000100"]; }, '"+00000.000100"'))))
    ];
    TL.describeFunctionTypeGroups(functionTypeGroups);
    describe("Testing function toArray(obj?: TDefined, checkElements?: boolean): AnyNilable[]", function () {
        it("JsTypeCommander.toArray() should return []", function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.toArray();
            expect(typeof (result)).toBe("object", "Result is not an array");
            expect(Array.isArray(result)).toBe(true, "Result is not an array");
            if (Array.isArray(result))
                expect(result.length).toBe(0, "Length mismatch");
        });
        it("JsTypeCommander.toArray([]) should return []", function () {
            var source = [];
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.toArray([]);
            expect(typeof (result)).toBe("object", "Result is not an array");
            expect(Array.isArray(result)).toBe(true, "Result is not an array");
            if (Array.isArray(result))
                expect(result.length).toBe(0, "Length mismatch");
        });
        it("JsTypeCommander.toArray([12, \"7\", true, undefined]) should return [12, \"7\", true, undefined]", function () {
            var source = [12, "7", true, undefined];
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.toArray(source);
            expect(typeof (result)).toBe("object", "Result is not an array");
            expect(Array.isArray(result)).toBe(true, "Result is not an array");
            if (Array.isArray(result)) {
                expect(result.length).toBe(4, "Length mismatch");
                expect(result[0]).toBe(12, "Element 0 mismatch");
                expect(result[1]).toBe("7", "Element 1 mismatch");
                expect(result[2]).toBe(true, "Element 2 mismatch");
                expect(typeof (result[3])).toBe("undefined", "Element 3 mismatch");
            }
        });
        it("JsTypeCommander.toArray(undefined) should return [undefined]", function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.toArray(undefined);
            expect(typeof (result)).toBe("object", "Result is not an array");
            expect(Array.isArray(result)).toBe(true, "Result is not an array");
            if (Array.isArray(result)) {
                expect(result.length).toBe(1, "Length mismatch");
                expect(typeof (result[0])).toBe("undefined");
            }
        });
        it("JsTypeCommander.toArray(null) should return [null]", function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.toArray(null);
            expect(typeof (result)).toBe("object", "Result is not an array");
            expect(Array.isArray(result)).toBe(true, "Result is not an array");
            if (Array.isArray(result)) {
                expect(result.length).toBe(1, "Length mismatch");
                expect(typeof (result[0]) == "object" && result[0] === null).toBe(true);
            }
        });
        it("JsTypeCommander.toArray(0) should return [0]", function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.toArray(0);
            expect(typeof (result)).toBe("object", "Result is not an array");
            expect(Array.isArray(result)).toBe(true, "Result is not an array");
            if (Array.isArray(result)) {
                expect(result.length).toBe(1, "Length mismatch");
                expect(typeof (result[0])).toBe("number");
                expect(result[0]).toBe(0, "Element 0 mismatch");
            }
        });
        it("JsTypeCommander.toArray({ 0: 12, 1: \"7\", 3: true, length: 4 }) should return [12, \"7\", undefined, true]", function () {
            var source = { 0: 12, 1: "7", 3: true, length: 4 };
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.toArray(source);
            expect(typeof (result)).toBe("object", "Result is not an array");
            expect(Array.isArray(result)).toBe(true, "Result is not an array");
            if (Array.isArray(result)) {
                expect(result.length).toBe(4, "Length mismatch");
                expect(result[0]).toBe(12, "Element 0 mismatch");
                expect(result[1]).toBe("7", "Element 1 mismatch");
                expect(typeof (result[2])).toBe("undefined", "Element 2 mismatch");
                expect(result[3]).toBe(true, "Element 3 mismatch");
            }
        });
        it("JsTypeCommander.toArray({ 0: 12, 1: \"7\", 3: true, length: 4 }, true) should return [{ 0: 12, 1: \"7\", 3: true, length: 4 }]", function () {
            var source = { 0: 12, 1: "7", 3: true, length: 4 };
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.toArray(source, true);
            expect(typeof (result)).toBe("object", "Result is not an array");
            expect(Array.isArray(result)).toBe(true, "Result is not an array");
            if (Array.isArray(result)) {
                expect(result.length).toBe(1, "Length mismatch");
                var obj = result[0];
                expect(JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(obj)).toBe(true, "Element 0 mismatch");
                if (JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(obj)) {
                    expect(obj[0]).toBe(12, "Original object not returned as first element");
                    expect(obj[1]).toBe("7", "Original object not returned as first element");
                    expect(typeof (obj[2])).toBe("undefined", "Original object not returned as first element");
                    expect(obj[3]).toBe(true, "Original object not returned as first element");
                }
            }
        });
    });
    describe("Testing function asErrorLike(obj?: TDefined): Nilable<ErrorLike>", function () {
        it("JsTypeCommander.asErrorLike() should return undefined", function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.asErrorLike();
            expect(typeof (result)).toBe("undefined");
        });
        it("JsTypeCommander.asErrorLike(\" \") should return { message: \"Error\", name: \"ErrorLike\" }", function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.asErrorLike(" ");
            expect(typeof (result)).toBe("object");
            expect(JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)).toBe(true, "Result is not a plain object");
            if (JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)) {
                expect(typeof (result.message)).toBe("string", "message property type mismatch");
                expect(result.message).toBe("Error", "message property value mismatch");
                expect(typeof (result.name)).toBe("string", "name property type mismatch");
                expect(result.name).toBe("ErrorLike", "name property value mismatch");
            }
        });
        it("JsTypeCommander.asErrorLike(\"My Error\") should return { message: \"My Error\", name: \"ErrorLike\" }", function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.asErrorLike("My Error");
            expect(typeof (result)).toBe("object");
            expect(JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)).toBe(true, "Result is not a plain object");
            if (JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)) {
                expect(typeof (result.message)).toBe("string", "message property type mismatch");
                expect(result.message).toBe("My Error", "message property value mismatch");
                expect(typeof (result.name)).toBe("string", "name property type mismatch");
                expect(result.name).toBe("ErrorLike", "name property value mismatch");
            }
        });
        it("JsTypeCommander.asErrorLike(12) should return { message: \"Error 12\", number: 12, name: \"ErrorLike\" }", function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.asErrorLike(12);
            expect(typeof (result)).toBe("object");
            expect(JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)).toBe(true, "Result is not a plain object");
            if (JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)) {
                expect(typeof (result.message)).toBe("string", "message property type mismatch");
                expect(result.message).toBe("Error 12", "message property mismatch");
                expect(typeof (result.number)).toBe("number", "number property type mismatch");
                expect(result.number).toBe(12, "number property mismatch");
                expect(typeof (result.name)).toBe("string", "name property type mismatch");
                expect(result.name).toBe("ErrorLike", "name property mismatch");
            }
        });
        it("JsTypeCommander.asErrorLike({ description: \"My Error\" }) should return { message: \"My Error\", name: \"ErrorLike\" }", function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.asErrorLike({ description: "My Error" });
            expect(typeof (result)).toBe("object");
            expect(JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)).toBe(true, "Result is not a plain object");
            if (JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)) {
                expect(typeof (result.message)).toBe("string", "message property type mismatch");
                expect(result.message).toBe("My Error", "message property value mismatch");
                expect(typeof (result.name)).toBe("string", "name property type mismatch");
                expect(result.name).toBe("ErrorLike", "name property value mismatch");
            }
        });
        var testObj = new RangeError("Out of Range");
        it("JsTypeCommander.asErrorLike(new RangeError(\"Out of Range\")) should return { message: \"Out of Range\", name: \"RangeError\" }", function () {
            var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.asErrorLike(testObj);
            expect(typeof (result)).toBe("object");
            expect(JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)).toBe(true, "Result is not a plain object");
            if (JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)) {
                expect(typeof (result.message)).toBe("string", "message property type mismatch");
                expect(result.message).toBe("Out of Range", "message property value mismatch");
                expect(typeof (result.name)).toBe("string", "name property type mismatch");
                expect(result.name).toBe("RangeError", "name property value mismatch");
                if (typeof (testObj.stack) == "string") {
                    expect(typeof (result.stack)).toBe("string", "stack property type mismatch");
                    expect(result.stack).toBe(testObj.stack, "name property value mismatch");
                }
                else
                    expect(typeof (result.stack)).toBe("undefined", "stack property type mismatch");
            }
        });
        it("JsTypeCommander.asErrorLike(RangeError: thrownErr) should return { message: \"Out of Range\", name: \"RangeError\", stack: string }", function () {
            try {
                throw testObj;
            }
            catch (ex) {
                var result = JsTypeCommander_1.x_44813_util.JsTypeCommander.asErrorLike(ex);
                expect(typeof (result)).toBe("object");
                expect(JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)).toBe(true, "Result is not a plain object");
                if (JsTypeCommander_1.x_44813_util.JsTypeCommander.isPlainObject(result)) {
                    expect(typeof (result.message)).toBe("string", "message property type mismatch");
                    expect(result.message).toBe("Out of Range", "message property value mismatch");
                    expect(typeof (result.name)).toBe("string", "name property type mismatch");
                    expect(result.name).toBe("RangeError", "name property value mismatch");
                    expect(typeof (result.stack)).toBe("string", "stack property type mismatch");
                    expect(result.stack).toBe(ex.stack, "name property value mismatch");
                }
            }
        });
    });
});
