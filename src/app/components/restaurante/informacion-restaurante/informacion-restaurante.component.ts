import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restaurante } from '../../../models/restaurante';
import { RestauranteService } from '../../../services/restaurante.service';

@Component({
  selector: 'app-informacion-restaurante',
  templateUrl: './informacion-restaurante.component.html',
  styleUrls: ['./informacion-restaurante.component.css'],
  providers: [RestauranteService]
})
export class InformacionRestauranteComponent implements OnInit {

	  public page_title: string;
	  public restaurante: Restaurante;
	  public status: string;

	constructor(
	  private _router: Router,
      private _route : ActivatedRoute,
      private _restauranteService: RestauranteService
	) { 
		this.page_title = 'Informació Del Restaurante';
		this.restaurante = new Restaurante(null, '', '', null, '', '', null, true);
	}

	ngOnInit() {
		this.getRestaurant('Ingredients');
	}

	getRestaurant(nombreRestaurante) {
    
	    this._restauranteService.informacionRestaurante(nombreRestaurante).subscribe(
	      response => {
	        if (response.status == 'success') {
	        	this.restaurante.nombre = response.restaurante.nombre;
	        	this.restaurante.email = response.restaurante.email;
	        	this.restaurante.direccionRestaurante = response.restaurante.direccionrestaurante;
	        	this.restaurante.telefono = response.restaurante.telefono;
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

}
