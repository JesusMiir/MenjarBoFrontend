import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restaurante } from '../../../../models/restaurante';
import { Encargo } from '../../../../models/encargo';
import { RestauranteService } from '../../../../services/restaurante.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { EncargoService } from '../../../../services/encargo.service';
import { ConjuntoPlatosService } from '../../../../services/conjuntoPlatos.service';
import { ConjuntoIngredientesService } from '../../../../services/conjuntoIngredientes.service';

@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.component.html',
  styleUrls: ['./realizar-pedido.component.css'],
  providers: [RestauranteService, UsuarioService, EncargoService, ConjuntoPlatosService,
  				ConjuntoIngredientesService]
})
export class RealizarPedidoComponent implements OnInit {

	public page_title;
	public restaurante: Restaurante;
	public encargo: Encargo;
	public status: string;
	public codigo: string;
	public token;
	public identity;
	public restauranteValidacion;
	public informacionValida;
	public conjuntoPlatos;
	public validTamanoPlatos;
	public validRealizarPedido;
	public lugarAnterior;
	public ingredientes;
	public abierto;

	constructor(
			private _router: Router,
      		private _route : ActivatedRoute,
      		private _restauranteService: RestauranteService,
      		private _usuarioService: UsuarioService,
      		private _encargoService: EncargoService,
      		private _conjuntoPlatosService: ConjuntoPlatosService,
      		private _conjuntoIngredientesService: ConjuntoIngredientesService
		) { 
		this.page_title = "Realitzar Comanda";
		this.informacionValida = false;
		this.identity = this._usuarioService.getIdentity();
		this.token = this._usuarioService.getToken();
		this.restaurante = new Restaurante(null, 'Ingredients', '', null, '', '', null, null);
		this.encargo = new Encargo(1, null, null, '', null,  0, '', '', 'Nou', null, true);
		this.abierto = false;
	}

	ngOnInit() {
		this.getRestaurante('Ingredients');
		this.getEncargoNuevo(this.token, this.identity);
		this.lugarAnterior = 'Recollir';
	}

	getRestaurante(nombreRestaurante) {
		this._restauranteService.informacionRestaurante(nombreRestaurante).subscribe(
	      response => {
	        if (response.status == 'success') {
	        	this.restaurante.id = response.restaurante.id;
	        	this.restaurante.nombre = response.restaurante.nombre;
	        	this.restaurante.telefono = response.restaurante.telefono;
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

	getEncargoNuevo(token, identity) {
		this._encargoService.getEncargoNuevo(token, identity).subscribe(
			response => {
					if (response.status == 'success') {
						this.encargo.id = response.data.id;
						this.encargo.idRestaurante = response.data.restaurante;
						this.encargo.idUsuario = response.data.usuario;
						this.encargo.estado = response.data.estado;
						this.encargo.preciototal = 0;
						this.encargo.informacionusuario = response.data.informacionusuario;
						this.encargo.informacionrestaurante = response.data.informacionrestaurante;
						this.encargo.vivienda = response.data.vivienda;
						this.encargo.efectivo = response.data.efectivo;
						this.encargo.createAt = response.data.createat;
						this.informacionValida = true;
						this.getPlatos(this.encargo.id);
						console.log(this.encargo);
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

	getPlatos(idEncargo) {
		this._conjuntoPlatosService.lista(idEncargo).subscribe(
			response => {
				if (response.status == 'success') {
					this.conjuntoPlatos = response.conjuntoPlatos;
					this.validTamanoPlatos = (this.conjuntoPlatos.length > 0);
					for (let i = 0; i < this.conjuntoPlatos.length; ++i) {
						this.conjuntoPlatos[i].existIngExtra = false;
						if (this.conjuntoPlatos[i].plato != null) 
							this.encargo.preciototal += this.conjuntoPlatos[i].precioTotal;
					}
					console.log("Conjunto Platos:");
					console.log(this.conjuntoPlatos);
					this.getConjuntoIngredientes();
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

	getConjuntoIngredientes() {
		this._conjuntoIngredientesService.listaTodo().subscribe(
			response => {
				if (response.status == 'success') {
					this.ingredientes = response.conjuntoIngredientes;
					for (let i = 0; i < this.conjuntoPlatos.length; ++i) {
						let j = 0;
						while (!this.conjuntoPlatos[i].existIngExtra 
							&& j < this.ingredientes.length) {
							if (this.conjuntoPlatos[i].id == this.ingredientes[j].conjuntoplatos.id){
								this.conjuntoPlatos[i].existIngExtra = true;
							}
							++j;
						}
					}
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

	realizarPedido() {
		this._encargoService.editar(this.encargo).subscribe(
			response => {
				if (response.status == 'success') {
					console.log('ok');
					this._router.navigate(['/finalitzar-comanda']);
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

	eliminarPlato(idConjuntoPlatos) {
		this._conjuntoPlatosService.eliminar(idConjuntoPlatos).subscribe(
			response => {
				if (response.status == "success") {
		          this.status = response.status;
		          this.getPlatos(this.encargo.id);
		        }
			},
			error => {
				this.status = 'error';
		        console.log(<any>error);
			}
		);
	}

}
