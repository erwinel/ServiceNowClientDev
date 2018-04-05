/**
 * Callback to get value for ResultEvalTestDefinition invocation.
 * @returns {*} Result value to cbe compared with the expected value. 
 */
interface TestInvokeCallback { (...args: any[]): any; }

/**
 * Represents test evaluation result codes.
 */
enum TestResultCode {
    /** Test not yet evaluated. */
    notEvaluated = -1,
    
    /** Test succeeded. */
    pass = 0,
    
    /** Test results were inconclusive or test was skipped. */
    inconclusive = 1,
    
    /** Test failed. */
    fail = 2,

    /** Unexpected exception thrown during test evaluation. */
    error = 3
}

/**
 * Represents a named set of arguments to pass to an evaluation method.
 */
interface INamedParameterSet {
    /**
     * Descriptive name which identifies the arguments.
     * @type {string}
     */
    name: string;

    /**
     * Arguments to pass to evaluation method.
     * @type {Array}
     */
    args: any[];
}

/**
 * Represesents a group of test parameters with a common expected result.
 */
class TestExpectationGroup {
    private _expected: any;
    private _argSets: INamedParameterSet[];

    /**
     * Count of named test parameter sets
     * @type {number}
     */
    get count(): any { return this._argSets.length; }

    /**
     * Expected result value. This can be undefined if an undefined result value is expected.
     * @type {*}
     */
    get expected(): any { return this._expected; }

    /**
     * Initializes a new TestExpectationGroup instance.
     * @param expected Expected result value. This can be undefined or null if that is what is expected from the evaluation method.
     * @param argSet0 First named parameter set containing arguments to pass to the evaluation method.
     * @param argSetN Additional named parameter sets containing arguments to pass to the evaluation method.
     */
    constructor(expected: any, argSet0: INamedParameterSet, ...argSetN: INamedParameterSet[]) {
        this._expected = expected;
        if (typeof(argSetN) == "object" && Array.isArray(argSetN) && argSetN.length > 0)
            this._argSets = [argSet0].concat(argSetN);
        else
            this._argSets = [argSet0];
    }

    /**
     * Gets a named parameter set at a specified index.
     * @param index Index of parameter set to return.
     */
    getArgSet(index: number): INamedParameterSet { return this._argSets[index]; }
}

/**
 * Represents a single named test iteration containing arguments to pass to the evaluation method.
 */
class TestIteration extends TestExpectationGroup {
    /**
     * Gets the name which can be used to indentify the arguments that were passed to the evaluation method.
     * @type {string}
     */
    get name(): string { return this.getArgSet(0).name; }

    /**
     * Initializes a new TestIteration instance.
     * @param name Name which can be used to identify the arguments that were passed to the evaluation method.
     * @param expected Expected result value. This can be undefined or null if that is what is expected from the evaluation method.
     * @param args Arguments to pass to the evaluation method.
     */
    constructor(name: string, expected: any, args: any[]) {
        super(expected, { name: name, args: args });
    }
}

/**
 * Represents an error which is intended to interrupt test execution due to an assertion condition.
 */
class AssertionError extends Error {
    private _assertionCode: TestResultCode;

    /**
     * Code which represents the assertion condition, and ultimately becomes the test result code.
     */
    get assertionCode(): TestResultCode { return this._assertionCode; }

    /**
     * Initializes a new assertion error object.
     * @param {string} [message] Evaluation message.
     * @param {TestResultCode} [assertionCode=TestResultCode.fail] Assertion code. TestResultCode.fail is used if this is not specified.
     */
    constructor(message?: string, assertionCode?: TestResultCode) {
        super(message);
        this._assertionCode = (TestDefinition.isValidResultCode(assertionCode)) ? assertionCode : TestResultCode.fail;
        this.name = 'AssertionError';
    }
}

/**
 * Abstract base class for test definitions.
 */
abstract class TestDefinition {
    private _name: string;
    private _resultCode: TestResultCode = TestResultCode.notEvaluated;
    private _resultType: string = TestDefinition.resultCodeToType(TestResultCode.notEvaluated);
    private _message: string = "Test has not yet been evaluated.";
    private _stack: string = "";
    private _dependencies: string[];

    /**
     * User-friendly name to distinguish tests.
     * @type {string}
     */
    get name(): string { return this._name; }

    /**
     * Last test evaluation result message.
     * @type {string}
     */
    get message(): string { return this._message; }

    /**
     * Stack trace if test evaluation threw an exception.
     * @type {string}
     */
    get stack(): string { return this._stack; }

    /**
     * Numeric test result code.
     * @type {TestResultCode}
     */
    get resultCode(): TestResultCode { return this._resultCode; }

    /**
     * Text result type which corresponds to the numeric result code.
     * @type {string}
     */
    get resultType(): string { return this._resultType; }

    /**
     * Names of other tests whose success is a precondition for evaluating this test.
     * @type {string[]}
     */
    get dependencies(): string[] { return this._dependencies; }

    /**
     * Custom message which can be used to build the error message if an exception is thrown or an assertion fails while iterating through test data.
     */
    private dataPositionMessage: string = "";

    /**
     * Intializes a new TestDefinition instance.
     * @param name User-friendly name to distinguish this test from others.
     * @param dependencies Names of other tests whose success is a precondition for evaluating this test.
     */
    constructor(name: string, dependencies: string[]) {
        this._name = name;
        this._dependencies = dependencies;
    }

    /**
     * Sets result message and optionally, the stack trace text.
     * @param message Result message to set.
     * @param stack Stack trace text.
     */
    protected setMessage(message: string, stack?: string) {
        this._message = message;
        this._stack = (typeof(stack) == "string") ? stack : "";
    }

    /**
     * Evaluates the current test.
     * @returns {TestResultCode} The code which represents the evaluation result status.
     */
    evaluate(): TestResultCode {
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
            let message: string, name: string, stack: string;
            if (typeof(err.message) == "string")
                message = err.message;
            else
                message = err + "";
            if (typeof(err.name) != "string" || (name = err.name).trim().length == 0)
                name = "Error";
            if (err instanceof AssertionError) {
                this._resultCode = (TestDefinition.isValidResultCode(this._resultCode)) ? err.assertionCode : TestResultCode.fail;
                if (message.trim().length == 0)
                    this._message = "Assertion" + TestDefinition.resultCodeToType(this._resultCode);
                else
                    this._message = message;
            } else {
                this._resultCode = TestResultCode.error;
                this._message = "Unexpected " + name;
                if (message.trim().length > 0)
                    this._message = this._message + ": " + message;
            }
            this._stack = (typeof(err.stack) == "string") ? err.stack : "";
            this.dataPositionMessage = ((typeof(this.dataPositionMessage) == "string") ? this.dataPositionMessage : ((typeof(this.dataPositionMessage) == "undefined" || this.dataPositionMessage === null) ? "" : this.dataPositionMessage + "")).trim();
            if (this.dataPositionMessage.length > 0)
                this._message = "At " + this.dataPositionMessage + " - ";
        }
        this._resultType = TestDefinition.resultCodeToType(this._resultCode);
        return this._resultCode;
    }

    /**
     * Tests whether a result code represents a value that can represent a test evaluation result.
     * @param code Numeric code to test.
     */
    static isValidResultCode(code?: number) : code is TestResultCode {
        if (typeof(code) !== "number" || isNaN(code))
            return false;
        switch (code) {
            case TestResultCode.inconclusive:
            case TestResultCode.pass:
            case TestResultCode.fail:
            case TestResultCode.error:
                return true;
        }
        return false;
    }

    /**
     * Converts a result status code number to a string value.
     * @param code Result status code.
     * @returns {string} Text which corresponds to the result status code number.
     */
    static resultCodeToType(code: TestResultCode) {
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
    }

    /**
     * This is called to evaluate the test and return the result code.
     * @description Implementing classes should call setMessage to update the result message is necessary.
     */
    protected abstract getResultCode(): TestResultCode;
}

/**
 * Represents a test definition whereby the test invocation results are compared to an expected value.
 */
class ResultEvalTestDefinition extends TestDefinition {
    private _method: TestInvokeCallback;
    private _iterations: TestExpectationGroup[];
    private _thisObj: any|null|undefined;

    /**
     * Object which is used as the "this" when the test invocation callback is called.
     */
    get thisObj(): any|null|undefined { return this._thisObj; }

    /**
     * 
     * @param {string} name User-friendly name to distinguish this test from others.
     * @param {function} method Method which produces result value to be compared.
     * @param {string[]} dependencies Names of other tests whose success is a precondition for evaluating this test.
     * @param {TestExpectationGroup[]} iterations Defines the arguments to be passed to the test method with their expected results..
     */
    constructor(name: string, method: TestInvokeCallback|{
            method: TestInvokeCallback
            thisObj?: any|null;
        }, dependencies: string[], ...iterations: TestExpectationGroup[]) {
        super(name, dependencies);
        
        if (typeof(method) == "function")
            this._method = method;
        else {
            this._method = method.method;
            this._thisObj = method.thisObj
        };
        this._iterations = iterations;
    }

    /**
     * Implementtion of method to evaluate the test and return the result code.
     */
    protected getResultCode() {
        for (var iterationIndex = 0; iterationIndex < this._iterations.length; iterationIndex++) {
            let iteration: TestExpectationGroup = this._iterations[iterationIndex];
            for (var setIndex = 0; setIndex < iteration.count; setIndex++) {
                let argGroup: { name: string; args: any[] } = iteration.getArgSet(setIndex);
                try {
                    let actual: any = this._method.apply(this.thisObj, argGroup.args);
                    if (actual !== iteration.expected) {
                        this.setMessage("Iteration " + argGroup.name + " failed - Expected: " + x_44813_util.types.serializeToString(iteration.expected) + "; Actual: " +
                            x_44813_util.types.serializeToString(actual));
                            return TestResultCode.fail;
                    }
                } catch (err) {
                    let s: string, name: string, stack: string;
                    if (typeof(err.name) != "string" || (name = err.name).trim().length == 0)
                        name = "Error";
                    let message: string = "Unexpected " + name + " at iteration " + argGroup.name;
                    if (typeof(err.message) == "string")
                        s = err.message;
                    else
                        s = err + "";
                    if (s.trim().length > 0)
                        message = message + ": " + s;

                    if (typeof(err.stack) == "string")
                        this.setMessage(message, err.stack);
                    else
                        this.setMessage(message);
                    return TestResultCode.error;
                }
            }
        }
        return TestResultCode.pass;
    }
}

/**
 * Reprsents a collection of unit tests.
 */
class TestCollection {
    private _tests: TestDefinition[];
    private _resultCode: TestResultCode = TestResultCode.notEvaluated;
    private _resultType: string = TestDefinition.resultCodeToType(TestResultCode.notEvaluated);
    private _passCount: number = 0;
    private _failCount: number = 0;

    /**
     * Test definitions.
     * @type {TestDefinition[]}
     */
    get tests(): TestDefinition[] { return this._tests; }

    /**
     * Last overall evaluation result of all tests.
     */
    get resultCode(): TestResultCode { return this._resultCode; }

    /**
     * Text value corresponding to last overall evaluation result of all tests.
     */
    get resultType(): string { return this._resultType; }

    /**
     * Number of tests which have passed.
     */
    get passCount(): number { return this._passCount; }

    /**
     * Number of tests which failed.
     */
    get failCount(): number { return this._failCount; }

    /**
     * Initializes a new TestCollection instance.
     * @param tests Test definitions to be included in the collection.
     */
    constructor(tests: TestDefinition[]) {
        this._tests = tests.filter(function(a) { return typeof(a) == "object" && a !== null; });
    }

    /**
     * Adds a new test definition to the collection.
     * @param testDefinition Test definition to be added.
     */
    push(testDefinition: TestDefinition) { this._tests.push(testDefinition); }

    /**
     * Evaluates tests in the current collection.
     * @param {boolean} [force] If true, then all tests will re-evaluated; otherwise, only those which did not pass will be re-evaluated.
     */
    evaluate(force?: boolean) : TestResultCode {
        this._resultCode = TestResultCode.inconclusive;
        this._resultType = TestDefinition.resultCodeToType(this._resultCode);

        this._resultCode = this._tests.reduce(function(pc, td) {
            let c: TestResultCode = (force || td.resultCode != TestResultCode.pass) ? td.evaluate() : TestResultCode.pass;
            if (c > pc)
                return c;
            return (pc > TestResultCode.notEvaluated) ? pc : TestResultCode.inconclusive;
        }, TestResultCode.notEvaluated);
        if (this._resultCode == TestResultCode.notEvaluated)
            this._resultCode = TestResultCode.inconclusive;
        this._resultType = TestDefinition.resultCodeToType(this._resultCode);
        this._passCount = this._tests.filter(function(td) { return td.resultCode == TestResultCode.pass; }).length;
        this._failCount = this._tests.filter(function(td) { return td.resultCode == TestResultCode.fail || td.resultCode == TestResultCode.error; }).length;
        return this._resultCode;
    }
}

let testCollection: TestCollection = new TestCollection([
    new ResultEvalTestDefinition('defined', x_44813_util.types.defined, [],
        new TestExpectationGroup(true, 
            { name: 'Null arg', args: [null] },
            { name: 'NaN arg', args: [NaN] },
            { name: 'False arg', args: [false] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Empty string arg', args: [""] },
            { name: 'Array arg with single undefined element', args: [[undefined]] },
            { name: 'Function arg', args: [function() { }] }
        ),
        new TestExpectationGroup(false,
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] }
        )
    ),
    new ResultEvalTestDefinition('isObjectType', x_44813_util.types.isObjectType, [],
        new TestExpectationGroup(false, 
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] },
            { name: 'Null arg', args: [null] },
            { name: 'NaN arg', args: [NaN] },
            { name: 'Zero arg', args: [0] },
            { name: 'Number arg', args: [1] },
            { name: 'True arg', args: [true] },
            { name: 'False arg', args: [false] },
            { name: 'Empty string arg', args: [""] },
            { name: 'Function arg', args: [function() { return {}; }] }
        ),
        new TestExpectationGroup(true, 
            { name: 'Empty object arg', args: [{}] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Array arg with single undefined element', args: [[undefined]] }
        )
    ),
    new ResultEvalTestDefinition('isNonArrayObject', x_44813_util.types.isNonArrayObject, [],
        new TestExpectationGroup(false, 
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] },
            { name: 'Null arg', args: [null] },
            { name: 'NaN arg', args: [NaN] },
            { name: 'Zero arg', args: [0] },
            { name: 'Number arg', args: [1] },
            { name: 'True arg', args: [true] },
            { name: 'False arg', args: [false] },
            { name: 'Empty string arg', args: [""] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Array arg with single undefined element', args: [[undefined]] },
            { name: 'Function arg', args: [function() { return {}; }] }
        ),
        new TestIteration('Empty object arg', true, [{}])
    ),
    new ResultEvalTestDefinition('isString', x_44813_util.types.isString, [],
        new TestExpectationGroup(false, 
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] },
            { name: 'Null arg', args: [null] },
            { name: 'NaN arg', args: [NaN] },
            { name: 'Zero arg', args: [0] },
            { name: 'Number arg', args: [1] },
            { name: 'True arg', args: [true] },
            { name: 'False arg', args: [false] },
            { name: 'Empty object arg', args: [{}] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Array arg with single undefined element', args: [[undefined]] },
            { name: 'Function arg', args: [function() { return ""; }] }
        ),
        new TestIteration('Empty string arg', true, [""])
    ),
    new ResultEvalTestDefinition('isFunction', x_44813_util.types.isFunction, [],
        new TestExpectationGroup(false, 
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] },
            { name: 'Null arg', args: [null] },
            { name: 'NaN arg', args: [NaN] },
            { name: 'Zero arg', args: [0] },
            { name: 'Number arg', args: [1] },
            { name: 'True arg', args: [true] },
            { name: 'False arg', args: [false] },
            { name: 'Empty object arg', args: [{}] },
            { name: 'Empty string arg', args: [""] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Array arg with single undefined element', args: [[undefined]] }
        ),
        new TestIteration('Function arg', true, [function() { }])
    ),
    new ResultEvalTestDefinition('isBoolean', x_44813_util.types.isBoolean, [],
        new TestExpectationGroup(false, 
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] },
            { name: 'Null arg', args: [null] },
            { name: 'NaN arg', args: [NaN] },
            { name: 'Zero arg', args: [0] },
            { name: 'Number arg', args: [1] },
            { name: 'Empty object arg', args: [{}] },
            { name: 'Empty string arg', args: [""] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Array with single boolean', args: [[true]] },
            { name: 'Array arg with single undefined element', args: [[undefined]] },
            { name: 'Function arg', args: [function() { return true; }] }
        ),
        new TestExpectationGroup(true, 
            { name: 'True arg', args: [true] },
            { name: 'False arg', args: [false] }
        )
    ),
    new ResultEvalTestDefinition('isNumber', x_44813_util.types.isNumber, [],
        new TestExpectationGroup(false, 
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] },
            { name: 'Null arg', args: [null] },
            { name: 'NaN arg', args: [NaN] },
            { name: 'True arg', args: [true] },
            { name: 'False arg', args: [false] },
            { name: 'Empty object arg', args: [{}] },
            { name: 'Empty string arg', args: [""] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Array with single boolean', args: [[true]] },
            { name: 'Array with single number', args: [[1]] },
            { name: 'Array arg with single undefined element', args: [[undefined]] },
            { name: 'Function arg', args: [function() { return 1; }] }
        ),
        new TestExpectationGroup(true,
            { name: 'Negative float arg', args: [-0.002] },
            { name: 'Positive float arg', args: [1.25] },
            { name: 'Zero arg', args: [0] },
            { name: 'Number arg', args: [1] }
        )
    ),
    new ResultEvalTestDefinition('isInteger', x_44813_util.types.isInteger, [],
        new TestExpectationGroup(false, 
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] },
            { name: 'Null arg', args: [null] },
            { name: 'NaN arg', args: [NaN] },
            { name: 'True arg', args: [true] },
            { name: 'False arg', args: [false] },
            { name: 'Negative float arg', args: [-0.002] },
            { name: 'Positive float arg', args: [1.25] },
            { name: 'Empty object arg', args: [{}] },
            { name: 'Empty string arg', args: [""] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Array with single boolean', args: [[true]] },
            { name: 'Array with single number', args: [[1]] },
            { name: 'Array arg with single undefined element', args: [[undefined]] },
            { name: 'Function arg', args: [function() { return 1; }] }
        ),
        new TestExpectationGroup(true,
            { name: 'Zero arg', args: [0] },
            { name: 'Number arg', args: [1] }
        )
    ),
    new ResultEvalTestDefinition('isNil', x_44813_util.types.isNil, ["defined"],
        new TestExpectationGroup(true,
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] }, 
            { name: 'Null arg', args: [null] }
        ),
        new TestExpectationGroup(false,
            { name: 'NaN arg', args: [NaN] },
            { name: 'False arg', args: [false] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Empty string arg', args: [""] },
            { name: 'Array arg with single undefined element', args: [[undefined]] },
            { name: 'Function arg', args: [function() { }] }
        )
    ),
    new ResultEvalTestDefinition('isNilOrEmptyString', x_44813_util.types.isNilOrEmptyString, ["isNil", "isString"],
        new TestExpectationGroup(true, 
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] },
            { name: 'Null arg', args: [null] },
            { name: 'Empty string arg', args: [""] }
        ),
        new TestExpectationGroup(false,
            { name: 'NaN arg', args: [NaN] },
            { name: 'Zero arg', args: [0] },
            { name: 'Number arg', args: [1] },
            { name: 'True arg', args: [true] },
            { name: 'False arg', args: [false] },
            { name: 'Empty object arg', args: [{}] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Array arg with single undefined element', args: [[undefined]] },
            { name: 'Function arg', args: [function() { return ""; }] },
            { name: 'Whitespace string arg', args: ["  "] },
            { name: 'Non-empty string arg', args: ["asdf"] },
            { name: 'Non-normalized string arg', args: ["\nasdf"] }
        )
    ),
    new ResultEvalTestDefinition('isNilOrWhitespace', x_44813_util.types.isNilOrWhitespace, ["isNil", "isString"],
        new TestExpectationGroup(true, 
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] },
            { name: 'Null arg', args: [null] },
            { name: 'Empty string arg', args: [""] },
            { name: 'Whitespace string arg', args: ["  "] }
        ),
        new TestExpectationGroup(false,
            { name: 'NaN arg', args: [NaN] },
            { name: 'Zero arg', args: [0] },
            { name: 'Number arg', args: [1] },
            { name: 'True arg', args: [true] },
            { name: 'False arg', args: [false] },
            { name: 'Empty object arg', args: [{}] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Array arg with single undefined element', args: [[undefined]] },
            { name: 'Function arg', args: [function() { return ""; }] },
            { name: 'Non-empty string arg', args: ["asdf"] },
            { name: 'Non-normalized string arg', args: ["\nasdf"] }
        )
    ),
    new ResultEvalTestDefinition('asString', x_44813_util.types.asString, ["defined", "isNil", "isObjectType", "isFunction", "isString"],
        new TestExpectationGroup(true, 
            { name: 'No Args', args: [] },
            { name: 'Undefined Arg', args: [undefined] },
            { name: 'Null arg', args: [null] },
            { name: 'Empty string arg', args: [""] },
            { name: 'Whitespace string arg', args: ["  "] }
        ),
        new TestExpectationGroup(false,
            { name: 'NaN arg', args: [NaN] },
            { name: 'Zero arg', args: [0] },
            { name: 'Number arg', args: [1] },
            { name: 'True arg', args: [true] },
            { name: 'False arg', args: [false] },
            { name: 'Empty object arg', args: [{}] },
            { name: 'Empty array arg', args: [[]] },
            { name: 'Array arg with single undefined element', args: [[undefined]] },
            { name: 'Function arg', args: [function() { return ""; }] },
            { name: 'Non-empty string arg', args: ["asdf"] },
            { name: 'Non-normalized string arg', args: ["\nasdf"] }
        )
    )
]);
testCollection.evaluate();
let resultMessages = testCollection.tests.map(function(td) {
    JSON.stringify({
        name: td.name,
        code: td.resultCode,
        type: td.resultType,
        message: td.message,
        stack: td.stack
    })
});