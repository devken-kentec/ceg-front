import { CartaoFormComponent } from './cartao-form/cartao-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartaoListComponent } from './cartao-list/cartao-list.component';

const routes: Routes = [
  { path: '', component: CartaoListComponent },
  { path: 'editar/:id', component: CartaoFormComponent },
  { path: 'new', component: CartaoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartaoRoutingModule { }
