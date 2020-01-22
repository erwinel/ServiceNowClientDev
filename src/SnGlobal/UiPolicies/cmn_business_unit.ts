/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../servicenow-client.d.ts" />

namespace business_unit_mandatory_when_parent_empty {
    declare var g_form: GlideForm;

    namespace ifTrue {
        function onCondition() {
    if (g_user.hasRole('user_admin')) {
        g_form.setReadOnly("business_unit", false);
        g_form.setMandatory("business_unit", true);
    }
}
    }
    namespace ifFalse {
        function onCondition() {
            if (g_user.hasRole('user_admin')) {
                g_form.setReadOnly("business_unit", true);
                g_form.setMandatory("business_unit", false);
            }
        }
    }
}