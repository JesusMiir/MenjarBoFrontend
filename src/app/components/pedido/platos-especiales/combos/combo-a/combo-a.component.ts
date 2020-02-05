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
  selector: 'app-combo-a',
  templateUrl: './combo-a.component.html',
  styleUrls: ['./combo-a.component.css'],
  providers: [PlatoService, RestauranteService, ConjuntoPlatosService, 
  		UsuarioService]
})
export class ComboAComponent implements OnInit {

	public page_title;
  	public encargo;
	public precio;
	public plato;
	public token;
	public status;
	public platosHamburguesa;
	public platosBebidas;
	public bebida;
	public idEncargo;
	public idConjuntoElementos;
	public conjuntoPlatos;
	public descripcion;
	//------------------
	public hamburguesa;
	public pan;
	public vegetal1;
	public vegetal2;
	public vegetal3;
	public queso;
	public salsa;
	public extra;
	public nombre;
	public queso_anterior;
	public salsa_anterior;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _platoService: PlatoService,
		private _restauranteService: RestauranteService,
		private _conjuntoPlatosService: ConjuntoPlatosService,
		private _usuarioService: UsuarioService
	) { 
		this.page_title = 'Combo 8.5';
		this.idEncargo = this._route.snapshot.paramMap.get('id');
		this.idConjuntoElementos = this._route.snapshot.paramMap.get('idConjuntoElementos');
		this.conjuntoPlatos = new ConjuntoPlatos(0, this.idEncargo, null, null, null, 1, 0);
		this.plato = new Plato(null, null, 'Menú', 'Combo 8.5', '', 8.5);
		this.status = null;
		this.token = this._usuarioService.getToken();
		this.descripcion = '';
	}

	ngOnInit() {
		this.hamburguesa = 'Tria Opció';
		this.pan = 'Tria Opció';
		this.vegetal1 = 'Tria Opció';
		this.vegetal2 = 'Tria Opció';
		this.vegetal3 = 'Tria Opció';
		this.queso = 'Tria Opció';
		this.salsa = 'Tria Opció';
		this.queso_anterior ='Tria Opció';
		this.salsa_anterior ='Tria Opció';
		this.getPlatosHamburguesa();
		this.getPlatosBebida();
	}

	cambiarQueso() {
		if (this.queso == 'Cabra s’Arangí' &&
				this.queso_anterior != 'Cabra s’Arangí') 
				this.plato.precio += 0.3;
		if (this.queso != 'Cabra s’Arangí' &&
				this.queso_anterior == 'Cabra s’Arangí') 
				this.plato.precio -= 0.3;
		this.queso_anterior = this.queso;
	}

	cambiarSalsa() {
		if (this.salsa == 'Brava Ingradients' && 
			this.salsa_anterior != 'Brava Ingradients') 
			this.plato.precio += 0.25;	
		if (this.salsa != 'Brava Ingradients' && 
			this.salsa_anterior == 'Brava Ingradients') 
			this.plato.precio -= 0.25;
		this.salsa_anterior = this.salsa;
	}

	getPlatosHamburguesa() {
	    this._platoService.getPlatosInfo('Hamburguesa Menú').subscribe(
	      response => {
	        if(response.status == 'success') {
	        	this.platosHamburguesa = response.data;
	        	console.log(this.platosHamburguesa);  
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

	crearHamburguesa() {
		if (this.hamburguesa != 'Tria Opció' && this.pan != 'Tria Opció') {
			this.status = 'success';
			this.descripcion = this.hamburguesa+', '+this.pan;
			if (this.vegetal1 != 'Tria Opció') this.descripcion += ', '+this.vegetal1;
			if (this.vegetal2 != 'Tria Opció') this.descripcion += ', '+this.vegetal2;
			if (this.vegetal3 != 'Tria Opció') this.descripcion += ', '+this.vegetal3;
			if (this.queso != 'Tria Opció') this.descripcion += ', '+this.queso;
			if (this.salsa != 'Tria Opció') this.descripcion += ', '+this.salsa;
			
		}
		else {
			this.status = 'error';
		}
	}

	anadirPlato() {
		
		if (this.descripcion != '' && this.bebida != null) {
			this.plato.descripcion = this.bebida.nombre +' x Patates Fregides x (' + this.descripcion + ').';
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

	SeleccionarBebida() {
		this._router.navigate(['/comanda/', this.idEncargo, 'seleccionar-plat', 0, 'Begudes Menú', 64, 'A']);
	}

}
