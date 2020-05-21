export interface DropdownOptions{
    singleSelection: boolean;
    text: string;
    enableCheckAll : boolean;
    selectAllText: string;
    unSelectAllText: string;
    filterSelectAllText: string;
    filterUnSelectAllText: string;
    enableSearchFilter: boolean;
    maxHeight: number;
    badgeShowLimit: number;
    classes: string;
    limitSelection?: number;
    disabled?: boolean;
    searchPlaceholderText: string;
    showCheckbox?: boolean;
    noDataLabel: string;
    labelKey?: string;
    primaryKey: string;
    addNewItem?: boolean;
    newItemPlaceholder?: string;
    escapeToClose?: boolean;
    selectedItemsFunc?: (data: any[], value: any) => any[];
    formValueFunc?: (seletedItems: any[]) => any;
}
