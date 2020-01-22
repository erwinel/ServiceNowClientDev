/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../servicenow-client.d.ts" />

// session.established
//     sys_user: bb18915bdb893340b53f341f7c96196f
// live_profile: 0915f21bdb8d3340b53f341f7c961982
function validateUserProfileCompliance() {
    function checkUser(result: GlideRecord) {
        if (result.next()) {
            alert(typeof result.sys_id);
        }
    }
    let gr: GlideRecord = new GlideRecord("sys_user");
    gr.addQuery('sys_id', g_user.userID);
    gr.query(checkUser);
    /*
     * building
     * city
     * company
     * country
     * department
     * location
     * preferred_language
     * state
     * street
     * time_zone
     * u_rank
     * u_tda_position
     * zip
     *
     * home_phone
     * mobile_phone
     * u_grey_phone
     * u_red_phone
     * phone (black phone)
    g_user.userID
     */
}