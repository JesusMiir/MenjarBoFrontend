import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restaurante } from '../../../../models/restaurante';
import { Encargo } from '../../../../models/encargo';
import { RestauranteService } from '../../../../services/restaurante.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { EncargoService } from '../../../../services/encargo.service';

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.css'],
  providers: [RestauranteService, UsuarioService, EncargoService]
})
export class HistorialPedidosComponent implements OnInit {

	public page_title;
	public identity;
	public token;
	public restaurante;
	public encargos;
	public validoTamanoEncargos;


  	constructor(
  		private _router: Router,
      	private _route : ActivatedRoute,
      	private _restauranteService: RestauranteService,
      	private _usuarioService: UsuarioService,
      	private _encargoService: EncargoService
  	) { 
  		this.page_title = "Comandes Realitzades";
  		this.identity = this._usuarioService.getIdentity();
		this.token = this._usuarioService.getToken();
		this.restaurante = new Restaurante(null, 'Ingredients', '', null, '', '', null, true);
		this.validoTamanoEncargos = false;
  	}

  	ngOnInit() {
		this.getRestaurante('Ingredients');
		this.getEncargosRealizados(this.token, this.identity);
	}

	// Cargar Restaurante
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

	getEncargosRealizados(token, identity) {
		this._encargoService.getEncargosRealizados(token, identity).subscribe(
			response => {
					if (response.status == 'success') {
						this.encargos = response.data;
						this.validoTamanoEncargos = true;
						console.log(this.encargos);
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
