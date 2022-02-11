"use strict";
var x_44813_usasoc_cst;
(function (x_44813_usasoc_cst) {
    var UsasocUserNotificationManager;
    (function (UsasocUserNotificationManager) {
        UsasocUserNotificationManager.modalDialologId = "x_44813_usasoc_cst_profile_incomplete_warning";
        UsasocUserNotificationManager.modalButtonId = "x_44813_usasoc_cst_profile_incomplete_button";
        UsasocUserNotificationManager.SESSION_CHECKED_VALUE = "true1";
        function checkUserProfile(force, clear) {
            if (force) {
                if (clear)
                    window.sessionStorage.removeItem(UsasocUserNotificationManager.modalDialologId);
            }
            else if (window.sessionStorage.getItem(UsasocUserNotificationManager.modalDialologId) == UsasocUserNotificationManager.SESSION_CHECKED_VALUE)
                return;
            showProfileIncompleteModal();
        }
        UsasocUserNotificationManager.checkUserProfile = checkUserProfile;
        function showProfileIncompleteModal() {
            var dialog = new GlideModal(UsasocUserNotificationManager.modalDialologId, true);
            dialog.setTitle('User Profile Incomplete');
            dialog.on("bodyrendered", function () {
                $(UsasocUserNotificationManager.modalButtonId).on("click", function () {
                    window.sessionStorage.setItem(UsasocUserNotificationManager.modalDialologId, UsasocUserNotificationManager.SESSION_CHECKED_VALUE);
                    dialog.destroy();
                });
            });
            dialog.setPreference('focusTrap', true);
            dialog.setBody('<div class="panel-danger">' +
                '<h5 class="panel-heading">Your user profile is incomplete</h5>' +
                '<div class="panel-body">' +
                'In order to be of service to you, there are a few basic things that must be completed within your profile.' +
                'Click the &quot;OK&quot; button to proceed to your profile page.' +
                '</div>' +
                '<div class="panel-footer"><input type="button" id="" value="' + UsasocUserNotificationManager.modalButtonId + '" /></div>');
            //dialog.render();
        }
        UsasocUserNotificationManager.showProfileIncompleteModal = showProfileIncompleteModal;
        UsasocUserNotificationManager.type = "UsasocUserNotificationManager";
    })(UsasocUserNotificationManager = x_44813_usasoc_cst.UsasocUserNotificationManager || (x_44813_usasoc_cst.UsasocUserNotificationManager = {}));
})(x_44813_usasoc_cst || (x_44813_usasoc_cst = {}));
//# sourceMappingURL=UsasocUserNotificationManager.js.map