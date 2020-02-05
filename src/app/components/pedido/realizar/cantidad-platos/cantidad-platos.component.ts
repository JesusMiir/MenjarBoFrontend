import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConjuntoPlatos } from '../../../../models/conjuntoPlatos';
import { Plato } from '../../../../models/plato';
import { UsuarioService } from '../../../../services/usuario.service';
import { ConjuntoPlatosService } from '../../../../services/conjuntoPlatos.service';
import { PlatoService } from '../../../../services/plato.service';
import { ConjuntoIngredientesService } from '../../../../services/conjuntoIngredientes.service';

@Component({
  selector: 'app-cantidad-platos',
  templateUrl: './cantidad-platos.component.html',
  styleUrls: ['./cantidad-platos.component.css'],
  providers: [UsuarioService, ConjuntoPlatosService, PlatoService, 
  			ConjuntoIngredientesService]
})
export class CantidadPlatosComponent implements OnInit {

	public page_title;
	public id;
	public conjuntoPlatos;
	public plato;
	public ingredientes;
	public precio;
	public cargaPlato;
	public existIngExtra;
	public token;
	public precioValido;

	constructor(
			private _route: ActivatedRoute,
			private _router: Router,
			private _usuarioService: UsuarioService,
			private _conjuntoPlatosService: ConjuntoPlatosService,
			private _platoService: PlatoService,
			private _conjuntoIngredientesService: ConjuntoIngredientesService
		) { 
		this.page_title = "Quantes unitats et posem?";
		this.id = this._route.snapshot.paramMap.get('id');
		this.conjuntoPlatos = new ConjuntoPlatos(this.id, null, null, null, null, 1, 1);
		this.plato = new Plato(null, null, '', '', '', 0);
		this.precio = this.plato.precio;
		this.cargaPlato = false;
		this.token = this._usuarioService.getToken();
		this.precioValido = false;
	}

	ngOnInit() {
		this.getConjuntoPlatos();
	}

	getConjuntoPlatos() {
		this._conjuntoPlatosService.info(this.id).subscribe(
			response => {
				if(response.status == 'success') {
		        	this.conjuntoPlatos = response.conjuntoPlatos;  
		        	console.log(this.conjuntoPlatos);
		        	this.getPlato();
		        }
		        else {
		        	console.log('error');
		        }
			},
			error =>{
				console.log('error');
			}
		);
	}

	getPlato() {
		console.log(this.conjuntoPlatos.plato.id);
		this._platoService.getPlato(this.conjuntoPlatos.plato.id).subscribe(
			response => {
				if (response.status == 'success') {
					this.plato = response.msg;
					this.cargaPlato = true;
					this.existIngExtra = false;
					this.getConjuntoIngredientes();
				}
				else {
		        	console.log('error');
		        }
			},
			error => {
				console.log('error');
			}
		);
	}

	getConjuntoIngredientes() {
		this._conjuntoIngredientesService.listaTodo().subscribe(
			response => {
				if (response.status == 'success') {
					this.ingredientes = response.conjuntoIngredientes;
					for (let i = 0; i < this.ingredientes.length; ++i) {
						if (this.conjuntoPlatos.id == this.ingredientes[i].conjuntoplatos.id){
							if (!this.existIngExtra) this.existIngExtra = true;
							this.plato.precio += this.ingredientes[i].ingrediente.precio;
						}
					}
					this.onChangeCantidad();
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

	onChangeCantidad() {
		this.conjuntoPlatos.precioTotal = this.plato.precio * this.conjuntoPlatos.cantidad;
		this.precioValido = true;
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
