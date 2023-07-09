import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescontoRoutingModule } from './desconto-routing.module';
import { DescontoFormComponent } from './desconto-form/desconto-form.component';
import { DescontoListComponent } from './desconto-list/desconto-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DescontoFormComponent,
    DescontoListComponent
  ],
  imports: [
    CommonModule,
    DescontoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class DescontoModule { }
