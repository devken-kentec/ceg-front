import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take, tap } from 'rxjs/operators';
import { Empresa } from './empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly api = `${environment.api}/casaEmpGoias/api/empresas`;

  constructor(private http: HttpClient) { }


  listar(){
    return this.http.get<Empresa[]>(`${this.api}`).pipe(
      take(1)
    );
  }

  listarId(id: number){ //mudança
    return this.http.get(`${this.api}/editar/${id}`).pipe(
      take(1)
    );
  }

  findByCnpj(cnpj: string){
    return this.http.get(`${this.api}/buscar/${cnpj}`).pipe(
      take(1)
    );
  }

  private create(empresa: any){
    return this.http.post(`${this.api}`, empresa).pipe(
      take(1)
    );
  }

  private update(empresa: any){
    return this.http.put(`${this.api}`, empresa).pipe(
      take(1)
    );
  }

  save(empresa: Empresa) {
    if(empresa.id){
      return this.update(empresa);
    } else {
      return this.create(empresa);
    }
  }

  upload(id: number, formData: FormData){
    return this.http.put(`${this.api}/arquivo/${id}`, formData).pipe(
      take(1)
    );
  }
}
