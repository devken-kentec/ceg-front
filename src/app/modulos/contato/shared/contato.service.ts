import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contato } from './contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private readonly api = `${environment.api}/casaEmpGoias/api`;

  constructor(private http: HttpClient) { }

  enviarMensagem(contato: Contato){
    return this.http.post(`${this.api}/contato`, contato).pipe(
      take(1)
    );
  }
}
