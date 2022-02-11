"use strict";
var USASOC_OnLogin = (function () {
    var USASOC_OnLogin = {
        UI_PAGE_ID: "usasoc_profile_notice",
        SESSION_CHECKED_VALUE: "true",
        type: "USASOC_OnLogin"
    };
    USASOC_OnLogin.onDialogClose = function () {
        window.sessionStorage.setItem(USASOC_OnLogin.UI_PAGE_ID, USASOC_OnLogin.SESSION_CHECKED_VALUE);
        USASOC_OnLogin._dialogWindow.destroy();
        USASOC_OnLogin._dialogWindow = null;
    };
    addLoadEvent(function () {
        if (window.sessionStorage.getItem(USASOC_OnLogin.UI_PAGE_ID) == USASOC_OnLogin.SESSION_CHECKED_VALUE)
            return;
        var dialogClass = (window.GlideModal) ? GlideModal : GlideDialogWindow;
        USASOC_OnLogin._dialogWindow = new dialogClass(USASOC_OnLogin.UI_PAGE_ID, true);
        USASOC_OnLogin._dialogWindow.setTitle('User Profile Incomplete');
        USASOC_OnLogin._dialogWindow.render();
    });
    return USASOC_OnLogin;
})();
USASOC_OnLogin.onDialogClose();
//# sourceMappingURL=USASOC_OnLogin.js.map