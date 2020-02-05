import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../../services/restaurante.service';
import { PlatoService } from '../../../../../services/plato.service';
import { ConjuntoPlatosService } from '../../../../../services/conjuntoPlatos.service';
import { UsuarioService } from '../../../../../services/usuario.service';
import { ConjuntoPlatos } from '../../../../../models/conjuntoPlatos';
import { Plato } from '../../../../../models/plato';
import { global } from '../../../../../services/global';

@Component({
  	selector: 'app-combo-c',
  	templateUrl: './combo-c.component.html',
  	styleUrls: ['./combo-c.component.css'],
    providers: [PlatoService, RestauranteService, ConjuntoPlatosService, 
  	UsuarioService]
})
export class ComboCComponent implements OnInit {

  	public page_title;
	public precio;
	public plato;
	public token;
	public status;
	public platosTapa;
	public platosPastaFresca;
	public platosPizza;
	public platosBebidas;
	public tapa;
	public pastaFresca;
	public pizza;
	public bebida;
	public idEncargo;
	public idConjuntoElementos;
	public conjuntoPlatos;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _platoService: PlatoService,
		private _restauranteService: RestauranteService,
		private _conjuntoPlatosService: ConjuntoPlatosService,
		private _usuarioService: UsuarioService
	) { 
		this.page_title = 'Combo 15';
		this.idEncargo = this._route.snapshot.paramMap.get('id');
		this.idConjuntoElementos = this._route.snapshot.paramMap.get('idConjuntoElementos');
		this.conjuntoPlatos = new ConjuntoPlatos(0, this.idEncargo, null, null, null, 1, 0);
		this.plato = new Plato(null, null, 'Menú', 'Combo 15', '', 15);
		this.status = null;
		this.token = this._usuarioService.getToken();
	}

	ngOnInit() {
		this.getPlatosTapas();
		this.getPlatosPastaFresca();
		this.getPlatosPizza();
		this.getPlatosBebida();
	}

	getPlatosTapas() {
	    this._platoService.getPlatosInfo('Tapes Menú').subscribe(
	      response => {
	        if(response.status == 'success') {
	        	this.platosTapa = response.data;
	        	console.log(this.platosTapa);  
	        }
	      },
	      error => {
	        console.log(error);
	      }
	    );
	  }

	getPlatosPastaFresca() {
	    this._platoService.getPlatosInfo('Pasta Fresca Menú').subscribe(
	      response => {
	        if(response.status == 'success') {
	        	this.platosPastaFresca = response.data;
	        	console.log(this.platosPastaFresca);  
	        }
	      },
	      error => {
	        console.log(error);
	      }
	    );
	  }

	getPlatosPizza() {
	    this._platoService.getPlatosInfo('Pizza').subscribe(
	      response => {
	        if(response.status == 'success') {
	        	this.platosPizza = response.data;
	        	console.log(this.platosPizza);  
	        }
	      },
	      error => {
	        console.log(error);
	      }
	    );
	  }

	getPlatosBebida() {
	    this._platoService.getPlatosInfo('Begudes Menú').subscribe(
	      response => {
	        if(response.status == 'success') {
	        	this.platosBebidas = response.data;
	        	console.log(this.platosBebidas);  
	        }
	      },
	      error => {
	        console.log(error);
	      }
	    );
	}

	crearConjuntoPlato() {
		this.conjuntoPlatos.idEncargo = this.idEncargo;
		this.conjuntoPlatos.idPlato = this.plato.id;

		this._conjuntoPlatosService.crear(this.token, this.conjuntoPlatos).subscribe(
				response => {
					if (response.status == 'success') {
						this.status = 'success';
						this.conjuntoPlatos.id = response.conjuntoPlatos.id;
						this._router.navigate(['/comanda/', this.idEncargo, 'opcions-plat', this.conjuntoPlatos.id,
						this.plato.nombreCategoria, 63, this.plato.nombre, this.plato.id]);
						
					}
					else{
						this.status = 'error';
					}
				},
				error => {
					console.log(error);
				}
			);
	}


	anadirPlato() {
		if (this.tapa != null && this.pastaFresca != null && this.pizza != null && this.bebida != null) {
			this.plato.descripcion = this.bebida.nombre + ' x ' + this.tapa.nombre + ' x ' +
				this.pastaFresca.nombre + ' x ' + this.pizza.nombre + '.';
			this._platoService.create(this.plato).subscribe(
				response => {
					if(response.status == 'success') {
						this.plato.id = response.plato.id;
						this.status = 'success';
						this.crearConjuntoPlato();
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
		else {
			this.status = 'error';
		}
	}

	SeleccionarTapa() {
		this._router.navigate(['/comanda/', this.idEncargo, 'seleccionar-plat', 0, 'Tapes Menú', 65, 'C']);
	}

	SeleccionarPastaFresca() {
		this._router.navigate(['/comanda/', this.idEncargo, 'seleccionar-plat', 0, 'Pasta Fresca Menú', 62, 'C']);
	}

	SeleccionarPizza() {
		this._router.navigate(['/comanda/', this.idEncargo, 'seleccionar-plat', 0, 'Pizza', 50, 'C']);
	}

	SeleccionarBebida() {
		this._router.navigate(['/comanda/', this.idEncargo, 'seleccionar-plat', 0, 'Begudes Menú', 64, 'C']);
	}
}
