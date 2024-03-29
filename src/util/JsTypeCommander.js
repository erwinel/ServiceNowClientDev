"use strict";
/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
var x_44813_util;
(function (x_44813_util) {
    var JsTypeCommander;
    (function (JsTypeCommander) {
        var patternDefaults = {
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
        var patternOptions = {
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
         * Gets the default character sequence that will be used when joining lines of text.
         * @returns {string} The default character sequence that will be used when joining lines of text.
         */
        function getDefaultLineSeparatorSequence() { return patternOptions.newLineSequence; }
        JsTypeCommander.getDefaultLineSeparatorSequence = getDefaultLineSeparatorSequence;
        /**
         * Gets regular expression patterns used internally by this module.
         * @returns {IJsTypeCommanderRegex} Object whose properties contain regular expression patterns used internally by this module.
         */
        function getPatternOptions() {
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
        JsTypeCommander.getPatternOptions = getPatternOptions;
        /**
         * Sets regular expression pattern options used internally by this module.
         * @param {IJsTypeCommanderRegexOpt} settings Object whose properties contain regular expression patterns used internally by this module.
         * Undefined properties will not be changed. If this parameter is not defined, then the default pattern options will be restored.
         * @returns {IJsTypeCommanderRegex} Object whose properties contain regular expression patterns now being used internally by this module.
         */
        function setPatternOptions(settings) {
            if (typeof (settings) == "undefined" || settings === null) {
                patternOptions.regex.onlyWhitespace = patternDefaults.regex.onlyWhitespace;
                patternOptions.regex.trimStart = patternDefaults.regex.trimStart;
                patternOptions.regex.trimEnd = patternDefaults.regex.trimEnd;
                patternOptions.regex.lineSeparator = patternDefaults.regex.lineSeparator;
                patternOptions.regex.booleanText = patternDefaults.regex.booleanText;
                patternOptions.regex.firstLetterLc = patternDefaults.regex.firstLetterLc;
                patternOptions.regex.abnormalWhitespace = patternDefaults.regex.abnormalWhitespace;
            }
            else if (typeof (settings) == "object") {
                // TODO: Test individual settings to see if they are regular expressions or strings
                if (!isNil(settings.onlyWhitespace))
                    patternOptions.regex.onlyWhitespace = settings.onlyWhitespace;
                if (!isNil(settings.trimStart))
                    patternOptions.regex.trimStart = settings.trimStart;
                if (!isNil(settings.trimEnd))
                    patternOptions.regex.trimEnd = settings.trimEnd;
                if (!isNil(settings.lineSeparator))
                    patternOptions.regex.lineSeparator = settings.lineSeparator;
                if (!isNil(settings.booleanText))
                    patternOptions.regex.booleanText = settings.booleanText;
                if (!isNil(settings.firstLetterLc))
                    patternOptions.regex.firstLetterLc = settings.firstLetterLc;
                if (!isNil(settings.abnormalWhitespace))
                    patternOptions.regex.abnormalWhitespace = settings.abnormalWhitespace;
            }
            return getPatternOptions();
        }
        JsTypeCommander.setPatternOptions = setPatternOptions;
        /**
         * Sets the default character sequence that will be used when joining lines of text.
         * @param s The default character sequence to use when joining lines of text. If this parameter is not defined, then the default character sequence will be restored.
         * @returns {string} The default character sequence that will now be used when joining lines of text.
         */
        function setDefaultLineSeparatorSequence(s) {
            if (isNil(s))
                patternOptions.newLineSequence = patternDefaults.newLineSequence;
            else {
                var t = toString(s, "");
                if (t.length == 0)
                    throw new Error("Line separator sequence cannot be empty.");
                patternOptions.newLineSequence = t;
            }
            return patternOptions.newLineSequence;
        }
        JsTypeCommander.setDefaultLineSeparatorSequence = setDefaultLineSeparatorSequence;
        /**
         * Maps a source value to a new value based upon the source value's type.
         * @param target Source value to be mapped.
         * @param callbacks Conditional callbacks which get invoked based upon the source object's type.
         * @param checkElements When checking whether an object is <code>ArrayLike</code> and this is set true, then the existance of each element index is checked, which makes it slower, but more accurate.
         * @returns {*} Value returned from the matching callback.
         */
        function mapByTypeValue(target, callbacks, checkElements) {
            var selectedCallback;
            switch (typeof (target)) {
                case "boolean":
                    selectedCallback = callbacks.whenBoolean;
                    break;
                case "function":
                    selectedCallback = callbacks.whenFunction;
                    break;
                case "number":
                    var n = target;
                    if (isNaN(n) && typeof (callbacks.whenNaN) != "undefined")
                        selectedCallback = callbacks.whenNaN;
                    else if ((n == Infinity || n == -Infinity) && typeof (callbacks.whenInfinity) != "undefined")
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
                        if (typeof (callbacks.whenArray) !== "undefined")
                            selectedCallback = callbacks.whenArray;
                        else
                            selectedCallback = (typeof (callbacks.whenArrayLike) !== "undefined") ? callbacks.whenArrayLike : callbacks.whenObject;
                    }
                    else if (isArrayLike(target, checkElements))
                        selectedCallback = (typeof (callbacks.whenArrayLike) !== "undefined") ? callbacks.whenArrayLike : callbacks.whenObject;
                    else
                        selectedCallback = (typeof (callbacks.whenNotArrayLike) !== "undefined") ? callbacks.whenNotArrayLike : callbacks.whenObject;
                    break;
            }
            if (typeof (selectedCallback) == "undefined")
                selectedCallback = callbacks.otherwise;
            if (typeof (selectedCallback) == "function")
                return selectedCallback.call(callbacks.thisObj, target);
            return selectedCallback;
        }
        JsTypeCommander.mapByTypeValue = mapByTypeValue;
        /**
         * Gets a mapped value according to whether the object is defined and optionally by target object type.
         * @param target Value to test.
         * @param whenTrue When target type is not "undefined": Callback to invoke to get the return value according to target object type, or value to return.
         * @param otherwise When target is "undefined": Function to call to get return value, or value to return.
         * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
         * @returns {*} Mapped value according to whether the object is defined and optionally by target object type.
         */
        function mapByDefined(target, whenTrue, otherwise, thisObj) {
            if (typeof (target) != "undefined") {
                if (typeof (whenTrue) == "function")
                    return whenTrue.call(thisObj, target);
                return whenTrue;
            }
            if (typeof (otherwise) == "function")
                return otherwise.call(thisObj);
            return otherwise;
        }
        JsTypeCommander.mapByDefined = mapByDefined;
        /**
         * Gets a mapped value according to whether the object is not defined or not null and optionally by defined target object type.
         * @param target Value to test.
         * @param whenTrue When target value is not null: Function to call to get return value according to target object type, or value to return.
         * @param otherwise When target value is null: Function to call to get return value, or value to return, when target is null.
         * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
         * @returns {*} Mapped value according to whether the object is not defined or not null and optionally by defined target object type.
         */
        function mapByNotNull(target, whenTrue, otherwise, thisObj) {
            if (typeof (target) == "object" && target == null) {
                if (typeof (otherwise) == "function")
                    return otherwise.call(thisObj);
                return otherwise;
            }
            if (typeof (whenTrue) == "function")
                return whenTrue.call(thisObj, target);
            return whenTrue;
        }
        JsTypeCommander.mapByNotNull = mapByNotNull;
        /**
         * Gets a mapped value according to whether the object is defined and not null and optionally by defined target object type.
         * @param target Value to test.
         * @param whenTrue When target type is not "undefined" and target value is not null: Function to call to get return value according to target object type, or value to return.
         * @param otherwise When target type is "undefined" or target value is null: Function to call to get return value, or value to return.
         * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
         * @returns {*} Mapped value according to whether the object is defined and not null and optionally by defined target object type.
         */
        function mapByNotNil(target, whenTrue, otherwise, thisObj) {
            if (typeof (target) == "undefined" || (typeof (target) == "object" && target === null)) {
                if (typeof (otherwise) == "function")
                    return otherwise.call(thisObj, target);
                return otherwise;
            }
            if (typeof (whenTrue) == "function")
                return whenTrue.call(thisObj, target);
            return whenTrue;
        }
        JsTypeCommander.mapByNotNil = mapByNotNil;
        /**
         * Determines whether an object is undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is undefined; otherwise, false.
         */
        function notDefined(obj) { return typeof (obj) == "undefined"; }
        JsTypeCommander.notDefined = notDefined;
        /**
         * Determines wether an object is undefined or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is undefined or null; otherwise, false.
         */
        function isNil(obj) { return typeof (obj) == "undefined" || obj === null; }
        JsTypeCommander.isNil = isNil;
        /**
         * Determines whether an object is null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is null; otherwise false (not defined or not null).
         */
        function isNull(obj) { return typeof (obj) == "object" && obj === null; }
        JsTypeCommander.isNull = isNull;
        /**
         * Determines whether a value is a string.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a string; otherwise false.
         */
        function isString(obj) { return typeof (obj) == "string"; }
        JsTypeCommander.isString = isString;
        /**
         * Determines whether a value is a string or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a string or undefined; otherwise false.
         */
        function isStringIfDef(obj) { return typeof (obj) == "undefined" || typeof (obj) == "string"; }
        JsTypeCommander.isStringIfDef = isStringIfDef;
        /**
         * Determines whether a value is a string or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a string or null; otherwise false.
         */
        function isStringOrNull(obj) {
            return mapByTypeValue(obj, {
                whenNull: true,
                whenString: true,
                otherwise: false
            });
        }
        JsTypeCommander.isStringOrNull = isStringOrNull;
        /**
         * Determines whether a value is a string, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a string, null or undefined; otherwise false.
         */
        function isStringOrNil(obj) {
            return mapByTypeValue(obj, {
                whenNull: true,
                whenUndefined: true,
                whenString: true,
                otherwise: false
            });
        }
        JsTypeCommander.isStringOrNil = isStringOrNil;
        /**
         * Determines whether a value is an empty string.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string; otherwise false.
         */
        function isEmptyString(obj) {
            return mapByTypeValue(obj, {
                whenString: function (s) { return s.length == 0; },
                otherwise: false
            });
        }
        JsTypeCommander.isEmptyString = isEmptyString;
        /**
         * Determines whether a value is an empty string or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string undefined; otherwise false.
         */
        function isEmptyStringIfDef(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenString: function (s) { return s.length == 0; },
                otherwise: false
            });
        }
        JsTypeCommander.isEmptyStringIfDef = isEmptyStringIfDef;
        /**
         * Determines whether a value is a empty string or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string or null; otherwise false.
         */
        function isEmptyStringOrNull(obj) {
            return mapByTypeValue(obj, {
                whenNull: true,
                whenString: function (s) { return s.length == 0; },
                otherwise: false
            });
        }
        JsTypeCommander.isEmptyStringOrNull = isEmptyStringOrNull;
        /**
         * Determines whether a value is an empty string, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string, null or undefined; otherwise false.
         */
        function isEmptyStringOrNil(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenNull: true,
                whenString: function (s) { return s.length == 0; },
                otherwise: false
            });
        }
        JsTypeCommander.isEmptyStringOrNil = isEmptyStringOrNil;
        /**
         * Determines whether a value is an empty string or contains only whitespace characters.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string or contains only whitespace characters; otherwise false.
         */
        function isEmptyOrWhitespace(obj) {
            return mapByTypeValue(obj, {
                whenString: function (s) { return s.length == 0 || patternOptions.regex.onlyWhitespace.test(s); },
                otherwise: false
            });
        }
        JsTypeCommander.isEmptyOrWhitespace = isEmptyOrWhitespace;
        /**
         * Determines whether a value is an empty string, contains only whitespace characters, or is undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is undefined; otherwise false.
         */
        function isEmptyOrWhitespaceIfDef(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenString: function (s) { return s.length == 0 || patternOptions.regex.onlyWhitespace.test(s); },
                otherwise: false
            });
        }
        JsTypeCommander.isEmptyOrWhitespaceIfDef = isEmptyOrWhitespaceIfDef;
        /**
         * Determines whether a value is an empty string, contains only whitespace characters, or is null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null; otherwise false.
         */
        function isNullOrWhitespace(obj) {
            return mapByTypeValue(obj, {
                whenNull: true,
                whenString: function (s) { return s.length == 0 || patternOptions.regex.onlyWhitespace.test(s); },
                otherwise: false
            });
        }
        JsTypeCommander.isNullOrWhitespace = isNullOrWhitespace;
        /**
         * Determines whether a value is an empty string, contains only whitespace characters, or is null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null or undefined; otherwise false.
         */
        function isNilOrWhitespace(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenNull: true,
                whenString: function (s) { return s.length == 0 || patternOptions.regex.onlyWhitespace.test(s); },
                otherwise: false
            });
        }
        JsTypeCommander.isNilOrWhitespace = isNilOrWhitespace;
        /**
         * Converts a value to a string.
         * @param {*} obj Object to convert.
         * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
         * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
         * @returns {string|null|undefined} Value converted to a string or the default value.
         */
        function asString(obj, defaultValue, ifWhitespace) {
            var str = mapByTypeValue(obj, {
                whenUndefined: function (s) { return s; },
                whenNull: function (s) { return s; },
                whenString: function (s) { return s; },
                whenArray: function (a) { return (a.length == 0) ? "" : a.map(function (o) {
                    if (isNil(o))
                        return "";
                    return (typeof (o) == "string") ? o : o.toString();
                }).join(","); },
                otherwise: function (s) {
                    try {
                        return s.toString();
                    }
                    catch (e) { }
                    return s + "";
                }
            });
            if (typeof (str) == "string" && (!ifWhitespace || str.trim().length > 0))
                return str;
            return mapByTypeValue(defaultValue, {
                whenUndefined: function (s) { return str; },
                whenNull: function (s) { return (typeof (str) == "string") ? str : s; },
                whenString: function (s) { return s; },
                whenArray: function (a) { return (a.length == 0) ? "" : a.map(function (o) {
                    if (isNil(o))
                        return "";
                    return (typeof (o) == "string") ? o : o.toString();
                }).join(","); },
                otherwise: function (s) {
                    try {
                        return s.toString();
                    }
                    catch (e) { }
                    return s + "";
                }
            });
        }
        JsTypeCommander.asString = asString;
        /**
         * Forces a value to a string.
         * @param {*} obj Object to convert.
         * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
         * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
         * @returns {string} Value converted to a string or the default value. If the default value is nil, then an empty string will be returned.
         */
        function toString(obj, defaultValue, ifWhitespace) {
            var s = asString(obj, defaultValue, ifWhitespace);
            if (isString(s))
                return s;
            return "";
        }
        JsTypeCommander.toString = toString;
        /**
         * Trims leading whitespace from text.
         * @param text Text to trim.
         * @returns {string} Text with leading whitespace removed.
         */
        function trimStart(text) {
            var s = toString(text, "");
            var m = patternOptions.regex.trimStart.exec(s);
            return (isNil(m)) ? "" : m[1];
        }
        JsTypeCommander.trimStart = trimStart;
        /**
         * Trims trailing whitespace from text.
         * @param text Text to trim.
         * @returns {string} Text with trailing whitespace removed.
         */
        function trimEnd(text) {
            var s = toString(text, "");
            var m = patternOptions.regex.trimEnd.exec(s);
            return (isNil(m)) ? "" : m[1];
        }
        JsTypeCommander.trimEnd = trimEnd;
        /**
         * Normalizes whitespace in text.
         * @param text Text to trim.
         * @returns {string} Text with outer whitespace removed and inner whitespace normalized.
         */
        function asNormalizedWs(text) {
            var s = toString(text, "").trim();
            if (s.length == 0)
                return s;
            return s.replace(patternOptions.regex.abnormalWhitespace, " ");
        }
        JsTypeCommander.asNormalizedWs = asNormalizedWs;
        /**
         * Capitalizes first letter in text.
         * @param {string} text Text to capitalize.
         * @returns {string} Capitalizes the first letter in text, skipping over any leading characters that are not letters or digits.
         */
        function ucFirst(text) {
            var s = toString(text, "");
            if (s.length < 2)
                return s.toUpperCase();
            var m = patternOptions.regex.firstLetterLc.exec(s);
            if (isNil(m))
                return s;
            if (isString(m[1])) {
                if (isString(m[3]))
                    return m[1] + m[2].toUpperCase() + m[3];
                return m[1] + m[2].toUpperCase();
            }
            if (isString(m[3]))
                return m[2].toUpperCase() + m[3];
            return m[2].toUpperCase();
        }
        JsTypeCommander.ucFirst = ucFirst;
        /**
         * Splits text by line separator character sequences.
         * @param {string} text Text to split.
         * @returns {string[]} Array containing individual lines of text.
         */
        function splitLines(text) {
            var s = toString(text, "");
            if (s.length == 0)
                return [s];
            return s.split(patternOptions.regex.lineSeparator);
        }
        JsTypeCommander.splitLines = splitLines;
        /**
         * Indents lines within text and trims trailing whitespace.
         * @param {string|string[]} text Text to indent.
         * @param {string} indent Characters to use for indentation.
         * @returns {string} Text with lines indented.
         */
        function indentText(text, indent) {
            var i = toString(indent, "\t");
            var arr;
            if (Array.isArray(text)) {
                if (text.length == 0)
                    arr = text;
                else if (text.length == 1)
                    arr = splitLines(text[0]);
                else {
                    arr = [];
                    text.forEach(function (s) { return splitLines(s).forEach(function (l) { return arr.push(l); }); });
                }
            }
            else
                arr = splitLines(text);
            if (arr.length == 0 || (arr.length == 1 && arr[0].length == 0))
                return "";
            return arr.map(function (s) { return trimEnd(s); }).map(function (s) {
                if (s.length == 0)
                    return s;
                return i + s;
            }).join(patternOptions.newLineSequence);
        }
        JsTypeCommander.indentText = indentText;
        /**
         * Indents lines of text and trim trailing whitespace.
         * @param {string[]|string} text Text to indent.
         * @param {string} indent Characters to use for indentation.
         * @returns {string} Array containing indented lines.
         */
        function indentLines(text, indent) {
            var i = toString(indent, "\t");
            var arr;
            if (Array.isArray(text)) {
                if (text.length == 0)
                    arr = text;
                else if (text.length == 1)
                    arr = splitLines(text[0]);
                else {
                    arr = [];
                    text.forEach(function (s) { return splitLines(s).forEach(function (l) { return arr.push(l); }); });
                }
            }
            else
                arr = splitLines(text);
            if (arr.length == 0 || (arr.length == 1 && arr[0].length == 0))
                return arr;
            arr = arr.map(function (s) { return trimEnd(s); });
            if (i.length == 0)
                return arr;
            return arr.map(function (s) {
                if (s.length == 0)
                    return s;
                return i + s;
            });
        }
        JsTypeCommander.indentLines = indentLines;
        /**
         * Determines whether a value is boolean.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is boolean; otherwise false.
         */
        function isBoolean(obj) { return typeof (obj) == "boolean"; }
        JsTypeCommander.isBoolean = isBoolean;
        /**
         * Determines whether a value is boolean or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is boolean or undefined; otherwise false.
         */
        function isBooleanIfDef(obj) { return typeof (obj) == "undefined" || typeof (obj) == "boolean"; }
        JsTypeCommander.isBooleanIfDef = isBooleanIfDef;
        /**
         * Determines whether a value is boolean or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is boolean or null; otherwise false.
         */
        function isBooleanOrNull(obj) {
            return mapByTypeValue(obj, {
                whenNull: true,
                whenBoolean: true,
                otherwise: false
            });
        }
        JsTypeCommander.isBooleanOrNull = isBooleanOrNull;
        /**
         * Determines whether a value is boolean, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is boolean, null or undefined; otherwise false.
         */
        function isBooleanOrNil(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenNull: true,
                whenBoolean: true,
                otherwise: false
            });
        }
        JsTypeCommander.isBooleanOrNil = isBooleanOrNil;
        /**
         * Converts a value to a boolean.
         * @param {*} obj Object to convert.
         * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
         * @returns {boolean|null|undefined} Value converted to a boolean or the default value.
         */
        function asBoolean(obj, defaultValue) {
            var bs = mapByTypeValue(obj, {
                whenUndefined: function (b) { return b; },
                whenNull: function (b) { return b; },
                whenBoolean: function (b) { return b; },
                whenString: function (s) { return s; },
                whenNaN: false,
                whenNumber: function (n) { return n != 0; },
                whenArray: function (a) { return (a.length == 0) ? undefined : (isNil(a[0]) ? a[0] : ((isObject(a[0])) ? undefined : asBoolean(a[0]))); },
                otherwise: function (o) {
                    try {
                        return mapByTypeValue(o.valueOf(), {
                            whenUndefined: function (b) { return o.toString(); },
                            whenNull: function (b) { return o.toString(); },
                            whenBoolean: function (b) { return b; },
                            whenString: function (s) { return s; },
                            whenNaN: o.toString(),
                            whenNumber: function (n) { return n != 0; },
                            otherwise: function (v) {
                                try {
                                    return v.toString();
                                }
                                catch (e) { }
                                return v + "";
                            }
                        });
                    }
                    catch (e) { }
                    try {
                        return o.toString();
                    }
                    catch (e) { }
                    return o + "";
                }
            });
            return mapByTypeValue(bs, {
                whenBoolean: function (b) { return b; },
                whenString: function (s) {
                    if ((s = s.trim()).length > 0) {
                        var m = patternOptions.regex.booleanText.exec(s);
                        if (!isNil(m))
                            return isNil(m[2]);
                    }
                    return mapByTypeValue(defaultValue, {
                        whenUndefined: function (o) { return o; },
                        whenNull: function (o) { return o; },
                        whenBoolean: function (b) { return b; },
                        otherwise: function (o) { return asBoolean(o); }
                    });
                },
                whenNull: function (o) { return mapByTypeValue(defaultValue, {
                    whenUndefined: function (d) { return o; },
                    whenNull: function (d) { return d; },
                    whenBoolean: function (b) { return b; },
                    otherwise: function (d) { return asBoolean(d); }
                }); },
                otherwise: function (o) { return mapByTypeValue(defaultValue, {
                    whenUndefined: function (d) { return d; },
                    whenNull: function (d) { return d; },
                    whenBoolean: function (b) { return b; },
                    otherwise: function (d) { return asBoolean(d); }
                }); }
            });
        }
        JsTypeCommander.asBoolean = asBoolean;
        /**
         * Forces a value to a boolean.
         * @param {*} obj Object to convert.
         * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
         * @returns {boolean} Value converted to a boolean or the default value. If the default value is nil, then a false value will be returned.
         */
        function toBoolean(obj, defaultValue) {
            var b = asBoolean(obj, defaultValue);
            return isBoolean(b) && b;
        }
        JsTypeCommander.toBoolean = toBoolean;
        /**
         * Determines whether a value is a finite number (not including NaN).
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a finite number; otherwise false.
         */
        function isNumber(obj) {
            return mapByTypeValue(obj, {
                whenNull: false,
                whenUndefined: false,
                whenNumber: true,
                whenInfinity: false,
                whenNaN: false,
                otherwise: false
            });
        }
        JsTypeCommander.isNumber = isNumber;
        /**
         * Determines whether a value is a finite number or undefined (not including NaN).
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is finite number or undefined; otherwise false.
         */
        function isNumberIfDef(obj) {
            return mapByTypeValue(obj, {
                whenNull: false,
                whenUndefined: true,
                whenNumber: true,
                whenInfinity: false,
                whenNaN: false,
                otherwise: false
            });
        }
        JsTypeCommander.isNumberIfDef = isNumberIfDef;
        /**
         * Determines whether a value is a finite number or null (not including NaN).
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a finite number or null; otherwise false.
         */
        function isNumberOrNull(obj) {
            return mapByTypeValue(obj, {
                whenNull: true,
                whenNumber: true,
                whenInfinity: false,
                whenNaN: false,
                otherwise: false
            });
        }
        JsTypeCommander.isNumberOrNull = isNumberOrNull;
        /**
         * Determines whether a value is a number or null (including NaN and Infinity).
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a number or null; otherwise false.
         */
        function isNumberNaNorNull(obj) {
            return mapByTypeValue(obj, {
                whenNull: true,
                whenNumber: true,
                whenInfinity: true,
                whenNaN: true,
                otherwise: false
            });
        }
        JsTypeCommander.isNumberNaNorNull = isNumberNaNorNull;
        /**
         * Determines whether a value is a finite number, null or undefined (including NaN).
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a finite number, null or undefined; otherwise false.
         */
        function isNumberOrNil(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenNull: true,
                whenNumber: true,
                whenInfinity: true,
                whenNaN: true,
                otherwise: false
            });
        }
        JsTypeCommander.isNumberOrNil = isNumberOrNil;
        /**
         * Determines whether a value is an infinite number.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an infinite number; otherwise false.
         */
        function isInfinite(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: false,
                whenNull: false,
                whenNumber: false,
                whenInfinity: true,
                whenNaN: false,
                otherwise: false
            });
        }
        JsTypeCommander.isInfinite = isInfinite;
        /**
         * Converts a value to a number.
         * @param {*} obj Object to convert.
         * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
         * @param {boolean} [allowNaN] If true, then NaN and infinite values count as numbers.
         * @returns {number|null|undefined} Value converted to a number or the default value.
         */
        function asNumber(obj, defaultValue, allowNaN) {
            var ns = mapByTypeValue(obj, {
                whenUndefined: function (b) { return b; },
                whenNull: function (b) { return b; },
                whenBoolean: function (b) { return (b) ? 1 : 0; },
                whenString: function (s) {
                    var v = parseFloat(s);
                    if (!isNaN(v))
                        return v;
                },
                whenNaN: (allowNaN === true) ? NaN : null,
                whenInfinity: (allowNaN === true) ? (function (n) { return n; }) : null,
                whenNumber: function (n) { return n; },
                whenArray: function (a) { return (a.length == 0) ? undefined : (isNil(a[0]) ? a[0] : ((isObject(a[0])) ? undefined : asNumber(a[0], undefined, allowNaN))); },
                otherwise: function (o) {
                    try {
                        return mapByTypeValue(o.valueOf(), {
                            whenUndefined: function (b) { return o.toString(); },
                            whenNull: function (b) { return o.toString(); },
                            whenBoolean: function (b) { return (b) ? 1 : 0; },
                            whenString: function (s) {
                                var v = parseFloat(s);
                                if (!isNaN(v))
                                    return v;
                            },
                            whenNaN: (allowNaN === true) ? NaN : null,
                            whenInfinity: (allowNaN === true) ? (function (n) { return n; }) : null,
                            whenNumber: function (n) { return n; },
                            otherwise: function (v) {
                                try {
                                    return parseFloat(v.toString());
                                }
                                catch (e) { }
                                return parseFloat(v + "");
                            }
                        });
                    }
                    catch (e) { }
                    try {
                        return parseFloat(o.toString());
                    }
                    catch (e) { }
                    return parseFloat(o + "");
                }
            });
            if (typeof (defaultValue) == "undefined")
                return ns;
            if (typeof (ns) == "number") {
                if (isNaN(ns) || isInfinite(ns)) {
                    if (allowNaN === true)
                        return ns;
                }
                else
                    return ns;
            }
            return mapByTypeValue(asNumber(defaultValue), {
                whenUndefined: function (d) { return (allowNaN === true) ? ns : d; },
                whenInfinity: function (d) { return (typeof (ns) != "number" || isNaN(ns)) ? d : ns; },
                whenNumber: function (d) { return d; },
                otherwise: function (d) { return (typeof (ns) == "number") ? ns : d; }
            });
        }
        JsTypeCommander.asNumber = asNumber;
        /**
         * Forces a value to a number.
         * @param {*} obj Object to convert.
         * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
         * @param {boolean} [allowNaN] If true, then NaN and infinite values count as numbers.
         * @returns {number} Value converted to a number or the default value. If the default value is nil, then a zero value will be returned.
         */
        function toNumber(obj, defaultValue, allowNaN) {
            var i = asNumber(obj, defaultValue, allowNaN);
            if (isNumber(i))
                return i;
            else if (allowNaN === true && typeof (obj) == "number")
                return obj;
            return 0;
        }
        JsTypeCommander.toNumber = toNumber;
        /**
         * Determines whether a value is a function.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is function; otherwise false.
         */
        function isFunction(obj) { return typeof (obj) === "function"; }
        JsTypeCommander.isFunction = isFunction;
        /**
         * Determines whether a value is function or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is function or undefined; otherwise false.
         */
        function isFunctionIfDef(obj) { return typeof (obj) === "undefined" || typeof (obj) === "function"; }
        JsTypeCommander.isFunctionIfDef = isFunctionIfDef;
        /**
         * Determines whether a value is function or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is function or null; otherwise false.
         */
        function isFunctionOrNull(obj) {
            return mapByTypeValue(obj, {
                whenNull: true,
                whenFunction: true,
                otherwise: false
            });
        }
        JsTypeCommander.isFunctionOrNull = isFunctionOrNull;
        /**
         * Determines whether a value is function, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is function, null or undefined; otherwise false.
         */
        function isFunctionOrNil(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenNull: true,
                whenFunction: true,
                otherwise: false
            });
        }
        JsTypeCommander.isFunctionOrNil = isFunctionOrNil;
        /**
         * Determines whether a value's type is "object" and it is not null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value's type is "object" and it is not null; otherwise false.
         */
        function isObjectType(obj) { return typeof (obj) == "object" && obj !== null; }
        JsTypeCommander.isObjectType = isObjectType;
        /**
         * Determines whether a value is undefined or its type is "object" and it is not null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value is undefined or its type is "object" and it is not null; otherwise false.
         */
        function isObjectTypeIfDef(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenNull: false,
                whenObject: true,
                otherwise: false
            });
        }
        JsTypeCommander.isObjectTypeIfDef = isObjectTypeIfDef;
        /**
         * Determines whether a value is null or its type is "object".
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value is null, or its type is "object"; otherwise false.
         */
        function isObjectTypeOrNull(obj) { return typeof (obj) == "object"; }
        JsTypeCommander.isObjectTypeOrNull = isObjectTypeOrNull;
        /**
         * Determines whether a value is undefined, null, or its type is "object".
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value is undefined, null, or its type is "object"; otherwise false.
         */
        function isObjectTypeOrNil(obj) { return typeof (obj) == "undefined" || typeof (obj) == "object"; }
        JsTypeCommander.isObjectTypeOrNil = isObjectTypeOrNil;
        /**
         * Determines whether a value is an object and it is not null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value is an object and it is not null; otherwise false.
         * @description As a type guard, this behaves the same as isNonArrayObject() and isPlainObject().
         * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
         */
        function isObject(obj) { return typeof (obj) == "object" && obj !== null; }
        JsTypeCommander.isObject = isObject;
        /**
         * Determines whether a value undefined or it is an object and it is not null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value undefined or it is an object and it is not null; otherwise false.
         * @description As a type guard, this behaves the same as isNonArrayObjectIfDef() and isPlainObjectIfDef().
         * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
         */
        function isObjectIfDef(obj) { return typeof (obj) == "undefined" || (typeof (obj) == "object" && obj !== null); }
        JsTypeCommander.isObjectIfDef = isObjectIfDef;
        /**
         * Determines whether a value null or it is an object.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value null or it is an object; otherwise false.
         * @description As a type guard, this behaves the same as isNonArrayObjectOrNull() and isPlainObjectOrNull().
         * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
         */
        function isObjectOrNull(obj) { return typeof (obj) == "object"; }
        JsTypeCommander.isObjectOrNull = isObjectOrNull;
        /**
         * Determines whether a value undefined, null, or it is an object.
         * @param {*} obj Object to test.
         * @returns {boolean} True if the value undefined, null, or it is an object; otherwise false.
         * @description As a type guard, this behaves the same as isNonArrayObjectOrNil() and isPlainObjectOrNil().
         * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
         */
        function isObjectOrNil(obj) { return typeof (obj) == "undefined" || typeof (obj) == "object"; }
        JsTypeCommander.isObjectOrNil = isObjectOrNil;
        /**
         * Determines whether a value is an object, but not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type; otherwise false.
         * @description As a type guard, this behaves the same as isObject() and isPlainObject().
         * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
         */
        function isNonArrayObject(obj) { return typeof (obj) == "object" && obj !== null && !Array.isArray(obj); }
        JsTypeCommander.isNonArrayObject = isNonArrayObject;
        /**
         * Determines whether a value is an object or undefined, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
         * @description As a type guard, this behaves the same as isObjectIfDef() and isPlainObjectIfDef().
         * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
         */
        function isNonArrayObjectIfDef(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenNull: false,
                whenObject: true,
                whenArray: false,
                otherwise: false
            });
        }
        JsTypeCommander.isNonArrayObjectIfDef = isNonArrayObjectIfDef;
        /**
         * Determines whether a value is an object or null, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type or null; otherwise false.
         * @description As a type guard, this behaves the same as isObjectOrNull() and isPlainObjectOrNull().
         * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
         */
        function isNonArrayObjectOrNull(obj) { return typeof (obj) == "object" && (obj === null || !Array.isArray(obj)); }
        JsTypeCommander.isNonArrayObjectOrNull = isNonArrayObjectOrNull;
        /**
         * Determines whether a value is an object, null or undefined, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
         * @description As a type guard, this behaves the same as isObjectOrNil() and isPlainObjectOrNil().
         * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
         */
        function isNonArrayObjectOrNil(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenNull: true,
                whenObject: true,
                whenArray: false,
                otherwise: false
            });
        }
        JsTypeCommander.isNonArrayObjectOrNil = isNonArrayObjectOrNil;
        /**
         * Determines whether a value is an object, but not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type; otherwise false.
         * @description As a type guard, this behaves the same as isObject() and isNonArrayObject().
         * The difference is that this returns false if the value is not constructed directly from Object.
         */
        function isPlainObject(obj) {
            if (typeof (obj) != "object" || obj === null)
                return false;
            var proto = Object.getPrototypeOf(obj);
            return isNil(proto) || proto.constructor === Object;
        }
        JsTypeCommander.isPlainObject = isPlainObject;
        /**
         * Determines whether a value is an object or undefined, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
         * @description As a type guard, this behaves the same as isObjectIfDef() and isNonArrayObjectIfDef().
         * The difference is that this returns false if the value is not constructed directly from Object.
         */
        function isPlainObjectIfDef(obj) {
            var t = typeof (obj);
            if (t == "undefined")
                return true;
            if (t != "object" || obj === null)
                return false;
            var proto = Object.getPrototypeOf(obj);
            return isNil(proto) || proto.constructor === Object;
        }
        JsTypeCommander.isPlainObjectIfDef = isPlainObjectIfDef;
        /**
         * Determines whether a value is an object or null, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type or null; otherwise false.
         * @description As a type guard, this behaves the same as isObjectOrNull() and isNonArrayObjectOrNull().
         * The difference is that this returns false if the value is not constructed directly from Object.
         */
        function isPlainObjectOrNull(obj) {
            if (typeof (obj) != "object")
                return false;
            if (obj === null)
                return true;
            var proto = Object.getPrototypeOf(obj);
            return isNil(proto) || proto.constructor === Object;
        }
        JsTypeCommander.isPlainObjectOrNull = isPlainObjectOrNull;
        /**
         * Determines whether a value is an object, null or undefined, and not an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
         * @description As a type guard, this behaves the same as isObjectOrNil() and isNonArrayObjectOrNil().
         * The difference is that this returns false if the value is not constructed directly from Object.
         */
        function isPlainObjectOrNil(obj) {
            var t = typeof (obj);
            if (t == "undefined")
                return true;
            if (t != "object")
                return false;
            if (obj === null)
                return true;
            var proto = Object.getPrototypeOf(obj);
            return isNil(proto) || proto.constructor === Object;
        }
        JsTypeCommander.isPlainObjectOrNil = isPlainObjectOrNil;
        /**
         * Determines whether a value is an array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an array; otherwise false.
         */
        function isArray(obj) { return isObject(obj) && Array.isArray(obj); }
        JsTypeCommander.isArray = isArray;
        /**
         * Determines whether a value is an array or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an array or undefined; otherwise false.
         */
        function isArrayIfDef(obj) { return typeof (obj) == "undefined" || isArray(obj); }
        JsTypeCommander.isArrayIfDef = isArrayIfDef;
        /**
         * Determines whether a value is an array or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an array or null; otherwise false.
         */
        function isArrayOrNull(obj) { return typeof (obj) == "object" && (obj === null || Array.isArray(obj)); }
        JsTypeCommander.isArrayOrNull = isArrayOrNull;
        /**
         * Determines whether a value is an array, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an array, null or undefined; otherwise false.
         */
        function isArrayOrNil(obj) { return typeof (obj) == "undefined" || (typeof (obj) == "object" && (obj === null || Array.isArray(obj))); }
        JsTypeCommander.isArrayOrNil = isArrayOrNil;
        /**
         * Determines whether a value is an empty array.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty array; otherwise false.
         */
        function isEmptyArray(obj) {
            return mapByTypeValue(obj, {
                whenArray: function (a) { return a.length == 0; },
                otherwise: false
            });
        }
        JsTypeCommander.isEmptyArray = isEmptyArray;
        /**
         * Determines whether a value is an empty array or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty array or undefined; otherwise false.
         */
        function isEmptyArrayIfDef(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenArray: function (a) { return a.length == 0; },
                otherwise: false
            });
        }
        JsTypeCommander.isEmptyArrayIfDef = isEmptyArrayIfDef;
        /**
         * Determines whether a value is an empty array or null.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty array or null; otherwise false.
         */
        function isEmptyArrayOrNull(obj) {
            return mapByTypeValue(obj, {
                whenNull: true,
                whenArray: function (a) { return a.length == 0; },
                otherwise: false
            });
        }
        JsTypeCommander.isEmptyArrayOrNull = isEmptyArrayOrNull;
        /**
         * Determines whether a value is an empty array, null or undefined.
         * @param {*} obj Object to test.
         * @returns {boolean} True if object is an empty array, null or undefined; otherwise false.
         */
        function isEmptyArrayOrNil(obj) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenNull: true,
                whenArray: function (a) { return a.length == 0; },
                otherwise: false
            });
        }
        JsTypeCommander.isEmptyArrayOrNil = isEmptyArrayOrNil;
        /**
         * Determines whether an object has properties which indiciates it behaves like an array.
         * @param {*} obj Object to test.
         * @param {boolan} checkElements If true, then the existance of each element index is checked, which makes this function slower, but more accurate.
         * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
         * @see {@link https://github.com/Microsoft/TypeScript/blob/530d7e9358ee95d2101a619e73356867b617cd95/lib/lib.es5.d.ts}
         */
        function isArrayLike(obj, checkElements) {
            if (!isObject(obj))
                return false;
            if (Array.isArray(obj))
                return true;
            if (!isNumber(obj.length) || isNaN(obj.length) || obj.length < 0 || obj.length == Infinity || obj.length == -Infinity)
                return false;
            if (!checkElements || obj.length == 0)
                return true;
            var arr = [];
            for (var i = 0; i < obj.length; i++)
                arr.push(false);
            for (var n in obj) {
                var f = parseFloat(n);
                if (!isNaN(f) && f >= 0 && f < arr.length && parseInt(n) == f)
                    arr[f] = true;
            }
            return arr.filter(function (v) { return !v; }).length == 0;
        }
        JsTypeCommander.isArrayLike = isArrayLike;
        /**
         * Determines whether an object has properties which indiciates it behaves like an array.
         * @param {*} obj Object to test.
         * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
         * but can result in false positives for non-array objects which have a numeric "length" property.
         * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
         */
        function isArrayLikeIfDef(obj, simpleCheck) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenArrayLike: true,
                whenArray: true,
                otherwise: false
            });
        }
        JsTypeCommander.isArrayLikeIfDef = isArrayLikeIfDef;
        /**
         * Determines whether an object has properties which indiciates it behaves like an array.
         * @param {*} obj Object to test.
         * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
         * but can result in false positives for non-array objects which have a numeric "length" property.
         * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
         */
        function isArrayLikeOrNull(obj, simpleCheck) {
            return mapByTypeValue(obj, {
                whenNull: true,
                whenArrayLike: true,
                whenArray: true,
                otherwise: false
            });
        }
        JsTypeCommander.isArrayLikeOrNull = isArrayLikeOrNull;
        /**
         * Determines whether an object has properties which indiciates it behaves like an array.
         * @param {*} obj Object to test.
         * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
         * but can result in false positives for non-array objects which have a numeric "length" property.
         * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
         */
        function isArrayLikeOrNil(obj, simpleCheck) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenNull: true,
                whenArrayLike: true,
                whenArray: true,
                otherwise: false
            });
        }
        JsTypeCommander.isArrayLikeOrNil = isArrayLikeOrNil;
        /**
         * Ensures that a value is a true array.
         * @param {*} obj Value to convert.
         * @param {boolan} checkElements If true and obj is Array-like (but not a true array), then the existance of each element index is checked, which makes this function more accurate, but slower.
         * @returns {*[]} Value as an array.
         * @description If the value is undefined, an empty array is returned.
         * If the value is an actual array, then the object itself is returned;
         * If the object is Array-like, an array is returned with values taken from each of its indexed values.
         * Otherwise, an array with a single element containing the value is returned.
         * @example
         * TypeScript:
         *     import { JsTypeCommander } from 'JsTypeCommander';
         *     let myVar: any = 7;
         *     let arrayObj = JsTypeCommander.toArray(myVar);
         *     // returns: [7]
         *     myVar = { 0: "a", 1: 7, length: 2 };
         *     arrayObj = JsTypeCommander.toArray(myVar);
         *     // returns: ["a", 7]
         *     myVar = { 0: "a", 2: 7, length: 3 };
         *     arrayObj = JsTypeCommander.toArray(myVar);
         *     // returns: ["a", undefined, 7]
         *     myVar = { 0: "a", 2: 7, length: 3 };
         *     arrayObj = JsTypeCommander.toArray(myVar, true);
         *     // returns: [{ 0: "a", 2: 7, length: 3 }]
         *
         * JavaScript:
         *     var JsTypeCommander = require("JsTypeCommander").JsTypeCommander;
         */
        function toArray(obj, checkElements) {
            if (arguments.length == 0)
                return [];
            if (isArray(obj))
                return obj;
            if (isArrayLike(obj, checkElements)) {
                var result = [];
                for (var i = 0; i < obj.length; i++)
                    result.push(obj[i]);
                return result;
            }
            return [obj];
        }
        JsTypeCommander.toArray = toArray;
        /**
         * Searches the object's inherited prototype chain for a matching constructor function.
         * @param {*} obj Object to test.
         * @param {AnyFunction} classConstructor Constructor function to look for.
         * @returns {boolean} True if the object is determined to inherit from the specified class; otherwise false.
         * @example The following example demonstrates testing whether an object was constructed from a specific constructor.
         * let objToTest: any = new Error("My Error");
         * let result: boolean = JsTypeCommander.derivesFrom(objToTest, Error);
         * // result === true
         * result = JsTypeCommander.derivesFrom(objToTest, RangeError);
         * // result === false (Error does not inherit from RangeError)
         * objToTest = new RangeError();
         * result = JsTypeCommander.derivesFrom(objToTest, Error);
         * // result === true
         * objToTest = { message: "My Error", name: "Error" };
         * result = JsTypeCommander.derivesFrom(objToTest, Error);
         * // result === false
         */
        function derivesFrom(obj, classConstructor) {
            if (notDefined(obj))
                return notDefined(classConstructor);
            if (notDefined(classConstructor))
                return false;
            if (obj === null)
                return classConstructor === null;
            var classProto;
            if (isFunction(classConstructor)) {
                classProto = classConstructor.prototype;
            }
            else {
                classProto = Object.getPrototypeOf(classConstructor);
                classConstructor = classProto.constructor;
                while (!isFunction(classConstructor)) {
                    classProto = Object.getPrototypeOf(classProto);
                    if (isNil(classProto))
                        break;
                    classConstructor = classProto.constructor;
                }
            }
            if (isFunction(classConstructor) && obj instanceof classConstructor)
                return true;
            var valueProto, valueConstructor;
            if (isFunction(obj)) {
                valueConstructor = obj;
                valueProto = obj.prototype;
            }
            else {
                valueProto = Object.getPrototypeOf(obj);
                valueConstructor = valueProto.constructor;
                while (!isFunction(valueConstructor)) {
                    valueProto = Object.getPrototypeOf(valueProto);
                    if (isNil(valueProto))
                        break;
                    valueConstructor = valueProto.constructor;
                }
            }
            if (isNil(valueConstructor))
                return (isNil(classConstructor) && isNil(classProto) == isNil(valueProto));
            if (valueConstructor === classConstructor)
                return true;
            if (isNil(valueProto))
                return (isNil(classProto) && valueConstructor === classConstructor);
            var constructorChain = [];
            do {
                if (isFunction(classConstructor) && valueProto instanceof classConstructor)
                    return true;
                constructorChain.push(valueConstructor);
                valueConstructor = null;
                do {
                    valueProto = Object.getPrototypeOf(valueProto);
                    if (isNil(valueProto))
                        break;
                    valueConstructor = valueProto.constructor;
                } while (isNil(valueConstructor));
            } while (!isNil(valueConstructor));
            for (var i = 0; i < constructorChain.length; i++) {
                if (constructorChain[i] === classConstructor)
                    return true;
            }
            return false;
        }
        JsTypeCommander.derivesFrom = derivesFrom;
        /**
         * If defined, Searches the object's inherited prototype chain for a matching constructor function.
         * @param {*} obj Object to test.
         * @param {AnyFunction} classConstructor Constructor function to look for.
         * @returns {boolean} True if the object is not defined or if it is determined to inherit from the specified class; otherwise false.
         */
        function derivesFromIfDef(obj, classConstructor) {
            return typeof (obj) == "undefined" || derivesFrom(obj, classConstructor);
        }
        JsTypeCommander.derivesFromIfDef = derivesFromIfDef;
        /**
         * If not null, Searches the object's inherited prototype chain for a matching constructor function.
         * @param {*} obj Object to test.
         * @param {AnyFunction} classConstructor Constructor function to look for.
         * @returns {boolean} True if the object is null or if it is determined to inherit from the specified class; otherwise false.
         */
        function derivesFromOrNull(obj, classConstructor) {
            return mapByTypeValue(obj, {
                whenUndefined: false,
                whenNull: true,
                otherwise: function (o) { return derivesFrom(obj, classConstructor); }
            });
        }
        JsTypeCommander.derivesFromOrNull = derivesFromOrNull;
        /**
         * If defined and not null, Searches the object's inherited prototype chain for a matching constructor function.
         * @param {*} obj Object to test.
         * @param {AnyFunction} classConstructor Constructor function to look for.
         * @returns {boolean} True if the object is null, not defined or if it is determined to inherit from the specified class; otherwise false.
         */
        function derivesFromOrNil(obj, classConstructor) {
            return mapByTypeValue(obj, {
                whenUndefined: true,
                whenNull: true,
                otherwise: function (o) { return derivesFrom(obj, classConstructor); }
            });
        }
        JsTypeCommander.derivesFromOrNil = derivesFromOrNil;
        /**
         * Determines if an object has properties similar to an Error object.
         * @param {*} obj Object to test
         * @returns {boolean} True if the object has properties similar to an Error object; otherwise, false.
         * @example The following example demonstrates testing various object to see if they are error-like.
         * objToTest = new Error("My Error");
         * result = JsTypeCommander.isErrorLike(objToTest);
         * // result === true
         * objToTest = new RangeError();
         * result = JsTypeCommander.isErrorLike(objToTest);
         * // result === true
         * objToTest = { message: "My Error" };
         * result = JsTypeCommander.isErrorLike(objToTest);
         * // result === true
         * objToTest = { message: "My Error", number: true };
         * result = JsTypeCommander.isErrorLike(objToTest);
         * // result === false (typeof(number) !== "number"))
         */
        function isErrorLike(obj) {
            if (!isNonArrayObject(obj))
                return false;
            if (derivesFrom(obj, Error))
                return true;
            if (isString(obj.message))
                return isStringIfDef(obj.name) && isStringIfDef(obj.description) && isStringIfDef(obj.fileName) && isStringIfDef(obj.stack) && isNumberIfDef(obj.number) &&
                    isNumberIfDef(obj.lineNumber);
            if (isString(obj.description))
                return isStringIfDef(obj.name) && isStringIfDef(obj.fileName) && isStringIfDef(obj.stack) && isNumberIfDef(obj.number) &&
                    isNumberIfDef(obj.lineNumber);
            if (!(notDefined(obj.message) && notDefined(obj.description)))
                return false;
            return isString(obj.stack) && isStringIfDef(obj.name);
        }
        JsTypeCommander.isErrorLike = isErrorLike;
        /**
         * Creates an object with properties similar to an Error object.
         * @param {*} obj Object to convert.
         * @returns {ErrorLike|null|undefined} Object with properties similar to an error objecst. If the object is null or emtpy, then the object is returned.
         * @description This can be useful for serializing error objects when logging.
         */
        function asErrorLike(obj) {
            if (isNil(obj))
                return obj;
            if (isErrorLike(obj)) {
                var result = { message: obj.message, name: (typeof (obj.name) == "string" && obj.name.trim().length > 0) ? obj.name : "ErrorLike" };
                if (typeof (obj.description) == "string") {
                    if (typeof (obj.message) != "string" || obj.message.trim().length == 0)
                        result.message = obj.description;
                    else
                        result.description = obj.description;
                }
                if (typeof (obj.number) == "number")
                    result.number = obj.number;
                if (typeof (obj.fileName) == "string")
                    result.fileName = obj.fileName;
                if (typeof (obj.lineNumber) == "number")
                    result.lineNumber = obj.lineNumber;
                if (typeof (obj.stack) == "string")
                    result.stack = obj.stack;
                if (typeof (result.message) != "string" || result.message.trim().length == 0) {
                    if (typeof (result.number) == "number")
                        result.message = "Error " + result.number;
                    else if (typeof (result.fileName) == "string" && result.fileName.trim().length > 0) {
                        if (typeof (result.lineNumber) == "number")
                            result.message = "Error in " + result.fileName + " at line " + result.lineNumber;
                        else if (typeof (result.fileName) == "string")
                            result.message = "Error in " + result.fileName;
                    }
                    else
                        result.message = "Error";
                }
                return result;
            }
            if (isNumber(obj))
                return { message: "Error " + obj.toString(), number: obj, name: "ErrorLike" };
            var s = toString(obj);
            if (!isString(s))
                s = obj + "";
            return { message: (s.trim().length == 0) ? "Error" : s, name: "ErrorLike" };
        }
        JsTypeCommander.asErrorLike = asErrorLike;
        var JSTCLimitingIterator = /** @class */ (function () {
            function JSTCLimitingIterator(callbackfn, options) {
                this.totalMaxItems = 8192;
                this.currentTotalItems = 0;
                this.maxItemsInObject = 1024;
                this.maxDepth = 32;
                this.callbackfn = callbackfn;
                if (typeof (options) == "object") {
                    this.totalMaxItems = toNumber(options.totalMaxItems, this.totalMaxItems);
                    this.maxItemsInObject = toNumber(options.maxItemsInObject, this.maxItemsInObject);
                    this.maxDepth = toNumber(options.maxDepth, this.maxDepth);
                    this.thisObj = options.thisObj;
                }
            }
            JSTCLimitingIterator.prototype.iterateInto = function (maxDepth, current, key, source, target) {
                if (maxDepth < 1 || this.totalMaxItems < 1)
                    return current;
                target = (isNil(this.thisObj)) ? this.callbackfn(current, key, source, target) : this.callbackfn.call(this.thisObj, current, key, source, target);
                if (!isNil(source)) {
                    this.currentTotalItems++;
                    if (!isObject(source))
                        return target;
                }
                if (this.currentTotalItems >= this.totalMaxItems || !isObject(target))
                    return target;
                source = current;
                if (isArray(target)) {
                    if (!isArray(current))
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
                }
                else {
                    var count = 0;
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
            };
            return JSTCLimitingIterator;
        }());
        /**
         * Recursively maps an object or array.
         * @param {*} obj Object to recursively map
         * @param {{ (current: any|null|undefined, key?: number|string): any|null|undefined; }} callbackFn Call-back function for each iteration which returns the mapped value.
         * @param options Recursive Iteration options.
         * @returns {*} Mapped object or array.
         * @description If the mapped value returned from callbackFn a string, number, symbol, boolean value or function, then the corresponding source element will not be recursed into.
         * This means that if the current argument for callbackFn is an array and you wish to recurse into that array, then callbackFn should return a new array. Likewise,
         * if the current argument is an object (other than a string, number, symbol, boolean value or function) and you wish to recurse into its properties,
         * then callbackFn should return an object that is neither a string, number, symbol, boolean value or function.
         * @example The following examples effectively deep clone the source array to create an array of objects compatible with JSON.stringify.
         * TypeScript:
         *     import { JsTypeCommander } from 'JsTypeCommander';
         *     let source: any[] = [{a: 1, b: 2}, 3, 4, ["Eins", "Svein", "Drei"]];
         *     let deepClone = JsTypeCommander.mapInto(source, (current?: any, key?: number|string, source?: any[]|object, target?: any[]|object) => {
         *         if (JsTypeCommander.notDefined(source) || JsTypeCommander.isArray(current))
         *             return [];
         *         return (JsTypeCommander.isObject(current)) ? { } : current;
         *     });
         *
         *     interface IMyThis { count: number }
         *     let myOptions: JsTypeCommander.MapIntoOptions = { thisObj: <IMyThis> { count: 0 } };
         *     function myCallback(this: IMyThis, current?: any, key?: number|string, source?: any[]|object, target?: any[]|object) {
         *         this.count++;
         *         if (JsTypeCommander.notDefined(source) || JsTypeCommander.isArray(current))
         *             return [];
         *         return (JsTypeCommander.isObject(current)) ? { } : current;
         *     }
         *     deepClone = JsTypeCommander.mapInto(source, myCallback, myOptions);
         *     // myOptions.thisObj.count === 9
         *
         * JavaScript:
         *     var JsTypeCommander = require("JsTypeCommander").JsTypeCommander;
         *     // interface RecursiveMapCallbackFn
         *     var source = [{ a: 1, b: 2 }, 3, 4, ["Eins", "Svein", "Drei"]];
         *     var myCallback = function(current, key, source, target) {
         *         if (JsTypeCommander.notDefined(source) || JsTypeCommander.isArray(current))
         *             return [];
         *         return (JsTypeCommander.isObject(current)) ? { } : current;
         *     };
         *     var deepClone = JsTypeCommander.mapInto(source, myCallback);
         *     var myOptions = { thisObj: { count: 0 } };
         *     myCallback = function(current, key, source, target) {
         *         this.count++;
         *         if (JsTypeCommander.notDefined(source) || JsTypeCommander.isArray(current))
         *             return [];
         *         return (JsTypeCommander.isObject(current)) ? { } : current;
         *     };
         *     deepClone = JsTypeCommander.mapInto(source, myCallback, myOptions);
         *     // myOptions.thisObj.count === 9
         */
        function mapInto(obj, callbackFn, options) {
            var i = new JSTCLimitingIterator(callbackFn, options);
            return i.iterateInto(i.maxDepth, obj, undefined, undefined, undefined);
        }
        JsTypeCommander.mapInto = mapInto;
    })(JsTypeCommander = x_44813_util.JsTypeCommander || (x_44813_util.JsTypeCommander = {}));
})(x_44813_util || (x_44813_util = {}));
//# sourceMappingURL=JsTypeCommander.js.map