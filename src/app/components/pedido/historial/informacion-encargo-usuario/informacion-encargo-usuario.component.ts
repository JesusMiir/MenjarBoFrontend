import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restaurante } from '../../../../models/restaurante';
import { Encargo } from '../../../../models/encargo';
import { Usuario } from '../../../../models/usuario';
import { RestauranteService } from '../../../../services/restaurante.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { EncargoService } from '../../../../services/encargo.service';
import { ConjuntoPlatosService } from '../../../../services/conjuntoPlatos.service';
import { ConjuntoIngredientesService } from '../../../../services/conjuntoIngredientes.service';

@Component({
  selector: 'app-informacion-encargo-usuario',
  templateUrl: './informacion-encargo-usuario.component.html',
  styleUrls: ['./informacion-encargo-usuario.component.css'],
  providers: [RestauranteService, UsuarioService, EncargoService, ConjuntoPlatosService,
  				ConjuntoIngredientesService]
})
export class InformacionEncargoUsuarioComponent implements OnInit {

	public id;
	public page_title;
	public identity;
	public token;
	public restaurante;
	public usuario;
	public encargo;
	public conjuntoPlatos;
	public ingredientes;
	public status;
	public validTamanoPlatos;

	constructor(
		private _route: ActivatedRoute,
      	private _router: Router,
      	private _restauranteService: RestauranteService,
      	private _usuarioService: UsuarioService,
      	private _encargoService: EncargoService,
      	private _conjuntoPlatosService: ConjuntoPlatosService,
      	private _conjuntoIngredientesService: ConjuntoIngredientesService
	) {
		this.id = this._route.snapshot.paramMap.get('id'); 
		this.page_title = "Informació Comanda - " + this.id;
		this.identity = this._restauranteService.getIdentity();
		this.token = this._restauranteService.getToken();
		this.usuario = new Usuario(null, '', '', '', null, '', '', null);
		this.encargo = new Encargo(this.id, null, null, '', null, 0, '', '', 'Recollir', null, true);
	}


	ngOnInit() {
		this.getEncargo();
		this.getPlatos(this.encargo.id);
	}

	getEncargo() {
		this._encargoService.getEncargo(this.token, this.id).subscribe(
			response => {
				if (response.status == 'success') {
					this.encargo.idRestaurante = response.msg.restaurante.id;
					this.encargo.idUsuario = response.msg.usuario.id;
					this.encargo.estado = response.msg.estado;
					this.encargo.informacionusuario = response.msg.informacionusuario;
					this.encargo.informacionrestaurante = response.msg.informacionrestaurante;
					this.encargo.vivienda = response.msg.vivienda;
					this.encargo.createAt = response.msg.createat;
					this.encargo.efectivo = response.msg.efectivo;
					this.encargo.preciototal = response.msg.preciototal;
					this.usuario.nombre = response.msg.usuario.nombre;
					this.usuario.apellidos = response.msg.usuario.apellidos;
					this.usuario.direccionCasa = response.msg.usuario.direccioncasa;
					this.usuario.telefono = response.msg.usuario.telefono;
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

	onSubmit(form) {
		this._encargoService.editar(this.encargo).subscribe(
				response => {
					if (response.status == 'success') {
						this.status = 'success';

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

}
