import { GlobalService } from './../../shared/global.service';
import { FichaFinanceiraService } from './../shared/ficha-financeira.service';
import { EmpresaService } from './../../empresa/shared/empresa.service';
import { Mensalidade } from '../shared/mensalidade';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FichaFinanceira } from '../shared/ficha-financeira';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ficha-financeira-form',
  templateUrl: './ficha-financeira-form.component.html',
  styleUrls: ['./ficha-financeira-form.component.css'],
  preserveWhitespaces: true
})
export class FichaFinanceiraFormComponent implements OnInit {

  mostrar: boolean = false;
  mostBtnParc: boolean = false;
  statusPagamento: string ="";
  fecharTabela: boolean = false;
  mensalidades: Mensalidade[] = [];
  btnSalvar: boolean = true;
  btnAlterar: boolean = false;
  _id: number = 0;
  _data: string = "";

  fichaFinanceiraForm = this.fb.group({
    id: ['',[]],
    empresaId: ['',[]],
    nomeFantasia: ['',[]],
    cnpj: ['',[]],
    razaoSocial: ['',[]],
    dataGeracao: ['',[]],
    dia: ['',[]],
    valorMensal: ['',[]],
    statusFichaFinanceira: ['',[]],
  });

  mensalidadeForm = this.fb.group({
    id: ['',[]],
    dataPagamento: ['',[]],
    valor: ['',[]],
    juro: ['',[]],
    desconto: ['',[]],
    valorTotal: ['',[]],
    tipoPagamento: ['',[]],
    statusMensalidade: ['',[]],
    observacao: ['',[]],
    fichaFinanceira: ['',[]],
  });

  constructor(private fb: FormBuilder,
              private empresaService: EmpresaService,
              private fichaFinanceiraService: FichaFinanceiraService,
              private globalService: GlobalService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.params;
    this.findById(routeParams.id);

  }

  findByCnpj(){
    let cnpj = this.fichaFinanceiraForm.value.cnpj;
    this.empresaService.findByCnpj(cnpj).subscribe((res: any)=>{
      this.mostrar = true;
        this.fichaFinanceiraForm.patchValue({
          empresaId: res.empresaId,
          nomeFantasia: res.nomeFantasia,
          razaoSocial: res.razaoSocial,
          cnpj: res.cnpj
        });
    });

  }

  onSubmit(){
    if(this.fichaFinanceiraForm.valid){
        this.fichaFinanceiraService.create(this.fichaFinanceiraForm.value).subscribe((res: any)=>{
          this.updateFichaFinanceiraForm(res),
          this.globalService.saveShow("Gravado com Sucesso!", "Ficha"),
          this.mostBtnParc = true
        });
    }
  }

  alterar(){
    if(this.fichaFinanceiraForm.valid){
        this.fichaFinanceiraService.update(this.fichaFinanceiraForm.value).subscribe((res: any)=>{
          this.updateFichaFinanceiraForm(res),
          this.globalService.saveShow("Alterado com Sucesso!", "Ficha")
        });
    }
  }


  updateFichaFinanceiraForm(fichaFinanceira: FichaFinanceira){
    this.fichaFinanceiraForm.patchValue(fichaFinanceira);
  }

  findById(id: number){
    if(id != null){
      this.fichaFinanceiraService.findById(id).subscribe((dados: any)=>{
          this.mostrar = true,
          this.mostBtnParc = true,
          this.fecharTabela = true,
          this.btnAlterar = true;
          this.btnSalvar = false;
          this.updateFichaFinanceiraForm(dados),
          this.mensalidadeForm.patchValue({ valor: parseFloat(dados.valorMensal) });
          this.mensalidadeForm.patchValue({ fichaFinanceira: dados.id });
          this.findByMensalidadeFichaFinanceiraId(dados.id);
      });
    }
  }

  findByMensalidadeFichaFinanceiraId(fichaFinanceira: number){
    this.fichaFinanceiraService.findByMensalidadeFichaFinanceiraId(fichaFinanceira).subscribe(
      dados => this.mensalidades = dados
    );
  }

  addMensalidade(){
    this.statusPagamento ="A receber";
    this.mensalidadeForm.patchValue({ statusMensalidade: this.statusPagamento });
  }

  valorTotal(){
    let valor: number = this.mensalidadeForm.get("valor")?.value;
      let juros: number = this.mensalidadeForm.get("juro")?.value;
      let descontos:number = this.mensalidadeForm.get("desconto")?.value;

      let valorTotal: number = valor+juros-descontos;

      this.mensalidadeForm.patchValue({ valorTotal: valorTotal });
  }

  mudarStatusPagamento(){
    this.statusPagamento ="Pago";
    this.mensalidadeForm.patchValue({ statusMensalidade: this.statusPagamento });
  }

  estornarPagamento(){
    this.statusPagamento ="A receber";
    this.mensalidadeForm.patchValue({ statusMensalidade: this.statusPagamento });
  }

  close(){
    let id = this.fichaFinanceiraForm.value.id;
    this.findByMensalidadeFichaFinanceiraId(id);
  }

  onSubmitMensalidade(){
    if(this.mensalidadeForm.valid){
      this.fichaFinanceiraService.saveMensalidade(this.mensalidadeForm.value).subscribe(
        success =>{ this.globalService.saveShow("Incluida com Sucesso!", "Mensalidade")}
      );
    }
    this.mensalidadeForm.reset();
  }

  onEditMensalidade(mensalidade: Mensalidade){
    this.mensalidadeForm.patchValue({ id: mensalidade.id });
    this.mensalidadeForm.patchValue({ dataPagamento: mensalidade.dataPagamento });
    this.mensalidadeForm.patchValue({ valor: parseFloat(mensalidade.valor) });
    this.mensalidadeForm.patchValue({ valorTotal: parseFloat(mensalidade.valorTotal) });
    this.mensalidadeForm.patchValue({ juro: parseFloat(mensalidade.juro) });
    this.mensalidadeForm.patchValue({ desconto: parseFloat(mensalidade.desconto) });
    this.mensalidadeForm.patchValue({ tipoPagamento: mensalidade.tipoPagamento });
    this.mensalidadeForm.patchValue({ observacao: mensalidade.observacao});
    this.mensalidadeForm.patchValue({ statusMensalidade: mensalidade.statusMensalidade });
    this.statusPagamento = this.mensalidadeForm.get("statusMensalidade")?.value;
    this.mensalidadeForm.patchValue({ fichaFinanceira: mensalidade.fichaFinanceira});
  }

  pegarMensalidade(id: number, dataPagamento: string){
    this._id = id;
    this._data = dataPagamento;
  }

  onDelete(){
    let id = this.fichaFinanceiraForm.value.id;
    this.fichaFinanceiraService.remove(this._id).subscribe(
      success=> { this.globalService.removeShow("Removido com Sucesso!", "Mensalidade"),
                  this.findByMensalidadeFichaFinanceiraId(id)
    });
  }

}
