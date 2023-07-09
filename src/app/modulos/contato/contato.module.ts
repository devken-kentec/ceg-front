import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoListComponent } from './contato-list/contato-list.component';


@NgModule({
  declarations: [
    ContatoListComponent
  ],
  imports: [
    CommonModule,
    ContatoRoutingModule
  ]
})
export class ContatoModule { }
