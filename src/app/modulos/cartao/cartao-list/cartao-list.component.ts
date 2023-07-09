import { CartaoService } from './../shared/cartao.service';
import { Component, OnInit } from '@angular/core';
import { Cartao } from '../shared/cartao';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cartao-list',
  templateUrl: './cartao-list.component.html',
  styleUrls: ['./cartao-list.component.css'],
  preserveWhitespaces: true
})
export class CartaoListComponent implements OnInit {

  cartoes: Cartao[] = [];

  constructor(private cartaoService: CartaoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.list();
  }


  list(){
    this.cartaoService.listar().subscribe(res => this.cartoes = res );
  }

  editar(id: number){
    this.router.navigate(["editar", id], {relativeTo: this.route})
  }

}
