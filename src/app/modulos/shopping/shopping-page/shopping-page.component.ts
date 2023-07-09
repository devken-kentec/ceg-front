import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EmpresaService } from './../../empresa/shared/empresa.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from '../../empresa/shared/empresa';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css'],
  preserveWhitespaces: true
})
export class ShoppingPageComponent implements OnInit {

  bairro: string = "";
  celular: string = "";
  cep: string = "";
  cnpj: string = "";
  complemento: string = "";
  email: string = "";
  endereco: string = "";
  estado: string = "";
  logo: SafeResourceUrl = "";
  municipio: string = "";
  nomeFantasia: string = "";
  numero: string = "";
  redeSocial: string = "";
  redeSocial2: string = "";
  redeSocial3: string = "";
  telefone: string = "";
  telefone2: number = 0;
  webSite: string = "";
  whatsapp: string = "";
  descricao: string = "";
  linkWhatsApp: string ="";

  constructor(private route: ActivatedRoute,
              private empresaService: EmpresaService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.params;
    this.mostrarEmpresaId(routeParams.id);
  }


  mostrarEmpresaId(id: number){
    this.empresaService.listarId(id).subscribe((dados: any)=>{
        this.logo = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${dados.logo}`);
        this.nomeFantasia = dados.nomeFantasia;
        this.cnpj = dados.cnpj;
        this.descricao = dados.descricao;
        this.endereco = dados.endereco;
        this.complemento = dados.complemento;
        this.numero = dados.numero;
        this.bairro = dados.bairro;
        this.municipio = dados.municipio;
        this.estado = dados.estado;
        this.cep = dados.cep;
        this.redeSocial = dados.redeSocial;
        this.redeSocial2 = dados.redeSocial2;
        this.redeSocial3 = dados.redeSocial3;
        this.telefone = dados.telefone;
        this.telefone2 = dados.telefone2;
        this.celular = dados.celular;
        this.whatsapp = dados.whatsapp;
        this.email = dados.email;
        this.webSite = dados.webSite;
        // this.linkWhatsApp = "http://api.whatsapp.com/send?1=pt_BR&phone=55"+dados.whatsapp;
        this.linkWhatsApp = "https://wa.me/550"+dados.whatsapp+"?text=Olá Tudo bem?";

    });
  }



}
