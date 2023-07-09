import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartaoRoutingModule } from './cartao-routing.module';
import { CartaoFormComponent } from './cartao-form/cartao-form.component';
import { CartaoListComponent } from './cartao-list/cartao-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartaoFormComponent,
    CartaoListComponent
  ],
  imports: [
    CommonModule,
    CartaoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class CartaoModule { }
