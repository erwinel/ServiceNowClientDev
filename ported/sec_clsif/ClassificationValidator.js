var x_44813_sec_clsif = x_44813_sec_clsif || {};

x_44813_sec_clsif.ClassificationValidator = (function() {
	"use strict";
    $t = x_44813_util.types;
    
    function asNameValidator(value) {
        if (!$t.isNil(value) && value instanceof NameValidationProperty)
            return value;
        var result = new NameValidationProperty();
        result.sourceValue = value;
        result.validate();
        return result;
    }
    function asPortionMarkingValidator(value){
        if (!$t.isNil(value) && value instanceof PortionMarkingValidationProperty)
            return value;
        var result = new PortionMarkingValidationProperty();
        result.sourceValue = value;
        result.validate();
        return result;
    }

    function ValidationProperty(config) {
        this.__config = config;
        this.__setLastValidatedString = "";
		this.sourceValue = "";
		this.normalizedValue = "";
		this.isValid = false;
        this.message = this.__config.emptyValueMsg;
        this.isChanged = function() { return __setLastValidatedString != this.sourceValue || typeof(this.isValid) != "boolean" || typeof(this.normalizedValue) != "string" ||
            typeof(this.message) != "string"; };
		this.toString = function() { return this.sourceValue; };
		this.validate = function(force) {
			this.sourceValue = $t.asString(this.sourceValue, "");
            this.__setLastValidatedString = this.sourceValue;
			if (!(force || this.isChanged()))
                return this.isValid;
            this.normalizedValue = this.sourceValue.trim();
			if (this.normalizedValue.length == 0) {
				this.isValid = false;
				this.message = this.__config.emptyValueMsg;
			} else {
				this.normalizedValue = this.sourceValue.replace(whiteSpaceRe, ' ');
				this.isValid = this.__config.re.test(this.normalizedValue);
				if (this.isValid) {
					if (this.normalizedValue.length > this.__config.maxLen) {
						this.isValid = false;
						this.message = this.__config.valueTooLongMsg;
					} else
						this.message = (this.sourceValue == this.normalizedValue) ? "" : this.__config.valueNormalizedMsg;
				}
				else
					this.message = this.__config.invalidValueMsg;
            }
            return this.isValid;
		};
    }

    function NameValidationProperty() {
        ValidationProperty.call(this, {
            re: /^[a-z][a-z\d_]*(\s+[a-z][a-z\d_]*)*$/i,
            maxLen: 12,
            valueNormalizedMsg: "Classification Name has been normalized.",
            emptyValueMsg: NameValidationProperty.emptyValueMsg,
            valueTooLongMsg: "Name cannot be greater than 12 characters.",
            invalidValueMsg: "Invalid Classification Name."
        });
    }
    NameValidationProperty.prototype = ValidationProperty;
    NameValidationProperty.prototype.constructor = NameValidationProperty;
    NameValidationProperty.emptyValueMsg = "Classification Name cannot be empty.";

    function PortionMarkingValidationProperty() {
        ValidationProperty.call(this, {
            re: /^[a-z][a-z\d_.]?/i,
            maxLen: 2,
            valueNormalizedMsg: "Portion Marking has been normalized.",
            emptyValueMsg: PortionMarkingValidationProperty.emptyValueMsg,
            valueTooLongMsg: "Portion Marking can only be 1 or 2 characters.",
            invalidValueMsg: "Invalid Portion Marking."
        });
    }
    PortionMarkingValidationProperty.prototype = ValidationProperty;
    PortionMarkingValidationProperty.prototype.constructor = PortionMarkingValidationProperty;
    PortionMarkingValidationProperty.emptyValueMsg = "Portion Marking cannot be empty.";

	var defaultByName = {};
	var defaultByPortionMarking = {};
	var ClassificationValidator = {
        Name: NameValidationProperty,
        PortionMarking: PortionMarkingValidationProperty,
        allCompliantClassifications: [
            { name: 'UNCLASSIFIED', portionMarking: 'U' },
            { name: 'CONFIDENTIAL', portionMarking: 'C' },
            { name: 'RESTRICTED', portionMarking: 'R' },
            { name: 'SECRET', portionMarking: 'S' },
            { name: 'TOP SECRET', portionMarking: 'TS' }
        ],
        defaultByName: {},
        defaultByPortionMarking: {},
		type:  "ClassificationValidator"
	};
	ClassificationValidator.allCompliantClassifications.forEach(function(a) {
		ClassificationValidator.defaultByName[a.name] = a.portionMarking;
		ClassificationValidator.defaultByPortionMarking[a.portionMarking] = a.name;
    });
    return ClassificationValidator;
})();