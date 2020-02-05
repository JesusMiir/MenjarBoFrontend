import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restaurante } from '../../../../models/restaurante';
import { Encargo } from '../../../../models/encargo';
import { Usuario } from '../../../../models/usuario';
import { ConjuntoPlatos } from '../../../../models/conjuntoPlatos';
import { Plato } from '../../../../models/plato';
import { RestauranteService } from '../../../../services/restaurante.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { EncargoService } from '../../../../services/encargo.service';
import { ConjuntoPlatosService } from '../../../../services/conjuntoPlatos.service';
import { ConjuntoIngredientesService } from '../../../../services/conjuntoIngredientes.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pedidos-restaurante',
  templateUrl: './pedidos-restaurante.component.html',
  styleUrls: ['./pedidos-restaurante.component.css'],
  providers: [RestauranteService, UsuarioService, EncargoService, ConjuntoPlatosService,
  				ConjuntoIngredientesService]
})
export class PedidosRestauranteComponent implements OnInit {

	public page_title;
	public identity;
	public token;
	public restaurante;
	public encargos;
	public encargoAuxPedido;
	public encargoAuxConfirmado;
	public encargoAuxCocina;
	public encargoAuxCamino;
	public validoTamanoEncargos;
	public usuario;
	public encargo;
	public conjuntoPlatos;
	public plato;
	public ingredientes;
	public validTamanoPlatos;
	public status;
	public encargosPedidos;
	public encargosConfirmados;
	public encargosCocina;
	public encargosCamino;
	public estadoFinalizado;

	constructor(
		private _router: Router,
      	private _route : ActivatedRoute,
      	private _restauranteService: RestauranteService,
      	private _usuarioService: UsuarioService,
      	private _encargoService: EncargoService,
      	private _conjuntoPlatosService: ConjuntoPlatosService,
      	private _conjuntoIngredientesService: ConjuntoIngredientesService
	) { 
		this.page_title = "Comandes Restaurant";
		this.identity = this._restauranteService.getIdentity();
		this.restaurante = new Restaurante(null, 'Ingredients', '', null, '', '', null, true);
		this.validoTamanoEncargos = false;
		this.usuario = new Usuario(null, '', '', '', null, '', '', '');
		this.encargo = new Encargo(null, null, null, '', null, 0, '', '', '', '', null);
		this.encargoAuxPedido = new Encargo(null, null, null, 'Demanat', null, 0, '', '', '', '', null);
		this.encargoAuxConfirmado = new Encargo(null, null, null, 'Confirmat', null,  0, '', '', '', '', null);
		this.encargoAuxCocina = new Encargo(null, null, null, 'Cuina', null,  0, '', '', '', '', null);
		this.encargoAuxCamino = new Encargo(null, null, null, 'Cami', 0, null,  '', '', '', '', null);
		this.plato = new Plato(null, null, '', '', '', null);
		this.encargosPedidos = [this.encargoAuxPedido];
		this.encargosConfirmados = [this.encargoAuxConfirmado];
		this.encargosCocina = [this.encargoAuxCocina];
		this.encargosCamino = [this.encargoAuxCamino];
	}

	ngOnInit() {
		this.getRestaurante('Ingredients');
		this.getEncargosEstado(this.identity, 'Demanat');
		this.getEncargosEstado(this.identity, 'Confirmat');
		this.getEncargosEstado(this.identity, 'Cuina');
		this.getEncargosEstado(this.identity, 'Camí');
	}

	
	getRestaurante(nombreRestaurante) {
		this._restauranteService.informacionRestaurante(nombreRestaurante).subscribe(
	      response => {
	        if (response.status == 'success') {
	        	this.restaurante.id = response.restaurante.id;
	        	this.restaurante.nombre = response.restaurante.nombre;
	        	this.restaurante.telefono = response.restaurante.telefono;
	        	this.restaurante.tiempoPedidos = response.restaurante.tiempopedidos;
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

	getUsuario() {
		this._usuarioService.getUsuario(this.encargo.usuario.id).subscribe(
			response => {
				if (response.status == 'success') {
					this.usuario = response.msg;
					console.log(response);
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

	getEncargosEstado(identity, estado) {
		this._encargoService.listaEstado(identity, estado).subscribe(
			response => {
				if (response.status == 'success') {
					if (response.data.length != 0) {
						if (estado == 'Demanat') {
							this.encargosPedidos = response.data;
							this.encargosPedidos.push(this.encargoAuxPedido);
						}
						else if (estado == 'Confirmat') {
							this.encargosConfirmados = response.data;
							this.encargosConfirmados.push(this.encargoAuxConfirmado);
						}
						else if (estado == 'Cuina') {
							this.encargosCocina = response.data;
							this.encargosCocina.push(this.encargoAuxCocina);
						}
						else {
							this.encargosCamino = response.data
							this.encargosCamino.push(this.encargoAuxCamino);
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

	cambioEstado(encargo) {
		let estado = encargo.estado;
		this._encargoService.editar(encargo).subscribe(
				response => {
					if (response.status == 'success') {
						if (estado == 'Demanat') this.getEncargosEstado(this.identity, 'Demanat');
						else if (estado == 'Confirmat') this.getEncargosEstado(this.identity, 'Confirmat');
						else if (estado == 'Cuina') this.getEncargosEstado(this.identity, 'Cuina');
						else if (estado == 'Cami') this.getEncargosEstado(this.identity, 'Cami');
						else {
							if (this.estadoFinalizado == 'Demanat') this.getEncargosEstado(this.identity, 'Demanat');
							else if (this.estadoFinalizado == 'Confirmat') this.getEncargosEstado(this.identity, 'Confirmat');
							else if (this.estadoFinalizado == 'Cuina') this.getEncargosEstado(this.identity, 'Cuina');
							else if (this.estadoFinalizado == 'Cami') this.getEncargosEstado(this.identity, 'Cami');
						}
					}
					else {
						console.log('error');
					}
				},
				error => {  
					this.status = 'error';
					console.log(<any>error);
				}
		);
	}

	onDrop(event: CdkDragDrop<Encargo[]>) {
		if (event.previousContainer === event.container) {
		    moveItemInArray(event.container.data,
		      event.previousIndex,
		      event.currentIndex);
		} else {
		    transferArrayItem(event.previousContainer.data,
		      event.container.data,
		      event.previousIndex, event.currentIndex);
		    let estado = event.container.data[event.container.data.length-1].estado;
		    if (estado == 'Demanat') this.encargo = this.encargosPedidos[event.currentIndex];
		    else if (estado == 'Confirmat') this.encargo = this.encargosConfirmados[event.currentIndex];
		    else if (estado == 'Cuina') this.encargo = this.encargosCocina[event.currentIndex];
		    else this.encargo = this.encargosCamino[event.currentIndex];
		    this.encargo.estado = estado;
		    this.cambioEstado(this.encargo);
		 }
	}

	clickEncargo(encargo, estado) {
		this.encargo = encargo;
		if (estado != '') this.estadoFinalizado = estado;
		this.status = '';
		this.getUsuario();
		this.getPlatos(this.encargo.id);
	}

	onSubmit(form) {
		this._encargoService.editar(this.encargo).subscribe(
				response => {
					if (response.status == 'success') {
						this.status = 'success';
						this.getEncargosEstado(this.identity, 'Demanat');
						this.getEncargosEstado(this.identity, 'Confirmat');
						this.getEncargosEstado(this.identity, 'Cuina');
						this.getEncargosEstado(this.identity, 'Camí');
					}
					else {
						this.status = 'error';
						console.log('error');
					}
				},
				error => {
					this.status = 'error';
					console.log(<any>error);
				}
		);
	}

	finalizarPedido(encargo, estado) {
		this.encargo = encargo;
		this.encargo.estado = estado;
		this.cambioEstado(this.encargo);
	}
}


/*

Actualitzar Nou -> Demanat

*/