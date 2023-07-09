import { Mensalidade } from './mensalidade';
import { FichaFinanceira } from './ficha-financeira';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FichaFinanceiraService {

  private readonly api = `${environment.api}/casaEmpGoias/api/fichaFinanceira`;

  constructor(private http: HttpClient) {

  }

  findById(id: number){
    return this.http.get(`${this.api}/editar/${id}`).pipe(
      take(1)
    );
  }

  findAll(){
    return this.http.get<FichaFinanceira[]>(`${this.api}`).pipe(
      take(1)
    );
  }

  findByMensalidadeFichaFinanceiraId(fichaFinanceira: number){
    return this.http.get<Mensalidade[]>(`${this.api}/mensalidadeFichaFinanceira/${fichaFinanceira}`).pipe(
      take(1)
    );
  }

  create(fichaFinanceira: FichaFinanceira){
    return this.http.post(`${this.api}`, fichaFinanceira).pipe(
      take(1)
    );
  }

  update(fichaFinanceira: FichaFinanceira){
    return this.http.put(`${this.api}`, fichaFinanceira).pipe(
      take(1)
    );
  }

  private createMensalidade(mensalidade: Mensalidade){
    return this.http.post(`${this.api}/mensalidade`, mensalidade).pipe(
      take(1)
    );
  }

  private updateMensalidade(mensalidade: Mensalidade){
    return this.http.put(`${this.api}/mensalidade`, mensalidade).pipe(
      take(1)
    );
  }

  saveMensalidade(mensalidade: Mensalidade){
    if(mensalidade.id){
      return this.updateMensalidade(mensalidade);
    } else {
      return this.createMensalidade(mensalidade);
    }
  }


  remove(id: number){
    return this.http.delete(`${this.api}/mensalidade/${id}`).pipe(
        take(1)
    );
  }

}
