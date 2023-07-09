import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainelRoutingModule } from './painel-routing.module';
import { PainelFormComponent } from './painel-form/painel-form.component';


@NgModule({
  declarations: [
    PainelFormComponent
  ],
  imports: [
    CommonModule,
    PainelRoutingModule
  ]
})
export class PainelModule { }
