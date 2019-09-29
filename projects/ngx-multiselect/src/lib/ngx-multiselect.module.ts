import { NgModule } from '@angular/core';
import { NgxMultiselectComponent } from './ngx-multiselect.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [NgxMultiselectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [NgxMultiselectComponent]
})
export class NgxMultiselectModule { }
