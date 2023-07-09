import { environment } from 'src/environments/environment';
import { GlobalService } from './../../shared/global.service';
import { CartaoService } from './../shared/cartao.service';
import { UsuarioService } from './../../usuario/shared/usuario.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../usuario/shared/usuario';
import { Cartao } from '../shared/cartao';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cartao-form',
  templateUrl: './cartao-form.component.html',
  styleUrls: ['./cartao-form.component.css'],
  preserveWhitespaces: true
})
export class CartaoFormComponent implements OnInit {

  usuarios: Usuario[] = [];
  cartoes: Cartao[] = [];
  btnGerarCodigo: boolean = false;

  cartaoForm = this.fb.group({
      id: [ null ],
      codigo: [''],
      validade: [''],
      statusCartao: [''],
      usuarioId: ['']

  });

  constructor(private fb: FormBuilder,
              private usuarioSercice: UsuarioService,
              private cartaoService: CartaoService,
              private globalService: GlobalService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const params = this.route.snapshot.params;
      if(params.id){
        this.loadById(params.id);
      } else {
        this.gerarCodigo();
      }

    this.comboBox();

  }

  comboBox(){
    this.usuarioSercice.listar().subscribe(res => this.usuarios = res);
  }

  loadById(id: number){
    this.cartaoService.findById(id).subscribe((response: any)=>{
      this.updateCartaoForm(response);
    });
  }

  updateCartaoForm(cartao: Cartao){
    this.cartaoForm.patchValue(cartao);
  }

  gerarCodigo(): void {
    const codigo = Math.random()*((9999999999-1000000000)-1000000000);
    let codigoString: string = codigo.toString();
    let codigoMenor: string = codigoString.substring(0, 10);
    let codigoFinal: number = parseInt(codigoMenor);
    this.cartaoForm.patchValue({ codigo:  codigoFinal});
  }

  btnGerarNovoCodigo(){
    this.gerarCodigo();
    this.btnGerarCodigo = !this.btnGerarCodigo;
  }

  onSubmit(){
    if(this.cartaoForm.valid){
      this.cartaoService.save(this.cartaoForm.value).subscribe(
        (response: any) => {
          if(response == null){
            this.globalService.saveShow("Gerado com Sucesso!", "Cartão")
          } else if(response.codigo){
                this.btnGerarCodigo = !this.btnGerarCodigo,
                this.globalService.warningShow("Código já existe no sistema", "OPS!!")
          }
        }
      );
    }
  }
}
