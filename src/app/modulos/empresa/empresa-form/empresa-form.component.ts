import { GlobalService } from '../../shared/global.service';
import { EmpresaService } from './../shared/empresa.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Empresa } from '../shared/empresa';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css'],
  preserveWhitespaces: true
})
export class EmpresaFormComponent implements OnInit {

  render: SafeResourceUrl = 0;
  mostrarFoto: boolean = false;
  mostrarIncluirFoto: boolean = false;

  empresaForm = this.fb.group({
    id: [null, []],
    nomeFantasia: [''],
    razaoSocial: ['',[]],
    dataConstituicao: ['',[]],
    cnpj: ['',[]],
    inscricaoEstadual: ['',[]],
    inscricaoMunicipal: ['',[]],
    regimeTributario: ['',[]],
    cep: ['',[]],
    endereco: ['',[]],
    numero: ['',[]],
    complemento: ['',[]],
    bairro: ['',[]],
    municipio: ['',[]],
    estado: ['',[]],
    ramoDeAtividade: ['',[]],
    telefone: ['',[]],
    telefone2: ['',[]],
    whatsapp: ['',[]],
    celular: ['',[]],
    email: ['',[]],
    webSite: ['',[]],
    redeSocial: ['',[]],
    redeSocial2: ['',[]],
    redeSocial3: ['',[]],
    dataCadastro: ['',[]],
    statusEmpresa: ['',[]],
    descricao: ['',[]],
    logo: ['',[]]
  });

  constructor(private fb: FormBuilder,
              private empresaService: EmpresaService,
              private route: ActivatedRoute,
              private globalService: GlobalService,
              private sanitizer: DomSanitizer
              ) {}

  ngOnInit(): void {
      const routeParams = this.route.snapshot.params;
      this.findById(routeParams.id);
  }

  onSubmit(){
   if(this.empresaForm.valid){
      this.empresaService.save(this.empresaForm.value).subscribe(
        success=> { this.globalService.saveShow("Gravado com Sucesso!", "Empresa")}
      );
    }
      this.empresaForm.reset();
   }

  update(empresa: any){
    this.empresaForm.patchValue(empresa)
  }

  findById(id: number){
    if(id != null){
      this.empresaService.listarId(id).subscribe((dados: any)=>{
        this.incluirFoto(dados.id, dados.foto),
        this.render = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${dados.logo}`),
        this.update(dados)
      });
    }
  }

  buscarCep(){
    let cep = this.empresaForm.value.cep;
    this.globalService.consultaCep(cep).subscribe((dados: any)=>{
        this.updateEndereco(dados);
    });
  }

  updateEndereco(endereco: any){
    this.empresaForm.patchValue({
      endereco: endereco.logradouro,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      municipio: endereco.localidade,
      estado: endereco.uf
    });
  }

  uploadFoto(event: Event){
      const files = (event.target as HTMLInputElement).files;
      if(files){
        const foto = files[0];
        const formData: FormData = new FormData();
        formData.append("arquivo", foto);
        this.empresaService.upload(this.empresaForm.value.id, formData).subscribe(
          success => {this.globalService.saveShow("Imagem adicionado com Sucesso!", "Cadastro")},
          (error: any) => { this.globalService.warningShow("Tamanho ou formato da imagem", "OPS!") }
        );
      }
  }

  incluirFoto(id: number, foto: string){
    if(id != null && foto == ""){
      this.mostrarFoto = false;
      this.mostrarIncluirFoto = true;
    } else if(id != null && foto != ""){
      this.mostrarFoto = true;
      this.mostrarIncluirFoto = false;
    }
  }

  adicionarNovaFoto(){
    this.mostrarIncluirFoto = true;
    this.mostrarFoto = false;
  }

}
