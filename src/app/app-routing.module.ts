import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: ()=> import('./modulos/home/home.module').then(h => h.HomeModule) },
  { path: 'painel', loadChildren: () => import('./modulos/painel/painel.module').then(p => p.PainelModule) },
  { path: 'empresa', loadChildren: () => import('./modulos/empresa/empresa.module').then(e => e.EmpresaModule) },
  { path: 'usuario', loadChildren: () => import('./modulos/usuario/usuario.module').then(u => u.UsuarioModule) },
  { path: 'desconto', loadChildren: () => import('./modulos/desconto/desconto.module').then(d => d.DescontoModule) },
  { path: 'cartao', loadChildren: () => import('./modulos/cartao/cartao.module').then(c => c.CartaoModule) },
  { path: 'fichafinanceira', loadChildren: () => import('./modulos/ficha-financeira/ficha-financeira.module').then(f => f.FichaFinanceiraModule) },
  { path: 'shopping', loadChildren: () => import('./modulos/shopping/shopping.module').then(s => s.ShoppingModule) },
  { path: 'casa', loadChildren:() => import('./modulos/casa/casa.module').then(ch => ch.CasaModule) },
  { path: 'curso', loadChildren:() => import('./modulos/curso/curso.module').then(c => c.CursoModule) },
  { path: 'consultoria', loadChildren:() => import('./modulos/consultoria/consultoria.module').then(cs => cs.ConsultoriaModule) },
  { path: 'emprestimo', loadChildren:() => import('./modulos/emprestimo/emprestimo.module').then(em => em.EmprestimoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
