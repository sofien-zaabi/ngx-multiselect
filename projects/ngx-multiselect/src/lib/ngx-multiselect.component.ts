import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter, HostListener,
    Input,
    OnInit,
    Output,
    ViewChild,
    forwardRef,
    OnChanges,
    AfterViewChecked,
    OnDestroy,
    SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';
import { DropdownOptions } from "./multi-select-options";
import { multiSelectClasses } from './ngxMultiSelectClasses';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { isNullOrUndefined } from "util";


const noop = () => {
};

@Component({
    selector: 'ngx-multiselect',
    templateUrl: './ngx-multiselect.component.html',
    styleUrls: ['./ngx-multiselect.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: NgxMultiselectComponent, multi: true },
        { provide: NG_VALIDATORS, useExisting: NgxMultiselectComponent, multi: true }
    ],
    /*changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class NgxMultiselectComponent implements OnInit, ControlValueAccessor, OnChanges, Validator, AfterViewChecked, OnDestroy {


    @Input()
    data: Array<any> = [];

    @Input()
    options: DropdownOptions;

    @Output('onSelect')
    onSelect: EventEmitter<any> = new EventEmitter<any>();

    @Output('onDeSelect')
    onDeSelect: EventEmitter<any> = new EventEmitter<any>();

    @Output('onSelectAll')
    onSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

    @Output('onDeSelectAll')
    onDeSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

    @Output('onOpen')
    onOpen: EventEmitter<any> = new EventEmitter<any>();

    @Output('onClose')
    onClose: EventEmitter<any> = new EventEmitter<any>();

    @Output('onItemAdd')
    onItemAdd: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('selectedList', { static: false }) selectedListElem: ElementRef;
    @ViewChild('dropdownList', { static: false }) dropdownListElem: ElementRef;
    @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
    @HostListener('document:keyup.escape', ['$event'])
    onEscapeDown(event: KeyboardEvent) {
        if (this.options.escapeToClose) {
            this.closeDropdown();
        }
    }

    public selectedItems: Array<any> = [];
    public isActive: boolean = false;
    public isSelectAll: boolean = false;
    public dropdownListYOffset: number = 0;
    public selectedListHeight: any;
    private initData: any[];
    public filter: string;
    toggleNewItem: boolean = false;
    defaultOptions: DropdownOptions = {
        singleSelection: false,
        text: 'Select',
        enableCheckAll: true,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        filterSelectAllText: 'Select all filtered results',
        filterUnSelectAllText: 'UnSelect all filtered results',
        enableSearchFilter: false,
        maxHeight: 300,
        badgeShowLimit: 999999999999,
        classes: '',
        disabled: false,
        searchPlaceholderText: 'Search',
        showCheckbox: true,
        noDataLabel: 'No Data Available',
        labelKey: 'name',
        primaryKey: 'id',
        addNewItem: false,
        newItemText: "Add Item",
        escapeToClose: true,
        initValueFunc: null,
        formValueChangeFunc: null
    }

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.options = Object.assign(this.defaultOptions, this.options);

    }

    ngOnChanges(changes: SimpleChanges) {
        //console.log("ngOnChanges ", changes)
        if (changes.data && !changes.data.firstChange) {

        }
        if (changes.options && !changes.options.firstChange) {
            this.options = Object.assign(this.defaultOptions, this.options);
        }
        if (changes.loading) {
        }
    }

    ngDoCheck() {
        //console.log("ngDoCheck ", this.selectedItems)
        if (this.selectedItems) {
            if (this.selectedItems.length == 0 || this.data.length == 0 || this.selectedItems.length < this.data.length) {
                this.isSelectAll = false;
            }
        }
    }

    ngAfterViewInit() {

    }

    ngAfterViewChecked() {
        if (this.selectedListElem.nativeElement.clientHeight /*&& this.options.position == 'top'*/ && this.selectedListHeight) {
            this.selectedListHeight.val = this.selectedListElem.nativeElement.clientHeight;
            this.cdr.detectChanges();
        }

    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (this.options.initValueFunc && typeof this.options.initValueFunc === 'function') {
            value = this.options.initValueFunc(this.data, value);
        }
        if (value !== undefined && value !== null && value !== '') {
            if (this.options.singleSelection) {
                try {

                    if (value.length > 1) {
                        this.selectedItems = [value[0]];
                    }
                    else {
                        this.selectedItems = value;
                    }
                }
                catch (e) {
                    console.error(e.body.msg);
                }

            }
            else {
                if (this.options.limitSelection) {
                    this.selectedItems = value.slice(0, this.options.limitSelection);
                }
                else {
                    this.selectedItems = value;
                }
                if (this.selectedItems.length === this.data.length && this.data.length > 0) {
                    this.isSelectAll = true;
                }
            }
        } else {
            this.selectedItems = [];
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    public validate(c: FormControl): any {
        return null;
    }

    ngOnDestroy() {
    }

    onItemClick(item: any, index: number, evt: Event) {
        if (this.options.disabled) {
            return false;
        }

        let found = this.isSelected(item);
        let limit = this.selectedItems.length < this.options.limitSelection ? true : false;

        if (!found) {
            if (this.options.limitSelection) {
                if (limit) {
                    this.addSelected(item);
                    this.onSelect.emit(item);
                }
            }
            else {
                this.addSelected(item);
                this.onSelect.emit(item);
            }

        }
        else {
            this.removeSelected(item);
            this.onDeSelect.emit(item);
        }
        if (this.isSelectAll || this.data.length > this.selectedItems.length) {
            this.isSelectAll = false;
        }
        if (this.data.length == this.selectedItems.length) {
            this.isSelectAll = true;
        }
    }

    private onTouchedCallback: (_: any) => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    trackByFn(index: number, item: any) {
        return item[this.options.primaryKey];
    }

    isSelected(clickedItem: any) {
        //console.log(this.selectedItems);
        let found = false;
        this.selectedItems && this.selectedItems.forEach(item => {
            //console.log("isSelected ", item);
            if (clickedItem[this.options.primaryKey] === item[this.options.primaryKey]) {
                found = true;
            }
        });
        return found;
    }
    addSelected(item: any) {
        if (this.options.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
            this.closeDropdown();
        }
        else
            this.selectedItems.push(item);
        let formValue: any = this.selectedItems;
        if (this.options.formValueChangeFunc && typeof this.options.formValueChangeFunc === 'function')
            formValue = this.options.formValueChangeFunc(formValue);
        this.onChangeCallback(formValue);
        this.onTouchedCallback(formValue);
    }
    removeSelected(clickedItem: any) {
        this.selectedItems && this.selectedItems.forEach(item => {
            if (clickedItem[this.options.primaryKey] === item[this.options.primaryKey]) {
                this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
            }
        });
        let formValue: any = this.selectedItems;
        if (this.options.formValueChangeFunc && typeof this.options.formValueChangeFunc === 'function')
            formValue = this.options.formValueChangeFunc(formValue);
        this.onChangeCallback(formValue);
        this.onTouchedCallback(formValue);
    }

    toggleDropdown(evt: any) {
        if (this.options.disabled) {
            return false;
        }
        this.isActive = !this.isActive;
        if (this.isActive) {
            if (this.searchInput && this.options.enableSearchFilter) {
                setTimeout(() => {
                    this.searchInput.nativeElement.focus();
                }, 0);
            }
            this.onOpen.emit(true);
        }
        else {
            this.onClose.emit(false);
        }
        setTimeout(() => {
            this.calculateDropdownDirection();
        }, 0);

        evt.preventDefault();
    }

    public closeDropdown() {
        if (this.searchInput) {
            this.searchInput.nativeElement.value = "";
        }
        this.filter = "";
        this.isActive = false;
        this.onClose.emit(false);
    }

    toggleSelectAll() {
        if (!this.isSelectAll) {
            this.selectedItems = [];
            this.selectedItems = this.data.slice();
            this.isSelectAll = true;
            let formValue: any = this.selectedItems;
            if (this.options.formValueChangeFunc && typeof this.options.formValueChangeFunc === 'function')
                formValue = this.options.formValueChangeFunc(formValue);
            this.onChangeCallback(formValue);
            this.onTouchedCallback(formValue);

            this.onSelectAll.emit(this.selectedItems);
        }
        else {
            this.selectedItems = [];
            this.isSelectAll = false;
            let formValue: any = this.selectedItems;
            if (this.options.formValueChangeFunc && typeof this.options.formValueChangeFunc === 'function')
                formValue = this.options.formValueChangeFunc(formValue);
            this.onChangeCallback(formValue);
            this.onTouchedCallback(formValue);

            this.onDeSelectAll.emit(this.selectedItems);
        }
    }

    ngxMultiselectFilter(event: any) {
        if (!this.initData) {
            this.initData = this.data;
        }
        //console.log(this.initGridRows);
        this.data = this.initData;
        if (event.target.value) {
            this.filter = event.target.value;
            if (this.data && this.data.length > 0) {
                this.data = this.data.filter(item => {
                    let found = false;
                    for (let prop in item) {
                        if (item.hasOwnProperty(prop)) {
                            if (!found) {
                                if (typeof item[prop] === 'string' && item[prop].toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) {
                                    found = true;
                                }
                            }
                        }
                    }
                    return found;
                });
            }
        } else {
            this.data = this.initData;
            this.filter = "";
        }
    }

    clearSearch() {
        this.filter = "";
        if (this.options.enableSearchFilter) {
            this.data = this.initData;
        }
        if (this.searchInput) this.searchInput.nativeElement.focus();
    }

    showAddItem() {
        this.toggleNewItem = !this.toggleNewItem;
        if (!this.toggleNewItem) this.clearSearch();
        setTimeout(() => {
            if (this.toggleNewItem) this.searchInput.nativeElement.focus();
        }, 0);
    }

    addItem() {
        if (this.filter) {
            //console.log("item ", this.filter);
            this.onItemAdd.emit(this.filter);
            this.clearSearch();
        }
    }

    calculateDropdownDirection() {
        const dropdownHeight = this.dropdownListElem.nativeElement.clientHeight;
        const viewportHeight = document.documentElement.clientHeight;
        const selectedListBounds = this.selectedListElem.nativeElement.getBoundingClientRect();

        const spaceOnTop: number = selectedListBounds.top;
        const spaceOnBottom: number = viewportHeight - selectedListBounds.top;
        if (spaceOnBottom < spaceOnTop && dropdownHeight < spaceOnTop) {
            this.openTowardsTop(true);
        }
        else {
            this.openTowardsTop(false);
        }

    }
    openTowardsTop(value: boolean) {
        if (value && this.selectedListElem.nativeElement.clientHeight) {
            this.dropdownListYOffset = 12 + this.selectedListElem.nativeElement.clientHeight;
        } else {
            this.dropdownListYOffset = 0;
        }
    }

}
