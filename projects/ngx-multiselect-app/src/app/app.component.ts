import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
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
}
