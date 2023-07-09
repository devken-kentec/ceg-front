import { GlobalService } from './../../shared/global.service';
import { UsuarioService } from './../shared/usuario.service';
import { EmpresaService } from './../../empresa/shared/empresa.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../empresa/shared/empresa';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
  preserveWhitespaces: true
})
export class UsuarioFormComponent implements OnInit {

  empresas: Empresa[] = [];

  usuarioForm = this.fb.group({
    id: [ null ],
    nome: [''],
    login: [''],
    dataDeNascimento: [''],
    cpf: [''],
    sexo: [''],
    estadoCivil: [''],
    cep: [''],
    endereco: [''],
    numero: [''],
    complemento: [''],
    bairro: [''],
    municipio: [''],
    estado: [''],
    telefone: [''],
    telefone2: [''],
    whatsapp: [''],
    celular: [''],
    email: [''],
    website: ['',[]],
    redeSocial: ['',[]],
    redeSocial2: ['',[]],
    redeSocial3: ['',[]],
    statusUsuario: [''],
    empresaId: ['']
  });

  constructor(private fb: FormBuilder,
              private empresaService: EmpresaService,
              private usuarioService: UsuarioService,
              private globalService: GlobalService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.comboBox();
    const routeParams = this.route.snapshot.params;
    this.findById(routeParams.id);

  }

  onSubmit(){
    if(this.usuarioForm.valid){
      this.usuarioService.save(this.usuarioForm.value).subscribe(
          success=>{ this.globalService.saveShow("Salvo com Sucesso!", "Usuário") }
      );
    }
  }

  comboBox(){
    this.empresaService.listar().subscribe(res=> this.empresas = res)
  }

  update(usuario: any){
    this.usuarioForm.patchValue(usuario)
  }

  findById(id: number){
    if(id != null){
      this.usuarioService.listarId(id).subscribe((dados: any)=>{
        this.update(dados)
      });
    }
  }

  buscarCep(){
    let cep = this.usuarioForm.value.cep;
    this.globalService.consultaCep(cep).subscribe((dados: any)=>{
        this.updateEndereco(dados);
    });
  }

  updateEndereco(endereco: any){
    this.usuarioForm.patchValue({
      endereco: endereco.logradouro,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      municipio: endereco.localidade,
      estado: endereco.uf
    });
  }
}
