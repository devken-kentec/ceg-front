import { Shopping } from './../../shopping/shared/shopping';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly api = `${environment.api}/casaEmpGoias/api`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Shopping[]>(`${this.api}/shopping/vinculados`).pipe(
      take(1)
    );
  }

  listarFiltro(){
    return this.http.get(`${this.api}/shopping/filtroRamoDeAtividade`).pipe(
      take(1)
    );
  }

  listarRamoAtividade(ramoDeAtividade: string){
    return this.http.get<Shopping[]>(`${this.api}/shopping/${ramoDeAtividade}`).pipe(
      take(1)
    );
  }

}
