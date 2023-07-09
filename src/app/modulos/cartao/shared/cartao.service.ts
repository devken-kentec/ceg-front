import { Cartao } from './cartao';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  private readonly api = `${environment.api}/casaEmpGoias/api/cartoes`;

  constructor(private http: HttpClient) { }

  findById(id: number){
    return this.http.get(`${this.api}/editar/${id}`).pipe(
      take(1)
    );
  }

  listar(){
    return this.http.get<Cartao[]>(`${this.api}`).pipe(
      take(1)
    );
  }

  private create(cartao: Cartao){
    return this.http.post(`${this.api}`, cartao).pipe(
      take(1)
    );
  }

  private update(cartao: Cartao){
    return this.http.put(`${this.api}`, cartao).pipe(
      take(1)
    );
  }

  save(cartao: Cartao){
    if(cartao.id != null ){
      return this.update(cartao)
    } else {
      return this.create(cartao);
    }
  }
}
