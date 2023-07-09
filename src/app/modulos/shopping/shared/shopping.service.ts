import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Shopping } from './shopping';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private readonly api = `${environment.api}/casaEmpGoias/api/shopping`;

  constructor(private http: HttpClient) { }

  listarId(id: number){
    return this.http.get(`${this.api}/editar/${id}`).pipe(
      take(1)
    );
  }

  listar(){
    return this.http.get<Shopping[]>(`${this.api}`).pipe(
      take(1)
    );
  }

  private create(shopping: Shopping){
    return this.http.post(`${this.api}`, shopping).pipe(
      take(1)
    );
  }

  private update(shopping: Shopping){
    return this.http.put(`${this.api}`, shopping).pipe(
      take(1)
    );
  }

  save(shopping: Shopping){
    if(shopping.id != null ){
      return this.update(shopping)
    } else {
      return this.create(shopping);
    }
  }

  delete(id: number){
    return this.http.delete(`${this.api}/${id}`).pipe(
      take(1)
    );
  }
}
