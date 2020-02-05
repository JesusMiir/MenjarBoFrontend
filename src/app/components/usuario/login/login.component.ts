import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

	public page_title: string;
  public usuario: Usuario;
  public status: string;
  public token;
  public identity;
  public restauranteValidacion;

  constructor(
      private _usuarioService: UsuarioService,
      private _router: Router,
      private _route : ActivatedRoute
    ) { 
  	this.page_title = 'Inicia Sessió';
    this.usuario = new Usuario(null, '', '', '', null, '', '', null);
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.restauranteValidacion = this._usuarioService.getValidacionRestaurante();
  }

  ngOnInit() {
    //Se ejecuta siempre y cierra sesión solo cuando le llega el paramentro sure por la url
    if(this.identity != null){
      this._router.navigate(['/inici']);
    }
    this.logout();
  }

  onSubmit(form) {
    this._usuarioService.signup(this.usuario).subscribe(
        response => {
          //TOKEN
          if(response.status != 'error') {
            this.status = 'success';
            this.token = response;

            //OJETO USUARIO IDENTIFICADO
            this._usuarioService.signup(this.usuario, true).subscribe(
              response => {
                this.identity = response;

                // PERSISTIR DATOS USUARIO IDENTIFICADO
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                this._router.navigate(['/inici']);
              },
              error => {
                this.status = 'error';
                console.log(<any>error);
              }
            );
          } 
          else {
            this.status = 'error';
          }

        },
        error => {
          this.status = 'error';
          console.log(<any>error);
        }
      );
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if(logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //redirección a inicio
        this._router.navigate(['inici']);
      }
    });
  }

}
