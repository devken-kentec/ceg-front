import { GlobalService } from './../../shared/global.service';
import { ShoppingService } from './../shared/shopping.service';
import { EmpresaService } from './../../empresa/shared/empresa.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../empresa/shared/empresa';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.css'],
  preserveWhitespaces: true
})
export class ShoppingFormComponent implements OnInit {

  empresas: Empresa[] = [];
  shoppingForm = this.fb.group({
      id: [ null ],
      empresaId: [''],
      posicao: [''],
      vinculo: ['']
  });

  constructor(private fb: FormBuilder,
              private empresaService: EmpresaService,
              private shoppingService: ShoppingService,
              private globalService: GlobalService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.comboBox();
    const routeParams = this.route.snapshot.params;
    this.findById(routeParams.id);
  }

  comboBox(){
    this.empresaService.listar().subscribe(res => this.empresas = res);
  }

  onSubmit(){
    if(this.shoppingForm.valid){
      this.shoppingService.save(this.shoppingForm.value).subscribe(
        success => { this.globalService.saveShow("Gravado com Sucessso", "Vínculo") }
      );
    }
    this.shoppingForm.reset();
  }

  updateShoppingForm(shopping: any){
    this.shoppingForm.patchValue(shopping);
  }

  findById(id: number){
    if(id != null){
      this.shoppingService.listarId(id).subscribe((dados: any)=>{
        this.updateShoppingForm(dados);
      });
    }
  }


}
