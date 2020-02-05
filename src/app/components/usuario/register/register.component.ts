import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { Encargo } from '../../../models/encargo';
import { ConjuntoElementos } from '../../../models/conjuntoElementos';
import { UsuarioService } from '../../../services/usuario.service';
import { EncargoService } from '../../../services/encargo.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UsuarioService, EncargoService]
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public usuario: Usuario;
  public encargo: Encargo;
  public status: string;
  public token;
  public identity;
  public restauranteValidacion;
  public idUsuario;

  constructor(
      private _router: Router,
      private _route : ActivatedRoute,
      private _usuarioService: UsuarioService,
      private _encargoService: EncargoService
    ) { 
  	this.page_title = 'Registre Usuari';
    this.usuario = new Usuario(null, '', '', '', null, '', '', null);
    this.encargo = new Encargo(null, null, null, '', null, null, '', '', 'Recollir', null, true);
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.restauranteValidacion = this._usuarioService.getValidacionRestaurante();
  }

  ngOnInit() {
  	if(this.identity != null){
      this._router.navigate(['/inici']);
    }
  }

  onSubmit(form){
    this._usuarioService.register(this.usuario).subscribe(
       response => {
          if (response.status == "success") {
            this.crearEncargo();
            form.reset();
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
  
  crearEncargo() {
    this._encargoService.crear(this.usuario.email, this.encargo).subscribe(
      response => {
        if (response.status == "success") {
          this.status = response.status;
          this._router.navigate(['/login']);
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
  
}
