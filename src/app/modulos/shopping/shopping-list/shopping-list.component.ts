import { GlobalService } from './../../shared/global.service';
import { ShoppingService } from './../shared/shopping.service';
import { Component, OnInit } from '@angular/core';
import { Shopping } from '../shared/shopping';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  preserveWhitespaces: true
})
export class ShoppingListComponent implements OnInit {

  shoppings: Shopping[] =[];
  id: number = 0;
  nomeEmpresa: string = "";

  constructor(private shoppingService: ShoppingService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.shoppingService.listar().subscribe( res => this.shoppings = res);
  }

  editar(id:number){
    this.router.navigate(["editar", id], {relativeTo: this.route});
  }

  pagarDados(id: number, nomeEmpresa: string){
      this.id = id;
      this.nomeEmpresa = nomeEmpresa;
  }

  onDelete(){
    this.shoppingService.delete(this.id).subscribe(
        success => { this.globalService.removeShow("Excluido com Sucesso!", this.nomeEmpresa), this.list() }
    );
  }
}
