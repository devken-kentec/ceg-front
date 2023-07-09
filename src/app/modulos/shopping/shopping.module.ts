import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingFormComponent } from './shopping-form/shopping-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';


@NgModule({
  declarations: [
    ShoppingFormComponent,
    ShoppingListComponent,
    ShoppingPageComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class ShoppingModule { }
