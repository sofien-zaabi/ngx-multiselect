import { NgModule } from '@angular/core';
import { NgxMultiselectComponent } from './ngx-multiselect.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './clickOutside.directive';



@NgModule({
  declarations: [NgxMultiselectComponent, ClickOutsideDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [NgxMultiselectComponent]
})
export class NgxMultiselectModule { }
