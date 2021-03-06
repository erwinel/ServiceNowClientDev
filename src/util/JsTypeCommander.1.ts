export module x_44813_util2 {
    /**
     * Defines options for updating regular expressions used in the current module.
     */
    export interface IJsTypeCommanderRegex {
        /**
         * Pattern which matches one or more consecutive whitespace characters.
         */
        onlyWhitespace?: RegExp;
        /**
         * Pattern which captures text from the first non-whitespace character to the end of the string in group index 1 or fails if there are no non-whitespace characters.
         */
        trimStart?: RegExp;
        /**
         * Pattern which captures text in group at index 1, omitting trailing whitespace characters, or fails if there are no non-whitespace characters.
         */
        trimEnd?: RegExp;
        /**
         * Pattern which matches a single character sequence which separates 2 lines of text.
         */
        lineSeparator?: RegExp;
        /**
         * Pattern which captures text that can represent a boolean value, with true values being a successful match at group index 1,
         * and false values being a successful match at group index 2.
         */
        booleanText?: RegExp;
        /**
         * Pattern which captures text that can be used for capitalizing text.
         * @description The group at index 1 captures all leading text which is not a letter or digit, and will fail if there are no such leading characters.
         * The group at index 1 captures the first letter to be capitalized, and will never fail unless the whole pattern fails.
         * The group at index 2 captures remaining text following the capitalized letter, and will fail if there are no remaining characters.
         * If there are no letter characters or if the first letter is already capitalized, then the entire match will fail.
         */
        firstLetterLc?: RegExp;
        /**
         * Pattern which matches consecutive whitespace characters except for single space (' ') characters that are not next to other whitespace characters.
         */
        abnormalWhitespace?: RegExp;
    }
    const patternDefaults = {
        newLineSequence: "\n",
        regex: {
            onlyWhitespace: /^[\s\r\n]+$/,
            trimStart: /^[\s\r\n]*(\S(?:.|[\r\n])*)$/,
            trimEnd: /^([\s\r\n]*\S+(?:[\s\r\n]+[^\s\r\n]+)*)/,
            lineSeparator: /\r\n?|\n/,
            booleanText: /^[\s\r\n]*(?:(t(?:rue)?|y(?:es)?|[+-]?(?:0*[1-9]\d*(?:\.\d+)?|0+\.0*[1-9]\d*)|\+)|(f(?:alse)?|no?|[+-]?0+(?:\.0+)?|-))[\s\r\n]*$/i,
            firstLetterLc: /^([^a-zA-Z\d]+)?([a-z])((?:.|[\r\n])+)?$/,
            abnormalWhitespace: /(?:(?=[^ ])[\s\r\n]+|[\s\r\n]{2,})/
        }
    };
    const patternOptions = {
        newLineSequence: patternDefaults.newLineSequence,
        regex: {
            onlyWhitespace: patternDefaults.regex.onlyWhitespace,
            trimStart: patternDefaults.regex.trimStart,
            trimEnd: patternDefaults.regex.trimEnd,
            lineSeparator: patternDefaults.regex.lineSeparator,
            booleanText: patternDefaults.regex.booleanText,
            firstLetterLc: patternDefaults.regex.firstLetterLc,
            abnormalWhitespace: patternDefaults.regex.abnormalWhitespace
        }
    };

    /**
     * Names of settings which can be used to reference regular expression patters used in the current module.
     */
    export type PatternSettingsName = "onlyWhitespace"|"trimStart"|"trimEnd"|"lineSeparator"|"booleanText"|"firstLetterLc"|"abnormalWhitespace";
    
    /**
     * Alias for a type that is defined.
     * @description This is intended to represent any defined value at all when strictNullChecks is turned on.
     */
    export type TDefined = any|null;

    /**
     * Alias for a type that includes null and undefined.
     * @description This is intended for use when strictNullChecks is turned on.
     */
    export type Nilable<T> = T|null|undefined;

    /**
     * Alias for any type, including null and undefined.
     * @description This is intended to represent any value at all when strictNullChecks is turned on.
     */
    export type AnyNilable = any|null|undefined;

    /**
     * Alias for a type that includes null and undefined.
     * @description This is intended to include nulls in a type when strictNullChecks is turned on.
     */
    export type Nullable<T> = T|null;

    /**
     * Alias for any type or null.
     * @description This is intended for use when strictNullChecks is turned on.
     */
    export type AnyNullable = any|null;

    /** Represents an object which can contained arbitrarily named properties. */
    export interface IStringKeyedObject { [key: string]: AnyNilable };
    
    /**
     * Represents an object which contains both named properties and indexed elements.
     */
    export interface ICompoundArrayObject extends IStringKeyedObject, ArrayLike<AnyNilable> {
        readonly [key: string]: AnyNilable
    }
    
    /**
     * Represents an object which contains properties that are similar to Error objects.
     * @description Properties described in this interface are an aggregation of selectred reference information provided by
     * [Microsoft]{@link https://docs.microsoft.com/en-us/scripting/javascript/reference/stack-property-error-javascript} and
     * the [Mozilla Developer Network]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error}.
     */
    export interface ErrorLike {
        /**
         * Brief string that describes the error.
         * @type {string}
         */
        message: string,
        /**
         * String describing the error.
         * @description This can be used in lieu of the {@link ErrorLike.message} property or it can contain more detailed descriptive information.
         * @type {string}
         */
        description?: string,
        /**
         * Numeric value assigned to the error.
         * @type {number}
         */
        number?: number,
        /**
         * The name for the type of error.
         * @type {string}
         */
        name?: string,
        /**
         * The name of the file associated with the error.
         * @type {string}
         */
        fileName?: string,
        /**
         * The line number associated with the error.
         * @type {number}
         */
        lineNumber?: number,
        /**
         * Contains stack trace information when error is thrown.
         * 
         */
        stack?: string
    }
    
    /**
     * Function to get mapped value according to a source value.
     * @param {*} value Source value.
     * @returns {*} Mapped value.
     */
    export interface MapFromValueCallback<TSource, TResult> { (value: TSource): TResult; }
    
    /**
     * Represents supported return values from the <code>typeof</code> funciton.
     */
    export type ObjectTypeString = "boolean"|"function"|"number"|"object"|"string"|"symbol"|"undefined";
    
    export type ReservedClassPropertyName = "Arguments"|"Array"|"Boolean"|"Date"|"Error"|"Function"|"JSON"|"Math"|"Number"|"Object"|"RegExp"|"String";
    /**
     * Defines a set of values and/or {@link MapFromValueCallback} which will determine the mapped value according to a source value's type.
     */
    export interface TypeGuardResultSpecs<TSource, TResult> {
        /**
         * If defined, will be the "this" variable when callbacks defined in this interface are invoked.
         */
        thisObj?: any;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"boolean"</code>.
         * @description If the source value is <code>"boolean"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenBoolean?: MapFromValueCallback<boolean, TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"function"</code>.
         * @description If the source value is a <code>"function"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenFunction?: MapFromValueCallback<Function, TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"number"</code> and the source value is an infinite value.
         * @description If the source value is an infinite value and this property is not defined, then {@link TypeGuardResultSpecs#whenNumber} will be next in line to determine the mapped value.
         */
        whenInfinity?: MapFromValueCallback<number, TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"number"</code> and the source value is <code>NaN</code>.
         * @description If the source value is <code>NaN/code> and this property is not defined, then {@link TypeGuardResultSpecs#whenNumber} will be next in line to determine the mapped value.
         */
        whenNaN?: MapFromValueCallback<number, TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"number"</code>.
         * @description If the source value is a <code>"number"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         * If the source value is an infinite value, and {@link TypeGuardResultSpecs#whenInfinity} is defined, then that property will determine the mapped value, instead.
         * Likewise, if the source value is <code>NaN</code>, and {@link TypeGuardResultSpecs#whenNaN} is defined, then that property will determine the mapped value, instead.
         */
        whenNumber?: MapFromValueCallback<number, TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"object"</code> and the source value derrives from <code>Array</code>.
         * @description If the source value derrives from <code>Array</code> and this property is not defined, then {@link TypeGuardResultSpecs#whenArrayLike} will be next in line to determine the mapped value.
         */
        whenArray?: MapFromValueCallback<AnyNilable[], TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"object"</code> and the source appears to implement the <code>ArrayLike</code> interface.
         * @description If this property is not defined then the following rules apply:
         * If the source value derrives from <code>Array</code> and {@link TypeGuardResultSpecs#whenArrayLike} is defined, then {@link TypeGuardResultSpecs#whenArrayLike} will determine the mapped value.
         * Otherwise, {@link TypeGuardResultSpecs#whenObject} will be next in line to determine the mapped value.
         */
        whenArrayLike?: MapFromValueCallback<ArrayLike<AnyNilable>, TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"object"</code> and the source value does not derrive from <code>Array</code> and does not appear to implement the <code>ArrayLike</code> interface.
         * @description If the source value is an object and this property is not defined, then {@link TypeGuardResultSpecs#whenObject} will be next in line to determine the mapped value.
         */
        whenNotArrayLike?: MapFromValueCallback<IStringKeyedObject, TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"string"</code>.
         * @description If the source value is a <code>"string"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenString?: MapFromValueCallback<string, TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"symbol"</code>.
         * @description If the source value is a <code>"symbol"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenSymbol?: MapFromValueCallback<symbol, TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"object"</code> and it is equal to <code>null</code>.
         * @description If the source value is null and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenNull?: MapFromValueCallback<null, TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"undefined"</code>.
         * @description If the source value is <code>"undefined"</code> and this property is not defined, then {@link TypeGuardResultSpecs#otherwise} will determine the mapped value.
         */
        whenUndefined?: MapFromValueCallback<undefined, TResult>|TResult;

        /**
         * This determines the mapped value when <code>typeof(<em>sourceValue</em>)</code> returns <code>"object"</code> and it is not equal to <code>null</code>.
         * @description If the source value is array-like and either {@link TypeGuardResultSpecs#whenArray} or {@link TypeGuardResultSpecs#whenArrayLike} are defined, then those methods will determine the mapped value, instead.
         */
        whenObject?: MapFromValueCallback<IStringKeyedObject, TResult>|TResult;

        /**
         * This determines the mapped value when the associated type-based property was not defined.
         */
        otherwise: MapFromValueCallback<TSource, TResult>|TResult;
    }

    /**
     * @callback
     * Similar to Array.map, recursively iterate through nested arrays and named object properties to map result values.
     * @param {*} current The current item being interated. This can be null or undefined, according to the current element or property being iterated.
     * @param {number|string|undefined} key The array element index or object property name of the current item.
     * If this is not defined, then it can be assumed that the current item is the initial (base) object being iterated through.
     * @param {*[]|object|undefined} source The source object containing the element or property currently being iterated.
     * If this is not defined, then it can be assumed that the current item is the initial (base) object being iterated through.
     * @param {*[]|object|undefined} target The target object which will contain the element or property containing return value of this callback function.
     * If this is not defined, then it can be assumed that the current item is the initial (base) object being iterated through.
     * @returns {*} The value to replace the current value. Null and undefined values will be accepted.
     * @description Each element on the parent array is iterated, as well as for each named named property on objects. The only exception is the "count" property on arrays, which will be ignored.
     * If the current item is an array, then the return value must also be an array in order for the current value to be recursively iterated.
     * Likewise,if the curren item is an object, then the return value must a non-null value of type "object" in order for the current value to be recursively iterated.
     * If an empty array is returned, elements will be pushed onto the end of the target array as needed, otherwise, they values at the current index will be replaced.
     * If an object with no properties is returned, property values will be added or replaced on the target according to the current property name.
     * @example The following example effectively deep clones the source array to create an object compatible with JSON.stringify:
     * let deepClone = JsTypeCommander.mapInto([{a: 1, b: 2}, 3, 4, ["Eins", "Svein", "Drei"]], (current?: any, key?: number|string, source?: any[]|object, target?: any[]|object) => {
     *     if (JsTypeCommander.isArray(current))
     *         return [];
     *     if (JsTypeCommander.isNonArrayObject(current))
     *         return {};
     *     return (JsTypeCommander.isString(current) || JsTypeCommander.isNumber(current) || JsTypeCommander.isBoolean(current) || JsTypeCommander.isObjectOrNil(current)) ? current : current.toString();
     * });
     */
    export interface RecursiveMapCallbackFn {
        (current: AnyNilable, key: number|string|undefined, source: AnyNilable[]|IStringKeyedObject|undefined, target: AnyNilable[]|IStringKeyedObject|undefined): AnyNilable;
    }
    
    class limitingIterator implements MapIntoOptions {
        callbackfn: RecursiveMapCallbackFn;
        totalMaxItems: number = 8192;
        currentTotalItems: number = 0;
        maxItemsInObject: number = 1024;
        maxDepth: number = 32;
        thisObj?: any;
    
        constructor(callbackfn: RecursiveMapCallbackFn, options?: MapIntoOptions) {
            this.callbackfn = callbackfn;
            if (typeof(options) == "object") {
                this.totalMaxItems = JsTypeCommander.toNumber(options.totalMaxItems, this.totalMaxItems);
                this.maxItemsInObject = JsTypeCommander.toNumber(options.maxItemsInObject, this.maxItemsInObject);
                this.maxDepth = JsTypeCommander.toNumber(options.maxDepth, this.maxDepth);
                this.thisObj = options.thisObj;
            }
        }
    
        iterateInto(maxDepth: number, current: AnyNilable, key: number|string|undefined, source: AnyNilable[]|IStringKeyedObject|undefined,
                target: AnyNilable[]|IStringKeyedObject|undefined): AnyNilable {
            this.currentTotalItems++;
            target = (JsTypeCommander.isNil(this.thisObj)) ? this.callbackfn(current, key, source, target) : this.callbackfn.call(this.thisObj, current, key);
            if (maxDepth < 1 || this.currentTotalItems >= this.totalMaxItems || !JsTypeCommander.isObject(target) || !JsTypeCommander.isObject(source))
                return target;
            source = current;
            if (JsTypeCommander.isArray(target)) {
                if (!JsTypeCommander.isArray(current))
                    return target;
                for (var index = 0; index < current.length && index < this.maxItemsInObject; index++) {
                    var t = this.iterateInto(maxDepth - 1, current[index], index, source, target);
                    if (index < target.length)
                        target[index] = t;
                    else
                        target.push(t);
                    if (this.currentTotalItems >= this.totalMaxItems)
                        break;
                }
            } else {
                let count: number = 0;
                for (var n in current) {
                    count++;
                    if (count > this.maxItemsInObject)
                        break;
                    target[n] = this.iterateInto(maxDepth - 1, current[n], n, source, target);
                    if (this.currentTotalItems >= this.totalMaxItems)
                        break;
                }
            }
    
            return target;
        }
    }
    
    /**
     * Represents options for the JsTypeCommander.mapInto function.
     */
    export interface MapIntoOptions {
        /**
         * If defined, this becomes the 'this' object when the callback function is invoked.
         * @type {*}
         */
        thisObj?: any;
        
        /**
         * Maximum number of items that will be iterated before all iteration is aborted.
         * @type {number=8192}
         * @description A value less than one wil prevent iteration.
         */
        totalMaxItems?: number;
        
        /**
         * Maximum number of elements or properties that will be added to target objects.
         * @type {number=1024}
         * @description A value less than one wil prevent iteration.
         */
        maxItemsInObject?: number;
    
        /**
         * Maximum recursion depth for recursing. This helps to prevent endless loops, should there be any circular references.
         * @type {number=32}
         * @description A value less than one wil prevent recursion.
         */
        maxDepth?: number;
    }
    export class JsTypeCommander {
        /**
         * Gets the default character sequence that will be used when joining lines of text.
         * @returns {string} The default character sequence that will be used when joining lines of text.
         */
        static getDefaultLineSeparatorSequence(): string { return patternOptions.newLineSequence; }

        /**
         * Gets regular expression patterns used internally by this module.
         * @returns {IJsTypeCommanderRegex} Object whose properties contain regular expression patterns used internally by this module.
         */
        static getPatternOptions(): IJsTypeCommanderRegex {
            return {
                onlyWhitespace: patternOptions.regex.onlyWhitespace,
                trimStart: patternOptions.regex.trimStart,
                trimEnd: patternOptions.regex.trimEnd,
                lineSeparator: patternOptions.regex.lineSeparator,
                booleanText: patternOptions.regex.booleanText,
                firstLetterLc: patternOptions.regex.firstLetterLc,
                abnormalWhitespace: patternOptions.regex.abnormalWhitespace
            };
        }

        /**
         * Sets regular expression pattern options used internally by this module.
         * @param {IJsTypeCommanderRegex} settings Object whose properties contain regular expression patterns used internally by this module.
         * Undefined properties will not be changed. If this parameter is not defined, then the default pattern options will be restored.
         * @returns {IJsTypeCommanderRegex} Object whose properties contain regular expression patterns now being used internally by this module.
         */
        static setPatternOptions(settings?: IJsTypeCommanderRegex): IJsTypeCommanderRegex {
            if (typeof(settings) == "undefined" || settings === null) {
                patternOptions.regex.onlyWhitespace = patternDefaults.regex.onlyWhitespace;
                patternOptions.regex.trimStart = patternDefaults.regex.trimStart;
                patternOptions.regex.trimEnd = patternDefaults.regex.trimEnd;
                patternOptions.regex.lineSeparator = patternDefaults.regex.lineSeparator;
                patternOptions.regex.booleanText = patternDefaults.regex.booleanText;
                patternOptions.regex.firstLetterLc = patternDefaults.regex.firstLetterLc;
                patternOptions.regex.abnormalWhitespace = patternDefaults.regex.abnormalWhitespace;
            } else if (typeof(settings) == "object") {
                if (!JsTypeCommander.isNil(settings.onlyWhitespace))
                    patternOptions.regex.onlyWhitespace = settings.onlyWhitespace;
                if (!JsTypeCommander.isNil(settings.trimStart))
                    patternOptions.regex.trimStart = settings.trimStart;
                if (!JsTypeCommander.isNil(settings.trimEnd))
                    patternOptions.regex.trimEnd = settings.trimEnd;
                if (!JsTypeCommander.isNil(settings.lineSeparator))
                    patternOptions.regex.lineSeparator = settings.lineSeparator;
                if (!JsTypeCommander.isNil(settings.booleanText))
                    patternOptions.regex.booleanText = settings.booleanText;
                if (!JsTypeCommander.isNil(settings.firstLetterLc))
                    patternOptions.regex.firstLetterLc = settings.firstLetterLc;
                if (!JsTypeCommander.isNil(settings.abnormalWhitespace))
                    patternOptions.regex.abnormalWhitespace = settings.abnormalWhitespace;
            }
            return JsTypeCommander.getPatternOptions();
        }

        /**
         * Sets the default character sequence that will be used when joining lines of text.
         * @param s The default character sequence to use when joining lines of text. If this parameter is not defined, then the default character sequence will be restored.
         * @returns {string} The default character sequence that will now be used when joining lines of text.
         */
        static setDefaultLineSeparatorSequence(s?: string): string {
            if (JsTypeCommander.isNil(s))
                patternOptions.newLineSequence = patternDefaults.newLineSequence;
            else {
                let t = JsTypeCommander.toString(s, "");
                if (t.length == 0)
                    throw new Error("Line separator sequence cannot be empty.");
                patternOptions.newLineSequence = t;
            }
            return patternOptions.newLineSequence;
        }

        /**
         * Maps a source value to a new value based upon the source value's type.
         * @param target Source value to be mapped.
         * @param callbacks Conditional callbacks which get invoked based upon the source object's type.
         * @param checkElements When checking whether an object is <code>ArrayLike</code> and this is set true, then the existance of each element index is checked, which makes it slower, but more accurate.
         * @returns {*} Value returned from the matching callback.
         */
        static mapByTypeValue<TSource, TResult>(target: Nilable<TSource>, callbacks: TypeGuardResultSpecs<Nilable<TSource>, TResult>, checkElements?: boolean): TResult {
            let selectedCallback: Function|TResult|undefined;

            switch (typeof(target)) {
                case "boolean":
                    selectedCallback = callbacks.whenBoolean;
                    break;
                case "function":
                    selectedCallback = callbacks.whenFunction;
                    break;
                case "number":
                    let n: number = <number>(<AnyNilable>target);
                    if (isNaN(n) && typeof(callbacks.whenNaN) != "undefined")
                        selectedCallback = callbacks.whenNaN;
                    else if ((n == Infinity || n == -Infinity) && typeof(callbacks.whenInfinity) != "undefined")
                        selectedCallback = callbacks.whenInfinity;
                    else
                        selectedCallback = callbacks.whenNumber;
                    break;
                case "string":
                    selectedCallback = callbacks.whenString;
                    break;
                case "symbol":
                    selectedCallback = callbacks.whenSymbol;
                    break;
                case "undefined":
                    selectedCallback = callbacks.whenUndefined;
                    break;
                default:
                    if (target === null)
                        selectedCallback = callbacks.whenNull;
                    else if (Array.isArray(target)) {
                        if (typeof(callbacks.whenArray) !== "undefined")
                            selectedCallback = callbacks.whenArray;
                        else
                            selectedCallback = (typeof(callbacks.whenArrayLike) !== "undefined") ? callbacks.whenArrayLike : callbacks.whenObject;
                    } else if (JsTypeCommander.isArrayLike(target, checkElements))
                        selectedCallback = (typeof(callbacks.whenArrayLike) !== "undefined") ? callbacks.whenArrayLike : callbacks.whenObject;
                    else
                        selectedCallback = (typeof(callbacks.whenNotArrayLike) !== "undefined") ? callbacks.whenNotArrayLike : callbacks.whenObject;
                    break;
            }
            if (typeof(selectedCallback) == "undefined")
                selectedCallback = callbacks.otherwise;
            if (typeof(selectedCallback) == "function")
                return selectedCallback.call(callbacks.thisObj, target);
            return selectedCallback;
        }
        
        /**
         * Gets a mapped value according to whether the object is defined and optionally by target object type.
         * @param target Value to test.
         * @param whenTrue When target type is not "undefined": Callback to invoke to get the return value according to target object type, or value to return.
         * @param otherwise When target is "undefined": Function to call to get return value, or value to return.
         * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
         * @returns {*} Mapped value according to whether the object is defined and optionally by target object type.
         */
        static mapByDefined<TSource, TResult>(target: TSource|undefined, whenTrue: MapFromValueCallback<TSource, TResult>|TResult,
                otherwise: { (): TResult; }|TResult, thisObj?: any) : TResult {
            if (typeof(target) != "undefined") {
                if (typeof(whenTrue) == "function")
                    return whenTrue.call(thisObj, target);
                return whenTrue;
            }
            
            if (typeof(otherwise) == "function")
                return otherwise.call(thisObj);
            return otherwise;
        }
        
        /**
         * Gets a mapped value according to whether the object is not defined or not null and optionally by defined target object type.
         * @param target Value to test.
         * @param whenTrue When target value is not null: Function to call to get return value according to target object type, or value to return.
         * @param otherwise When target value is null: Function to call to get return value, or value to return, when target is null.
         * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
         * @returns {*} Mapped value according to whether the object is not defined or not null and optionally by defined target object type.
         */
        static mapByNotNull<TSource, TResult>(target: TSource, whenTrue: MapFromValueCallback<TSource, TResult>|TResult, otherwise: { (): TResult; }|TResult, thisObj?: any) : TResult {
            if (typeof(target) == "object" && target == null) {
                if (typeof(otherwise) == "function")
                    return otherwise.call(thisObj);
                return otherwise;
            }
            
            if (typeof(whenTrue) == "function")
                return whenTrue.call(thisObj, target);
            return whenTrue;
        }
        
        /**
         * Gets a mapped value according to whether the object is defined and not null and optionally by defined target object type.
         * @param target Value to test.
         * @param whenTrue When target type is not "undefined" and target value is not null: Function to call to get return value according to target object type, or value to return.
         * @param otherwise When target type is "undefined" or target value is null: Function to call to get return value, or value to return.
         * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
         * @returns {*} Mapped value according to whether the object is defined and not null and optionally by defined target object type.
         */
        static mapByNotNil<TSource, TResult>(target: TSource|undefined, whenTrue: MapFromValueCallback<TSource, TResult>|TResult,
                otherwise: MapFromValueCallback<AnyNilable, TResult>|TResult, thisObj?: any) : TResult {
            if (typeof(target) == "undefined" || (typeof(target) == "object" && target === null)) {
                if (typeof(otherwise) == "function")
                    return otherwise.call(thisObj, target);
                return otherwise;
            }
            
            if (typeof(whenTrue) == "function")
                return whenTrue.call(thisObj, target);
            return whenTrue;
        }
        
        /**
         * Determines whether an object is undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is undefined; otherwise, false.
         */
        static notDefined(obj?: TDefined): obj is undefined { return typeof(obj) == "undefined"; }
        
        /**
         * Determines wether an object is undefined or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is undefined or null; otherwise, false.
         */
        static isNil(obj?: TDefined): obj is null|undefined { return typeof(obj) == "undefined" || obj === null; }
        
        /**
         * Determines whether an object is null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is null; otherwise false (not defined or not null).
         */
        static isNull(obj?: TDefined): obj is null { return typeof(obj) == "object" && obj === null; }
        
        /**
         * Determines whether a value is a string.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a string; otherwise false.
         */
        static isString(obj?: TDefined): obj is string { return typeof(obj) == "string"; }
        
        /**
         * Determines whether a value is a string or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a string or undefined; otherwise false.
         */
        static isStringIfDef(obj?: TDefined): obj is string|undefined { return typeof(obj) == "undefined" || typeof(obj) == "string"; }
        
        /**
         * Determines whether a value is a string or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a string or null; otherwise false.
         */
        static isStringOrNull(obj?: TDefined): obj is Nullable<string> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: true,
                whenString: true,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is a string, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a string, null or undefined; otherwise false.
         */
        static isStringOrNil(obj?: TDefined): obj is Nilable<string> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: true,
                whenUndefined: true,
                whenString: true,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an empty string.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string; otherwise false.
         */
        static isEmptyString(obj?: TDefined): obj is string {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenString: (s) => s.length == 0,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an empty string or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string undefined; otherwise false.
         */
        static isEmptyStringIfDef(obj?: TDefined): obj is string|undefined {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenString: (s) => s.length == 0,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is a empty string or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string or null; otherwise false.
         */
        static isEmptyStringOrNull(obj?: TDefined): obj is Nullable<string> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: true,
                whenString: (s) => s.length == 0,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an empty string, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string, null or undefined; otherwise false.
         */
        static isEmptyStringOrNil(obj?: TDefined): obj is Nilable<string> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenNull: true,
                whenString: (s) => s.length == 0,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an empty string or contains only whitespace characters.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string or contains only whitespace characters; otherwise false.
         */
        static isEmptyOrWhitespace(obj?: TDefined): obj is string {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenString: (s) => s.length == 0 || patternOptions.regex.onlyWhitespace.test(s),
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an empty string, contains only whitespace characters, or is undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is undefined; otherwise false.
         */
        static isEmptyOrWhitespaceIfDef(obj?: TDefined): obj is string|undefined {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenString: (s) => s.length == 0 || patternOptions.regex.onlyWhitespace.test(s),
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an empty string, contains only whitespace characters, or is null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null; otherwise false.
         */
        static isNullOrWhitespace(obj?: TDefined): obj is Nullable<string> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: true,
                whenString: (s) => s.length == 0 || patternOptions.regex.onlyWhitespace.test(s),
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an empty string, contains only whitespace characters, or is null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null or undefined; otherwise false.
         */
        static isNilOrWhitespace(obj?: TDefined): obj is Nilable<string> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenNull: true,
                whenString: (s) => s.length == 0 || patternOptions.regex.onlyWhitespace.test(s),
                otherwise: false
            });
        }
        
        /**
         * Converts a value to a string.
         * @param {*} obj Object to convert.
         * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
         * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
         * @returns {string|null|undefined} Value converted to a string or the default value.
         */
        static asString(obj?: TDefined, defaultValue?: Nullable<string>, ifWhitespace?: boolean): Nilable<string> {
            let str: Nilable<string> = JsTypeCommander.mapByTypeValue<any, Nilable<string>>(obj, {
                whenUndefined: (s) => s,
                whenNull: (s) => s,
                whenString: (s) => s,
                whenArray: (a) => (a.length == 0) ? "" : a.map(o => {
                    if (JsTypeCommander.isNil(o))
                        return "";
                    return (typeof(o) == "string") ? o : o.toString();
                }).join(","),
                otherwise: (s) => {
                    try { return s.toString(); } catch (e) { }
                    return s + "";
                }
            });
            if (typeof(str) == "string" && (!ifWhitespace || str.trim().length > 0))
                return str;
            return JsTypeCommander.mapByTypeValue<any, Nilable<string>>(defaultValue, {
                whenUndefined: (s) => str,
                whenNull: (s) => (typeof(str) == "string") ? str : s,
                whenString: (s) => s,
                whenArray: (a) => (a.length == 0) ? "" : a.map(o => {
                    if (JsTypeCommander.isNil(o))
                        return "";
                    return (typeof(o) == "string") ? o : o.toString();
                }).join(","),
                otherwise: (s) => {
                    try { return s.toString(); } catch (e) { }
                    return s + "";
                }
            });
        }
        
        /**
         * Forces a value to a string.
         * @param {*} obj Object to convert.
         * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
         * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
         * @returns {string} Value converted to a string or the default value. If the default value is nil, then an empty string will be returned.
         */
        static toString(obj?: TDefined, defaultValue?: Nullable<string>, ifWhitespace?: boolean): string
        {
            let s = JsTypeCommander.asString(obj, defaultValue, ifWhitespace);
            if (JsTypeCommander.isString(s))
                return s;
            return "";
        }
        
        /**
         * Trims leading whitespace from text.
         * @param text Text to trim.
         * @returns {string} Text with leading whitespace removed.
         */
        static trimStart(text: string): string {
            let s = JsTypeCommander.toString(text, "");
            let m = patternOptions.regex.trimStart.exec(s);
            return (JsTypeCommander.isNil(m)) ? "" : m[1];
        }
        
        /**
         * Trims trailing whitespace from text.
         * @param text Text to trim.
         * @returns {string} Text with trailing whitespace removed.
         */
        static trimEnd(text: string): string {
            let s = JsTypeCommander.toString(text, "");
            let m = patternOptions.regex.trimEnd.exec(s);
            return (JsTypeCommander.isNil(m)) ? "" : m[1];
        }
        
        /**
         * Normalizes whitespace in text.
         * @param text Text to trim.
         * @returns {string} Text with outer whitespace removed and inner whitespace normalized.
         */
        static asNormalizedWs(text: string): string {
            let s = JsTypeCommander.toString(text, "").trim();
            if (s.length == 0)
                return s;
            return s.replace(patternOptions.regex.abnormalWhitespace, " ");
        }
        
        /**
         * Capitalizes first letter in text.
         * @param {string} text Text to capitalize.
         * @returns {string} Capitalizes the first letter in text, skipping over any leading characters that are not letters or digits.
         */
        static ucFirst(text: string): string {
            let s = JsTypeCommander.toString(text, "");
            if (s.length < 2)
                return s.toUpperCase();
            let m = patternOptions.regex.firstLetterLc.exec(s);
            if (JsTypeCommander.isNil(m))
                return s;
            if (JsTypeCommander.isString(m[1])) {
                if (JsTypeCommander.isString(m[3]))
                    return m[1] + m[2].toUpperCase() + m[3];
                return m[1] + m[2].toUpperCase();
            }
            if (JsTypeCommander.isString(m[3]))
                return m[2].toUpperCase() + m[3];
            return m[2].toUpperCase();
        }
        
        /**
         * Splits text by line separator character sequences.
         * @param {string} text Text to split.
         * @returns {string[]} Array containing individual lines of text.
         */
        static splitLines(text: string): string[] {
            let s = JsTypeCommander.toString(text, "");
            if (s.length == 0)
                return [s];
            return s.split(patternOptions.regex.lineSeparator);
        }
        
        /**
         * Indents lines within text and trims trailing whitespace.
         * @param {string|string[]} text Text to indent.
         * @param {string} indent Characters to use for indentation.
         * @returns {string} Text with lines indented.
         */
        static indentText(text: string|string[], indent?: string): string {
            let i = JsTypeCommander.toString(indent, "\t");
            let arr: string[];
            if (Array.isArray(text)) {
                if (text.length == 0)
                    arr = text;
                else if (text.length == 1)
                    arr = JsTypeCommander.splitLines(text[0]);
                else {
                    arr = [];
                    text.forEach(s => JsTypeCommander.splitLines(s).forEach(l => arr.push(l)));
                }
            } else
                arr = JsTypeCommander.splitLines(text);
            if (arr.length == 0 || (arr.length == 1 && arr[0].length == 0))
                return "";
        
            return arr.map(s => JsTypeCommander.trimEnd(s)).map(s => {
                if (s.length == 0)
                    return s;
                return i + s;
            }).join(patternOptions.newLineSequence);
        }
        
        /**
         * Indents lines of text and trim trailing whitespace.
         * @param {string[]|string} text Text to indent.
         * @param {string} indent Characters to use for indentation.
         * @returns {string} Array containing indented lines.
         */
        static indentLines(text: string[]|string, indent?: string): string[] {
            let i = JsTypeCommander.toString(indent, "\t");
            let arr: string[];
            if (Array.isArray(text)) {
                if (text.length == 0)
                    arr = text;
                else if (text.length == 1)
                    arr = JsTypeCommander.splitLines(text[0]);
                else {
                    arr = [];
                    text.forEach(s => JsTypeCommander.splitLines(s).forEach(l => arr.push(l)));
                }
            } else
                arr = JsTypeCommander.splitLines(text);
            if (arr.length == 0 || (arr.length == 1 && arr[0].length == 0))
                return arr;
            arr = arr.map(s => JsTypeCommander.trimEnd(s));
        
            if (i.length == 0)
                return arr;
            
            return arr.map(s => {
                if (s.length == 0)
                    return s;
                return i + s;
            });
        }
        
        /**
         * Determines whether a value is boolean.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is boolean; otherwise false.
         */
        static isBoolean(obj?: TDefined): obj is boolean { return typeof(obj) == "boolean"; }
        
        /**
         * Determines whether a value is boolean or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is boolean or undefined; otherwise false.
         */
        static isBooleanIfDef(obj?: TDefined): obj is boolean|undefined { return typeof(obj) == "undefined" || typeof(obj) == "boolean"; }
        
        /**
         * Determines whether a value is boolean or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is boolean or null; otherwise false.
         */
        static isBooleanOrNull(obj?: TDefined): obj is Nullable<boolean> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: true,
                whenBoolean: true,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is boolean, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is boolean, null or undefined; otherwise false.
         */
        static isBooleanOrNil(obj?: TDefined): obj is Nilable<boolean> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenNull: true,
                whenBoolean: true,
                otherwise: false
            });
        }
        
        /**
         * Converts a value to a boolean.
         * @param {*} obj Object to convert.
         * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
         * @returns {boolean|null|undefined} Value converted to a boolean or the default value.
         */
        static asBoolean(obj?: TDefined, defaultValue?: Nullable<boolean>): Nilable<boolean> {
            let bs: Nilable<boolean|string> = JsTypeCommander.mapByTypeValue<any, Nilable<boolean|string>>(obj, {
                whenUndefined: (b) => b,
                whenNull: (b) => b,
                whenBoolean: (b) => b,
                whenString: (s) => s,
                whenNaN: false,
                whenNumber: (n) => n != 0,
                whenArray: (a) => (a.length == 0) ? undefined : (JsTypeCommander.isNil(a[0]) ? a[0] : ((JsTypeCommander.isObject(a[0])) ? undefined : JsTypeCommander.asBoolean(a[0]))),
                otherwise: (o) => {
                    try {
                        return JsTypeCommander.mapByTypeValue<any, Nilable<boolean|string>>(o.valueOf(), {
                            whenUndefined: (b) => o.toString(),
                            whenNull: (b) => o.toString(),
                            whenBoolean: (b) => b,
                            whenString: (s) => s,
                            whenNaN: o.toString(),
                            whenNumber: (n) => n != 0,
                            otherwise: (v) => {
                                try { return v.toString(); } catch (e) { }
                                return v + "";
                            }
                        })
                    } catch (e) { }
                    try { return o.toString(); } catch (e) { }
                    return o + "";
                }
            });
            return JsTypeCommander.mapByTypeValue<Nilable<boolean|string>, Nilable<boolean>>(bs, {
                whenBoolean: (b) => b,
                whenString: (s) => {
                    if ((s = s.trim()).length > 0) {
                        let m = patternOptions.regex.booleanText.exec(s);
                        if (!JsTypeCommander.isNil(m))
                            return JsTypeCommander.isNil(m[2]);
                    }
                    return JsTypeCommander.mapByTypeValue<any, Nilable<boolean>>(defaultValue, {
                        whenUndefined: (o) => o,
                        whenNull: (o) => o,
                        whenBoolean: (b) => b,
                        otherwise: (o) =>  JsTypeCommander.asBoolean(o)
                    });
                },
                whenNull: (o) => JsTypeCommander.mapByTypeValue<any, Nilable<boolean>>(defaultValue, {
                    whenUndefined: (d) => o,
                    whenNull: (d) => d,
                    whenBoolean: (b) => b,
                    otherwise: (d) =>  JsTypeCommander.asBoolean(d)
                }),
                otherwise: (o) => JsTypeCommander.mapByTypeValue<any, Nilable<boolean>>(defaultValue, {
                    whenUndefined: (d) => d,
                    whenNull: (d) => d,
                    whenBoolean: (b) => b,
                    otherwise: (d) =>  JsTypeCommander.asBoolean(d)
                })
            });
        }
        
        /**
         * Forces a value to a boolean.
         * @param {*} obj Object to convert.
         * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
         * @returns {boolean} Value converted to a boolean or the default value. If the default value is nil, then a false value will be returned.
         */
        static toBoolean(obj?: TDefined, defaultValue?: Nullable<boolean>): boolean
        {
            let b = JsTypeCommander.asBoolean(obj, defaultValue);
            return JsTypeCommander.isBoolean(b) && b;
        }
        
        /**
         * Determines whether a value is a finite number (not including NaN).
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a finite number; otherwise false.
         */
        static isNumber(obj?: TDefined): obj is number {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: false,
                whenUndefined: false,
                whenNumber: true,
                whenInfinity: false,
                whenNaN: false,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is a finite number or undefined (not including NaN).
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is finite number or undefined; otherwise false.
         */
        static isNumberIfDef(obj?: TDefined): obj is number|undefined {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: false,
                whenUndefined: true,
                whenNumber: true,
                whenInfinity: false,
                whenNaN: false,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is a finite number or null (not including NaN).
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a finite number or null; otherwise false.
         */
        static isNumberOrNull(obj?: TDefined): obj is Nullable<number> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: true,
                whenNumber: true,
                whenInfinity: false,
                whenNaN: false,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is a number or null (including NaN and Infinity).
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a number or null; otherwise false.
         */
        static isNumberNaNorNull(obj?: TDefined): obj is Nullable<number> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: true,
                whenNumber: true,
                whenInfinity: true,
                whenNaN: true,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is a finite number, null or undefined (including NaN).
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a finite number, null or undefined; otherwise false.
         */
        static isNumberOrNil(obj?: TDefined): obj is Nilable<number> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenNull: true,
                whenNumber: true,
                whenInfinity: true,
                whenNaN: true,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an infinite number.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an infinite number; otherwise false.
         */
        static isInfinite(obj?: TDefined): obj is number {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: false,
                whenNull: false,
                whenNumber: false,
                whenInfinity: true,
                whenNaN: false,
                otherwise: false
            });
        }
        
        /**
         * Converts a value to a number.
         * @param {*} obj Object to convert.
         * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
         * @param {boolean} [allowNaN] If true, then NaN and infinite values count as numbers.
         * @returns {number|null|undefined} Value converted to a number or the default value.
         */
        static asNumber(obj?: TDefined, defaultValue?: Nullable<number>, allowNaN?: boolean): Nilable<number>
        {
            let ns: Nilable<number> = JsTypeCommander.mapByTypeValue<any, Nilable<number>>(obj, {
                whenUndefined: (b) => b,
                whenNull: (b) => b,
                whenBoolean: (b) => (b) ? 1 : 0,
                whenString: (s) => {
                    let v: number = parseFloat(s);
                    if (!isNaN(v))
                        return v;
                },
                whenNaN: (allowNaN === true) ? NaN : null,
                whenInfinity: (allowNaN === true) ? ((n) => n) : null,
                whenNumber: (n) => n,
                whenArray: (a) => (a.length == 0) ? undefined : (JsTypeCommander.isNil(a[0]) ? a[0] : ((JsTypeCommander.isObject(a[0])) ? undefined : JsTypeCommander.asNumber(a[0], undefined, allowNaN))),
                otherwise: (o) => {
                    try {
                        return JsTypeCommander.mapByTypeValue<any, Nilable<number>>(o.valueOf(), {
                            whenUndefined: (b) => o.toString(),
                            whenNull: (b) => o.toString(),
                            whenBoolean: (b) => (b) ? 1 : 0,
                            whenString: (s) => {
                                let v: number = parseFloat(s);
                                if (!isNaN(v))
                                    return v;
                            },
                            whenNaN: (allowNaN === true) ? NaN : null,
                            whenInfinity: (allowNaN === true) ? ((n) => n) : null,
                            whenNumber: (n) => n,
                            otherwise: (v) => {
                                try { return parseFloat(v.toString()); } catch (e) { }
                                return parseFloat(v + "");
                            }
                        })
                    } catch (e) { }
                    try { return parseFloat(o.toString()); } catch (e) { }
                    return parseFloat(o + "");
                }
            });
        
            if (typeof(defaultValue) == "undefined")
                return ns;

            if (typeof(ns) == "number") {
                if (isNaN(ns) || JsTypeCommander.isInfinite(ns)) {
                    if (allowNaN === true)
                        return ns;
                } else
                    return ns;
            }
            
            return JsTypeCommander.mapByTypeValue<Nilable<number>,Nilable<number>>(JsTypeCommander.asNumber(defaultValue), {
                whenUndefined: d => (allowNaN === true) ? ns : d,
                whenInfinity: d => (typeof(ns) != "number" || isNaN(ns)) ? d : ns,
                whenNumber: d => d,
                otherwise: d => (typeof(ns) == "number") ? ns : d
            });
        }
        
        /**
         * Forces a value to a number.
         * @param {*} obj Object to convert.
         * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
         * @param {boolean} [allowNaN] If true, then NaN and infinite values count as numbers.
         * @returns {number} Value converted to a number or the default value. If the default value is nil, then a zero value will be returned.
         */
        static toNumber(obj?: TDefined, defaultValue?: Nullable<number>, allowNaN?: boolean): number
        {
            let i = JsTypeCommander.asNumber(obj, defaultValue, allowNaN);
            if (JsTypeCommander.isNumber(i))
                return i;
            else if (allowNaN === true && typeof(obj) == "number")
                return obj;
            return 0;
        }
        
        /**
         * Determines whether a value is a function.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is function; otherwise false.
         */
        static isFunction(obj?: TDefined) : obj is Function { return typeof(obj) === "function"; }
        
        /**
         * Determines whether a value is function or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is function or undefined; otherwise false.
         */
        static isFunctionIfDef(obj?: TDefined) : obj is Function|undefined { return typeof(obj) === "undefined" || typeof(obj) === "function"; }
        
        /**
         * Determines whether a value is function or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is function or null; otherwise false.
         */
        static isFunctionOrNull(obj?: TDefined) : obj is Nullable<Function> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: true,
                whenFunction: true,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is function, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is function, null or undefined; otherwise false.
         */
        static isFunctionOrNil(obj?: TDefined) : obj is Nilable<Function> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenNull: true,
                whenFunction: true,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value's type is "object" and it is not null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value's type is "object" and it is not null; otherwise false.
         */
        static isObjectType(obj?: TDefined): obj is object { return typeof(obj) == "object" && obj !== null; }
        
        /**
         * Determines whether a value is undefined or its type is "object" and it is not null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value is undefined or its type is "object" and it is not null; otherwise false.
         */
        static isObjectTypeIfDef(obj?: TDefined): obj is object|undefined {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenNull: false,
                whenObject: true,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is null or its type is "object".
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value is null, or its type is "object"; otherwise false.
         */
        static isObjectTypeOrNull(obj?: TDefined): obj is Nullable<object> { return typeof(obj) == "object"; }
        
        /**
         * Determines whether a value is undefined, null, or its type is "object".
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value is undefined, null, or its type is "object"; otherwise false.
         */
        static isObjectTypeOrNil(obj?: TDefined): obj is Nilable<object> { return typeof(obj) == "undefined" || typeof(obj) == "object"; }
        
        /**
         * Determines whether a value is an object and it is not null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value is an object and it is not null; otherwise false.
         * @description As a type guard, this behaves the same as isNonArrayObject() and isPlainObject().
         * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
         */
        static isObject(obj?: TDefined): obj is IStringKeyedObject { return typeof(obj) == "object" && obj !== null; }
        
        /**
         * Determines whether a value undefined or it is an object and it is not null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value undefined or it is an object and it is not null; otherwise false.
         * @description As a type guard, this behaves the same as isNonArrayObjectIfDef() and isPlainObjectIfDef().
         * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
         */
        static isObjectIfDef(obj?: TDefined): obj is IStringKeyedObject|undefined { return typeof(obj) == "undefined" || (typeof(obj) == "object" && obj !== null); }
        
        /**
         * Determines whether a value null or it is an object.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value null or it is an object; otherwise false.
         * @description As a type guard, this behaves the same as isNonArrayObjectOrNull() and isPlainObjectOrNull().
         * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
         */
        static isObjectOrNull(obj?: TDefined): obj is Nullable<IStringKeyedObject> { return typeof(obj) == "object"; }
        
        /**
         * Determines whether a value undefined, null, or it is an object.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value undefined, null, or it is an object; otherwise false.
         * @description As a type guard, this behaves the same as isNonArrayObjectOrNil() and isPlainObjectOrNil().
         * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
         */
        static isObjectOrNil(obj?: TDefined): obj is Nilable<IStringKeyedObject> { return typeof(obj) == "undefined" || typeof(obj) == "object"; }
        
        /**
         * Determines whether a value is an object, but not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type; otherwise false.
         * @description As a type guard, this behaves the same as isObject() and isPlainObject().
         * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
         */
        static isNonArrayObject(obj?: TDefined): obj is IStringKeyedObject { return typeof(obj) == "object" && obj !== null && !Array.isArray(obj); }
        
        /**
         * Determines whether a value is an object or undefined, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
         * @description As a type guard, this behaves the same as isObjectIfDef() and isPlainObjectIfDef().
         * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
         */
        static isNonArrayObjectIfDef(obj?: TDefined): obj is IStringKeyedObject|undefined {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenNull: false,
                whenObject: true,
                whenArray: false,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an object or null, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type or null; otherwise false.
         * @description As a type guard, this behaves the same as isObjectOrNull() and isPlainObjectOrNull().
         * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
         */
        static isNonArrayObjectOrNull(obj?: TDefined): obj is Nullable<IStringKeyedObject> { return typeof(obj) == "object" && (obj === null || !Array.isArray(obj)); }
        
        /**
         * Determines whether a value is an object, null or undefined, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
         * @description As a type guard, this behaves the same as isObjectOrNil() and isPlainObjectOrNil().
         * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
         */
        static isNonArrayObjectOrNil(obj?: TDefined): obj is Nilable<IStringKeyedObject> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenNull: true,
                whenObject: true,
                whenArray: false,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an object, but not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type; otherwise false.
         * @description As a type guard, this behaves the same as isObject() and isNonArrayObject().
         * The difference is that this returns false if the value is not constructed directly from Object.
         */
        static isPlainObject(obj?: TDefined): obj is IStringKeyedObject {
            if (typeof(obj) != "object" || obj === null)
                return false;
            let proto = Object.getPrototypeOf(obj);
            return JsTypeCommander.isNil(proto) || proto.constructor === Object;
        }
        
        /**
         * Determines whether a value is an object or undefined, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
         * @description As a type guard, this behaves the same as isObjectIfDef() and isNonArrayObjectIfDef().
         * The difference is that this returns false if the value is not constructed directly from Object.
         */
        static isPlainObjectIfDef(obj?: TDefined): obj is IStringKeyedObject|undefined {
            let t = typeof(obj);
            if (t == "undefined")
                return true;
            if (t != "object" || obj === null)
                return false;
            let proto = Object.getPrototypeOf(obj);
            return JsTypeCommander.isNil(proto) || proto.constructor === Object;
        }
        
        /**
         * Determines whether a value is an object or null, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type or null; otherwise false.
         * @description As a type guard, this behaves the same as isObjectOrNull() and isNonArrayObjectOrNull().
         * The difference is that this returns false if the value is not constructed directly from Object.
         */
        static isPlainObjectOrNull(obj?: TDefined): obj is Nullable<IStringKeyedObject> {
            if (typeof(obj) != "object")
                return false;
            if (obj === null)
                return true;
            let proto = Object.getPrototypeOf(obj);
            return JsTypeCommander.isNil(proto) || proto.constructor === Object;
        }
        
        /**
         * Determines whether a value is an object, null or undefined, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
         * @description As a type guard, this behaves the same as isObjectOrNil() and isNonArrayObjectOrNil().
         * The difference is that this returns false if the value is not constructed directly from Object.
         */
        static isPlainObjectOrNil(obj?: TDefined): obj is Nilable<IStringKeyedObject> {
            let t = typeof(obj);
            if (t == "undefined")
                return true;
            if (t != "object")
                return false;
            if (obj === null)
                return true;
            let proto = Object.getPrototypeOf(obj);
            return JsTypeCommander.isNil(proto) || proto.constructor === Object;
        }
        
        /**
         * Determines whether a value is an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an array; otherwise false.
         */
        static isArray(obj?: TDefined): obj is AnyNilable[] { return JsTypeCommander.isObject(obj) && Array.isArray(obj); }
        
        /**
         * Determines whether a value is an array or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an array or undefined; otherwise false.
         */
        static isArrayIfDef(obj?: TDefined): obj is AnyNilable[]|undefined { return typeof(obj) == "undefined" || JsTypeCommander.isArray(obj); }
        
        /**
         * Determines whether a value is an array or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an array or null; otherwise false.
         */
        static isArrayOrNull(obj?: TDefined): obj is Nullable<AnyNilable[]> { return typeof(obj) == "object" && (obj === null || Array.isArray(obj)); }
        
        /**
         * Determines whether a value is an array, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an array, null or undefined; otherwise false.
         */
        static isArrayOrNil(obj?: TDefined): obj is Nilable<AnyNilable[]> { return typeof(obj) == "undefined" || (typeof(obj) == "object" && (obj === null || Array.isArray(obj))); }
        
        /**
         * Determines whether a value is an empty array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty array; otherwise false.
         */
        static isEmptyArray(obj?: TDefined): obj is AnyNilable[] {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenArray: (a) => a.length == 0,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an empty array or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty array or undefined; otherwise false.
         */
        static isEmptyArrayIfDef(obj?: TDefined): obj is AnyNilable[]|undefined {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenArray: (a) => a.length == 0,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an empty array or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty array or null; otherwise false.
         */
        static isEmptyArrayOrNull(obj?: TDefined): obj is Nullable<AnyNilable[]> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: true,
                whenArray: (a) => a.length == 0,
                otherwise: false
            });
        }
        
        /**
         * Determines whether a value is an empty array, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty array, null or undefined; otherwise false.
         */
        static isEmptyArrayOrNil(obj?: TDefined): obj is Nilable<AnyNilable[]> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenNull: true,
                whenArray: (a) => a.length == 0,
                otherwise: false
            });
        }
        
        /**
         * Determines whether an object has properties which indiciates it behaves like an array.
         * @param {*} obj Object to test.
         * @param {boolan} checkElements If true, then the existance of each element index is checked, which makes this function slower, but more accurate.
         * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
         * @see {@link https://github.com/Microsoft/TypeScript/blob/530d7e9358ee95d2101a619e73356867b617cd95/lib/lib.es5.d.ts}
         */
        static isArrayLike(obj?: TDefined, checkElements?: boolean): obj is ArrayLike<AnyNilable> {
            if (!JsTypeCommander.isObject(obj))
                return false;
            if (Array.isArray(obj))
                return true;
            if (!JsTypeCommander.isNumber(obj.length) || isNaN(obj.length) || obj.length < 0 || obj.length == Infinity || obj.length == -Infinity)
                return false;
            if (!checkElements || obj.length == 0)
                return true;
            let arr: boolean[] = [];
            for (var i = 0; i < obj.length; i++)
                arr.push(false);
            for (var n in obj) {
                var f = parseFloat(n);
                if (!isNaN(f) && f >= 0 && f < arr.length && parseInt(n) == f)
                    arr[f] = true;
            }
            return arr.filter(v => !v).length == 0;
        }
        
        /**
         * Determines whether an object has properties which indiciates it behaves like an array.
         * @param {*} obj Object to test.
         * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
         * but can result in false positives for non-array objects which have a numeric "length" property.
         * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
         */
        static isArrayLikeIfDef(obj?: TDefined, simpleCheck?: boolean): obj is ArrayLike<AnyNilable>|undefined {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenArrayLike: true,
                whenArray: true,
                otherwise: false
            });
        }
        
        /**
         * Determines whether an object has properties which indiciates it behaves like an array.
         * @param {*} obj Object to test.
         * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
         * but can result in false positives for non-array objects which have a numeric "length" property.
         * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
         */
        static isArrayLikeOrNull(obj?: TDefined, simpleCheck?: boolean): obj is Nullable<ArrayLike<AnyNilable>> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenNull: true,
                whenArrayLike: true,
                whenArray: true,
                otherwise: false
            });
        }
        
        /**
         * Determines whether an object has properties which indiciates it behaves like an array.
         * @param {*} obj Object to test.
         * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
         * but can result in false positives for non-array objects which have a numeric "length" property.
         * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
         */
        static isArrayLikeOrNil(obj?: TDefined, simpleCheck?: boolean): obj is Nilable<ArrayLike<AnyNilable>> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenNull: true,
                whenArrayLike: true,
                whenArray: true,
                otherwise: false
            });
        }
        
        /**
         * Ensures that a value is a true array.
         * @param {*} obj Value to convert.
         * @param {boolan} checkElements If true and obj is Array-like (but not a true array), then the existance of each element index is checked, which makes this function more accurate, but slower.
         * @returns {*[]} Value as an array.
         * @description If the value is undefined, an empty array is returned.
         * If the value is an actual array, then the object itself is returned;
         * If the object is Array-like, an array is returned with values taken from each of its indexed values.
         * Otherwise, an array with a single element containing the value is returned.
         */
        static toArray(obj?: TDefined, checkElements?: boolean): AnyNilable[] {
            if (JsTypeCommander.isArray(obj))
                return obj;
            
            if (JsTypeCommander.isArrayLike(obj, checkElements)) {
                let result: AnyNilable[] = [];
                for (var i = 0; i < obj.length; i++)
                    result.push(obj[i]);
                return result;
            }
        
            if (JsTypeCommander.notDefined(obj))
                return [];
            return [obj];
        }
        
        /**
         * Searches the value's inherited prototype chain for a matching constructor function.
         * @param obj Value to test.
         * @param {AnyFunction} classConstructor Constructor function to look for.
         * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
         */
        static derivesFrom<T>(obj?: TDefined, classConstructor?: { new(...args: AnyNilable[]): T; }) : obj is T {
            if (JsTypeCommander.notDefined(obj))
                return JsTypeCommander.notDefined(classConstructor);
            if (JsTypeCommander.notDefined(classConstructor))
                return false;
            if (obj === null)
                return classConstructor === null;
            let classProto;
            if (JsTypeCommander.isFunction(classConstructor)) {
                classProto = classConstructor.prototype;
            } else {
                classProto = Object.getPrototypeOf(classConstructor);
                classConstructor = classProto.constructor;
                while (!JsTypeCommander.isFunction(classConstructor)) {
                    classProto = Object.getPrototypeOf(classProto);
                    if (JsTypeCommander.isNil(classProto))
                        break;
                    classConstructor = classProto.constructor;
                }
            }
        
            if (JsTypeCommander.isFunction(classConstructor) && obj instanceof classConstructor)
                return true;
                
            let valueProto, valueConstructor;
            if (JsTypeCommander.isFunction(obj)) {
                valueConstructor = obj;
                valueProto = obj.prototype;
            } else {
                valueProto = Object.getPrototypeOf(obj);
                valueConstructor = valueProto.constructor;
                while (!JsTypeCommander.isFunction(valueConstructor)) {
                    valueProto = Object.getPrototypeOf(valueProto);
                    if (JsTypeCommander.isNil(valueProto))
                        break;
                    valueConstructor = valueProto.constructor;
                }
            }
            if (JsTypeCommander.isNil(valueConstructor))
                return (JsTypeCommander.isNil(classConstructor) && JsTypeCommander.isNil(classProto) == JsTypeCommander.isNil(valueProto));
            if (valueConstructor === classConstructor)
                return true;
            if (JsTypeCommander.isNil(valueProto))
                return (JsTypeCommander.isNil(classProto) && valueConstructor === classConstructor);
            
            let constructorChain = [];
            do {
                if (JsTypeCommander.isFunction(classConstructor) && valueProto instanceof classConstructor)
                    return true;
                constructorChain.push(valueConstructor);
                valueConstructor = null;
                do {
                    valueProto = Object.getPrototypeOf(valueProto);
                    if (JsTypeCommander.isNil(valueProto))
                        break;
                    valueConstructor = valueProto.constructor;
                } while (JsTypeCommander.isNil(valueConstructor));
            } while (!JsTypeCommander.isNil(valueConstructor));
            for (let i = 0; i < constructorChain.length; i++) {
                if (constructorChain[i] === classConstructor)
                    return true;
            }
            return false;
        }
        
        /**
         * If defined, Searches the value's inherited prototype chain for a matching constructor function.
         * @param value Value to test.
         * @param {AnyFunction} classConstructor Constructor function to look for.
         * @returns {boolean} True if the value is not defined or if it is determined to inherit from the specified class; otherwise false.
         */
        static derivesFromIfDef<T>(obj?: TDefined, classConstructor?: { new(...args: AnyNilable[]): T; }) : obj is T|undefined {
            return typeof(obj) == "undefined" || JsTypeCommander.derivesFrom<T>(obj, classConstructor);
        }
        
        /**
         * If not null, Searches the value's inherited prototype chain for a matching constructor function.
         * @param value Value to test.
         * @param {AnyFunction} classConstructor Constructor function to look for.
         * @returns {boolean} True if the value is null or if it is determined to inherit from the specified class; otherwise false.
         */
        static derivesFromOrNull<T>(obj?: TDefined, classConstructor?: { new(...args: AnyNilable[]): T; }) : obj is Nullable<T> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: false,
                whenNull: true,
                otherwise: (o) => JsTypeCommander.derivesFrom<T>(obj, classConstructor)
            });
        }
        
        /**
         * If defined and not null, Searches the value's inherited prototype chain for a matching constructor function.
         * @param value Value to test.
         * @param {AnyFunction} classConstructor Constructor function to look for.
         * @returns {boolean} True if the value is null, not defined or if it is determined to inherit from the specified class; otherwise false.
         */
        static derivesFromOrNil<T>(obj?: TDefined, classConstructor?: { new(...args: AnyNilable[]): T; }) : obj is Nilable<T> {
            return JsTypeCommander.mapByTypeValue<any, boolean>(obj, {
                whenUndefined: true,
                whenNull: true,
                otherwise: (o) => JsTypeCommander.derivesFrom<T>(obj, classConstructor)
            });
        }
        
        /**
         * Determines if an object has properties similar to an Error object.
         * @param {*} obj Value to test
         * @returns {boolean} True if the object has properties similar to an Error object; otherwise, false.
         */
        static isErrorLike(obj?: TDefined): obj is ErrorLike {
            if (!JsTypeCommander.isNonArrayObject(obj))
                return false;
            if (JsTypeCommander.derivesFrom<Error>(obj, Error))
                return true;
            if (JsTypeCommander.isString(obj.message))
                return JsTypeCommander.isStringIfDef(obj.name) && JsTypeCommander.isStringIfDef(obj.description) && JsTypeCommander.isStringIfDef(obj.fileName) && JsTypeCommander.isStringIfDef(obj.stack) && JsTypeCommander.isNumberIfDef(obj.number) &&
                    JsTypeCommander.isNumberIfDef(obj.lineNumber);
            if (JsTypeCommander.isString(obj.description))
                return JsTypeCommander.isStringIfDef(obj.name) && JsTypeCommander.isStringIfDef(obj.fileName) && JsTypeCommander.isStringIfDef(obj.stack) && JsTypeCommander.isNumberIfDef(obj.number) &&
                    JsTypeCommander.isNumberIfDef(obj.lineNumber);
            if (!(JsTypeCommander.notDefined(obj.message) && JsTypeCommander.notDefined(obj.description)))
                return false;
            return JsTypeCommander.isString(obj.stack) && JsTypeCommander.isStringIfDef(obj.name);
        }
        
        /**
         * Creates an object with properties similar to an Error object.
         * @param {*} obj Object to convert.
         * @returns {ErrorLike|null|undefined} Object with properties similar to an error objecst. If the object is null or emtpy, then the object is returned.
         * @description This can be useful for serializing error objects when logging.
         */
        static asErrorLike(obj?: TDefined): Nilable<ErrorLike> {
            if (JsTypeCommander.isNil(obj))
                return obj;
            if (JsTypeCommander.isErrorLike(obj)) {
                let result: ErrorLike = { message: obj.message, name: (typeof(obj.name) == "string") ? obj.name : "ErrorLike" };
                if (typeof(obj.description) == "string") {
                    if (typeof(obj.message) != "string" || obj.message.trim().length == 0)
                        result.message = obj.description;
                    else
                        result.description = obj.description;
                }
                if (typeof(obj.number) == "number")
                    result.number = obj.number;
                if (typeof(obj.fileName) == "string")
                    result.fileName = obj.fileName;
                if (typeof(obj.lineNumber) == "number")
                    result.lineNumber = obj.lineNumber;
                if (typeof(obj.stack) == "string")
                    result.stack = obj.stack;
                return result;
            }
            if (JsTypeCommander.isNumber(obj))
                return { message: obj.toString(), number: obj, name: "ErrorLike" };
            let s: string = JsTypeCommander.toString(obj);
            if (JsTypeCommander.isString(s))
                return { message: s, name: "ErrorLike" };
            return s;
        }
        
        /**
         * Recursively maps an object or array.
         * @param {*} obj Object to recursively map
         * @param {{ (current: any|null|undefined, key?: number|string): any|null|undefined; }} callbackfn Call-back function for each iteration.
         * @param options Recursive Iteration options.
         * @returns {*} Mapped object or array.
         */
        static mapInto(obj: any, callbackfn: RecursiveMapCallbackFn, options?: MapIntoOptions): any {
            let i: limitingIterator = new limitingIterator(callbackfn, options);
            return i.iterateInto(i.maxDepth, obj, undefined, undefined, undefined);
        }
    }
}