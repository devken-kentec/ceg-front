import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Shopping } from './../../shopping/shared/shopping';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  preserveWhitespaces: true
})

export class HomeComponent implements OnInit {

  render: SafeResourceUrl = 0;
  shoppings: Shopping[] = [];
  filtros: [] = [];

  constructor(private homeService: HomeService,
              private sanitizer: DomSanitizer,
              private router: Router) { }

  ngOnInit(): void {
    this.listFiltro();
    this.list();
  }

  list(){
    this.homeService.listar().subscribe(res => this.shoppings = res);
  }

  listFiltro(){
    this.homeService.listarFiltro().subscribe((dados: any)=>{
       this.filtros = dados
    });
  }

  ramoAtividade(ramoDeAtividade: string){
    this.homeService.listarRamoAtividade(ramoDeAtividade).subscribe( res => this.shoppings = res);
  }

  renderUrl(url: string){
    this.render = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${url}`)
    return this.render;
  }

  pagina(id: number){
    this.router.navigate(['shopping/page', id]);
  }

}
