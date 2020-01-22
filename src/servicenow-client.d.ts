﻿
declare type StringQueryOperator = "=" | "!=" | "IN" | "NOT IN" | "STARTSWITH" | "ENDSWITH" | "CONTAINS" | "DOES NOT CONTAIN" | "INSTANCEOF";
declare type NumberQueryOperator = "=" | "!=" | ">" | ">=" | "<" | "<=";
declare type QueryOperator = StringQueryOperator | NumberQueryOperator;

/**
 * Global glide variable.
 */
declare var glide: {
    ui: {
        /**
         * Controls automatic message scrolling.
         * @type {boolean}
         */
        scroll_to_message_field: boolean;
    };
}

/**
 * Scratchpad object
 * @interface IScratchPad
 * @description This is typically accessed through the variable named g_scratchpad.
 */
declare interface IScratchPad {
    [key: string]: any; 
}

/**
 * API for database operations.
 * @class GlideRecord
 */
declare class GlideRecord {
    /**
     * Creates an instance of the GlideRecord class for the specified table.
     * @param {string} tableName - The table to be used.
     * @memberof GlideRecord
     * @constructor
     */
    constructor(tableName: string);

    /**
     * Adds a column to order by in the query.
     * @param {string} column - The column by which to order the result set.
     * @memberof GlideRecord
     */
    addOrderBy(column: string): void;
    /**
     * Adds a filter to return records using an encoded query string.
     * @param {QueryOperator} query - An encoded query string.
     * @memberof GlideRecord
     */
    addQuery(query: string): void;
    /**
     * Adds a query to return records where the specified field name is equal to a specified value (or is in a list of values).
     * @param {string} name - Name of the field to check.
     * @param {*} value - Value on which to query (not case-sensitive).
     * @memberof GlideRecord
     */
    addQuery(name: string, value: any): void;
    /**
     * Adds a filter to return records where the field meets the specified condition (field, operator, value).
     * @param {string} name - Name of the field to check.
     * @param {QueryOperator} operator - Query operator.
     * @param {*} value - Value on which to query (not case-sensitive).
     * @memberof GlideRecord
     */
    addQuery(name: string, operator: QueryOperator, value: any): void;
    /**
     * Deletes the current record.
     * @param {GlideAjaxResultCallback<boolean>} [responseFunction] - The response function for the Ajax callback.
     * @returns {boolean} True if the record was deleted. False if no record was found to delete.
     * @memberof GlideRecord
     */
    deleteRecord(responseFunction?: GlideAjaxResultCallback<boolean>): boolean;
    /**
     * Executes a GlideRecord query for a record with the specified sys_id.
     * @param {string} sys_id - The sys_id of the record to be found.
     * @returns {boolean} True if one or more matching records was found. False if no records were found.
     * @memberof GlideRecord
     * @description This method is expected to be used to query for single records, so a next operation is performed before returning.
     */
    get(sys_id: string): boolean;
    /**
     * Gets the value of the specified column.
     * @param {string} column - The column name.
     * @returns {string}
     * @memberof GlideRecord
     */
    getValue(column: string): string;
    /**
     * Retrieves the query condition of the current result set as an encoded query string.
     * @returns {string}
     * @memberof GlideRecord
     */
    getEncodedQuery(): string;
    /**
     * Returns the limit for records to be returned by the GlideRecord query.
     * @returns {number}
     * @memberof GlideRecord
     */
    getLimit(): number;
    /**
     * Retrieves the name of the table associated with this GlideRecord.
     * @returns {string}
     * @memberof GlideRecord
     */
    getTableName(): string;
    /**
     * Determines if there are any more records in the GlideRecord.
     * @returns {boolean} True if there are more records in the query set.
     * @memberof GlideRecord
     */
    hasNext(): boolean;
    /**
     * Initialize the GlideRecord as a new record.
     * @memberof GlideRecord
     */
    initialize(): void;
    /**
     * Inserts a new record using the field values that have been set for the current record.
     * @returns {string | null} - The sys_id of the inserted record, or null if the record was not inserted.
     * @memberof GlideRecord
     */
    insert(): string | null;
    /**
     * Inserts a new record using the field values that have been set for the current record.
     * @param {GlideAjaxResultCallback<string>} responseFunction - The response function.
     * @memberof GlideRecord
     */
    insert(responseFunction: GlideAjaxResultCallback<string | null>): void;
    /**
     * Moves to the next record in the GlideRecord.
     * @returns {boolean} False if there are no more records in the query set.
     * @memberof GlideRecord
     */
    next(): boolean;
    /**
     * Specifies an orderBy column. May be called more than once to order by multiple columns.
     * @param {string} column - The column name to be used to order the result set.
     * @memberof GlideRecord
     */
    orderBy(column: string): void;
    /**
     * Runs the query against the table based on the addQuery() filter. This queries the GlideRecord table as well as any references of the table.
     * @memberof GlideRecord
     */
    query(): void;
    /**
     * Runs the query against the table based on the addQuery() filter. This queries the GlideRecord table as well as any references of the table.
     * @param {Function} responseFunction - The response function for the Ajax callback.
     * @memberof GlideRecord
     */
    query(responseFunction: Function): void;
    /**
     * Runs the query against the table based on the addQuery() filter. This queries the GlideRecord table as well as any references of the table.
     * @param {string} name - The response function for the Ajax callback.
     * @param {string} value - The response function for the Ajax callback.
     * @param {Function} [responseFunction] - The response function for the Ajax callback.
     * @memberof GlideRecord
     */
    query(name: string, value: string, responseFunction?: Function): void;
    /**
     * Sets the limit for how many records are in the GlideRecord.
     * @param {number} [maxQuery] - The limit for the number of records to retrieve.
     * @memberof GlideRecord
     */
    setLimit(maxQuery: number): void;
    [key: string]: any;
}

//type GlideRecordConstructor = (new (tableName: string) => GlideRecord);

declare type GlideAjaxResultCallback<T> = Function & { (result: T): void; };
declare type GetGlideRecordCallback<T extends GlideRecord> = Function & { (gr: T): void; };

declare type DecorationFontIcon = "icon-user" | "icon-user-group" | "icon-lightbulb" | "icon-home" | "icon-mobile" | "icon-comment" | "icon-mail" | "icon-locked" | "icon-database" | "icon-book" | "icon-drawer" | "icon-folder" |
    "icon-catalog" | "icon-tab" | "icon-cards" | "icon-tree-right" | "icon-tree" | "icon-book-open" | "icon-paperclip" | "icon-edit" | "icon-trash" | "icon-image" | "icon-search" | "icon-power" | "icon-cog" |
    "icon-star" | "icon-star-empty" | "icon-new-ticket" | "icon-dashboard" | "icon-cart-full" | "icon-view" | "icon-label" | "icon-filter" | "icon-calendar" | "icon-script" | "icon-add" | "icon-delete" | "icon-help" |
    "icon-info" | "icon-check-circle" | "icon-alert" | "icon-sort-ascending" | "icon-console" | "icon-list" | "icon-form" | "icon-livefeed";
declare type GlideFormFieldMessageType = "error" | "info" | "warning";

declare enum GlideFormFlashDuration {
    oneSecond = 2,
    twoSeconds = 0,
    threeSeconds = -2,
    fourSeconds = -4
}

/**
 * Provides methods to customize forms.
 * @interface GlideForm
 * @description This is typically accesed through the variable g_form.
*/
declare abstract class GlideForm {
    /**
     * Adds an icon on a field’s label.
     * @param {string} fieldName - The field name.
     * @param {DecorationFontIcon} icon -The font icon to show next to the field.
     * @param {string} title - The text title for the icon.
     * @param {string} [color] - A CSS color.
     * @memberof GlideForm
     */
    addDecoration(fieldName: string, icon: DecorationFontIcon, title: string, color?: string): void;
    /**
     * Displays the error message at the top of the form.
     * @param {string} message - The message to display.
     * @memberof GlideForm
     */
    addErrorMessage(message: string): void;
    /**
     * Adds an informational message to the top of the form.
     * @param {string} message - The message to display.
     * @memberof GlideForm
     */
    addInfoMessage(message: string): void;
    /**
     * Adds a choice to the end of a choice list field.
     * @param {string} fieldName - The field name.
     * @param {string} choiceValue - The value to be stored in the database.
     * @param {string} choiceLabel - The value displayed.
     * @param {number} [choiceIndex] - Order of the choice in the list as a zero-based index.
     * @memberof GlideForm
     */
    addOption(fieldName: string, choiceValue: string, choiceLabel: string, choiceIndex?: number): void;
    /**
     * Removes all informational and error messages from the top of the form.
     * @memberof GlideForm
     */
    clearMessages(): void;
    /**
     * Removes all options from the choice list.
     * @param {string} fieldName - The field name.
     * @memberof GlideForm
     */
    clearOptions(fieldName: string): void;
    /**
     * Removes any value(s) from the field.
     * @param {string} fieldName - The field name.
     * @memberof GlideForm
     */
    clearValue(fieldName: string): void;
    /**
     * Prevents file attachments from being added.
     * @memberof GlideForm
     */
    disableAttachments(): void;
    /**
     * Allows file attachments to be added. Shows the paper clip icon.
     * @memberof GlideForm
     */
    enableAttachments(): void;
    /**
     * Used to draw attention to a particular field. Flashes the specified color for a specified duration of time in the specified field.
     * @param {string} fieldName - The field name.
     * @param {string} color - RGB color or acceptable CSS color.
     * @param {GlideFormFlashDuration} count - Specifies how long the label will flash.
     * @memberof GlideForm
     * @description This method is not supported by Service Catalog.
     */
    flash(fieldName: string, color: string, count: GlideFormFlashDuration): void;
    /**
     * Returns the most recent action name, or, for a client script, the sys_id of the UI action clicked.
     * @returns {string}
     * @memberof GlideForm
     * @description Not available in Wizard client scripts.
     */
    getActionName(): string;
    /**
     * Returns a Boolean value for the specified field.
     * @param {string} fieldName - The field name.
     * @returns {boolean}
     * @memberof GlideForm
     */
    getBooleanValue(fieldName: string): boolean;
    /**
     * Returns the HTML element for the specified field.
     * @param {string} fieldName - The field name.
     * @returns {HTMLElement}
     * @memberof GlideForm
     * @description Compound fields may contain several HTML elements. This method is generally not necessary as there are built-in methods that use the fields on a form.
     */
    getControl(fieldName: string): HTMLElement;
    /**
     * Returns the decimal value of the specified field.
     * @param {string} fieldName - The field name.
     * @returns {string}
     * @memberof GlideForm
     */
    getDecimalValue(fieldName: string): string;
    /**
     * Returns the HTML element specified by the parameter.
     * @param {string} id -
     * @returns {HTMLElement}
     * @memberof GlideForm
     * @description This method is not available in mobile scripts or Service Portal scripts.
     *  Compound fields may contain several HTML elements. This method is generally not necessary as there are built-in methods that use the fields on a form.
     */
    getElement(id: string): HTMLElement;
    /**
     * Returns the HTML element for the form.
     * @returns {HTMLElement}
     * @memberof GlideForm
     * @description This method is not available in mobile scripts or Service Portal scripts.
     */
    getFormElement(): HTMLFormElement;
    /**
     * Returns the HTML element of the help text for the specified field.
     * @param {string} fieldName - The field name.
     * @returns {HTMLElement}
     * @memberof GlideForm
     * @description This method is applicable to service catalog variables only.
     */
    getHelpTextControl(fieldName: string): HTMLElement;
    /**
     * Returns the integer value of the field.
     * @param {string} fieldName - The field name.
     * @returns {number}
     * @memberof GlideForm
     */
    getIntValue(fieldName: string): number;
    /**
     * Returns the plain text value of the field label.
     * @param {string} fieldName - The field name.
     * @returns {string}
     * @memberof GlideForm
     */
    getLabelOf(fieldName: string): string;
    /**
     * Returns the option element for a selected box named fieldName where choiceValue matches the option value.
     * @param {string} fieldName - The field name.
     * @param {string} choiceValue -
     * @returns {HTMLElement}
     * @memberof GlideForm
     * @description This method does not work on read-only fields.
     */
    getOption(fieldName: string, choiceValue: string): HTMLElement;
    /**
     * Returns the GlideRecord for a specified field.
     * @param {string} fieldName - The field name.
     * @returns {GlideRecord}
     * @memberof GlideForm
     * @description This routine runs synchronously and processing halts (causing the browser to appear to hang) while waiting on a server response.
     */
    getReference<T extends GlideRecord>(fieldName: string): T;
    /**
     * Asynchronously gets the GlideRecord for a specified field.
     * @param {string} fieldName - The field name.
     * @param {GlideRecordCallback} choiceValue - The callback function.
     * @memberof GlideForm
     */
    getReference<T extends GlideRecord>(fieldName: string, callBack: GetGlideRecordCallback<T>): void;
    /**
     * Returns all section names, whether visible or not.
     * @returns {string[]}
     * @memberof GlideForm
     */
    getSectionNames(): string[];
    /**
     * Returns an array of the form's sections.
     * @returns {HTMLElement[]}
     * @memberof GlideForm
     */
    getSections(): HTMLElement[];
    /**
     * Returns the name of the table to which this record belongs.
     * @returns {string}
     * @memberof GlideForm
     */
    getTableName(): string;
    /**
     * Returns the sys_id of the record displayed in the form.
     * @returns {string}
     * @memberof GlideForm
     */
    getUniqueValue(): string;
    /**
     * Returns the value of the specified field.
     * @param {string} fieldName - The field name.
     * @returns {string}
     * @memberof GlideForm
     */
    getValue(fieldName: string): string;
    /**
     * Hides all field messages.
     * @param {GlideFormFieldMessageType} [type] - If specified, only messages of this type are hidden.
     * @memberof GlideForm
     */
    hideAllFieldMsgs(GlideFormFieldMessageType?: string): void;
    /**
     * Hides the error message placed by showErrorBox().
     * @param {string} fieldName - The field name.
     * @memberof GlideForm
     * @description Whenever possible, use hideFieldMsg() rather than this method whenever possible.
     */
    hideErrorBox(fieldName: string): void;
    /**
     * Hides messages placed by showFieldMsg().
     * @param {string} fieldName - The field name.
     * @param {boolean} [clearAll] - When true, all messages for the field are cleared; otherwise, only the last message is removed.
     * @memberof GlideForm
     */
    hideFieldMsg(fieldName: string, clearAll?: boolean): void;
    /**
     * Hides the specified related list on the form.
     * @param {string} listTableName - Name of the related list. Use the sys_id to hide a list through a relationship.
     * @memberof GlideForm
     */
    hideRelatedList(listTableName: string): void;
    /**
     * Hides all related lists on the form.
     * @memberof GlideForm
     */
    hideRelatedLists(): void;
    /**
     * Returns true while a live update is being done on the record the form is showing.
     * @returns {boolean}
     * @memberof GlideForm
     */
    isLiveUpdating(): boolean;
    /**
     * Returns true if the field is mandatory.
     * @param {string} fieldName - The field name.
     * @returns {boolean}
     * @memberof GlideForm
     */
    isMandatory(fieldName: string): boolean;
    /**
     * Returns true if the record has never been saved.
     * @returns {boolean}
     * @memberof GlideForm
     */
    isNewRecord(): boolean;
    /**
     * Returns true if the section is visible.
     * @param {string} sectionName - The name of the section.
     * @returns {boolean}
     * @memberof GlideForm
     * @description The section name is lower case with an underscore replacing the first space in the name, and with the remaining spaces being removed, for example "Section Four is Here" becomes "section_fourishere".
     */
    isSectionVisible(sectionName: string): boolean;
    /**
     * You can update a list collector variable.
     * @param {string} fieldName - Name of the slush bucket.
     * @memberof GlideForm
     */
    refreshSlushbucket(fieldName: string): void;
    /**
     * Removes the specified option from the choice list.
     * @param {string} fieldName - The field name.
     * @param {string} choiceValue - The value stored in the database. This is not the label.
     * @memberof GlideForm
     */
    removeOption(fieldName: string, choiceValue: string): void;
    /**
     * Removes the icon from the specified field that matches the icon and title.
     * @param {string} fieldName - The field name.
     * @param {DecorationFontIcon} icon - Name of the icon to remove.
     * @param {string} title - The icon's text title (name).
     * @param {string} [color] - A CSS color
     * @memberof GlideForm
     * @description This method is not supported by Service Catalog.
     */
    removeDecoration(fieldName: string, icon: DecorationFontIcon, title: string, color?: string): void;
    /**
     * Saves the record without navigating away (update and stay).
     * @memberof GlideForm
     */
    save(): void;
    /**
     * Makes the specified field available or unavailable.
     * @param {string} fieldName - The field name.
     * @param {boolean} disable - When true disables the field. When false enables the field.
     * @memberof GlideForm
     */
    setDisabled(fieldName: string, disable: boolean): void;
    /**
     * Displays or hides a field.
     * @param {string} fieldName - The field name.
     * @param {boolean} display - When true displays the field, when false hides the field.
     * @memberof GlideForm
     * @description This method cannot hide a mandatory field with no value.
     */
    setDisplay(fieldName: string, display: boolean): void;
    /**
     * Sets the plain text value of the field label.
     * @param {string} fieldName - The field name.
     * @param {string} label - The field text label.
     * @memberof GlideForm
     * @description This method is not supported by Service Catalog.
     */
    setLabelOf(fieldName: string, label: string): void;
    /**
     * Makes the specified field mandatory.
     * @param {string} fieldName - The field name.
     * @param {boolean} mandatory - When true makes the field mandatory. When false makes the field optional.
     * @memberof GlideForm
     * @description Whenever possible, use a UI policy instead of this method.
     */
    setMandatory(fieldName: string, mandatory: boolean): void;
    /**
     * Makes the specified field read only or editable.
     * @param {string} fieldName - The field name.
     * @param {boolean} readOnly - When true makes the field read only. When false makes the field editable.
     * @memberof GlideForm
     * @description Whenever possible, use a UI policy instead of this method.
     */
    setReadOnly(fieldName: string, readOnly: boolean): void;
    /**
     * Sets the value of a field.
     * @param {string} fieldName - The field name.
     * @param {string | number} value - Value in the database.
     * @memberof GlideForm
     * @description The method setValue() can cause a stack overflow when used in an OnChange client script.
     *  When defining a value in a choice list, be sure to use number value rather than the label.
     *  To improve performance by preventing a round trip, use the displayValue parameter.
     */
    setValue(fieldName: string, value: string | number): void;
    /**
     * Sets the value of a field.
     * @param {string} fieldName - The field name.
     * @param {string | number} value - The choice value or System ID for the reference value in the database. Can be an array of system IDs if the field is a glide-list.
     * @param {string} displayValue - Display name for the referenced value in the database. Can be an array of display names if the field is a glide-list.
     * @memberof GlideForm
     * @description The method setValue() can cause a stack overflow when used in an OnChange client script.
     *  When defining a value in a choice list, be sure to use number value rather than the label.
     */
    setValue(fieldName: string, value: string | number, displayValue: string): void;
    /**
     * Shows or hides a section.
     * @param {string} sectionName - The name of the section.
     * @param {boolean} display - When true shows the section. When false hides the section.
     * @memberof GlideForm
     * @description The section name is lower case with an underscore replacing the first space in the name, and with the remaining spaces being removed, for example "Section Four is Here" becomes "section_fourishere".
     */
    setSectionDisplay(sectionName: string, display: boolean): void;
    /**
     * Displays or hides the field.
     * @param {string} fieldName - The field name.
     * @param {boolean} display - When true displays the field. When false hides the field.
     * @memberof GlideForm
     * @description On desktop UI, the space is left blank when hidden. On Mobile or Service Portal UI, the space is filled in my other fields when hidden. This method cannot hide mandatory fields with no value.
     *  Use UI Policy rather than this method whenever possible.
     */
    setVisible(fieldName: string, display: boolean): void;
    /**
     * Displays an error message under the specified form field (either a control object or the name of the field).
     * @param {string} name - Name of the field or control.
     * @param {string} message - Message to display.
     * @param {boolean} [scrollForm] - When false, the form does not scroll to the field; otherwise, the form scrolls to the control or field.
     * @memberof GlideForm
     */
    showErrorBox(name: string, message: string, scrollForm?: boolean): void;
    /**
     * Displays either an informational or error message under the specified form field (either a control object or the name of the field).
     * @param {string} field - The field name.
     * @param {string} message - Message to display.
     * @param {GlideFormFieldMessageType} type - The message type.
     * @param {boolean} [scrollForm] - When false, the form does not scroll to the field; otherwise, the form scrolls to the control or field.
     * @memberof GlideForm
     * @description This method does not work with the journal_field type field in UI16.
     *  The showErrorBox() method is a shorthand method that does not require the type parameter.
     */
    showFieldMsg(field: string, message: string, type: GlideFormFieldMessageType, scrollForm?: boolean): void;
    /**
     * Displays the specified related list on the form.
     * @param {string} listTableName - Name of the related list.
     * @memberof GlideForm
     */
    showRelatedList(listTableName: string): void;
    /**
     * Displays all the form's related lists.
     * @memberof GlideForm
     */
    showRelatedLists(): void;
    /**
     * Saves the record.
     * @param {string} [verb] - Name of UI action to be performed. The action name must be for a visible form button.
     * @memberof GlideForm
     * @description If the action verb is not specified, the user is taken away from the form, returning them to where they were.
     */
    submit(verb?: string): void;
}

/**
 * Provides access to information about the current user and current user roles.
 * @interface GlideUser
 */
declare class GlideUser {
    /**
     * Returns the current user's first name.
     * @type {string}
     * @memberof GlideUser
     */
    readonly firstName: string;
    /**
     * Returns the current user's last name.
     * @type {string}
     * @memberof GlideUser
     */
    readonly lastName: string;
    /**
     * Returns the sys_id of the current user.
     * @type {string}
     * @memberof GlideUser
     */
    readonly userID: string;
    /**
     * Returns the current user's username.
     * @type {string}
     * @memberof GlideUser
     */
    readonly userName: string;
    /**
     * Returns a session client value previously set with putClientData().
     * @param {string} key - Name of the client data to retrieve.
     * @returns {string}
     * @memberof GlideUser
     */
    getClientData(key: string): string;
    /**
     * Returns the first and last name of the current user.
     * @returns {string}
     * @memberof GlideUser
     */
    getFullName(): string;
    /**
     * Returns true if the current user has the specified or admin role.
     * @param {string} role - Role to check.
     * @param {boolean} [includeDefaults] - Flag that indicates whether to include default roles, such as snc_internal and snc_external, in the request.
     * @returns {boolean}
     * @memberof GlideUser
     */
    hasRole(role: string, includeDefaults?: boolean): boolean;
    /**
     * Returns true only if the current user has the specified role.
     * @param {string} role - Role to check.
     * @param {boolean} [includeDefaults] - Flag that indicates whether to include default roles, such as snc_internal and snc_external, in the request.
     * @returns {boolean}
     * @memberof GlideUser
     */
    hasRoleExactly(role: string, includeDefaults?: boolean): boolean;
    /**
     * Returns true if the current user has at least one of the specified roles or has the admin role.
     * @param {string} role - Comma-separated list of roles to check.
     * @param {boolean} [includeDefaults] - Flag that indicates whether to include default roles, such as snc_internal and snc_external, in the request.
     * @returns {boolean}
     * @memberof GlideUser
     */
    hasRoleFromList(role: string, includeDefaults?: boolean): boolean;
    /**
     * Returns true if the current user has any role.
     * @param {boolean} [includeDefaults] - Flag that indicates whether to include default roles, such as snc_internal and snc_external, in the request.
     * @returns {boolean}
     * @memberof GlideUser
     */
    hasRoles(includeDefaults?: boolean): boolean;
}

/**
 * The current user.
 */
declare var g_user: GlideUser;

/**
 * JavaScript class used to customize (v2) lists.
 * @class GlideList2
 * @description The g_list variable is not available to the related lists form link UI action. It is available to the lists form link UI action.
 */
declare abstract class GlideList2 {
    /**
     * Adds a single term to the list query filter.
     * @param {string} filter - Query string condition to add.
     * @memberof GlideList2
     */
    addFilter(filter: string): void;
    /**
     * Returns the GlideList2 object for the list that contains the specified item.
     * @param {string} id - The list or DOM Element ID for which you want the GlideList2 object.
     * @returns {(GlideList2 | null)}
     * @memberof GlideList2
     */
    get(id: string): GlideList2 | null;
    /**
     * Returns a comma-separated list of the sys_ids for the items that are checked in the list.
     * @returns {string} Comma-separated list of the sys_ids for the items that are checked in the list. Does not check to determine that the items returned are allowed to be executed.
     * @memberof GlideList2
     */
    getChecked(): string;
    /**
     * Returns the sysparm_fixed query.
     * @returns {string} The fixed query string for the list.
     * @memberof GlideList2
     * @description A fixed query is the part of the query that cannot be removed from the breadcrumb (i.e., it is fixed for the user). It is specified by including a sysparm_fixed_query parameter for the application module.
     */
    getFixedQuery(): string;
    /**
     * Returns the field or comma-separated list of fields that are used to group the list.
     * @returns {string} The field or comma-separated list of fields that are used to group the list.
     * @memberof GlideList2
     */
    getGroupBy(): string;
    /**
     * Returns the name of the list, which is usually the table name.
     * @returns {string} The list name (usually the table name).
     * @memberof GlideList2
     */
    getListName(): string;
    /**
     * Returns the first field used to order the list.
     * @returns {string} The field used for order, or a blank.
     * @memberof GlideList2
     */
    getOrderBy(): string;
    /**
     * Returns the name of the parent table for a related list (the table associated with the form).
     * @type {string} he parent table name.
     * @memberof GlideList2
     */
    getParentTable(): string;
    /**
     * Returns the encoded query string for the list.
     * @param {boolean} [orderBy] - If true, includes the orderBy in the encoded query string.
     * @param {boolean} [groupBy] - If true, includes the groupBy in the encoded query string.
     * @param {boolean} [fixed] - If true, includes fixed query in the encoded query string.
     * @param {boolean} [all] - If true, includes orderBy, groupBy, and fixed query.
     * @returns {string} Encoded query string for the list.
     * @memberof GlideList2
     */
    getQuery(orderBy?: boolean, groupBy?: boolean, fixed?: boolean, all?: boolean): string;
    /**
     * Returns the related list field that associates the related list to the parent form.
     * @returns {string} Field that connects the list to the parent form.
     * @memberof GlideList2
     */
    getRelated(): string;
    /**
     * Returns the table name for the list.
     * @returns {string} Returns the table name for the list.
     * @memberof GlideList2
     */
    getTableName(): string;
    /**
     * Returns the list title.
     * @returns {string} The list title.
     * @memberof GlideList2
     */
    getTitle(): string;
    /**
     * Returns the view used to display the list.
     * @returns {string} The name of the view.
     * @memberof GlideList2
     */
    getView(): string;
    /**
     * Returns true if the list has been personalized by the user by choosing the list mechanic and changing the list layout.
     * @returns {boolean} True if the list layout has been changed.
     * @memberof GlideList2
     */
    isUserList(): boolean;
    /**
     * Refreshes the list.
     * @param {number} [firstRow] - The first row to appear in the list. If not specified, the first row of the current is used.
     * @param {string} [additionalParms] - name-value pairs that are submitted with the list refresh request.
     * @memberof GlideList2
     * @description The orderBy part of the list filter is ignored so that the list uses its natural ordering when it is refreshed.
     */
    refresh(firstRow?: number, additionalParms?: string): void;
    /**
     * Refreshes the list.
     * @param {number} [firstRow] - The first row to appear in the list.
     * @param {string} [description] - name=value pairs that are submitted with the list refresh request.
     * @memberof GlideList2
     * @description The orderBy part of the list filter is included if it is specified for the list.
     */
    refreshWithOrderBy(firstRow?: number, description?: string): void;
    /**
     * Sets the encoded query string for the list, ignoring the orderBy and groupBy parts of the query string.
     * @param {string} filter - Encoded query string.
     * @memberof GlideList2
     */
    setFilter(filter: string): void;
    /**
     * Sets the encoded query string for the list, including the orderBy and groupBy if specified, and then refreshes the list using the new filter.
     * @param {string} filter - Encoded query string.
     * @memberof GlideList2
     */
    setFilterAndRefresh(filter: string): void;
    /**
     * Sets the first row that appears in the list when the list is refreshed.
     * @param {number} rowNum - Row number of the first row to display.
     * @memberof GlideList2
     */
    setFirstRow(rowNum: number): void;
    /**
     * Sets the groupBy criteria for the list, for a single field or multiple fields.
     * @param {string} groupBy - The groupBy criteria for the list.
     * @memberof GlideList2
     * @description For a single field, use field or groupByField. The groupBy prefix is optional. For multiple fields, use field1^field2^field3 or groupByField1^groupByField2^groupByField3.
     */
    setGroupBy(groupBy: string): void;
    /**
     * Sets the orderBy criteria for the list.
     * @param {string} orderBy - Single or multiple order by fields.
     * @memberof GlideList2
     * @description For a single order by field use orderBy field or orderByDescField. For multiple fields, use orderByField1^orderByField2^orderByField3. orderBy specifies ascending order and orderByDesc specifies descending. These prefix strings are optional. If not specified orderBy is assumed.
     */
    setOrderBy(orderBy: string): void;
    /**
     * Sets the number of rows per page to display.
     * @param {number} rows - The number of rows to display
     * @memberof GlideList2
     */
    setRowsPerPage(rows: number): void;
    /**
     * Shows or hides all the groups within the list and saves the current collapsed/expanded state of the groups as a user preference.
     * @param {boolean} showFlag - If true, shows the groups within the list.
     * @memberof GlideList2
     */
    showHideGroups(showFlag: boolean): void;
    /**
     * Displays or hides the list and saves the current collapsed/expanded state of the list as a user preference.
     * @param {boolean} showFlag - If true, displays the list.
     * @memberof GlideList2
     */
    showHideList(showFlag: boolean): void;
    /**
     * Sorts the list in ascending order and saves the choice.
     * @param {string} field - Specifies the field used to sort the list.
     * @memberof GlideList2
     */
    sort(field: string): void;
    /**
     * Sorts the list in descending order and saves the choice.
     * @param {string} field - Specifies the field used to sort the list.
     * @param {number} [amount] - 
     * @memberof GlideList2
     */
    sortDescending(field: string, amount?: number): void;
    /**
     * Toggles the display of the list and saves the current collapsed/expanded state of the list as a user preference.
     * @memberof GlideList2
     */
    toggleList(): void;
    /**
     * Toggles the display of the list but does not save the current collapsed/expanded state of the list as a user preference.
     * @memberof GlideList2
     */
    toggleListNoPref(): void;
}

declare abstract class spUtil {
    static addErrorMessage(message: string): void;
    static addInfoMessage(message: string): void;
    static addTrivialMessage(message: string): void;
    static format(template: string, data: any): string;
    static get(widgetId: string, data: any): object;
    static recordWatch<T>($scope: ng.IScope, table: string, filter: string, callback: { (response: any): T; } & Function): Promise<T>;
    static refresh($scope: ng.IScope): any;
    static update($scope: ng.IScope): any;
}