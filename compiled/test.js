var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents test evaluation result codes.
 */
var TestResultCode;
(function (TestResultCode) {
    /** Test not yet evaluated. */
    TestResultCode[TestResultCode["notEvaluated"] = -1] = "notEvaluated";
    /** Test succeeded. */
    TestResultCode[TestResultCode["pass"] = 0] = "pass";
    /** Test results were inconclusive or test was skipped. */
    TestResultCode[TestResultCode["inconclusive"] = 1] = "inconclusive";
    /** Test failed. */
    TestResultCode[TestResultCode["fail"] = 2] = "fail";
    /** Unexpected exception thrown during test evaluation. */
    TestResultCode[TestResultCode["error"] = 3] = "error";
})(TestResultCode || (TestResultCode = {}));
/**
 * Represesents a group of test parameters with a common expected result.
 */
var TestExpectationGroup = /** @class */ (function () {
    /**
     * Initializes a new TestExpectationGroup instance.
     * @param expected Expected result value. This can be undefined or null if that is what is expected from the evaluation method.
     * @param argSet0 First named parameter set containing arguments to pass to the evaluation method.
     * @param argSetN Additional named parameter sets containing arguments to pass to the evaluation method.
     */
    function TestExpectationGroup(expected, argSet0) {
        var argSetN = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            argSetN[_i - 2] = arguments[_i];
        }
        this._expected = expected;
        if (typeof (argSetN) == "object" && Array.isArray(argSetN) && argSetN.length > 0)
            this._argSets = [argSet0].concat(argSetN);
        else
            this._argSets = [argSet0];
    }
    Object.defineProperty(TestExpectationGroup.prototype, "count", {
        /**
         * Count of named test parameter sets
         * @type {number}
         */
        get: function () { return this._argSets.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestExpectationGroup.prototype, "expected", {
        /**
         * Expected result value. This can be undefined if an undefined result value is expected.
         * @type {*}
         */
        get: function () { return this._expected; },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets a named parameter set at a specified index.
     * @param index Index of parameter set to return.
     */
    TestExpectationGroup.prototype.getArgSet = function (index) { return this._argSets[index]; };
    return TestExpectationGroup;
}());
/**
 * Represents a single named test iteration containing arguments to pass to the evaluation method.
 */
var TestIteration = /** @class */ (function (_super) {
    __extends(TestIteration, _super);
    /**
     * Initializes a new TestIteration instance.
     * @param name Name which can be used to identify the arguments that were passed to the evaluation method.
     * @param expected Expected result value. This can be undefined or null if that is what is expected from the evaluation method.
     * @param args Arguments to pass to the evaluation method.
     */
    function TestIteration(name, expected, args) {
        return _super.call(this, expected, { name: name, args: args }) || this;
    }
    Object.defineProperty(TestIteration.prototype, "name", {
        /**
         * Gets the name which can be used to indentify the arguments that were passed to the evaluation method.
         * @type {string}
         */
        get: function () { return this.getArgSet(0).name; },
        enumerable: true,
        configurable: true
    });
    return TestIteration;
}(TestExpectationGroup));
/**
 * Represents an error which is intended to interrupt test execution due to an assertion condition.
 */
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    /**
     * Initializes a new assertion error object.
     * @param {string} [message] Evaluation message.
     * @param {TestResultCode} [assertionCode=TestResultCode.fail] Assertion code. TestResultCode.fail is used if this is not specified.
     */
    function AssertionError(message, assertionCode) {
        var _this = _super.call(this, message) || this;
        _this._assertionCode = (TestDefinition.isValidResultCode(assertionCode)) ? assertionCode : TestResultCode.fail;
        _this.name = 'AssertionError';
        return _this;
    }
    Object.defineProperty(AssertionError.prototype, "assertionCode", {
        /**
         * Code which represents the assertion condition, and ultimately becomes the test result code.
         */
        get: function () { return this._assertionCode; },
        enumerable: true,
        configurable: true
    });
    return AssertionError;
}(Error));
/**
 * Abstract base class for test definitions.
 */
var TestDefinition = /** @class */ (function () {
    /**
     * Intializes a new TestDefinition instance.
     * @param name User-friendly name to distinguish this test from others.
     * @param dependencies Names of other tests whose success is a precondition for evaluating this test.
     */
    function TestDefinition(name, dependencies) {
        this._resultCode = TestResultCode.notEvaluated;
        this._resultType = TestDefinition.resultCodeToType(TestResultCode.notEvaluated);
        this._message = "Test has not yet been evaluated.";
        this._stack = "";
        /**
         * Custom message which can be used to build the error message if an exception is thrown or an assertion fails while iterating through test data.
         */
        this.dataPositionMessage = "";
        this._name = name;
        this._dependencies = dependencies;
    }
    Object.defineProperty(TestDefinition.prototype, "name", {
        /**
         * User-friendly name to distinguish tests.
         * @type {string}
         */
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestDefinition.prototype, "message", {
        /**
         * Last test evaluation result message.
         * @type {string}
         */
        get: function () { return this._message; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestDefinition.prototype, "stack", {
        /**
         * Stack trace if test evaluation threw an exception.
         * @type {string}
         */
        get: function () { return this._stack; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestDefinition.prototype, "resultCode", {
        /**
         * Numeric test result code.
         * @type {TestResultCode}
         */
        get: function () { return this._resultCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestDefinition.prototype, "resultType", {
        /**
         * Text result type which corresponds to the numeric result code.
         * @type {string}
         */
        get: function () { return this._resultType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestDefinition.prototype, "dependencies", {
        /**
         * Names of other tests whose success is a precondition for evaluating this test.
         * @type {string[]}
         */
        get: function () { return this._dependencies; },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets result message and optionally, the stack trace text.
     * @param message Result message to set.
     * @param stack Stack trace text.
     */
    TestDefinition.prototype.setMessage = function (message, stack) {
        this._message = message;
        this._stack = (typeof (stack) == "string") ? stack : "";
    };
    /**
     * Evaluates the current test.
     * @returns {TestResultCode} The code which represents the evaluation result status.
     */
    TestDefinition.prototype.evaluate = function () {
        this._resultCode = TestResultCode.inconclusive;
        this._resultType = TestDefinition.resultCodeToType(this._resultCode);
        this._stack = "";
        this._message = "";
        try {
            this._resultCode = this.getResultCode();
            if (!TestDefinition.isValidResultCode(this._resultCode))
                this._resultCode = TestResultCode.inconclusive;
        }
        catch (err) {
            var message = void 0, name = void 0, stack = void 0;
            if (typeof (err.message) == "string")
                message = err.message;
            else
                message = err + "";
            if (typeof (err.name) != "string" || (name = err.name).trim().length == 0)
                name = "Error";
            if (err instanceof AssertionError) {
                this._resultCode = (TestDefinition.isValidResultCode(this._resultCode)) ? err.assertionCode : TestResultCode.fail;
                if (message.trim().length == 0)
                    this._message = "Assertion" + TestDefinition.resultCodeToType(this._resultCode);
                else
                    this._message = message;
            }
            else {
                this._resultCode = TestResultCode.error;
                this._message = "Unexpected " + name;
                if (message.trim().length > 0)
                    this._message = this._message + ": " + message;
            }
            this._stack = (typeof (err.stack) == "string") ? err.stack : "";
            this.dataPositionMessage = ((typeof (this.dataPositionMessage) == "string") ? this.dataPositionMessage : ((typeof (this.dataPositionMessage) == "undefined" || this.dataPositionMessage === null) ? "" : this.dataPositionMessage + "")).trim();
            if (this.dataPositionMessage.length > 0)
                this._message = "At " + this.dataPositionMessage + " - ";
        }
        this._resultType = TestDefinition.resultCodeToType(this._resultCode);
        return this._resultCode;
    };
    /**
     * Tests whether a result code represents a value that can represent a test evaluation result.
     * @param code Numeric code to test.
     */
    TestDefinition.isValidResultCode = function (code) {
        if (typeof (code) !== "number" || isNaN(code))
            return false;
        switch (code) {
            case TestResultCode.inconclusive:
            case TestResultCode.pass:
            case TestResultCode.fail:
            case TestResultCode.error:
                return true;
        }
        return false;
    };
    /**
     * Converts a result status code number to a string value.
     * @param code Result status code.
     * @returns {string} Text which corresponds to the result status code number.
     */
    TestDefinition.resultCodeToType = function (code) {
        switch (code) {
            case TestResultCode.notEvaluated:
                return "Not Evaluated";
            case TestResultCode.pass:
                return "Passed";
            case TestResultCode.fail:
                return "Failed";
            case TestResultCode.error:
                return "Unexpected Error";
        }
        return "Inconclusive";
    };
    return TestDefinition;
}());
/**
 * Represents a test definition whereby the test invocation results are compared to an expected value.
 */
var ResultEvalTestDefinition = /** @class */ (function (_super) {
    __extends(ResultEvalTestDefinition, _super);
    /**
     *
     * @param {string} name User-friendly name to distinguish this test from others.
     * @param {function} method Method which produces result value to be compared.
     * @param {string[]} dependencies Names of other tests whose success is a precondition for evaluating this test.
     * @param {TestExpectationGroup[]} iterations Defines the arguments to be passed to the test method with their expected results..
     */
    function ResultEvalTestDefinition(name, method, dependencies) {
        var iterations = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            iterations[_i - 3] = arguments[_i];
        }
        var _this = _super.call(this, name, dependencies) || this;
        if (typeof (method) == "function")
            _this._method = method;
        else {
            _this._method = method.method;
            _this._thisObj = method.thisObj;
        }
        ;
        _this._iterations = iterations;
        return _this;
    }
    Object.defineProperty(ResultEvalTestDefinition.prototype, "thisObj", {
        /**
         * Object which is used as the "this" when the test invocation callback is called.
         */
        get: function () { return this._thisObj; },
        enumerable: true,
        configurable: true
    });
    /**
     * Implementtion of method to evaluate the test and return the result code.
     */
    ResultEvalTestDefinition.prototype.getResultCode = function () {
        for (var iterationIndex = 0; iterationIndex < this._iterations.length; iterationIndex++) {
            var iteration = this._iterations[iterationIndex];
            for (var setIndex = 0; setIndex < iteration.count; setIndex++) {
                var argGroup = iteration.getArgSet(setIndex);
                try {
                    var actual = this._method.apply(this.thisObj, argGroup.args);
                    if (actual !== iteration.expected) {
                        this.setMessage("Iteration " + argGroup.name + " failed - Expected: " + x_44813_util.types.serializeToString(iteration.expected) + "; Actual: " +
                            x_44813_util.types.serializeToString(actual));
                        return TestResultCode.fail;
                    }
                }
                catch (err) {
                    var s = void 0, name = void 0, stack = void 0;
                    if (typeof (err.name) != "string" || (name = err.name).trim().length == 0)
                        name = "Error";
                    var message = "Unexpected " + name + " at iteration " + argGroup.name;
                    if (typeof (err.message) == "string")
                        s = err.message;
                    else
                        s = err + "";
                    if (s.trim().length > 0)
                        message = message + ": " + s;
                    if (typeof (err.stack) == "string")
                        this.setMessage(message, err.stack);
                    else
                        this.setMessage(message);
                    return TestResultCode.error;
                }
            }
        }
        return TestResultCode.pass;
    };
    return ResultEvalTestDefinition;
}(TestDefinition));
/**
 * Reprsents a collection of unit tests.
 */
var TestCollection = /** @class */ (function () {
    /**
     * Initializes a new TestCollection instance.
     * @param tests Test definitions to be included in the collection.
     */
    function TestCollection(tests) {
        this._resultCode = TestResultCode.notEvaluated;
        this._resultType = TestDefinition.resultCodeToType(TestResultCode.notEvaluated);
        this._passCount = 0;
        this._failCount = 0;
        this._tests = tests.filter(function (a) { return typeof (a) == "object" && a !== null; });
    }
    Object.defineProperty(TestCollection.prototype, "tests", {
        /**
         * Test definitions.
         * @type {TestDefinition[]}
         */
        get: function () { return this._tests; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestCollection.prototype, "resultCode", {
        /**
         * Last overall evaluation result of all tests.
         */
        get: function () { return this._resultCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestCollection.prototype, "resultType", {
        /**
         * Text value corresponding to last overall evaluation result of all tests.
         */
        get: function () { return this._resultType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestCollection.prototype, "passCount", {
        /**
         * Number of tests which have passed.
         */
        get: function () { return this._passCount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestCollection.prototype, "failCount", {
        /**
         * Number of tests which failed.
         */
        get: function () { return this._failCount; },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a new test definition to the collection.
     * @param testDefinition Test definition to be added.
     */
    TestCollection.prototype.push = function (testDefinition) { this._tests.push(testDefinition); };
    /**
     * Evaluates tests in the current collection.
     * @param {boolean} [force] If true, then all tests will re-evaluated; otherwise, only those which did not pass will be re-evaluated.
     */
    TestCollection.prototype.evaluate = function (force) {
        this._resultCode = TestResultCode.inconclusive;
        this._resultType = TestDefinition.resultCodeToType(this._resultCode);
        this._resultCode = this._tests.reduce(function (pc, td) {
            var c = (force || td.resultCode != TestResultCode.pass) ? td.evaluate() : TestResultCode.pass;
            if (c > pc)
                return c;
            return (pc > TestResultCode.notEvaluated) ? pc : TestResultCode.inconclusive;
        }, TestResultCode.notEvaluated);
        if (this._resultCode == TestResultCode.notEvaluated)
            this._resultCode = TestResultCode.inconclusive;
        this._resultType = TestDefinition.resultCodeToType(this._resultCode);
        this._passCount = this._tests.filter(function (td) { return td.resultCode == TestResultCode.pass; }).length;
        this._failCount = this._tests.filter(function (td) { return td.resultCode == TestResultCode.fail || td.resultCode == TestResultCode.error; }).length;
        return this._resultCode;
    };
    return TestCollection;
}());
var testCollection = new TestCollection([
    new ResultEvalTestDefinition('defined', x_44813_util.types.defined, [], new TestExpectationGroup(true, { name: 'Null arg', args: [null] }, { name: 'NaN arg', args: [NaN] }, { name: 'False arg', args: [false] }, { name: 'Empty array arg', args: [[]] }, { name: 'Empty string arg', args: [""] }, { name: 'Array arg with single undefined element', args: [[undefined]] }, { name: 'Function arg', args: [function () { }] }), new TestExpectationGroup(false, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] })),
    new ResultEvalTestDefinition('isObjectType', x_44813_util.types.isObjectType, [], new TestExpectationGroup(false, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] }, { name: 'Null arg', args: [null] }, { name: 'NaN arg', args: [NaN] }, { name: 'Zero arg', args: [0] }, { name: 'Number arg', args: [1] }, { name: 'True arg', args: [true] }, { name: 'False arg', args: [false] }, { name: 'Empty string arg', args: [""] }, { name: 'Function arg', args: [function () { return {}; }] }), new TestExpectationGroup(true, { name: 'Empty object arg', args: [{}] }, { name: 'Empty array arg', args: [[]] }, { name: 'Array arg with single undefined element', args: [[undefined]] })),
    new ResultEvalTestDefinition('isNonArrayObject', x_44813_util.types.isNonArrayObject, [], new TestExpectationGroup(false, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] }, { name: 'Null arg', args: [null] }, { name: 'NaN arg', args: [NaN] }, { name: 'Zero arg', args: [0] }, { name: 'Number arg', args: [1] }, { name: 'True arg', args: [true] }, { name: 'False arg', args: [false] }, { name: 'Empty string arg', args: [""] }, { name: 'Empty array arg', args: [[]] }, { name: 'Array arg with single undefined element', args: [[undefined]] }, { name: 'Function arg', args: [function () { return {}; }] }), new TestIteration('Empty object arg', true, [{}])),
    new ResultEvalTestDefinition('isString', x_44813_util.types.isString, [], new TestExpectationGroup(false, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] }, { name: 'Null arg', args: [null] }, { name: 'NaN arg', args: [NaN] }, { name: 'Zero arg', args: [0] }, { name: 'Number arg', args: [1] }, { name: 'True arg', args: [true] }, { name: 'False arg', args: [false] }, { name: 'Empty object arg', args: [{}] }, { name: 'Empty array arg', args: [[]] }, { name: 'Array arg with single undefined element', args: [[undefined]] }, { name: 'Function arg', args: [function () { return ""; }] }), new TestIteration('Empty string arg', true, [""])),
    new ResultEvalTestDefinition('isFunction', x_44813_util.types.isFunction, [], new TestExpectationGroup(false, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] }, { name: 'Null arg', args: [null] }, { name: 'NaN arg', args: [NaN] }, { name: 'Zero arg', args: [0] }, { name: 'Number arg', args: [1] }, { name: 'True arg', args: [true] }, { name: 'False arg', args: [false] }, { name: 'Empty object arg', args: [{}] }, { name: 'Empty string arg', args: [""] }, { name: 'Empty array arg', args: [[]] }, { name: 'Array arg with single undefined element', args: [[undefined]] }), new TestIteration('Function arg', true, [function () { }])),
    new ResultEvalTestDefinition('isBoolean', x_44813_util.types.isBoolean, [], new TestExpectationGroup(false, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] }, { name: 'Null arg', args: [null] }, { name: 'NaN arg', args: [NaN] }, { name: 'Zero arg', args: [0] }, { name: 'Number arg', args: [1] }, { name: 'Empty object arg', args: [{}] }, { name: 'Empty string arg', args: [""] }, { name: 'Empty array arg', args: [[]] }, { name: 'Array with single boolean', args: [[true]] }, { name: 'Array arg with single undefined element', args: [[undefined]] }, { name: 'Function arg', args: [function () { return true; }] }), new TestExpectationGroup(true, { name: 'True arg', args: [true] }, { name: 'False arg', args: [false] })),
    new ResultEvalTestDefinition('isNumber', x_44813_util.types.isNumber, [], new TestExpectationGroup(false, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] }, { name: 'Null arg', args: [null] }, { name: 'NaN arg', args: [NaN] }, { name: 'True arg', args: [true] }, { name: 'False arg', args: [false] }, { name: 'Empty object arg', args: [{}] }, { name: 'Empty string arg', args: [""] }, { name: 'Empty array arg', args: [[]] }, { name: 'Array with single boolean', args: [[true]] }, { name: 'Array with single number', args: [[1]] }, { name: 'Array arg with single undefined element', args: [[undefined]] }, { name: 'Function arg', args: [function () { return 1; }] }), new TestExpectationGroup(true, { name: 'Negative float arg', args: [-0.002] }, { name: 'Positive float arg', args: [1.25] }, { name: 'Zero arg', args: [0] }, { name: 'Number arg', args: [1] })),
    new ResultEvalTestDefinition('isInteger', x_44813_util.types.isInteger, [], new TestExpectationGroup(false, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] }, { name: 'Null arg', args: [null] }, { name: 'NaN arg', args: [NaN] }, { name: 'True arg', args: [true] }, { name: 'False arg', args: [false] }, { name: 'Negative float arg', args: [-0.002] }, { name: 'Positive float arg', args: [1.25] }, { name: 'Empty object arg', args: [{}] }, { name: 'Empty string arg', args: [""] }, { name: 'Empty array arg', args: [[]] }, { name: 'Array with single boolean', args: [[true]] }, { name: 'Array with single number', args: [[1]] }, { name: 'Array arg with single undefined element', args: [[undefined]] }, { name: 'Function arg', args: [function () { return 1; }] }), new TestExpectationGroup(true, { name: 'Zero arg', args: [0] }, { name: 'Number arg', args: [1] })),
    new ResultEvalTestDefinition('isNil', x_44813_util.types.isNil, ["defined"], new TestExpectationGroup(true, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] }, { name: 'Null arg', args: [null] }), new TestExpectationGroup(false, { name: 'NaN arg', args: [NaN] }, { name: 'False arg', args: [false] }, { name: 'Empty array arg', args: [[]] }, { name: 'Empty string arg', args: [""] }, { name: 'Array arg with single undefined element', args: [[undefined]] }, { name: 'Function arg', args: [function () { }] })),
    new ResultEvalTestDefinition('isNilOrEmptyString', x_44813_util.types.isNilOrEmptyString, ["isNil", "isString"], new TestExpectationGroup(true, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] }, { name: 'Null arg', args: [null] }, { name: 'Empty string arg', args: [""] }), new TestExpectationGroup(false, { name: 'NaN arg', args: [NaN] }, { name: 'Zero arg', args: [0] }, { name: 'Number arg', args: [1] }, { name: 'True arg', args: [true] }, { name: 'False arg', args: [false] }, { name: 'Empty object arg', args: [{}] }, { name: 'Empty array arg', args: [[]] }, { name: 'Array arg with single undefined element', args: [[undefined]] }, { name: 'Function arg', args: [function () { return ""; }] }, { name: 'Whitespace string arg', args: ["  "] }, { name: 'Non-empty string arg', args: ["asdf"] }, { name: 'Non-normalized string arg', args: ["\nasdf"] })),
    new ResultEvalTestDefinition('isNilOrWhitespace', x_44813_util.types.isNilOrWhitespace, ["isNil", "isString"], new TestExpectationGroup(true, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] }, { name: 'Null arg', args: [null] }, { name: 'Empty string arg', args: [""] }, { name: 'Whitespace string arg', args: ["  "] }), new TestExpectationGroup(false, { name: 'NaN arg', args: [NaN] }, { name: 'Zero arg', args: [0] }, { name: 'Number arg', args: [1] }, { name: 'True arg', args: [true] }, { name: 'False arg', args: [false] }, { name: 'Empty object arg', args: [{}] }, { name: 'Empty array arg', args: [[]] }, { name: 'Array arg with single undefined element', args: [[undefined]] }, { name: 'Function arg', args: [function () { return ""; }] }, { name: 'Non-empty string arg', args: ["asdf"] }, { name: 'Non-normalized string arg', args: ["\nasdf"] })),
    new ResultEvalTestDefinition('asString', x_44813_util.types.asString, ["defined", "isNil", "isObjectType", "isFunction", "isString"], new TestExpectationGroup(true, { name: 'No Args', args: [] }, { name: 'Undefined Arg', args: [undefined] }, { name: 'Null arg', args: [null] }, { name: 'Empty string arg', args: [""] }, { name: 'Whitespace string arg', args: ["  "] }), new TestExpectationGroup(false, { name: 'NaN arg', args: [NaN] }, { name: 'Zero arg', args: [0] }, { name: 'Number arg', args: [1] }, { name: 'True arg', args: [true] }, { name: 'False arg', args: [false] }, { name: 'Empty object arg', args: [{}] }, { name: 'Empty array arg', args: [[]] }, { name: 'Array arg with single undefined element', args: [[undefined]] }, { name: 'Function arg', args: [function () { return ""; }] }, { name: 'Non-empty string arg', args: ["asdf"] }, { name: 'Non-normalized string arg', args: ["\nasdf"] }))
]);
testCollection.evaluate();
var resultMessages = testCollection.tests.map(function (td) {
    JSON.stringify({
        name: td.name,
        code: td.resultCode,
        type: td.resultType,
        message: td.message,
        stack: td.stack
    });
});
//# sourceMappingURL=test.js.map