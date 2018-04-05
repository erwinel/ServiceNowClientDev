var x_44813_util;
(function (x_44813_util) {
    var types;
    (function (types) {
        var newLineString = "\n";
        var whitespaceRegex = /^\s*$/;
        var trimEndRegex = /^(\s*\S+(\s+\S+)*)/;
        var lineSplitRegex = /\r\n?|\n/g;
        var boolRegex = /^(?:(t(?:rue)?|y(?:es)?|[+-]?(?:0*[1-9]\d*(?:\.\d+)?|0+\.0*[1-9]\d*)|\+)|(f(?:alse)?|no?|[+-]?0+(?:\.0+)?|-))$/i;
        var ucFirstRegex = /^([^a-zA-Z\d]*[a-z])(.+)?$/g;
        var abnormalWhitespaceRegex = /( |(?=[^ ]))\s+/g;
        /**
         * Indicates whether a value is defined.
         * @param value Value to test.
         * @returns {boolean} True if the value is defined; otherwise, false if it is undefined. This also returns true if the value is null.
         */
        function defined(value) { return typeof (value) !== "undefined"; }
        types.defined = defined;
        /**
         * Tests whether a value is an object.
         * @param value Value to test.
         * @returns {boolean} True if the value's type is "object" and it is not null; otherwise false.
         */
        function isObjectType(value) { return typeof (value) === "object" && value !== null; }
        types.isObjectType = isObjectType;
        /**
         * Tests whether a value is an object and is not an array.
         * @param value Value to test.
         * @returns {boolean} True if the value's type is "object", it is not null and it is not an array; otherwise false.
         */
        function isNonArrayObject(value) { return typeof (value) == "object" && value !== null && !Array.isArray(value); }
        types.isNonArrayObject = isNonArrayObject;
        /**
         * Tests whether a value is a string
         * @param value Value to test.
         * @returns {boolean} True if the value is a string; otherwise, false.
         */
        function isString(value) { return typeof (value) === "string"; }
        types.isString = isString;
        /**
         * Tests whether a value is a function.
         * @param value Value to test.
         * @returns {boolean} True if the value is a function; otherwise, false.
         */
        function isFunction(value) { return typeof (value) === "function"; }
        types.isFunction = isFunction;
        /**
         * Tests whether a value is a boolean type.
         * @param value Value to test.
         * @returns {boolean} True if the value is boolean; otherwise, false.
         */
        function isBoolean(value) { return typeof (value) === "boolean"; }
        types.isBoolean = isBoolean;
        /**
         * Tests whether a value is a number type.
         * @param value Value to test.
         * @returns {boolean} True if the value is a number and is not NaN; otherwise, false.
         */
        function isNumber(value) { return typeof (value) === "number" && !isNaN(value); }
        types.isNumber = isNumber;
        /**
         * Tests whether a value is a number type.
         * @param value Value to test.
         * @returns {boolean} True if the value is a number and is not NaN; otherwise, false.
         */
        function isInteger(value) { return typeof (value) === "number" && !isNaN(value) && Math.round(value) === value; }
        types.isInteger = isInteger;
        /**
         * Tests whether a value is undefined or null.
         * @param value Value to test.
         * @returns {boolean} True if the value is undefined or null; othwerise, false.
         */
        function isNil(value) { return !defined(value) || value === null; }
        types.isNil = isNil;
        /**
         * Tests whether a string is undefined, null or empty.
         * @param value String to test.
         * @returns {boolean} True if the value is undefined, null or empty; otherwise, false.
         */
        function isNilOrEmptyString(value) { return isNil(value) || (isString(value) && value.length == 0); }
        types.isNilOrEmptyString = isNilOrEmptyString;
        /**
         * Tests whether a string is undefined, null, empty or contains only whitespace characters.
         * @param value String to test.
         * @returns {boolean} True if the value is undefined, null, empty or contains only whitespace characters; otherwise, false.
         */
        function isNilOrWhitespace(value) { return isNil(value) || (isString(value) && whitespaceRegex.test(value)); }
        types.isNilOrWhitespace = isNilOrWhitespace;
        /**
         * Convert a value to a string.
         * @param value Value to convert.
         * @param {string|null} [defaultValue] Default value to return if the value was undefined, null or if it converts to an empty string. If this is not defined,
         * then an undefined value is returned when the value was undefined or null.
         * @param {boolean} [ignoreWhitespace] If true, and the converted value contains only whitespace, then it is treated as though it was converted to an empty string by
         * returning the default value.
         * @returns {string|null=} Value converted to a string.
         * @description     If the value is converted to an empty string, and the default value is null, then a null value will be returned.
         * If an array is passed, then the 'join' method is called with a newline character as the parameter.
         * Otherwise, this method first attempts to call the value's "valueOf" function it is an object type, then it comply calls the "toString" method to convert it to a string.
         */
        function asString(value, defaultValue, ignoreWhitespace) {
            if (!defined(value)) {
                if (isNil(defaultValue))
                    return defaultValue;
                return asString(defaultValue);
            }
            if (value === null) {
                if (isNil(defaultValue))
                    return value;
                return asString(defaultValue);
            }
            var s;
            if (!isString(value))
                s = (Array.isArray(value)) ? value.join(newLineString) : (function () {
                    if (isObjectType(value) && isFunction(value.valueOf)) {
                        try {
                            var v = value.valueOf();
                            if (isString(v))
                                return v;
                            if (!isNil(v)) {
                                if (Array.isArray(v))
                                    return v.join(newLineString);
                                value = v;
                            }
                        }
                        catch (e) { }
                    }
                    try {
                        var s_1 = value.toString();
                        if (isString(s_1))
                            return s_1;
                    }
                    catch (e) { }
                    return value + "";
                })();
            else
                s = value;
            if ((ignoreWhitespace) ? whitespaceRegex.test(s) : s.length == 0) {
                var d = asString(defaultValue);
                if (isString(d))
                    return d;
            }
            return s;
        }
        types.asString = asString;
        /**
         * Convert a value to a string with normalized whitespace.
         * @param value Value to convert.
         * @param {string|null} [defaultValue] Default value to return if the value was undefined, null or if it converts to an empty string. If this is not defined, then an undefined value is returned when the value was undefined or null.
         * @returns {string|null=} Value converted to a string.
         * @description     If the value is converted to an empty string, and the default value is null, then a null value will be returned.
         * If an array is passed, then the 'join' method is called with a newline character as the parameter.
         * Otherwise, this method first attempts to call the value's "valueOf" function it is an object type, then it comply calls the "toString" method to convert it to a string.
         */
        function asNormalizedString(value, defaultValue) {
            value = asString(value, defaultValue, true).trim();
            if (isNil(value) || value.length == 0)
                return value;
            return value.replace(abnormalWhitespaceRegex, ' ');
        }
        types.asNormalizedString = asNormalizedString;
        /**
         * Trims trailing whitespace from the end of a string.
         * @param {string} text Text to trim.
         * @returns {string} String with trailing whitespace removed.
         */
        function trimEnd(text) {
            text = asString(text, "");
            var m = trimEndRegex.exec(text);
            if (isNil(m))
                return "";
            return m[1];
        }
        types.trimEnd = trimEnd;
        /**
         * Convert a value to a number.
         * @param value Convert a value to a number.
         * @param {number|null} [defaultValue] Default value to return if the value was undefined, null, could not be converted to a number or is a NaN value.
         * @returns {number|null=} String converted to a number.
         * @description This method will first attempt to get a number value through the value's "valueOf" method if the value is an object type.
         * If the value is a boolean type, then it will return 1 for true, and 0 for false. Otherwise, it will convert it to a string and attempt to
         * parse a number value.
         */
        function asNumber(value, defaultValue) {
            if (!defined(value)) {
                if (isNil(defaultValue))
                    return (defined(defaultValue)) ? defaultValue : value;
                return asNumber(defaultValue);
            }
            if (value === null) {
                if (isNil(defaultValue))
                    return value;
                return asNumber(defaultValue, value);
            }
            var n = null;
            if (typeof (value) !== "number") {
                if (isObjectType(value) && isFunction(value.valueOf)) {
                    try {
                        var i = value.valueOf();
                        if (isNumber(i))
                            return i;
                        if (!isNil(i))
                            value = i;
                    }
                    catch (e) { }
                }
                if (isBoolean(value))
                    return (value) ? 1 : 0;
                value = asString(value, "").trim();
                n = (value.length == 0) ? NaN : parseFloat(value);
            }
            else
                n = value;
            if (isNaN(n) && !isNil(defaultValue))
                return asNumber(defaultValue);
            return n;
        }
        types.asNumber = asNumber;
        /**
         * Convert a value to a number rounded to the nearest integer.
         * @param value Value to be converted.
         * @param {number|null} [defaultValue] Default value to return if the value was undefined, null, could not be converted to a number or is a NaN value.
         * @returns {number|null=} Value converted to an integer.
         * @description This method will first attempt to get a number value through the value's "valueOf" method if the value is an object type.
         * If the value is a boolean type, then it will return 1 for true, and 0 for false. Otherwise, it will convert it to a string and attempt to
         * parse a number value. If the number is not an integer, then it will be rounded to the nearest integer value.
         */
        function asInteger(value, defaultValue) {
            var v = asNumber(value, defaultValue);
            if (isNil(v) || isNaN(v))
                return v;
            return Math.round(v);
        }
        types.asInteger = asInteger;
        /**
         * Convert a value to a boolean value.
         * @param value Value to be converted.
         * @param {boolean|null} [defaultValue] Default value to return if the value was undefined, null or could not be converted to a boolean value.
         * @returns {boolean|null=} Value converted to a boolean type.
         * @description This method will first attempt to get a boolean value through the value's "valueOf" method if the value is an object type.
         * If the value is a number type (an not a NaN value), then it will return true for non-zero and false for zero. Otherwise, it will convert it to a string and attempt to
         * parse a true/false, t/f, yes/no, y/n (all case-insensitive) or number value in order to derive a boolean result.
         */
        function asBoolean(value, defaultValue) {
            if (typeof (value) === "boolean")
                return value;
            if (!defined(value)) {
                if (isNil(defaultValue))
                    return defaultValue;
                return asBoolean(defaultValue);
            }
            if (value === null) {
                if (isNil(defaultValue))
                    return (defined(defaultValue)) ? defaultValue : value;
                return asBoolean(defaultValue, value);
            }
            if (typeof (value) === "number")
                return !isNaN(value) && value != 0;
            if (isObjectType(value) && isFunction(value.valueOf)) {
                try {
                    var n = value.valueOf();
                    if (isNumber(n))
                        return n != 0;
                    if (isBoolean(value))
                        return value;
                    if (!isNil(n))
                        value = n;
                }
                catch (e) { }
            }
            var mg = boolRegex.exec(asString(value, "").trim());
            if (isNil(mg))
                return asBoolean(defaultValue);
            return isNil(mg[2]);
        }
        types.asBoolean = asBoolean;
        /**
         * Converts a value to an array.
         * @param value Value to convert.
         * @description If given value is an array, it is simply returned. If it is not defined, then an empty array is returned. Otherwise, the given value is returned within a
         * single-element array.
         */
        function asArray(value) {
            if (!defined(value))
                return [];
            if (Array.isArray(value))
                return value;
            return [value];
        }
        types.asArray = asArray;
        /**
         * Gets the name of a value's constructor function.
         * @param value Value from which to retrieve the constructor class name.
         * @returns {string} The first named constructor function in the prototype inheritance chain or the value's type if a named constructor could not be found.
         */
        function getClassName(value) {
            if (!defined(value))
                return "undefined";
            if (value === null)
                return "null";
            var prototype, constructor;
            if (isFunction(value)) {
                constructor = value;
                prototype = value.prototype;
            }
            else {
                prototype = Object.getPrototypeOf(value);
                constructor = prototype.constructor;
                while (!isFunction(constructor)) {
                    prototype = Object.getPrototypeOf(prototype);
                    if (isNil(prototype))
                        return typeof (value);
                    constructor = prototype.constructor;
                }
            }
            if (isString(constructor.name) && constructor.name.length > 0)
                return constructor.name;
            var basePrototype = Object.getPrototypeOf(prototype);
            if (isNil(basePrototype)) {
                if (isString(prototype.name) && prototype.name.length > 0)
                    return prototype.name;
                if (isString(value.name) && value.name.length > 0)
                    return value.name;
                return typeof (value);
            }
            var name = getClassName(basePrototype);
            if (name == "Object") {
                if (isString(prototype.name) && prototype.name.length > 0)
                    return prototype.name;
                if (isString(value.name) && value.name.length > 0)
                    return value.name;
            }
            return name;
        }
        types.getClassName = getClassName;
        /**
         * Gets ordered list of named constructor functions in the value's prototype inheritance chain.
         * @param value Value from which to extract the inheritance chain.
         * @returns {string[]} An array of string values with the first element being the first named constructor function in the value's inherited prototypes.
         */
        function getInheritanceChain(value) {
            if (!defined(value))
                return ["undefined"];
            if (value === null)
                return ["null"];
            var prototype, constructor;
            if (isFunction(value)) {
                constructor = value;
                prototype = value.prototype;
            }
            else {
                prototype = Object.getPrototypeOf(value);
                constructor = prototype.constructor;
                while (!isFunction(constructor)) {
                    prototype = Object.getPrototypeOf(prototype);
                    if (isNil(prototype))
                        return [typeof (value)];
                    constructor = prototype.constructor;
                }
            }
            var basePrototype = Object.getPrototypeOf(prototype);
            if (isNil(basePrototype)) {
                if (isString(constructor.name) && constructor.name.length > 0)
                    return [constructor.name];
                if (isString(prototype.name) && prototype.name.length > 0)
                    return [prototype.name];
                if (isString(value.name) && value.name.length > 0)
                    return [value.name];
                return [typeof (value)];
            }
            var arr = getInheritanceChain(basePrototype);
            if (isString(constructor.name) && constructor.name.length > 0) {
                arr.unshift(constructor.name);
                return arr;
            }
            if (isString(prototype.name) && prototype.name.length > 0) {
                arr.unshift(prototype.name);
                return arr;
            }
            if (arr.length > 0)
                return arr;
            if (isString(value.name) && value.name.length > 0)
                return [value.name];
            return [typeof (value)];
        }
        types.getInheritanceChain = getInheritanceChain;
        /**
         * Searches the value's inherited prototype chain for a constructor function.
         * @param value Value to test.
         * @param {AnyFunction} classConstructor Constructor function to look for.
         * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
         */
        function derivesFrom(value, classConstructor) {
            if (!defined(value))
                return !defined(classConstructor);
            if (!defined(classConstructor))
                return false;
            if (value === null)
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
            if (value instanceof classConstructor)
                return true;
            var valueProto, valueConstructor;
            if (isFunction(value)) {
                valueConstructor = value;
                valueProto = value.prototype;
            }
            else {
                valueProto = Object.getPrototypeOf(value);
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
                if (valueProto instanceof classConstructor)
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
        types.derivesFrom = derivesFrom;
        /**
         * Gets extended type string for a value.
         * @param value Value to determine type.
         * @returns {string} Value's type. If the value is null, then "null" is returned. If it is NaN, then "NaN" is returned.
         * Otherwise, the type and class name, separated by a space, is returned. If the class name could not be determined, then just the object type is returned.
         */
        function typeOfExt(value) {
            var t = typeof (value);
            if (t == "object") {
                if (value === null)
                    return "null";
            }
            else if (t != "function") {
                if (t == "number" && isNaN(value))
                    return "NaN";
                return t;
            }
            var n = getClassName(value);
            if (n == t)
                return t;
            return t + " " + n;
        }
        types.typeOfExt = typeOfExt;
        /**
         * Indents the lines of a text and trims trailing whitespace.
         * @param text Text to be indented.
         * @param indent String to use for indenting. Defaults to a single tab character.
         * @param skipLineCount Number of initial lines to preclude from indentation.
         * @returns {string} A string containing lines indented with trailing white space removed.
         */
        function indentText(text, indent, skipLineCount) {
            var arr, joinedText;
            if (isNil(text) || !isObjectType(text) || !Array.isArray(text))
                text = asString(text, "");
            if (typeof (text) != "string") {
                arr = text;
                if (arr.length == 0)
                    return "";
                if (arr.length == 1)
                    joinedText = asString(arr[0], "");
                else
                    joinedText = arr.join(newLineString);
            }
            else
                joinedText = asString(text, "");
            if (joinedText.length == 0)
                return joinedText;
            indent = asString(indent, "\t");
            skipLineCount = asInteger(skipLineCount, 0);
            arr = joinedText.split(lineSplitRegex).map(function (s) { return trimEnd(s); });
            if (arr.length == 1) {
                if (skipLineCount < 1 && arr[0].length > 1)
                    return indent + arr[0];
                return arr[0];
            }
            return arr.map(function (s, i) {
                if (i < skipLineCount || s.length == 0)
                    return s;
                return indent + s;
            }).join(newLineString);
        }
        types.indentText = indentText;
        function _serializeToString(obj) {
            if (!defined(obj))
                return "undefined";
            if (obj === null)
                return "null";
            var type = typeof (obj);
            if (type == "number")
                return (isNaN(obj)) ? "NaN" : JSON.stringify(obj);
            if (type == "boolean" || type == "string")
                return JSON.stringify(obj);
            var className = getClassName(obj);
            if (typeof (obj.toJSON) != "function") {
                if (type == "object") {
                    if (derivesFrom(obj, Error)) {
                        var e = obj;
                        var jObj = {};
                        if (!isNil(e.message)) {
                            jObj.message = asString(e.message, "");
                            if (!isNil(e.description)) {
                                if (jObj.message.trim().length > 0)
                                    jObj.description = asString(e.description, "");
                                else {
                                    var s = asString(e.description, "");
                                    if (s.trim().length > 0 || s.length > jObj.message.length)
                                        jObj.message = s;
                                }
                            }
                        }
                        else if (!isNil(e.description))
                            jObj.message = asString(e.description, "");
                        if (!isNil(e.name))
                            jObj.name = asString(e.name);
                        if (!isNil(e.number))
                            jObj.number = asNumber(e.number);
                        if (!isNil(e.fileName))
                            jObj.fileName = asString(e.fileName);
                        if (!isNil(e.lineNumber))
                            jObj.lineNumber = asNumber(e.lineNumber);
                        if (!isNil(e.columnNumber))
                            jObj.columnNumber = asNumber(e.columnNumber);
                        if (!isNil(e.stack))
                            jObj.stack = asString(e.stack);
                        return JSON.stringify({
                            className: className,
                            type: type,
                            properties: jObj
                        }, undefined, "\t");
                    }
                    if (Array.isArray(obj)) {
                        var arr = obj;
                        if (arr.length == 0)
                            return "{" + newLineString + "\t\"className\": " + JSON.stringify(className) + "," + newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                                newLineString + "\t\"elements\": [] }";
                        if (arr.length == 1)
                            return "{" + newLineString + "\t\"className\": " + JSON.stringify(className) + "," + newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                                newLineString + "\t\"elements\": " + indentText(JSON.stringify(arr), "\t\t", 1) + " }";
                        return "{" + newLineString + "\t\"className\": " + JSON.stringify(className) + "," + newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                            newLineString + "\t\"elements\": [" + newLineString + indentText(JSON.stringify(arr), "\t\t\t", 1) + newLineString + "\t] }";
                    }
                    return "{" + newLineString + "\t\"className\": " + JSON.stringify(className) + "," + newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                        newLineString + "\t\"properties\": " + indentText(JSON.stringify(obj), "\t\t", 1) + " }";
                }
                return "{" + newLineString + "\t\"className\": " + JSON.stringify(className) + "," + newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                    newLineString + "\t\"value\": " + JSON.stringify(obj.toString()) + " }";
            }
            if (isFunction(obj.toJSON) || type == "object")
                return JSON.stringify({
                    className: className,
                    type: type,
                    data: obj.toJSON()
                }, undefined, "\t");
            return JSON.stringify({
                className: className,
                type: type,
                data: obj.toString()
            }, undefined, "\t");
        }
        /**
         * Serializes an object and its properties in a JSON-like representation.
         * @param obj Object to serialize.
         * @returns {string} Object converted to a JSON-like representation.
         */
        function serializeToString(obj) {
            if (!defined(obj))
                return "undefined";
            if (obj === null)
                return "null";
            var type = typeof (obj);
            if (type == "number")
                return (isNaN(obj)) ? "NaN" : JSON.stringify(obj);
            if (type == "boolean" || type == "string")
                return JSON.stringify(obj);
            var className = getClassName(obj);
            var n, v;
            if (typeof (obj.toJSON) != "function") {
                if (type == "object") {
                    var elements = [];
                    var propertyLines = [];
                    var byName = {};
                    if (Array.isArray(obj)) {
                        elements = obj.map(function (e) { return serializeToString(e); });
                        for (n in obj) {
                            var i = asNumber(n, null);
                            v = obj[n];
                            if ((!isNil(i) && n !== "length") || i < 0 || i > obj.length) {
                                byName[n] = serializeToString(obj[n]);
                                propertyLines.push(JSON.stringify(n) + ": " + serializeToString(obj[n]));
                            }
                        }
                    }
                    else {
                        for (n in obj) {
                            if (n !== "length") {
                                byName[n] = serializeToString(obj[n]);
                                propertyLines.push(JSON.stringify(n) + ": " + serializeToString(obj[n]));
                            }
                        }
                    }
                    if (derivesFrom(obj, Error)) {
                        if (!isNil(obj.columnNumber) && isNil(byName.columnNumber))
                            propertyLines.unshift("\"columnNumber\": " + serializeToString(obj.columnNumber));
                        if (!isNil(obj.lineNumber) && isNil(byName.lineNumber))
                            propertyLines.unshift("\"lineNumber\": " + serializeToString(obj.lineNumber));
                        if (!isNil(obj.fileName) && isNil(byName.fileName))
                            propertyLines.unshift("\"fileName\": " + serializeToString(obj.fileName));
                        if (!isNil(obj.number) && isNil(byName.number))
                            propertyLines.unshift("\"number\": " + serializeToString(obj.number));
                        if (!isNil(obj.name) && isNil(byName.name))
                            propertyLines.unshift("\"name\": " + serializeToString(obj.name));
                        if (!isNil(obj.description) && isNil(byName.description)) {
                            if (isNil(obj.message) || (isString(obj.message) && isString(obj.description) && obj.description.length > obj.message.length && obj.message.trim().length == 0)) {
                                byName.message = obj.description;
                                propertyLines.unshift("\"message\": " + serializeToString(obj.description));
                            }
                            else
                                propertyLines.unshift("\"description\": " + serializeToString(obj.description));
                        }
                        if (!isNil(obj.message) && isNil(byName.message))
                            propertyLines.unshift("\"message\": " + serializeToString(obj.message));
                    }
                    if (propertyLines.length == 0) {
                        if (Array.isArray(obj)) {
                            if (elements.length == 0) {
                                if (className == "Array")
                                    return "[]";
                                return "{" + newLineString + "\t\"className\": " + JSON.stringify(className) + "," + newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                                    newLineString + "\t\"elements\": []" + newLineString + ", \t\"properties\": {}" + newLineString + "}";
                            }
                            if (elements.length == 1) {
                                if (className == "Array")
                                    return "[ " + trimEnd(elements[0]) + " ]";
                                return "{" + newLineString + "\t\"className\": " + JSON.stringify(className) + "," + newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                                    newLineString + "\t\"elements\": [ " + indentText(elements[0], "\t", 1) + " ]" + newLineString + ", \t\"properties\": {}" + newLineString + "}";
                            }
                            if (className == "Array")
                                return "[" + newLineString + elements.map(function (e) { return indentText(e); }).join(newLineString) + newLineString + "]";
                            return "{" + newLineString + "\t\"className\": " + JSON.stringify(className) + "," + newLineString + "\t\"type\": " + JSON.stringify(type) + "," + newLineString +
                                "\t\"elements\": [" + newLineString + elements.map(function (e) { return indentText(e, "\t\t"); }).join(newLineString) + newLineString + "]" + newLineString +
                                ", \t\"properties\": {}" + newLineString + "}";
                        }
                        if (className == "Object")
                            return "{ \"type\": " + JSON.stringify(type) + ", \"properties\": {} }";
                        return "{ \"className\": " + JSON.stringify(className) + ", \"type\": " + JSON.stringify(type) + ", \"properties\": {} }";
                    }
                }
                return JSON.stringify({
                    className: className,
                    type: type,
                    value: obj.toString()
                }, undefined, "\t");
            }
            if (typeof (obj.toJSON) == "function")
                return JSON.stringify({
                    className: className,
                    type: type,
                    data: obj.toJSON()
                }, undefined, "\t");
            if (typeof (obj) != "object")
                return JSON.stringify({
                    className: className,
                    type: type,
                    data: obj.toString()
                }, undefined, "\t");
            if (Array.isArray(obj)) {
                if (obj.length == 0)
                    return "[]";
                return "[" + newLineString + obj.map(function (e) {
                    if (!defined(e))
                        return "undefined";
                    if (e === null)
                        return "null";
                    if (typeof (e) == "number")
                        return (isNaN(e)) ? "NaN" : JSON.stringify(e, undefined, "\t");
                    if (typeof (e.toJSON) == "function" || typeof (e) == "boolean" || typeof (e) == "string" ||
                        typeof (e) == "object")
                        return JSON.stringify(e, undefined, "\t");
                    return e.toString();
                }).map(function (s) {
                    s.split(lineSplitRegex).map(function (l) { return "\t" + l; }).join(newLineString);
                }).join(",") + newLineString + newLineString + "]";
            }
            var lines = [];
            for (n in obj) {
                v = obj[n];
                if (!defined(v))
                    lines.push(JSON.stringify(n) + ": undefined");
                else if (v === null)
                    lines.push(n + ((typeof (v) == "number") ? ": NaN" : ": null"));
                else if (typeof (v) == "number")
                    lines.push(JSON.stringify(n) + ": " + ((isNaN(v)) ? "NaN" : JSON.stringify(v, undefined, "\t")));
                else if (typeof (v.toJSON) == "function" || typeof (v) == "boolean" || typeof (v) == "string" ||
                    typeof (v) == "object")
                    lines.push(JSON.stringify(n) + ": " + JSON.stringify(v, undefined, "\t"));
                else
                    lines.push(JSON.stringify(n) + ": " + v.toString());
            }
            if (lines.length == 0)
                return "{}";
            return "{" + newLineString + lines.map(function (s) {
                s.split(lineSplitRegex).map(function (l) { return "\t" + l; }).join(newLineString);
            }).join("," + newLineString) + newLineString + "}";
        }
        types.serializeToString = serializeToString;
    })(types = x_44813_util.types || (x_44813_util.types = {}));
})(x_44813_util || (x_44813_util = {}));
//# sourceMappingURL=types.js.map