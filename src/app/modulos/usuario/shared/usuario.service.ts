import { Usuario } from './usuario';
import { take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly api = `${environment.api}/casaEmpGoias/api/usuarios`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Usuario[]>(`${this.api}`).pipe(
      take(1));
  }

  listarId(id: number){
    return this.http.get(`${this.api}/editar/${id}`).pipe(
      take(1)
    );
  }


  private create(usuario: any){
    return this.http.post(`${this.api}`, usuario).pipe(
      take(1)
    );
  }

  private update(usuario: any){
    return this.http.put(`${this.api}`, usuario).pipe(
      take(1)
    );
  }

  save(usuario: any){
    if(usuario.id != null ){
      return this.update(usuario)
    } else {
      return this.create(usuario);
    }
  }
}
