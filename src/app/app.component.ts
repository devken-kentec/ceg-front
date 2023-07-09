import { ContatoService } from './modulos/contato/shared/contato.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { GlobalService } from './modulos/shared/global.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'casaempreendedor';
  nome: string = "";
  btn: any;
  navbar: any;
  contatoForm: FormGroup;

  constructor(private globalService: GlobalService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private contatoService: ContatoService) {

            this.contatoForm = this.fb.group({
                nome: ['', [Validators.required]],
                telefone: ['', [Validators.required]],
                email: ['', [Validators.required]],
                mensagem: ['', [Validators.required]]
            });
          }

  ngOnInit(): void {
    var url_atual = window.location.href;
    console.log(url_atual);
    this.getIP();
    this.globalService.setNome("Marilena");
    this.nome = this.globalService.getNome();
    this.router.navigate(['/casa']);
  }


  home(){
    this.router.navigate(['/casa']);
  }

  shopping(){
    this.router.navigate(['/home']);
  }

  getIP(){
    this.globalService.getIPAddress().subscribe((res:any)=>{
      console.log(res.ip);
    });
  }

  enviar(){
      const form = this.contatoForm;
      if(form.valid){
        this.contatoService.enviarMensagem(form.value).subscribe((res: any)=>{
            this.globalService.saveShow("Enviado com Sucesso!", "Mensagem")
        });
      }
      form.reset();
  }

}
