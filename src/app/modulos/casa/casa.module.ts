import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasaRoutingModule } from './casa-routing.module';
import { CasaHomeComponent } from './casa-home/casa-home.component';


@NgModule({
  declarations: [
    CasaHomeComponent
  ],
  imports: [
    CommonModule,
    CasaRoutingModule
  ]
})
export class CasaModule { }
