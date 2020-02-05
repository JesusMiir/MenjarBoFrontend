import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { PlatoService } from '../../../../services/plato.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { ConjuntoPlatosService } from '../../../../services/conjuntoPlatos.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { ConjuntoPlatos } from '../../../../models/conjuntoPlatos';
import { Plato } from '../../../../models/plato';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-hamburguesa',
  templateUrl: './hamburguesa.component.html',
  styleUrls: ['./hamburguesa.component.css'],
  providers: [PlatoService, CategoriaService, ConjuntoPlatosService]
})
export class HamburguesaComponent implements OnInit {

	public page_title;
	public status;
	// FER MODEL HAMBURGUESA
	public hamburguesa;
	public pan;
	public vegetal1;
	public vegetal2;
	public vegetal3;
	public queso;
	public salsa;
	public extra;
	public nombre;
	public descripcion;
	public precio;
	public queso_anterior;
	public salsa_anterior;
	public extra_anterior;
	//------------------
	public plato;
	public idCategoria;
	public idConjuntoElementos;
	public nombreCategoria;
	public idEncargo;
	public conjuntoPlatos;
	public token;


	constructor(
			private _route: ActivatedRoute,
			private _router: Router,
			private _platoService: PlatoService,
			private _categoriaService: CategoriaService,
			private _conjuntoPlatosService: ConjuntoPlatosService,
			private _usuarioService: UsuarioService
		) {
		this.hamburguesa = 'Tria Opció';
		this.pan = 'Tria Opció';
		this.vegetal1 = 'Tria Opció';
		this.vegetal2 = 'Tria Opció';
		this.vegetal3 = 'Tria Opció';
		this.queso = 'Tria Opció';
		this.salsa = 'Tria Opció';
		this.queso_anterior ='Tria Opció';
		this.salsa_anterior ='Tria Opció';
		this.extra_anterior ='Tria Opció';
		this.precio = 5.50;
		this.idCategoria = this._route.snapshot.paramMap.get('idCategoria');
		this.idEncargo = this._route.snapshot.paramMap.get('id');
		this.idConjuntoElementos = this._route.snapshot.paramMap.get('idConjuntoElementos');
		if (this.idCategoria != null) this.page_title = 'Crea Sa Teua Hamburguesa';
		if (this.idCategoria == null) this.page_title = 'Hamburguesa';
		this.plato = new Plato(null, null, 'Hamburguesa',  '', '', null);
		this.conjuntoPlatos = new ConjuntoPlatos(0, this.idEncargo, null, null, null, 1, 0);
		this.token = this._usuarioService.getToken();
	}

	ngOnInit() {
	}


	cambiarQueso() {
		if (this.queso == 'Cabra s’Arangí' &&
				this.queso_anterior != 'Cabra s’Arangí') 
				this.precio += 0.3;
		if (this.queso != 'Cabra s’Arangí' &&
				this.queso_anterior == 'Cabra s’Arangí') 
				this.precio -= 0.3;
		this.queso_anterior = this.queso;
	}

	cambiarSalsa() {
		if (this.salsa == 'Brava Ingradients' && 
			this.salsa_anterior != 'Brava Ingradients') 
			this.precio += 0.25;	
		if (this.salsa != 'Brava Ingradients' && 
			this.salsa_anterior == 'Brava Ingradients') 
			this.precio -= 0.25;
		this.salsa_anterior = this.salsa;
	}

	cambiarExtra() {
		if (this.extra != 'Tria Opció' && 
			this.extra_anterior == 'Tria Opció') 
			this.precio += 0.50;	
		if (this.extra == 'Tria Opció' && 
			this.extra_anterior != 'Tria Opció') 
			this.precio -= 0.50;
		this.extra_anterior = this.extra;
	}

	onSubmit(hamburguesaForm) {
		this.nombre = 'Sa Meua Hamburguesa';
		if (this.hamburguesa == 'Tria Opció' ||
			this.pan == 'Tria Opció') {
			this.status = 'error';
		}
		else {
			this.descripcion = this.hamburguesa+', '+this.pan;
			if (this.vegetal1 != 'Tria Opció') this.descripcion += ', '+this.vegetal1;
			if (this.vegetal2 != 'Tria Opció') this.descripcion += ', '+this.vegetal2;
			if (this.vegetal3 != 'Tria Opció') this.descripcion += ', '+this.vegetal3;
			if (this.queso != 'Tria Opció') this.descripcion += ', '+this.queso;
			if (this.salsa != 'Tria Opció') this.descripcion += ', '+this.salsa;
			if (this.extra != 'Tria Opció') this.descripcion += ', '+this.extra;
			
			this.descripcion += '.';

			this.plato.idCategoria = this.idCategoria;
			this.plato.nombre = this.nombre;
			this.plato.descripcion = this.descripcion;
			this.plato.precio = this.precio;

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
	}

	crearConjuntoPlato() {
		this.conjuntoPlatos.idEncargo = this.idEncargo;
		this.conjuntoPlatos.idPlato = this.plato.id;

		this._conjuntoPlatosService.crear(this.token, this.conjuntoPlatos).subscribe(
				response => {
					if (response.status == 'success') {
						this.status = 'success';
						this.conjuntoPlatos.id = response.conjuntoPlatos.id;
						if (this.idConjuntoElementos == null) {
							this._router.navigate(['/comanda/', this.idEncargo, 'opcions-plat', this.conjuntoPlatos.id,
							this.plato.nombreCategoria, this.idCategoria, this.plato.nombre, this.plato.id]);
						}
						else {
							this._router.navigate(['/comanda/', this.idEncargo, 'nou-plat', 'Menú', 'ComboA']);
						}
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
}
