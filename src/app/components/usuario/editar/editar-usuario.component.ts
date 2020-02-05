import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  providers: [UsuarioService]
})
export class EditarUsuarioComponent implements OnInit {

  public page_title: string;
  public usuario: Usuario;
  public status;
  public identity;
  public token;
  public restauranteValidacion;

  constructor(
  		private _usuarioService: UsuarioService,
      private _route: ActivatedRoute,
      private _router: Router
  	) { 
  	this.page_title = "La Meva Informació";
  	this.identity = this._usuarioService.getIdentity();
  	this.token = this._usuarioService.getToken();
    this.restauranteValidacion = this._usuarioService.getValidacionRestaurante();
  }

  ngOnInit() {
    if(this.identity == null || this.restauranteValidacion != null){
      this._router.navigate(['/login']);
    }
    else{
      this.usuario = new Usuario(
        this.identity.id,
        this.identity.nombre,
        this.identity.apellidos,
        '',
        this.identity.telefono,
        this.identity.email,
        this.identity.direccionCasa,
        this.identity.createAt
      );
    }
  }

  onSubmit(form){

    let usuarioModificar = new Usuario(
                                  this.usuario.id,
                                  this.usuario.nombre,
                                  this.usuario.apellidos,
                                  this.usuario.contrasena,
                                  this.usuario.telefono,
                                  this.usuario.email,
                                  this.usuario.direccionCasa,
                                  this.usuario.createAt
                                );
  	if(usuarioModificar.contrasena == '') {
      usuarioModificar.contrasena = this.identity.contrasena;
    }

    this._usuarioService.update(usuarioModificar).subscribe(
        response => {
          this.status = response.status;

          if(this.status != 'success'){
            this.status = 'error';
          }
          else {
            localStorage.setItem('identity', JSON.stringify(usuarioModificar));
            this.usuario.contrasena = '';
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    
  }

}
