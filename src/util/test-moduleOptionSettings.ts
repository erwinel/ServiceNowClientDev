import { x_44813_util } from '../../compiled/JsTypeCommander';
describe("Testing module options settings", function() {
    describe("Testing JsTypeCommander.getDefaultLineSeparatorSequence()", function() {
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function() {
            let result: string|null|undefined = x_44813_util.JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).toBeDefined();
            expect(result).toBe("\n");
        });
    });
    describe("Testing JsTypeCommander.setDefaultLineSeparatorSequence()", function() {
        it('JsTypeCommander.setDefaultLineSeparatorSequence("\\r\\n") should return "\\r\\n"', function() {
            let result: string|null|undefined = x_44813_util.JsTypeCommander.setDefaultLineSeparatorSequence("\r\n");
            expect(result).toBeDefined();
            expect(result).toBe("\r\n");
        });
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\r\\n"', function() {
            x_44813_util.JsTypeCommander.setDefaultLineSeparatorSequence("\r\n");
            let result: string|null|undefined = x_44813_util.JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).toBeDefined();
            expect(result).toBe("\r\n");
        });
        it('JsTypeCommander.setDefaultLineSeparatorSequence() should return "\\n"', function() {
            let result: string|null|undefined = x_44813_util.JsTypeCommander.setDefaultLineSeparatorSequence();
            expect(result).toBeDefined();
            expect(result).toBe("\n");
        });
        it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function() {
            x_44813_util.JsTypeCommander.setDefaultLineSeparatorSequence();
            let result: string|null|undefined = x_44813_util.JsTypeCommander.getDefaultLineSeparatorSequence();
            expect(result).toBeDefined();
            expect(result).toBe("\n");
        });
    });
    
    describe("Testing JsTypeCommander.getPatternOptions()", function() {
        it('JsTypeCommander.getPatternOptions() should not return nil', function() {
            let regexOptionResult: x_44813_util.IJsTypeCommanderRegex|null|undefined = x_44813_util.JsTypeCommander.getPatternOptions();
            expect(regexOptionResult).toBeDefined();
            expect(regexOptionResult).not.toBeNull();
        });
    });
    describe("Checking JsTypeCommander.getPatternOptions() properties", function() {
        let regexOptionResult: x_44813_util.IJsTypeCommanderRegex|undefined;
        try { regexOptionResult = x_44813_util.JsTypeCommander.getPatternOptions(); } catch { regexOptionResult = undefined; }
        it('onlyWhitespace property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
            {
                expect(regexOptionResult.onlyWhitespace).toBeDefined();
                expect(regexOptionResult.onlyWhitespace).not.toBeNull();
            }
        });
        it('trimStart property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
            {
                expect(regexOptionResult.trimStart).toBeDefined();
                expect(regexOptionResult.trimStart).not.toBeNull();
            }
        });
        it('trimEnd property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
            {
                expect(regexOptionResult.trimEnd).toBeDefined();
                expect(regexOptionResult.trimEnd).not.toBeNull();
            }
        });
        it('lineSeparator property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
            {
                expect(regexOptionResult.lineSeparator).toBeDefined();
                expect(regexOptionResult.lineSeparator).not.toBeNull();
            }
        });
        it('booleanText property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
            {
                expect(regexOptionResult.booleanText).toBeDefined();
                expect(regexOptionResult.booleanText).not.toBeNull();
            }
        });
        it('firstLetterLc property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
            {
                expect(regexOptionResult.firstLetterLc).toBeDefined();
                expect(regexOptionResult.firstLetterLc).not.toBeNull();
            }
        });
        it('abnormalWhitespace property should be defined', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else
            {
                expect(regexOptionResult.abnormalWhitespace).toBeDefined();
                expect(regexOptionResult.abnormalWhitespace).not.toBeNull();
            }
        });
    });
    describe("Test JsTypeCommander.setPatternOptions() expressions", function() {
        let regexOptionResult: x_44813_util.IJsTypeCommanderRegex|undefined;
        try { regexOptionResult = x_44813_util.JsTypeCommander.setPatternOptions(); } catch { regexOptionResult = undefined; }
        let originals: x_44813_util.IJsTypeCommanderRegex;
        let testRe = /.*/;
        let testDataArr: {
            name: string,
            original: RegExp,
            getRegexp: { (arg: x_44813_util.IJsTypeCommanderRegex): RegExp|undefined; }
            setRegexp: { (arg: x_44813_util.IJsTypeCommanderRegex, value: RegExp): void; }
        }[] = [
            { name: 'abnormalWhitespace', original: testRe, getRegexp: r => r.abnormalWhitespace, setRegexp: (r, v) => { r.abnormalWhitespace = v; } },
            { name: 'booleanText', original: testRe, getRegexp: r => r.booleanText, setRegexp: (r, v) => { r.booleanText = v; } },
            { name: 'lineSeparator', original: testRe, getRegexp: r => r.lineSeparator, setRegexp: (r, v) => { r.lineSeparator = v; } },
            { name: 'onlyWhitespace', original: testRe, getRegexp: r => r.onlyWhitespace, setRegexp: (r, v) => { r.onlyWhitespace = v; } },
            { name: 'trimEnd', original: testRe, getRegexp: r => r.trimEnd, setRegexp: (r, v) => { r.trimEnd = v; } },
            { name: 'trimStart', original: testRe, getRegexp: r => r.trimStart, setRegexp: (r, v) => { r.trimStart = v; } }
        ];
    
        testDataArr.forEach(d => {
            if (typeof(regexOptionResult) == "undefined")
                return;
            let r = d.getRegexp(regexOptionResult);
            if (typeof(r) !== "undefined")
                d.original = r;
        });

        testDataArr.forEach(testData => {
            it('setPatternOptions({ ' + testData.name + ': /.*/ }) should return object with just that property changed.', function() {
                if (typeof(regexOptionResult) == "undefined")
                    this.skip();
                else {
                    let arg: x_44813_util.IJsTypeCommanderRegex = { };
                    testData.setRegexp(arg, /.*/);
                    let result: x_44813_util.IJsTypeCommanderRegex|undefined = x_44813_util.JsTypeCommander.setPatternOptions(arg);
                    expect(result).toBeDefined();
                    expect(result).not.toBeNull();
                    testDataArr.forEach(d => {
                        if (typeof(result) == "undefined")
                            return;
                        let existing = d.getRegexp(result);
                        expect(existing).toBeDefined();
                        expect(existing).not.toBeNull();
                        if (typeof(existing) == "undefined")
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
                    result = x_44813_util.JsTypeCommander.setPatternOptions(arg);
                    expect(result).toBeDefined();
                    expect(result).not.toBeNull();
                    testDataArr.forEach(d => {
                        if (typeof(result) == "undefined")
                            return;
                        let existing = d.getRegexp(result);
                        expect(existing).toBeDefined();
                        expect(existing).not.toBeNull();
                        if (typeof(existing) == "undefined")
                            return;
                        let originalRe = d.original;
                        if (d.name == testData.name)
                            expect(existing.toString()).toBe(originalRe.toString(), "Value restore failed");
                        else
                            expect(existing.toString()).toBe(originalRe.toString(), "Value restore unexpectedly affected item " + d.name);
                    });
                }
            });
        });
        it('setPatternOptions() should return object with property values restored.', function() {
            if (typeof(regexOptionResult) == "undefined")
                this.skip();
            else {
                let result: x_44813_util.IJsTypeCommanderRegex|undefined = x_44813_util.JsTypeCommander.setPatternOptions();
                expect(result).toBeDefined();
                expect(result).not.toBeNull();
                testDataArr.forEach(d => {
                    if (typeof(result) == "undefined")
                        return;
                    let existing = d.getRegexp(result);
                    expect(existing).toBeDefined();
                    expect(existing).not.toBeNull();
                    if (typeof(existing) == "undefined")
                        return;
                    let originalRe = d.original;
                    expect(existing.toString()).toBe(originalRe.toString(), "Unexpected value on item " + d.name);
                });
            }
        });
    });
});
