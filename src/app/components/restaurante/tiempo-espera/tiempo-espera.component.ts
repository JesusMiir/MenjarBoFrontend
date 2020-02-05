import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restaurante } from '../../../models/restaurante';
import { RestauranteService } from '../../../services/restaurante.service';

@Component({
  selector: 'app-tiempo-espera',
  templateUrl: './tiempo-espera.component.html',
  styleUrls: ['./tiempo-espera.component.css'],
  providers: [RestauranteService]
})
export class TiempoEsperaComponent implements OnInit {

	public page_title;
	public status;
	public token;
  	public identity;
	public restaurante;

	constructor(
		private _router: Router,
      	private _route : ActivatedRoute,
      	private _restauranteService: RestauranteService
	) {
		this.page_title = 'Opcions Comanda';
		this.token = this._restauranteService.getToken();
    	this.identity = this._restauranteService.getIdentity();
		this.restaurante = new Restaurante(null, '', '', null, '', '', null, null);
	}

	ngOnInit() {
		this.getRestaurante();
	}

	getRestaurante() {
    
	    this._restauranteService.informacionRestaurante(this.identity.nombre).subscribe(
	      response => {
	        if (response.status == 'success') {
	        	this.restaurante.id = response.restaurante.id;
	        	this.restaurante.tiempoPedidos = response.restaurante.tiempopedidos;
	        	this.restaurante.abierto = response.restaurante.abierto;
	        	console.log(this.restaurante);
	        }
	        else {
	        	console.log('error');
	        }
	      },
	      error => {
	        console.log(<any>error);
	      }
	    );
	}

	onSubmit(form) {
		console.log(this.restaurante);
		this._restauranteService.updateTiempoEspera(this.restaurante).subscribe(
	        response => {
	          this.status = response.status;

	          if(this.status != 'success'){
	            this.status = 'error';
	            
	          }
	          else {
	            this.status = 'success';
	            console.log(response);
	          }
	        },
	        error => {
	          console.log(<any>error);
	        }
	    )
	}

}
