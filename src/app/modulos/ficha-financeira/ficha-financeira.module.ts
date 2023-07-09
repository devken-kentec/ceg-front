import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaFinanceiraRoutingModule } from './ficha-financeira-routing.module';
import { FichaFinanceiraListComponent } from './ficha-financeira-list/ficha-financeira-list.component';
import { FichaFinanceiraFormComponent } from './ficha-financeira-form/ficha-financeira-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    FichaFinanceiraListComponent,
    FichaFinanceiraFormComponent
  ],
  imports: [
    CommonModule,
    FichaFinanceiraRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class FichaFinanceiraModule { }
