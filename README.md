# NgxMultiselect
# Angular 4/6/8 Multiselect

Angular 2 multiselect component for web applications. Easy to integrate and use.
It's not a plugin and there's no NPM module for it.
I created this component to meet our needs in different projects and i published here, maybe it will help someone else.
It has all the normal and simples features you would need in a multiselect component, if you don't find the features you are looking for you can change the source code to satisfy your need or you can use a real multiselect plugin with more complexe features.

![alt text](https://github.com/sofien-zaabi/ngx-multiselect/blob/master/docs/multiselect-1.png?raw=true)


## Table of Contents
##### 1. Getting Started
##### 2. Installation
##### 3. Usage
##### 6. Template Driven Forms support
##### 7. Reactive Forms support
##### 8. Optionss configuration
##### 9. Events
##### 10. Run configuration





## Getting Started
### Installation
- `npm install` to install all dependecies 
- create the package :
 `npm run package` do the following :
 -  Builds ngx-multiselect to the directory  'dist/ngx-multiselect'
 -  Uses npm pack to create ngx-multiselect as an npm package in that directory: 'ngx-multiselect-0.0.1.tgz'
- Install the package :
    `npm install /path-to/ngx-multiselect-0.0.1.tgz ` // located in dist folder

- Once installed import `NgxMultiSelectModule` from the installed package into your module as follows:

### Usage
Import `NgxMultiSelectModule` into `NgModule` in `app.module.ts`. Angular's `FormsModule` is also required.
```js
import { NgxMultiSelectModule } from 'ngx-multiselect-dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  // ...
  imports: [
    NgxMultiSelectModule,
    FormsModule
  ]
  // ...
})

```

Declare the component data variables and options in your component where you want to consume the dropdown component.

```js

import { Component, OnInit } from '@angular/core';

export class AppComponent implements OnInit {
      title = 'ngx-multiselect-app';
      options: any;
      actors: any[] = [];
      selectedActors : any[] = [];

    ngOnInit() {
      this.options = {
        // singleSelection: true,
        text: "Select options",
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        primaryKey: "id",
        labelKey: "name",
        classes: "form-control",
        addNewItem: true
      };
      this.actors = [{id: 0, name: 'Jason Statham'}, {id: 1, name: 'Brad Pitt'}, {id: 2, name: 'Angelina Jolie'}, {id: 3, name: 'Nicole Kidman'}, {id: 5, name: 'Will Smith'}]
    }

    onAddActor(data: string){
      const  id: number = this.actors.length > 0 ? Math.max(...Array.from(this.actors, item => item.id)) + 1 : 1;
      const actor = {id: id ,name: data};
      this.actors.push(actor);
      this.selectedActors.push(actor);
    }
    onItemSelect(actor:any){
        console.log(actor);
        console.log(this.selectedActors);
    }
    OnItemDeSelect(actor:any){
        console.log(actor);
        console.log(this.selectedActors);
    }
    onSelectAll(actors: any){
        console.log(actors);
    }
    onDeSelectAll(actors: any){
        console.log(actors);
    }
}
```

Add the following component tag in you template 
```html
<ngx-multiselect [data]="actors" [options]="options" required class="ngx-multiselect" 
    (onItemAdd)="onAddActor($event)"
    (onSelect)="onItemSelect($event)" 
    (onDeSelect)="OnItemDeSelect($event)"
    (onSelectAll)="onSelectAll($event)"
    (onDeSelectAll)="onDeSelectAll($event)"></ngx-multiselect>

```


### Template Driven Forms support

```html

<form (ngSubmit)="onSubmit()" #actorForm="actorForm" style="border: 1px solid #ccc; padding: 10px;">
  <div class="form-group">
      <label for="name">Skills</label>
      <ngx-multiselect [data]="actors" [(ngModel)]="selectedActors" required name="actors" #actors="ngModel"
                        [options]="options" 
                        (onSelect)="onItemSelect($event)"
                        (onDeSelect)="OnItemDeSelect($event)" 
                        (onSelectAll)="onSelectAll($event)" 
                        (onDeSelectAll)="onDeSelectAll($event)" name="skills">
      </ngx-multiselect>
  </div>
</form>

```

```js

```

### Reactive Forms support

```html

<form [formGroup]="actorForm" novalidate style="border: 1px solid #ccc; padding: 10px;">
        <div class="form-group">
            <label for="name">Skills</label>
           <ngx-multiselect [data]="actors"  
                                  [options]="options" 
                                  (onSelect)="onItemSelect($event)"
                                  (onDeSelect)="OnItemDeSelect($event)" 
                                  (onSelectAll)="onSelectAll($event)" 
                                  (onDeSelectAll)="onDeSelectAll($event)" formControlName="actors">
            </ngx-multiselect>
        </div>
</form>

```

```js
userForm: FormGroup;
this.actorForm = this.fb.group({
            actors: [[], Validators.required]
        });

```

### Options
The following list of settings are supported by the component. Configure the settings to meet your requirement.

| Setting         |Type    | Description            | Default Value |
|:--- |:--- |:--- |:--- |
| singleSelection | Boolean | To set the dropdown for single item selection only. | false |
| text | String | Text to be show in the dropdown, when no items are selected. | 'Select' |
| enableCheckAll | Boolean | Enable the option to select all items in list | false |
| selectAllText | String | Text to display as the label of select all option | Select All |
| unSelectAllText | String | Text to display as the label of unSelect option | UnSelect All |
| enableSearchFilter | Boolean | Enable filter option for the list. | false |
| enableFilterSelectAll | Boolean | A 'select all' checkbox to select all filtered results.  | true |
| filterSelectAllText | String | Text to display as the label of select all option | Select all filtered results |
| filterUnSelectAllText | String | Text to display as the label of unSelect option | UnSelect all filtered results |
| maxHeight | Number | Set maximum height of the dropdown list in px. | 300 |
| badgeShowLimit | Number | Limit the number of badges/items to show in the input field. If not set will show all selected. | All |
| classes | String | Custom classes to the dropdown component. Classes are added to the dropdown selector tag. To add multiple classes, the value should be space separated class names.| '' |
| limitSelection | Number | Limit the selection of number of items from the dropdown list. Once the limit is reached, all unselected items gets disabled. | none |
| disabled | Boolean | Disable the dropdown | false |
| searchPlaceholderText | String | Custom text for the search placeholder text. Default value would be 'Search' | 'Search' |
| labelKey | String | The property name which should be rendered as label in the dropdown| itemName |
| primaryKey | String | The property by which the object is identified. Default is 'id'.| id |
| position | String | Set the position of the dropdown list to 'top' or 'bottom'| bottom |
| noDataLabel | String | Label text when no data is available in the list| 'No Data Available' |
| showCheckbox | Boolean | Show or hide checkboxes in the list | true |
| addNewItem | Boolean | Add the text as new item to the list | false |
| newItemPlaceholder | String | Placeholder text for add Item imput text | 'New Item' |
| escapeToClose | boolean | Press excape key to close the dropdown | true |
| selectedItemsFunc | function | A function to extract the selected items from formControl value | null |
| formValueFunc | function | A function to return formControl value from the selected items | null |

### Events
- `onSelect` - Return the selected item on selection.
    Example : (onSelect)="onItemSelect($event)"
- `onDeSelect` - Return the un-selected item on un-selecting.
    Example : (onDeSelect)="OnItemDeSelect($event)"
- `onSelectAll` - Return the list of all selected items.
    Example : (onSelectAll)="onSelectAll($event)"
- `onDeSelectAll` - Returns an empty array.
    Example : (onDeSelectAll)="onDeSelectAll($event)"
- `onOpen` - Callback method fired after the dropdown opens
    Example : (onOpen)="onOpen($event)"
- `onClose` - Callback method, fired when the dropdown is closed
    Example : (onClose)="onClose($event)"
- `onItemAdd` - Callback event fired when you click the check icon button to add new item to the list if `addNewItem` setting is enabled.
    Example : (onItemAdd)="onClose($event)"

## Run locally
- Clone the repository or downlod the .zip,.tar files.
- Run `ng serve ngx-multiselect-app` for a dev server
- Navigate to `http://localhost:4200/`
 The app will automatically reload if you change any of the source files.

## License
MIT License.
