import { x_44813_util } from '../../compiled/JsTypeCommander';

interface Descriptor { display: string; }

interface ArgumentDescriptor extends Descriptor { getValue: { (): x_44813_util.JsTypeCommander.AnyNilable; } }

enum MapCallbackId {
    whenBoolean = 0x0001,
    whenFunction = 0x0002,
    whenInfinity = 0x0004,
    whenNaN = 0x0008,
    whenNumber = 0x0010,
    whenArray = 0x0020,
    whenArrayLike = 0x0040,
    whenNotArrayLike = 0x0080,
    whenString = 0x0100,
    whenSymbol = 0x0200,
    whenNull = 0x0400,
    whenUndefined = 0x0800,
    whenObject = 0x1000,
    otherwise = 0x2000
}

type MapCallbackName = "whenBoolean"|"whenFunction"|"whenInfinity"|"whenNaN"|"whenNumber"|"whenArray"|"whenArrayLike"|"whenNotArrayLike"|"whenString"|"whenSymbol"|"whenNull"|
    "whenUndefined"|"whenObject"|"otherwise";

function mapCallbackIdToName(id: MapCallbackId): MapCallbackName {
    switch (id) {
        case MapCallbackId.whenBoolean:
            return 'whenBoolean';
        case MapCallbackId.whenFunction:
            return 'whenFunction';
        case MapCallbackId.whenInfinity:
            return 'whenInfinity';
        case MapCallbackId.whenNaN:
            return 'whenNaN';
        case MapCallbackId.whenNumber:
            return 'whenNumber';
        case MapCallbackId.whenArray:
            return 'whenArray';
        case MapCallbackId.whenArrayLike:
            return 'whenArrayLike';
        case MapCallbackId.whenNotArrayLike:
            return 'whenNotArrayLike';
        case MapCallbackId.whenString:
            return 'whenString';
        case MapCallbackId.whenSymbol:
            return 'whenSymbol';
        case MapCallbackId.whenNull:
            return 'whenNull';
        case MapCallbackId.whenUndefined:
            return 'whenUndefined';
        case MapCallbackId.whenObject:
            return 'whenObject';
    }
    return 'otherwise';
}

interface MapByTypeOptions { omit?: MapCallbackName[]|MapCallbackName; checkElements?: boolean; expected: MapCallbackId }
interface MapByTypeTest {
    arg: ArgumentDescriptor[]|ArgumentDescriptor;
    opt: MapByTypeOptions[]|MapByTypeOptions;
}
interface MapByTypeInputType {
    type: string;
    test: MapByTypeTest[]|MapByTypeTest
}
interface MapByNilArguments extends ArgumentDescriptor {
    type: "notNil"|"null"|"undefined";
}
interface MapByNilFunction {
    name: string,
    callback: Function,
    allowUndefined: boolean,
    allowNull: boolean
}

class MapByTypeHelper implements x_44813_util.JsTypeCommander.TypeGuardResultSpecs<x_44813_util.JsTypeCommander.AnyNilable, MapCallbackId> {
    private _isOmmitted: { [key: string]: boolean } = { };
    private _invokeFlags: number = 0;
    private _callCount: number = 0;
    private _lastArg: x_44813_util.JsTypeCommander.AnyNilable = undefined;
    private _onInvoked(key: MapCallbackId, value: x_44813_util.JsTypeCommander.AnyNilable): MapCallbackId {
        this._invokeFlags |= key;
        this._callCount++;
        this._lastArg = value;
        return key;
    }
    private _whenBoolean(value: boolean): MapCallbackId { return this._onInvoked(MapCallbackId.whenBoolean, value); }
    private _whenFunction(value: Function): MapCallbackId { return this._onInvoked(MapCallbackId.whenFunction, value); }
    private _whenInfinity(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenInfinity, value); }
    private _whenNaN(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenNaN, value); }
    private _whenNumber(value: number): MapCallbackId { return this._onInvoked(MapCallbackId.whenNumber, value); }
    private _whenArray(value: x_44813_util.JsTypeCommander.AnyNilable[]): MapCallbackId { return this._onInvoked(MapCallbackId.whenArray, value); }
    private _whenArrayLike(value: ArrayLike<x_44813_util.JsTypeCommander.AnyNilable>): MapCallbackId { return this._onInvoked(MapCallbackId.whenArrayLike, value); }
    private _whenNotArrayLike(value: x_44813_util.JsTypeCommander.IStringKeyedObject): MapCallbackId { return this._onInvoked(MapCallbackId.whenNotArrayLike, value); }
    private _whenString(value: string): MapCallbackId { return this._onInvoked(MapCallbackId.whenString, value); }
    private _whenSymbol(value: symbol): MapCallbackId { return this._onInvoked(MapCallbackId.whenSymbol, value); }
    private _whenNull(value: null): MapCallbackId { return this._onInvoked(MapCallbackId.whenNull, value); }
    private _whenUndefined(value: undefined): MapCallbackId { return this._onInvoked(MapCallbackId.whenUndefined, value); }
    private _whenObject(value: x_44813_util.JsTypeCommander.IStringKeyedObject): MapCallbackId { return this._onInvoked(MapCallbackId.whenObject, value); }
    private _invokeThis<T>(name: string, func: x_44813_util.JsTypeCommander.MapFromValueCallback<T, MapCallbackId>) : x_44813_util.JsTypeCommander.MapFromValueCallback<T, MapCallbackId>|undefined {
        if (this._isOmmitted[name])
            return;
        let thisObj = this;
        this._invokeFlags = 0;
        this._callCount = 0;
        this._lastArg = undefined;
        return function(arg: T) { return func.call(thisObj, arg); };
    }
    constructor(omit?: MapCallbackId|MapCallbackName|(MapCallbackId|MapCallbackName)[], ...omitOther: (MapCallbackId|MapCallbackName)[]) {
        if (Array.isArray(omit))
            omit.forEach(n => {
                if (typeof(n) == "number") {
                    if (n != MapCallbackId.otherwise)
                        this._isOmmitted[mapCallbackIdToName(n)] = true;
                } else if (n != "otherwise")
                    this._isOmmitted[n] = true;
            }, this);
        else if (typeof(omit) == "number") {
            if (omit != MapCallbackId.otherwise)
                this._isOmmitted[mapCallbackIdToName(omit)] = true;
        } else if (typeof(omit) != "undefined" && omit != "otherwise")
            this._isOmmitted[omit] = true;
        if (!Array.isArray(omitOther))
            return;
        omitOther.forEach(n => {
            if (typeof(n) == "number") {
                if (n != MapCallbackId.otherwise)
                    this._isOmmitted[mapCallbackIdToName(n)] = true;
            } else if (n != "otherwise")
                this._isOmmitted[n] = true;
        }, this);
    }
    get invokeFlags(): number { return this._invokeFlags; }
    get callCount(): number { return this._callCount; }
    get lastArg(): x_44813_util.JsTypeCommander.AnyNilable { return this._lastArg; }
    get thisObj(): MapByTypeHelper { return this; }
    get whenBoolean(): x_44813_util.JsTypeCommander.MapFromValueCallback<boolean, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<boolean>("whenBoolean", this._whenBoolean); }
    get whenFunction(): x_44813_util.JsTypeCommander.MapFromValueCallback<Function, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<Function>("whenFunction", this._whenFunction); }
    get whenInfinity(): x_44813_util.JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenInfinity", this._whenInfinity); }
    get whenNaN(): x_44813_util.JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenNaN", this._whenNaN); }
    get whenNumber(): x_44813_util.JsTypeCommander.MapFromValueCallback<number, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<number>("whenNumber", this._whenNumber); }
    get whenArray(): x_44813_util.JsTypeCommander.MapFromValueCallback<x_44813_util.JsTypeCommander.AnyNilable[], MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<x_44813_util.JsTypeCommander.AnyNilable[]>("whenArray", this._whenArray); }
    get whenArrayLike(): x_44813_util.JsTypeCommander.MapFromValueCallback<ArrayLike<x_44813_util.JsTypeCommander.AnyNilable>, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<ArrayLike<x_44813_util.JsTypeCommander.AnyNilable>>("whenArrayLike", this._whenArrayLike); }
    get whenNotArrayLike(): x_44813_util.JsTypeCommander.MapFromValueCallback<x_44813_util.JsTypeCommander.IStringKeyedObject, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<x_44813_util.JsTypeCommander.IStringKeyedObject>("whenNotArrayLike", this._whenNotArrayLike); }
    get whenString(): x_44813_util.JsTypeCommander.MapFromValueCallback<string, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<string>("whenString", this._whenString); }
    get whenSymbol(): x_44813_util.JsTypeCommander.MapFromValueCallback<symbol, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<symbol>("whenSymbol", this._whenSymbol); }
    get whenNull(): x_44813_util.JsTypeCommander.MapFromValueCallback<null, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<null>("whenNull", this._whenNull); }
    get whenUndefined(): x_44813_util.JsTypeCommander.MapFromValueCallback<undefined, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<undefined>("whenUndefined", this._whenUndefined); }
    get whenObject(): x_44813_util.JsTypeCommander.MapFromValueCallback<x_44813_util.JsTypeCommander.IStringKeyedObject, MapCallbackId>|MapCallbackId|undefined { return this._invokeThis<x_44813_util.JsTypeCommander.IStringKeyedObject>("whenObject", this._whenObject); }
    otherwise(value: x_44813_util.JsTypeCommander.AnyNilable): MapCallbackId { return this._onInvoked(MapCallbackId.otherwise, value); }
    toJSON(): { [key: number]: boolean|undefined } {
        let allIds: MapCallbackId[] = [ MapCallbackId.whenBoolean, MapCallbackId.whenFunction, MapCallbackId.whenInfinity, MapCallbackId.whenNaN, MapCallbackId.whenNumber, MapCallbackId.whenArray, MapCallbackId.whenArrayLike, MapCallbackId.whenNotArrayLike, MapCallbackId.whenString,
            MapCallbackId.whenSymbol, MapCallbackId.whenNull, MapCallbackId.whenUndefined, MapCallbackId.whenObject ];
        let result: { [key: string]: boolean|undefined } = { };
        allIds.forEach(i => {
            let n: MapCallbackName = mapCallbackIdToName(i);
            if (this._isOmmitted[n])
                result[n] = false
        })
        return result;
    }
}
class MapByNilHelper {
    private _whenTrueInvoked: boolean = false;
    private _otherwiseInvoked: boolean = false;
    private _callCount: number = 0;
    private _lastArg: x_44813_util.JsTypeCommander.AnyNilable = undefined;
    private _trueNum: number;
    private _otherwiseNum: number;
    get whenTrueInvoked(): boolean { return this._whenTrueInvoked; }
    get otherwiseInvoked(): boolean { return this._otherwiseInvoked; }
    get callCount(): number { return this._callCount; }
    get trueNum(): number { return this._trueNum; }
    get otherwiseNum(): number { return this._otherwiseNum; }
    whenTrue(arg: x_44813_util.JsTypeCommander.AnyNilable): number {
        this._callCount++;
        this._whenTrueInvoked = true;
        this._lastArg = arg;
        return this._trueNum;
    }
    otherwise(arg?: any): number {
        this._callCount++;
        this._otherwiseInvoked = true;
        this._lastArg = arg;
        return this._otherwiseNum;
    }
    constructor() {
        this._trueNum = Math.floor(Math.random() * 100);
        this._otherwiseNum = Math.floor(Math.random() * 100);
        while (this._trueNum == this._otherwiseNum)
            this._otherwiseNum = Math.floor(Math.random() * 100);
    }
}

describe("Testing type map functions", function() {
    describe("Testing mapByTypeValue function", function() {
        let inputTypeArr: MapByTypeInputType[] = [
            {
                type: 'nil',
                test: [
                    {
                        arg: { display: 'undefined', getValue: () => undefined },
                        opt: [
                            { expected: MapCallbackId.whenUndefined },
                            { omit: "whenUndefined", expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: { display: 'null', getValue: () => null },
                        opt: [
                            { expected: MapCallbackId.whenNull },
                            { omit: "whenNull", expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'boolean',
                test: {
                    arg: [ { display: 'true', getValue: () => true }, { display: 'false', getValue: () => false } ],
                    opt: [
                        { expected: MapCallbackId.whenBoolean },
                        { omit: "whenBoolean", expected: MapCallbackId.otherwise }
                    ]
                }
            }, {
                type: 'number',
                test: [
                    {
                        arg: [
                            { display: 'Number.POSITIVE_INFINITY', getValue: () => Number.POSITIVE_INFINITY },
                            { display: 'Number.NEGATIVE_INFINITY', getValue: () => Number.NEGATIVE_INFINITY },
                            { display: 'Infinity', getValue: () => Infinity }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenInfinity },
                            { omit: "whenInfinity", expected: MapCallbackId.whenNumber },
                            { omit: ["whenInfinity", "whenNumber"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: { display: 'NaN', getValue: () => NaN },
                        opt: [
                            { expected: MapCallbackId.whenNaN },
                            { omit: "whenNaN", expected: MapCallbackId.whenNumber },
                            { omit: ["whenNaN", "whenNumber"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: [ { display: '0', getValue: () => 0 }, { display: '-1', getValue: () => -1 }, { display: '0.0001', getValue: () => 0.0001 }, { display: '10', getValue: () => 10 } ],
                        opt: [
                            { expected: MapCallbackId.whenNumber },
                            { omit: "whenNumber", expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'Array',
                test: {
                    arg: [ { display: '[]', getValue: () => [] }, { display: '[undefined]', getValue: () => [undefined] }, { display: '[false]', getValue: () => [false] } ],
                    opt: [
                        { expected: MapCallbackId.whenArray },
                        { omit: "whenArray", expected: MapCallbackId.whenArrayLike },
                        { omit: ["whenArray", "whenArrayLike"], expected: MapCallbackId.whenObject },
                        { omit: ["whenArray", "whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise },
                        { expected: MapCallbackId.whenArray, checkElements: false },
                        { omit: "whenArray", expected: MapCallbackId.whenArrayLike, checkElements: false },
                        { omit: ["whenArray", "whenArrayLike"], expected: MapCallbackId.whenObject, checkElements: false },
                        { omit: ["whenArray", "whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: false },
                        { expected: MapCallbackId.whenArray, checkElements: true },
                        { omit: "whenArray", expected: MapCallbackId.whenArrayLike, checkElements: true },
                        { omit: ["whenArray", "whenArrayLike"], expected: MapCallbackId.whenObject, checkElements: true },
                        { omit: ["whenArray", "whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: true }
                    ]
                }
            }, {
                type: 'ArrayLike',
                test: [
                    {
                        arg: [
                            { display: '{ length: 0 }', getValue: () => { return { length: 0 } } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[1] = "again"; return a; } },
                            { display: '{ length: 2, [0]: "test", [2]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[2] = "again"; return a; } },
                            { display: '{ length: 1 }', getValue: () => { return { length: 1 } } }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenArrayLike },
                            { omit: "whenArrayLike", expected: MapCallbackId.whenObject },
                            { omit: ["whenArrayLike", "whenObject"], expected: MapCallbackId.otherwise }
                        ]
                    }, {
                        arg: [
                            { display: '{ length: 0 }', getValue: () => { return { length: 0 } } },
                            { display: '{ length: 2, [0]: "test", [1]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[1] = "again"; return a; } }
                        ],
                        opt: [
                            { expected: MapCallbackId.whenArrayLike, checkElements: true },
                            { omit: "whenArrayLike", checkElements: true, expected: MapCallbackId.whenObject },
                            { omit: ["whenArrayLike", "whenObject"], checkElements: true, expected: MapCallbackId.otherwise }
                        ]
                    }
                ]
            }, {
                type: 'not ArrayLike',
                test: [
                    {
                        arg: { display: '{ }', getValue: () => { return { } } },
                        opt: [
                            { expected: MapCallbackId.whenNotArrayLike },
                            { omit: "whenNotArrayLike", expected: MapCallbackId.whenObject },
                            { omit: ["whenNotArrayLike", "whenObject"], expected: MapCallbackId.otherwise },
                            { expected: MapCallbackId.whenNotArrayLike, checkElements: false },
                            { omit: "whenNotArrayLike", expected: MapCallbackId.whenObject, checkElements: false },
                            { omit: ["whenNotArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: false }
                        ]
                    }, {
                        arg: [
                            { display: '{ }', getValue: () => { return { } } },
                            { display: '{ length: 1 }', getValue: () => { return { length: 1 } } },
                            { display: '{ length: 2, [0]: "test", [2]: "again" }',
                                getValue: () => { let a: { length: number, [key: number]: string } = { length: 2 }; a[0] = "test"; a[2] = "again"; return a; } },
                        ],
                        opt: [
                            { expected: MapCallbackId.whenNotArrayLike, checkElements: true },
                            { omit: "whenNotArrayLike", expected: MapCallbackId.whenObject, checkElements: true },
                            { omit: ["whenNotArrayLike", "whenObject"], expected: MapCallbackId.otherwise, checkElements: true }
                        ]
                    }
                ]
            }, {
                type: 'string',
                test: {
                    arg: [ { display: '""', getValue: () => "" }, { display: '"false"', getValue: () => "false" } ],
                    opt: [
                        { expected: MapCallbackId.whenString },
                        { omit: "whenString", expected: MapCallbackId.otherwise }
                    ]
                }
            }, {
                type: 'symbol',
                test: {
                    arg: { display: 'Symbol.iterator', getValue: () => Symbol.iterator },
                    opt: [
                        { expected: MapCallbackId.whenSymbol },
                        { omit: "whenSymbol", expected: MapCallbackId.otherwise }
                    ]
                }
            }
        ];
        let dataIterationIndex: number = 0;
        inputTypeArr.forEach(inputType => {
            describe('Testing ' + inputType.type + " values", function() {
                let tests: MapByTypeTest[] = (Array.isArray(inputType.test)) ? inputType.test : [inputType.test];
                tests.forEach(mapByTypeTest => {
                    let args: ArgumentDescriptor[] = (Array.isArray(mapByTypeTest.arg)) ? mapByTypeTest.arg : [mapByTypeTest.arg];
                    let optArr: MapByTypeOptions[] = (Array.isArray(mapByTypeTest.opt)) ? mapByTypeTest.opt : [mapByTypeTest.opt];
                    optArr.forEach(opt => {
                        let omit: MapCallbackName[] = (typeof(opt.omit) == "undefined") ? [] : ((typeof(opt.omit) == "string") ? [opt.omit] : opt.omit);
                        args.forEach(argInfo => {
                            let tgh: MapByTypeHelper = new MapByTypeHelper(omit);
                            it('x_44813_util.JsTypeCommander.mapByTypeValue(' + argInfo.display + ', ' + JSON.stringify(tgh.toJSON()) + ((typeof(opt.checkElements) == "boolean") ? ", " +
                                    opt.checkElements : "") + ') should return ' + opt.expected + " (calling " + mapCallbackIdToName(opt.expected) + ")", function() {
                                let result: x_44813_util.JsTypeCommander.AnyNilable = (typeof(opt.checkElements) == "boolean") ?
                                    x_44813_util.JsTypeCommander.mapByTypeValue.call(this, argInfo.getValue(), tgh, opt.checkElements) :
                                    x_44813_util.JsTypeCommander.mapByTypeValue.call(this, argInfo.getValue(), tgh);
                                dataIterationIndex++;
                                expect(typeof(result)).toBe("number", "at dataIterationIndex " + dataIterationIndex);
                                expect(result).toBe(opt.expected, mapCallbackIdToName(result) + " called, insteaat dataIterationIndex " + dataIterationIndex);
                            });
                        }, this);
                    }, this);
                }, this);
            });
        }, this);
    });

    let mapByNilFunctionArr: MapByNilFunction[] = [
        { name: 'mapByDefined', callback: x_44813_util.JsTypeCommander.mapByDefined, allowUndefined: false, allowNull: true },
        { name: 'mapByNotNull', callback: x_44813_util.JsTypeCommander.mapByNotNull, allowUndefined: true, allowNull: false },
        { name: 'mapByNotNil', callback: x_44813_util.JsTypeCommander.mapByNotNil, allowUndefined: false, allowNull: false }
    ];
    let mapByNilArguments: MapByNilArguments[] = [
        { display: 'undefined', type: 'undefined', getValue: () => undefined },
        { display: 'null', type: 'null', getValue: () => null },
        { display: 'NaN', type: 'notNil', getValue: () => NaN },
        { display: '0', type: 'notNil', getValue: () => 0 },
        { display: 'false', type: 'notNil', getValue: () => false },
        { display: '""', type: 'notNil', getValue: () => "" },
        { display: '[]', type: 'notNil', getValue: () => [] },
        { display: '[undefined', type: 'notNil', getValue: () => [undefined] },
        { display: '{}', type: 'notNil', getValue: () => { return {}; } },
        { display: 'Symbol.iterator', type: 'notNil', getValue: () => Symbol.iterator }
    ];
    mapByNilFunctionArr.forEach(mapByNilFunction => {
        describe("Testing " + mapByNilFunction.name + " function", function() {
            mapByNilArguments.forEach(argInfo => {
                let whenTrue: boolean = (argInfo.type == "notNil" || ((argInfo.type == "null") ? mapByNilFunction.allowNull : mapByNilFunction.allowUndefined));
                let mapByNilHelper: MapByNilHelper = new MapByNilHelper();
                let expected: number = (whenTrue) ? mapByNilHelper.trueNum : mapByNilHelper.otherwiseNum;
                it(mapByNilFunction.name + "(" + argInfo.display + ", fn(v) => " + mapByNilHelper.trueNum + ', fn' + ((mapByNilFunction.name == "mapByNotNil") ? '(v)' : '()') +
                        ' => ' + mapByNilHelper.otherwiseNum + ') should return ' + expected + ' (' + ((whenTrue) ? 'whenTrue' : 'otherwise') + ')', function() {
                    let result: x_44813_util.JsTypeCommander.AnyNilable = mapByNilFunction.callback(argInfo.getValue(), mapByNilHelper.whenTrue, mapByNilHelper.otherwise, mapByNilHelper);
                    expect(typeof(result)).toBe('number');
                    expect(result).toBe(expected);
                    expect(mapByNilHelper.callCount).not.toBe(0, 'Callback not invoked');
                    expect(mapByNilHelper.callCount).toBe(1, 'Callback invoked more than once');
                    if (whenTrue)
                        expect(mapByNilHelper.whenTrueInvoked).toBe(true, 'Wrong callback invoked');
                    else
                        expect(mapByNilHelper.otherwiseInvoked).toBe(true, 'Wrong callback invoked');
                });
            }, this);
        });
    }, this);
});

describe("Testing function mapInto(obj: any, callbackFn: RecursiveMapCallbackFn, options?: MapIntoOptions): any", function() {
    let sourceNumber: number = 7;
    let expectedNumber: number = sourceNumber / 2;
    it("JsTypeCommander.mapInto(" + sourceNumber + ", (current, key, source, target) => current / 2)) should return " + expectedNumber, function() {
        let callbackFn: x_44813_util.JsTypeCommander.RecursiveMapCallbackFn = function(current: x_44813_util.JsTypeCommander.AnyNilable, key: number | string | undefined, source: x_44813_util.JsTypeCommander.AnyNilable[] | x_44813_util.JsTypeCommander.IStringKeyedObject | undefined, target: x_44813_util.JsTypeCommander.AnyNilable[] | x_44813_util.JsTypeCommander.IStringKeyedObject | undefined) {
            return current / 2;
        };
        let actual: any = x_44813_util.JsTypeCommander.mapInto(sourceNumber, callbackFn);
        expect(typeof(actual)).toBe("number");
        expect(actual).toBe(expectedNumber);
    });
    let sourceArray1: any[] = [true, "2", 3];
    let expectedArray1: string[] = ["true", "2", "3"];
    it("JsTypeCommander.mapInto(" + JSON.stringify(sourceArray1) + ", (current, key, source, target): any)) should return" + JSON.stringify(expectedArray1), function() {
        let callbackFn: x_44813_util.JsTypeCommander.RecursiveMapCallbackFn = function(current: x_44813_util.JsTypeCommander.AnyNilable, key: number | string | undefined, source: x_44813_util.JsTypeCommander.AnyNilable[] | x_44813_util.JsTypeCommander.IStringKeyedObject | undefined, target: x_44813_util.JsTypeCommander.AnyNilable[] | x_44813_util.JsTypeCommander.IStringKeyedObject | undefined) {
            if (x_44813_util.JsTypeCommander.notDefined(source))
                return [];
            return current.toString();
        };
        let actual: any = x_44813_util.JsTypeCommander.mapInto(sourceArray1, callbackFn);
        expect(typeof(actual)).toBe("object");
        expect(Array.isArray(actual)).toBe(true, "Result value is not an array");
        if (Array.isArray(actual)) {
            expect(actual.length).toBe(expectedArray1.length, "length mismatch");
            for (var i: number = 0; i < expectedArray1.length; i++)
            {
                expect(typeof(actual[i])).toBe("string", "Element " + i + " type mismatch");
                expect(actual[i]).toBe(expectedArray1[i], "Element " + i + " value mismatch");
            }
        }
    });
    let myThisObj: { count: number, count2: number } = { count: 0, count2: 0 };
    let sourceOpts1: x_44813_util.JsTypeCommander.MapIntoOptions = {
        thisObj: myThisObj,
        totalMaxItems: 6
    };
    let sourceArray2: x_44813_util.JsTypeCommander.AnyNilable[] = [undefined, null, true, false, 0, "test", 5.6];
    let expectedArray2: string[] = ["undefined", "null", "true", "false", "0", "\"test\""];
    it("JsTypeCommander.mapInto(" + (sourceArray2.map(i => {
        if (x_44813_util.JsTypeCommander.notDefined(i))
            return "undefined";
        if (x_44813_util.JsTypeCommander.isNull(i))
            return "null";
        return JSON.stringify(i);
    })) + ", (current, key, source, target): any, " + JSON.stringify(sourceOpts1) + ")) should return" + JSON.stringify(expectedArray2) + " and thisObj.count should be " + expectedArray2.length + 1, function() {
        let callbackFn: x_44813_util.JsTypeCommander.RecursiveMapCallbackFn = function(this: { count: number }, current: x_44813_util.JsTypeCommander.AnyNilable, key: number | string | undefined, source: x_44813_util.JsTypeCommander.AnyNilable[] | x_44813_util.JsTypeCommander.IStringKeyedObject | undefined, target: x_44813_util.JsTypeCommander.AnyNilable[] | x_44813_util.JsTypeCommander.IStringKeyedObject | undefined) {
            this.count++;
            if (x_44813_util.JsTypeCommander.notDefined(source))
                return [];
            if (x_44813_util.JsTypeCommander.notDefined(current))
                return "undefined";
            if (x_44813_util.JsTypeCommander.isNull(current))
                return "null";
            return JSON.stringify(current);
        };
        myThisObj.count = 0;
        myThisObj.count2 = 0;
        let actual: any = x_44813_util.JsTypeCommander.mapInto(sourceArray2, callbackFn, sourceOpts1);
        expect(typeof(actual)).toBe("object");
        expect(Array.isArray(actual)).toBe(true, "Result value is not an array");
        if (Array.isArray(actual)) {
            if (actual.length != expectedArray2.length) {
                expect(actual).toBe(expectedArray2);
                expect(actual.length).toBe(expectedArray2.length, "length mismatch");
            }
            for (var i: number = 0; i < expectedArray2.length; i++)
            {
                expect(typeof(actual[i])).toBe("string", "Element " + i + " type mismatch in ");
                expect(actual[i]).toBe(expectedArray2[i], "Element " + i + " value mismatch");
            }
        }
        expect(myThisObj.count).toBe(expectedArray2.length + 1);
    });
    
    let sourceArray3: any[] = [{a: 1, b: 2}, 3, 4, ["Eins", "Svein", "Drei"]];
    let expectedArray3: any[] = [{count: 2, a: 1, b: 2}, 3, 4, ["Eins", "Svein", "Drei"]];
    myThisObj.count = 0;
    myThisObj.count2 = 0;
    let sourceOpts2: x_44813_util.JsTypeCommander.MapIntoOptions = { thisObj: myThisObj };
    it("JsTypeCommander.mapInto(" + JSON.stringify(sourceArray3) + ", (current, key, source, target): any, " + JSON.stringify(sourceOpts2) + ")) should return " + JSON.stringify(expectedArray3) + " and thisObj.count should be 10", function() {
        let callbackFn: x_44813_util.JsTypeCommander.RecursiveMapCallbackFn = function(this: { count: number }, current: x_44813_util.JsTypeCommander.AnyNilable, key: number | string | undefined, source: x_44813_util.JsTypeCommander.AnyNilable[] | x_44813_util.JsTypeCommander.IStringKeyedObject | undefined, target: x_44813_util.JsTypeCommander.AnyNilable[] | x_44813_util.JsTypeCommander.IStringKeyedObject | undefined) {
            this.count++;
            if (x_44813_util.JsTypeCommander.notDefined(source) || Array.isArray(current))
                return [];
            return (x_44813_util.JsTypeCommander.isObject(current)) ? { count: this.count } :  current;
        };
        myThisObj.count = 0;
        myThisObj.count2 = 0;
        let actual: any = x_44813_util.JsTypeCommander.mapInto(sourceArray3, callbackFn, sourceOpts2);
        (<x_44813_util.JsTypeCommander.IStringKeyedObject>(sourceArray3[0]))["a"] = 5;
        (<x_44813_util.JsTypeCommander.IStringKeyedObject>(sourceArray3[0]))["b"] = 5;
        sourceArray3[1] = 5;
        sourceArray3[2] = 5;
        sourceArray3[3][0] = "5";
        sourceArray3[3][1] = "5";
        sourceArray3[3][2] = "5";
        expect(typeof(actual)).toBe("object");
        expect(Array.isArray(actual)).toBe(true, "Result value is not an array");
        if (Array.isArray(actual)) {
            expect(actual.length).toBe(expectedArray3.length, "length mismatch");
            let obj: any = actual[0];
            expect(x_44813_util.JsTypeCommander.isNonArrayObject(obj)).toBe(true, "Element 0 is not a non-array object");
            if (x_44813_util.JsTypeCommander.isNonArrayObject(obj)) {
                let e0: x_44813_util.JsTypeCommander.IStringKeyedObject = <x_44813_util.JsTypeCommander.IStringKeyedObject>(expectedArray3[0]);
                expect(typeof(obj["a"])).toBe("number", "actual[0].a is not a number");
                expect(obj["a"]).toBe(e0["a"], "actual[0].a value mismatch");
                expect(typeof(obj["b"])).toBe("number", "actual[0].b is not a number");
                expect(obj["b"]).toBe(e0["b"], "actual[0].b value mismatch");
                expect(typeof(obj["count"])).toBe("number", "actual[0].count is not a number");
            }
            obj = actual[1];
            expect(x_44813_util.JsTypeCommander.isNumber(obj)).toBe(true, "Element 1 is not a number");
            if (x_44813_util.JsTypeCommander.isNumber(obj)) {
                expect(typeof(obj)).toBe("number", "actual[1] is not a number");
                expect(obj).toBe(expectedArray3[1], "actual[1] value mismatch");
            }
            obj = actual[2];
            expect(x_44813_util.JsTypeCommander.isNumber(obj)).toBe(true, "Element 2 is not a number");
            if (x_44813_util.JsTypeCommander.isNumber(obj)) {
                expect(typeof(obj)).toBe("number", "actual[2] is not a number");
                expect(obj).toBe(expectedArray3[2], "actual[2] value mismatch");
            }
            obj = actual[3];
            expect(typeof(obj)).toBe("object", "Element 3 is not an array");
            expect(Array.isArray(obj)).toBe(true, "Element 3 is not an array");
            if (Array.isArray(obj)) {
                let arr: string[] = <string[]>(expectedArray3[3]);
                expect(obj.length).toBe(arr.length);
                for (var i = 0; i < arr.length; i++) {
                    expect(typeof(obj[i])).toBe("string", "actual[3][" + i + "] is not a string");
                    expect(obj[i]).toBe(arr[i], "actual[3][" + i + "] value mismatch");
                }
            }
        }
        expect(myThisObj.count).toBe(10, "thisObj.count failed");
    });
});