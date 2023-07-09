import { UsuarioService } from './../shared/usuario.service';
import { Usuario } from './../shared/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
  preserveWhitespaces: true
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];
  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.list();
  }

  list(){
      this.usuarioService.listar().subscribe(res => this.usuarios = res)
  }

  editar(id: number){
    this.router.navigate(["editar", id], { relativeTo: this.route } )
  }

}
