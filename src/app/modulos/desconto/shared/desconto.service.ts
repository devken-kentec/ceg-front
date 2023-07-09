import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Desconto } from './desconto';

@Injectable({
  providedIn: 'root'
})
export class DescontoService {

  private readonly api = `${environment.api}/casaEmpGoias/api/descontos`;

  constructor(private http: HttpClient) { }


  listar(){
    return this.http.get<Desconto[]>(`${this.api}`).pipe(
      take(1));
  }

  listarId(id: number){
    return this.http.get(`${this.api}/editar/${id}`).pipe(
      take(1)
    );
  }


  private create(desconto: Desconto){
    return this.http.post(`${this.api}`, desconto).pipe(
      take(1)
    );
  }

  private update(desconto: Desconto){
    return this.http.put(`${this.api}`, desconto).pipe(
      take(1)
    );
  }

  save(desconto: Desconto){
    if(desconto.id != null ){
      return this.update(desconto)
    } else {
      return this.create(desconto);
    }
  }
}
