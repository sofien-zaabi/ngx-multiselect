import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DropdownOptions } from 'ngx-multiselect/lib/multi-select-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-multiselect-app';
  singleOptions: any;
  searchOptions: any;
  addOptions: any;
  actors: any[] = [];
  selectedActors : any[] = [];
  formModel = {
    actors: [{ id: 1, name: "Brad Pitt" }]
  };
  actorForm: FormGroup;
  reactiveFormOptions: any = {
    selectedItemsFunc: (actors: any[], value: any) => {
      const valueArray: string[] = value.split(',');
      return actors.filter(actor =>  valueArray.includes(actor.name));
    },
    formValueFunc: (seletedItems: any[]) => {
      return seletedItems.reduce((acc, currentValue) => !acc ? acc + currentValue.name : acc + ',' + currentValue.name, "");
    }
  }

  constructor(private formBuilder: FormBuilder) {}

ngOnInit() {
  this.singleOptions = {
    singleSelection: true,
    showCheckbox: false,
    text: "Select option",
    primaryKey: "id",
    labelKey: "name",
    classes: "form-control"
  };
  this.searchOptions = {
    text: "Select options",
    enableSearchFilter: true,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    primaryKey: "id",
    labelKey: "name",
    badgeShowLimit: 2,
    addNewItem: true
  }
  this.addOptions = {
    text: "Select options",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    primaryKey: "id",
    labelKey: "name",
    addNewItem: true
  }
  this.actorForm = this.formBuilder.group({
    actors: ['Jason Statham,Angelina Jolie', Validators.required]
});
  this.actors = [{id: 0, name: 'Jason Statham'}, {id: 1, name: 'Brad Pitt'}, {id: 2, name: 'Angelina Jolie'}, {id: 3, name: 'Nicole Kidman'}, {id: 5, name: 'Will Smith'}]
}

onAddActor(data: string){
  const  id: number = this.actors.length > 0 ? Math.max(...Array.from(this.actors, item => item.id)) + 1 : 1;
  const actor = {id: id ,name: data};
  this.actors.push(actor);
  this.selectedActors.push(actor);
}
onItemSelect(event: Event){
  console.log("onItemSelect event ", event);
  console.log("onItemSelect actorForm ", this.actorForm.value);
}
OnItemDeSelect(event: Event){
  console.log("OnItemDeSelect event ", event);
  console.log("OnItemDeSelect actorForm ", this.actorForm.value);
}
onSelectAll(event: Event){
  console.log("onSelectAll event ", event)
  console.log("onSelectAll actorForm ", this.actorForm.value);
}
onDeSelectAll(event: Event){
  console.log("onDeSelectAll event ", event);
  console.log("onDeSelectAll actorForm ", this.actorForm.value);
}
}
