namespace x_44813_usasoc_cst {
    export namespace UsasocUserNotificationManager {
        export const modalDialologId: string = "x_44813_usasoc_cst_profile_incomplete_warning";
        export const modalButtonId: string = "x_44813_usasoc_cst_profile_incomplete_button";
        export const SESSION_CHECKED_VALUE: string = "true1";
        export function checkUserProfile(force?: boolean, clear?: boolean) {
            if (force) {
                if (clear)
                    window.sessionStorage.removeItem(modalDialologId);
            } else if (window.sessionStorage.getItem(modalDialologId) == SESSION_CHECKED_VALUE)
                return;
            showProfileIncompleteModal();
        }
        export function showProfileIncompleteModal() {
            var dialog: GlideModal = new GlideModal(modalDialologId, true);
            dialog.setTitle('User Profile Incomplete');
            dialog.on("bodyrendered", function () {
                $(modalButtonId).on("click", function () {
                    window.sessionStorage.setItem(modalDialologId, SESSION_CHECKED_VALUE);
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
                '<div class="panel-footer"><input type="button" id="" value="' + modalButtonId + '" /></div>');
            //dialog.render();
        }
        export const type: string = "UsasocUserNotificationManager";
    }
}