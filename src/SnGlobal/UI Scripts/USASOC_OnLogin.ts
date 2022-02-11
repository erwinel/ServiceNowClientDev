interface USASOC_OnLogin_Proto {
    readonly UI_PAGE_ID: "usasoc_profile_notice";
    readonly SESSION_CHECKED_VALUE: "true";
    readonly type: "USASOC_OnLogin";
    onDialogClose: () => void;
    _dialogWindow?: GlideModal | GlideDialogWindow;
}
interface USASOC_OnLogin extends Omit<USASOC_OnLogin_Proto, ""> { }
var USASOC_OnLogin: USASOC_OnLogin = (function (): USASOC_OnLogin {
    var USASOC_OnLogin: USASOC_OnLogin_Proto = <USASOC_OnLogin_Proto>{
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
        var dialogClass = ((<{ GlideModal: GlideModal; }><any>window).GlideModal) ? GlideModal : GlideDialogWindow;
        USASOC_OnLogin._dialogWindow = new dialogClass(USASOC_OnLogin.UI_PAGE_ID, true);
        USASOC_OnLogin._dialogWindow.setTitle('User Profile Incomplete');
        USASOC_OnLogin._dialogWindow.render();
    });
    return USASOC_OnLogin;
})();
USASOC_OnLogin.onDialogClose();