/**
 * Callback to get value for ResultEvalTestDefinition invocation.
 * @returns {*} Result value to cbe compared with the expected value.
 */
interface TestInvokeCallback {
    (...args: any[]): any;
}
/**
 * Represents test evaluation result codes.
 */
declare enum TestResultCode {
    /** Test not yet evaluated. */
    notEvaluated = -1,
    /** Test succeeded. */
    pass = 0,
    /** Test results were inconclusive or test was skipped. */
    inconclusive = 1,
    /** Test failed. */
    fail = 2,
    /** Unexpected exception thrown during test evaluation. */
    error = 3,
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
declare class TestExpectationGroup {
    private _expected;
    private _argSets;
    /**
     * Count of named test parameter sets
     * @type {number}
     */
    readonly count: any;
    /**
     * Expected result value. This can be undefined if an undefined result value is expected.
     * @type {*}
     */
    readonly expected: any;
    /**
     * Initializes a new TestExpectationGroup instance.
     * @param expected Expected result value. This can be undefined or null if that is what is expected from the evaluation method.
     * @param argSet0 First named parameter set containing arguments to pass to the evaluation method.
     * @param argSetN Additional named parameter sets containing arguments to pass to the evaluation method.
     */
    constructor(expected: any, argSet0: INamedParameterSet, ...argSetN: INamedParameterSet[]);
    /**
     * Gets a named parameter set at a specified index.
     * @param index Index of parameter set to return.
     */
    getArgSet(index: number): INamedParameterSet;
}
/**
 * Represents a single named test iteration containing arguments to pass to the evaluation method.
 */
declare class TestIteration extends TestExpectationGroup {
    /**
     * Gets the name which can be used to indentify the arguments that were passed to the evaluation method.
     * @type {string}
     */
    readonly name: string;
    /**
     * Initializes a new TestIteration instance.
     * @param name Name which can be used to identify the arguments that were passed to the evaluation method.
     * @param expected Expected result value. This can be undefined or null if that is what is expected from the evaluation method.
     * @param args Arguments to pass to the evaluation method.
     */
    constructor(name: string, expected: any, args: any[]);
}
/**
 * Represents an error which is intended to interrupt test execution due to an assertion condition.
 */
declare class AssertionError extends Error {
    private _assertionCode;
    /**
     * Code which represents the assertion condition, and ultimately becomes the test result code.
     */
    readonly assertionCode: TestResultCode;
    /**
     * Initializes a new assertion error object.
     * @param {string} [message] Evaluation message.
     * @param {TestResultCode} [assertionCode=TestResultCode.fail] Assertion code. TestResultCode.fail is used if this is not specified.
     */
    constructor(message?: string, assertionCode?: TestResultCode);
}
/**
 * Abstract base class for test definitions.
 */
declare abstract class TestDefinition {
    private _name;
    private _resultCode;
    private _resultType;
    private _message;
    private _stack;
    private _dependencies;
    /**
     * User-friendly name to distinguish tests.
     * @type {string}
     */
    readonly name: string;
    /**
     * Last test evaluation result message.
     * @type {string}
     */
    readonly message: string;
    /**
     * Stack trace if test evaluation threw an exception.
     * @type {string}
     */
    readonly stack: string;
    /**
     * Numeric test result code.
     * @type {TestResultCode}
     */
    readonly resultCode: TestResultCode;
    /**
     * Text result type which corresponds to the numeric result code.
     * @type {string}
     */
    readonly resultType: string;
    /**
     * Names of other tests whose success is a precondition for evaluating this test.
     * @type {string[]}
     */
    readonly dependencies: string[];
    /**
     * Custom message which can be used to build the error message if an exception is thrown or an assertion fails while iterating through test data.
     */
    private dataPositionMessage;
    /**
     * Intializes a new TestDefinition instance.
     * @param name User-friendly name to distinguish this test from others.
     * @param dependencies Names of other tests whose success is a precondition for evaluating this test.
     */
    constructor(name: string, dependencies: string[]);
    /**
     * Sets result message and optionally, the stack trace text.
     * @param message Result message to set.
     * @param stack Stack trace text.
     */
    protected setMessage(message: string, stack?: string): void;
    /**
     * Evaluates the current test.
     * @returns {TestResultCode} The code which represents the evaluation result status.
     */
    evaluate(): TestResultCode;
    /**
     * Tests whether a result code represents a value that can represent a test evaluation result.
     * @param code Numeric code to test.
     */
    static isValidResultCode(code?: number): code is TestResultCode;
    /**
     * Converts a result status code number to a string value.
     * @param code Result status code.
     * @returns {string} Text which corresponds to the result status code number.
     */
    static resultCodeToType(code: TestResultCode): "Not Evaluated" | "Passed" | "Failed" | "Unexpected Error" | "Inconclusive";
    /**
     * This is called to evaluate the test and return the result code.
     * @description Implementing classes should call setMessage to update the result message is necessary.
     */
    protected abstract getResultCode(): TestResultCode;
}
/**
 * Represents a test definition whereby the test invocation results are compared to an expected value.
 */
declare class ResultEvalTestDefinition extends TestDefinition {
    private _method;
    private _iterations;
    private _thisObj;
    /**
     * Object which is used as the "this" when the test invocation callback is called.
     */
    readonly thisObj: any | null | undefined;
    /**
     *
     * @param {string} name User-friendly name to distinguish this test from others.
     * @param {function} method Method which produces result value to be compared.
     * @param {string[]} dependencies Names of other tests whose success is a precondition for evaluating this test.
     * @param {TestExpectationGroup[]} iterations Defines the arguments to be passed to the test method with their expected results..
     */
    constructor(name: string, method: TestInvokeCallback | {
        method: TestInvokeCallback;
        thisObj?: any | null;
    }, dependencies: string[], ...iterations: TestExpectationGroup[]);
    /**
     * Implementtion of method to evaluate the test and return the result code.
     */
    protected getResultCode(): TestResultCode.pass | TestResultCode.fail | TestResultCode.error;
}
/**
 * Reprsents a collection of unit tests.
 */
declare class TestCollection {
    private _tests;
    private _resultCode;
    private _resultType;
    private _passCount;
    private _failCount;
    /**
     * Test definitions.
     * @type {TestDefinition[]}
     */
    readonly tests: TestDefinition[];
    /**
     * Last overall evaluation result of all tests.
     */
    readonly resultCode: TestResultCode;
    /**
     * Text value corresponding to last overall evaluation result of all tests.
     */
    readonly resultType: string;
    /**
     * Number of tests which have passed.
     */
    readonly passCount: number;
    /**
     * Number of tests which failed.
     */
    readonly failCount: number;
    /**
     * Initializes a new TestCollection instance.
     * @param tests Test definitions to be included in the collection.
     */
    constructor(tests: TestDefinition[]);
    /**
     * Adds a new test definition to the collection.
     * @param testDefinition Test definition to be added.
     */
    push(testDefinition: TestDefinition): void;
    /**
     * Evaluates tests in the current collection.
     * @param {boolean} [force] If true, then all tests will re-evaluated; otherwise, only those which did not pass will be re-evaluated.
     */
    evaluate(force?: boolean): TestResultCode;
}
declare let testCollection: TestCollection;
declare let resultMessages: void[];
