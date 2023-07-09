import { DescontoListComponent } from './../desconto/desconto-list/desconto-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescontoFormComponent } from './desconto-form/desconto-form.component';

const routes: Routes = [
  { path: '', component: DescontoListComponent },
  { path: 'editar/:id', component: DescontoFormComponent },
  { path: 'new', component: DescontoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DescontoRoutingModule { }
