"use strict";
/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../servicenow-client.d.ts" />
var business_unit_mandatory_when_parent_empty;
(function (business_unit_mandatory_when_parent_empty) {
    var ifTrue;
    (function (ifTrue) {
        function onCondition() {
            if (g_user.hasRole('user_admin')) {
                g_form.setReadOnly("business_unit", false);
                g_form.setMandatory("business_unit", true);
            }
        }
    })(ifTrue || (ifTrue = {}));
    var ifFalse;
    (function (ifFalse) {
        function onCondition() {
            if (g_user.hasRole('user_admin')) {
                g_form.setReadOnly("business_unit", true);
                g_form.setMandatory("business_unit", false);
            }
        }
    })(ifFalse || (ifFalse = {}));
})(business_unit_mandatory_when_parent_empty || (business_unit_mandatory_when_parent_empty = {}));
//# sourceMappingURL=cmn_business_unit.js.map