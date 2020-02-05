import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restaurante } from '../../../models/restaurante';
import { RestauranteService } from '../../../services/restaurante.service';

@Component({
  selector: 'app-register-restaurante',
  templateUrl: './editar-restaurante.component.html',
  styleUrls: ['./editar-restaurante.component.css'],
  providers: [RestauranteService]
})
export class EditarRestauranteComponent implements OnInit {

  public page_title: string;
  public restaurante: Restaurante;
  public status: string;
  public codigo: string;
  public token;
  public identity;
  public restauranteValidacion;

  constructor(
      private _restauranteService: RestauranteService,
      private _router: Router,
	  private _route : ActivatedRoute
    ) { 
  	this.codigo = '';
  	this.page_title = 'Informació Del Restaurante';
    this.identity = this._restauranteService.getIdentity();
    this.token = this._restauranteService.getToken();
    this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
  }

  ngOnInit() {
  	if(this.identity == null || this.restauranteValidacion == null){
      this._router.navigate(['/restaurant/login']);
    }
    else{
      	this.restaurante = new Restaurante(
	        this.identity.id,
	        this.identity.nombre,
	        '',
	        this.identity.telefono,
	        this.identity.email,
	        this.identity.direccionRestaurante,
	        this.identity.tiempoPedidos,
          this.identity.abierto
	      );
    }
  }
  
  onSubmit(form){
  	
    let restauranteModificar = new Restaurante(
                                  this.restaurante.id,
                                  this.restaurante.nombre,
                                  this.restaurante.contrasena,
                                  this.restaurante.telefono,
                                  this.restaurante.email,
                                  this.restaurante.direccionRestaurante,
                                  this.restaurante.tiempoPedidos,
                                  this.restaurante.abierto   
                                );

    this._restauranteService.update(restauranteModificar).subscribe(
        response => {
          this.status = response.status;

          if(this.status != 'success'){
            this.status = 'error';
          }
          else {
            localStorage.setItem('identity', JSON.stringify(restauranteModificar));
            this.restaurante.contrasena = '';
          }
        },
        error => {
          console.log(<any>error);
        }
      )
  }
  

}
