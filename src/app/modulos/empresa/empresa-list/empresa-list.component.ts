import { GlobalService } from './../../shared/global.service';
import { EmpresaService } from './../shared/empresa.service';
import { Empresa } from './../shared/empresa';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css'],
  preserveWhitespaces: true
})
export class EmpresaListComponent implements OnInit {

  empresas: Empresa[] = []; //mudança

  constructor(private empresaService: EmpresaService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService ) { }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.empresaService.listar().subscribe(res=> this.empresas = res)
  }

  editar(id: number){
    this.router.navigate(["editar", id], { relativeTo: this.route })
  }
}
