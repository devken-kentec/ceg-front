import { DescontoService } from './../shared/desconto.service';
import { Component, OnInit } from '@angular/core';
import { Desconto } from '../shared/desconto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-desconto-list',
  templateUrl: './desconto-list.component.html',
  styleUrls: ['./desconto-list.component.css'],
  preserveWhitespaces: true
})
export class DescontoListComponent implements OnInit {

  descontos: Desconto[] = [];

  constructor(private descontoService: DescontoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.descontoService.listar().subscribe(res => this.descontos = res );
  }

  editar(id: number){
    this.router.navigate(["editar", id], { relativeTo: this.route });
  }
}
