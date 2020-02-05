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
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.css'],
  providers: [RestauranteService, UsuarioService, EncargoService, ConjuntoPlatosService,
  				ConjuntoIngredientesService]
})
export class FinalizarPedidoComponent implements OnInit {

	public page_title;
	public identity;
	public token;
	public restaurante;
	public encargo;
	public informacionValida;
	public status;
	public lugarAnterior;

	constructor(
			private _router: Router,
      		private _route : ActivatedRoute,
      		private _restauranteService: RestauranteService,
      		private _usuarioService: UsuarioService,
      		private _encargoService: EncargoService,
      		private _conjuntoPlatosService: ConjuntoPlatosService,
      		private _conjuntoIngredientesService: ConjuntoIngredientesService
		) { 
		this.page_title = 'Finalitzar Comanda';
		this.identity = this._usuarioService.getIdentity();
		this.token = this._usuarioService.getToken();
		this.restaurante = new Restaurante(null, 'Ingredients', '', null, '', '', null, true);
		this.encargo = new Encargo(1, null, null, '', null,  0, '', '', 'Nou', null, true);
	}

	ngOnInit() {
		this.getEncargoNuevo(this.token, this.identity);
	}


	getEncargoNuevo(token, identity) {
		this._encargoService.getEncargoNuevo(token, identity).subscribe(
			response => {
					if (response.status == 'success') {
						this.encargo.id = response.data.id;
						this.encargo.idRestaurante = response.data.restaurante;
						this.encargo.idUsuario = response.data.usuario;
						this.encargo.estado = response.data.estado;
						this.encargo.tiempoEspera = response.data.tiempoEspera;
						this.encargo.preciototal = response.data.preciototal;
						this.encargo.informacionusuario = response.data.informacionusuario;
						this.encargo.informacionrestaurante = response.data.informacionrestaurante;
						this.encargo.vivienda = response.data.vivienda;
						this.encargo.efectivo = response.data.efectivo;
						this.encargo.createAt = response.data.createat;
						this.informacionValida = true;
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

	realizarPedido() {
		this.encargo.estado = 'Demanat';
		console.log(this.encargo);
		this._encargoService.editar(this.encargo).subscribe(
			response => {
				if (response.status == 'success') {
					console.log(response);
					this.crearEncargo();
					this._router.navigate(['/informacio-comanda', this.encargo.id]);
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

	crearEncargo() {
		this._encargoService.crear(this.identity.email, this.encargo).subscribe(
		      response => {
		        if (response.status == "success") {
		          this.status = response.status;
		          console.log(response);
		          this._router.navigate(['/informacio-comanda', this.encargo.id]);
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

	plusVivienda() {
		console.log(this.encargo.vivienda);
		if (this.lugarAnterior == 'Poble') this.encargo.preciototal -= 1;
		else if (this.lugarAnterior == 'Urbanitzacio') this.encargo.preciototal -= 1.5; 
		if (this.encargo.vivienda == 'Poble') this.encargo.preciototal += 1;
		else if (this.encargo.vivienda == 'Urbanitzacio') this.encargo.preciototal += 1.5;
		this.lugarAnterior = this.encargo.vivienda;
	}

}
