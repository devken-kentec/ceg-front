import { FichaFinanceiraFormComponent } from './ficha-financeira-form/ficha-financeira-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaFinanceiraListComponent } from './ficha-financeira-list/ficha-financeira-list.component';

const routes: Routes = [
  { path: '', component: FichaFinanceiraListComponent },
  { path: 'editar/:id', component: FichaFinanceiraFormComponent },
  { path: 'new', component: FichaFinanceiraFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichaFinanceiraRoutingModule { }
