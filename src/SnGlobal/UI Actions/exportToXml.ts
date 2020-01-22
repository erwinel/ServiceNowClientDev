namespace exportToXml {
    declare var g_list: GlideList2;
    function exportToXml() {
        spUtil.addInfoMessage(g_list.getQuery());
    }
}