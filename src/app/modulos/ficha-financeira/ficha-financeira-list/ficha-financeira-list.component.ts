import { FichaFinanceiraService } from './../shared/ficha-financeira.service';
import { FichaFinanceira } from './../shared/ficha-financeira';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ficha-financeira-list',
  templateUrl: './ficha-financeira-list.component.html',
  styleUrls: ['./ficha-financeira-list.component.css'],
  preserveWhitespaces: true
})
export class FichaFinanceiraListComponent implements OnInit {

  fichasFinanceira: FichaFinanceira[] = [];

  constructor(private fichaFinanceiraService: FichaFinanceiraService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadAll();
  }

  editar(id: number){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  loadAll(){
      this.fichaFinanceiraService.findAll().subscribe(
        dados => this.fichasFinanceira = dados
      );
  }

}
