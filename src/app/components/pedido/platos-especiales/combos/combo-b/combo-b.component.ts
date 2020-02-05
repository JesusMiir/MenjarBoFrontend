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
  selector: 'app-combo-b',
  templateUrl: './combo-b.component.html',
  styleUrls: ['./combo-b.component.css'],
  providers: [PlatoService, RestauranteService, ConjuntoPlatosService, 
  		UsuarioService]
})
export class ComboBComponent implements OnInit {

  	public page_title;
	public plato;
	public token;
	public status;
	public platosPizza;
	public platosCrepes;
	public platosBebidas;
	public pizza;
	public crepe;
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
		this.page_title = 'Combo 10';
		this.idEncargo = this._route.snapshot.paramMap.get('id');
		this.idConjuntoElementos = this._route.snapshot.paramMap.get('idConjuntoElementos');
		this.conjuntoPlatos = new ConjuntoPlatos(0, this.idEncargo, null, null, null, 1, 0);
		this.plato = new Plato(null, 63, 'Menú', 'Combo 10', '', 10);
		this.status = null;
		this.token = this._usuarioService.getToken();
	}

	ngOnInit() {
		this.getPlatosPizza();
		this.getPlatosCrepe();
		this.getPlatosBebida();
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


	getPlatosCrepe() {
	    this._platoService.getPlatosInfo('Crepes').subscribe(
	      response => {
	        if(response.status == 'success') {
	        	this.platosCrepes = response.data;
	        	console.log(this.platosCrepes);  
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
		if (this.pizza != null && this.crepe != null && this.bebida != null) {
			this.plato.descripcion = this.bebida.nombre + ' x ' + this.pizza.nombre + ' x ' + this.crepe.nombre + '.';
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

	SeleccionarPizza() {
		this._router.navigate(['/comanda/', this.idEncargo, 'seleccionar-plat', 0, 'Pizza', 50, 'B']);
	}

	SeleccionarCrepe() {
		this._router.navigate(['/comanda/', this.idEncargo, 'seleccionar-plat', 0, 'Crepes', 57, 'B']);
	}

	SeleccionarBebida() {
		this._router.navigate(['/comanda/', this.idEncargo, 'seleccionar-plat', 0, 'Begudes Menú', 64, 'B']);
	}

}
