import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Plato } from '../../../../models/plato';
import { ConjuntoPlatos } from '../../../../models/conjuntoPlatos';
import { ConjuntoIngredientes } from '../../../../models/conjuntoIngredientes';
import { Ingrediente } from '../../../../models/ingrediente';
import { RestauranteService } from '../../../../services/restaurante.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { PlatoService } from '../../../../services/plato.service';
import { ConjuntoPlatosService } from '../../../../services/conjuntoPlatos.service';
import { IngredienteService } from '../../../../services/ingrediente.service';
import { ConjuntoIngredientesService } from '../../../../services/conjuntoIngredientes.service';

@Component({
  selector: 'app-opciones-plato',
  templateUrl: './opciones-plato.component.html',
  styleUrls: ['./opciones-plato.component.css'],
  providers: [RestauranteService, UsuarioService, PlatoService, ConjuntoPlatosService, 
  		IngredienteService, ConjuntoIngredientesService]
})
export class OpcionesPlatoComponent implements OnInit {

	public page_title;
	public nombreCategoria;
	public nombrePlato;
	public idPlato;
	public idConjuntoPlatos;
	public idCategoria;
	public conjuntoPlatos;
	public ingredientes;
	public ingrediente;
	public ingredientesPlato;
	public plato;
	public token;
	public ingredienteExtra;
	public conjuntoIngredientes;
	public precioPlato;
	public status;
	public ingredienteValido;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _usuarioService: UsuarioService,
		private _platoService: PlatoService,
      	private _conjuntoPlatosService: ConjuntoPlatosService,
      	private _ingredienteService: IngredienteService,
      	private _conjuntoIngredientesService: ConjuntoIngredientesService
	) {
		this.nombreCategoria = this._route.snapshot.paramMap.get('categoria');
		this.nombrePlato = this._route.snapshot.paramMap.get('plato');
		this.idPlato = this._route.snapshot.paramMap.get('idPlato');
		this.idConjuntoPlatos = this._route.snapshot.paramMap.get('idConjuntoPlatos'); 
		this.idCategoria = this._route.snapshot.paramMap.get('idCategoria');
		this.page_title = this.nombreCategoria + ' - ' + this.nombrePlato;
		this.conjuntoPlatos = new ConjuntoPlatos(this.idConjuntoPlatos, null, null, null, null, 1, 0);
		this.conjuntoIngredientes = new ConjuntoIngredientes(null, this.idConjuntoPlatos, null);
		this.plato = new Plato(null, null, this.nombreCategoria, this.nombrePlato, '', 1);
		this.token = this._usuarioService.getToken();
		this.ingredienteExtra = false;
		this.precioPlato = 0;
		this.ingredienteValido = false;
	}

	ngOnInit() {
		this.getPlato();
		this.getConjuntoPlatos();
		this.getIngredientes();
		this.getIngredientesPlato();
	}

	getPlato() {
		this._platoService.getPlato(this.idPlato).subscribe(
	      response => {
	        if(response.status == 'success') {
	        	this.plato = response.msg;
	        	this.precioPlato = this.plato.precio;
	        	console.log(this.plato);  
	        }
	      },
	      error => {
	        console.log(error);
	      }
	    );
	}

	getIngredientes() {
		this._ingredienteService.getIngredientesCategoria(this.idCategoria).subscribe(
	      response => {
	        if(response.status == 'success') {
	        	this.ingredientes = response.data;
	        	this.ingredienteValido = (this.ingredientes.length != 0);
	        	console.log(this.ingredientes);
	        }
	      },
	      error => {
	        console.log(error);
	      }
	    );
	}

	getConjuntoPlatos() {
		this._conjuntoPlatosService.info(this.idConjuntoPlatos).subscribe(
	      response => {
	        if(response.status == 'success') {
	        	this.conjuntoPlatos = response.conjuntoPlatos;
	        	this.conjuntoPlatos.precioTotal = this.plato.precio * this.conjuntoPlatos.cantidad;
	        	console.log(this.conjuntoPlatos);  
	        }
	      },
	      error => {
	        console.log(error);
	      }
	    );
	}

	onChangeCantidad() {
		this.conjuntoPlatos.precioTotal = this.precioPlato * this.conjuntoPlatos.cantidad;
		
	}

	crearConjuntoIngrediente(){
		if (this.ingrediente != null) {
			this.conjuntoIngredientes.idIngrediente = this.ingrediente.id;
			this._conjuntoIngredientesService.crear(this.token, this.conjuntoIngredientes).subscribe(
				response => {
					if (response.status == 'success') {
						this.ingredienteExtra = true;
						this.conjuntoIngredientes.id = response.conjuntoIngredientes.id; 
						this.getIngredientesPlato();
						console.log(this.conjuntoIngredientes);
					}
				},
				error => {
					console.log(error);
				}
			);
		}
	}

	getIngredientesPlato() {
		this._conjuntoIngredientesService.lista(this.idConjuntoPlatos).subscribe(
			response => {
				if (response.status == 'success') {
					this.ingredientesPlato = response.conjuntoIngredientes;
					console.log(this.ingredientesPlato);
					this.precioPlato = this.plato.precio;
					if (this.ingredientesPlato.length > 0) {
						this.ingredienteExtra = true;
					}
					for (let i = 0; i < this.ingredientesPlato.length; ++i) {
						this.precioPlato += this.ingredientesPlato[i].ingrediente.precio;
					}
					console.log(this.precioPlato);
					this.onChangeCantidad();
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	eliminarIngredienteExtra(idIngrediente) {
		this._conjuntoIngredientesService.eliminar(idIngrediente).subscribe(
			response => {
				if (response.status == "success") {
		          this.status = response.status;
		          this.getIngredientesPlato();
		        }
			},
			error => {
				this.status = 'error';
		        console.log(<any>error);
			}
		);
	}

	editarConjuntoPlatos() {
		this._conjuntoPlatosService.editar(this.token, this.conjuntoPlatos).subscribe(
			response => {
				if (response.status == 'success') {
					console.log(this.conjuntoPlatos);
				}
			},
			error => {
				console.log(error);
			}
		);
	}
	
}
