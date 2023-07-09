import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';

const routes: Routes = [
  { path: '', component: EmpresaListComponent },
  { path: 'editar/:id', component: EmpresaFormComponent },
  { path: 'new', component: EmpresaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
