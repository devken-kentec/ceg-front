import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingFormComponent } from './shopping-form/shopping-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ShoppingListComponent },
  { path: 'editar/:id', component: ShoppingFormComponent },
  { path: 'new', component: ShoppingFormComponent },
  { path: 'page/:id', component: ShoppingPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
