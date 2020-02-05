import { Component, OnInit, DoCheck } from '@angular/core';
import { global } from './services/global';
import { UsuarioService } from './services/usuario.service'; 
import { RestauranteService } from './services/restaurante.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService, RestauranteService]
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'Angular';
  public identity;
  public token;
  public restauranteValidacion;

  constructor(
  	private _usuarioService: UsuarioService,
    private _restauranteService: RestauranteService
  ){
  	this.loadUser();
    this.loadRestaurante();
  } 

  ngOnInit() {
    console.log('Cargada correctamente');
  }

  ngDoCheck() {
    this.loadUser();
    this.loadRestaurante();
  }

  loadUser() {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
  }

  loadRestaurante() {
    this.identity = this._restauranteService.getIdentity();
    this.token = this._restauranteService.getToken();
    this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
  }

}
