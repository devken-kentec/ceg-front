import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  id: any;
  nome: any;

  constructor(private toastr: ToastrService,
              private http: HttpClient
              ) { }

  setId(id: number):number {
    this.id = id;
    return id;
  }

  getId(): number {
   return this.id;
  }

  setNome(nome: string):string {
    this.nome = nome;
    return nome;
  }

  getNome(): string{
   return this.nome;
  }

  saveShow(mensagem: string, titulo: string){
    this.toastr.success(mensagem, titulo);
  }

  removeShow(mensagem: string, titulo: string){
    this.toastr.error(mensagem, titulo)
  }

  warningShow(mensagem: string, titulo: string){
    this.toastr.warning(mensagem, titulo)
  }

  consultaCep(cep: number){
      return this.http.get(`//viacep.com.br/ws/${cep}/json`).pipe(
        take(1)
      );
  }

  getIPAddress()  {
    return this.http.get("https://api.ipify.org/?format=json").pipe(
      take(1)
    );
  }
}
