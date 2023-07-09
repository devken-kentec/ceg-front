import { GlobalService } from './../../shared/global.service';
import { DescontoService } from './../shared/desconto.service';
import { EmpresaService } from './../../empresa/shared/empresa.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../empresa/shared/empresa';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-desconto-form',
  templateUrl: './desconto-form.component.html',
  styleUrls: ['./desconto-form.component.css'],
  preserveWhitespaces: true
})
export class DescontoFormComponent implements OnInit {

  empresas: Empresa[] = [];
  descontoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private empresaService: EmpresaService,
              private descontoService: DescontoService,
              private globalService: GlobalService,
              private route: ActivatedRoute) {

                this.descontoForm = this.fb.group({
                  id: [ null ],
                  desconto: [''],
                  milhas: [''],
                  empresaId: ['']
              });
              }

  ngOnInit(): void {
    this.comboBox();
    const routeParams = this.route.snapshot.params;
    this.findById(routeParams.id);
  }

  comboBox(){
    this.empresaService.listar().subscribe(res => this.empresas = res);
  }

  onSubmit(){
    if(this.descontoForm.valid){
      this.descontoService.save(this.descontoForm.value).subscribe(
        success => { this.globalService.saveShow("Gravado com Sucessso", "Descontos e Milhas")}
      );
    }
  }

  update(desconto: any){
    this.descontoForm.patchValue(desconto);
  }

  findById(id: number){
    if(id != null){
      this.descontoService.listarId(id).subscribe((dados: any)=>{
        this.update(dados)
      });
    }
  }

}
