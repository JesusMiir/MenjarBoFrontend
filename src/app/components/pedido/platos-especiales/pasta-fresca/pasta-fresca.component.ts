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
  selector: 'app-pasta-fresca',
  templateUrl: './pasta-fresca.component.html',
  styleUrls: ['./pasta-fresca.component.css'],
  providers: [PlatoService, CategoriaService, ConjuntoPlatosService]
})
export class PastaFrescaComponent implements OnInit {

	public page_title;
	public nombre;
	public descripcion;
	// Fer Model Pasta Fresca
	public pasta;
	public salsa;
	public precio;
	//------------
	public pasta_anterior;
	public salsa_anterior;

	public plato;
	public idCategoria;
	public nombreCategoria;
	public idEncargo;
	public idConjuntoElementos;
	public conjuntoPlatos;
	public token;
	public status;


	constructor(
			private _route: ActivatedRoute,
			private _router: Router,
			private _platoService: PlatoService,
			private _categoriaService: CategoriaService,
			private _conjuntoPlatosService: ConjuntoPlatosService,
			private _usuarioService: UsuarioService
		) { 
		this.page_title = 'Crea Sa Teua Pasta Fresca';
		this.pasta = 'Tria Opció';
		this.salsa = 'Tria Opció';
		this.precio = 4.5;
		this.idCategoria = this._route.snapshot.paramMap.get('idCategoria');
		this.idEncargo = this._route.snapshot.paramMap.get('id');
		this.idConjuntoElementos = this._route.snapshot.paramMap.get('idConjuntoElementos');
		if (this.idCategoria != null) this.page_title = 'Crea Sa Teua Pasta Fresca';
		if (this.idCategoria == null) this.page_title = 'Pasta Fresca';
		this.plato = new Plato(null, null, 'Pasta Fresca',  '', '', null);
		this.conjuntoPlatos = new ConjuntoPlatos(0, this.idEncargo, null, null, null, 1, 0);
		this.token = this._usuarioService.getToken();
	}

	ngOnInit() {
	}

	cambiarPasta() {
		if (this.pasta == 'Ravioli Foie i Boletus' &&
				this.pasta_anterior != 'Ravioli Foie i Boletus') 
				this.precio += 1.5;
		if (this.pasta != 'Ravioli Foie i Boletus' &&
				this.pasta_anterior == 'Ravioli Foie i Boletus') 
				this.precio -= 1.5;
		this.pasta_anterior = this.pasta;
	}

	cambiarSalsa() {
		if (this.salsa == 'Marinera' &&
				this.salsa_anterior != 'Marinera') 
				this.precio += 0.5;
		if (this.salsa != 'Marinera' &&
				this.salsa_anterior == 'Marinera') 
				this.precio -= 0.5;
		this.salsa_anterior = this.salsa;
	}

	onSubmit(pastaFrescaForm) {
		this.nombre = 'Sa Meua Pasta Fresca';
		if (this.pasta == 'Tria Opció') {
			this.status = 'error';
		}
		else {
			this.descripcion = this.pasta;
			if (this.salsa != 'Tria Opció') this.descripcion += ', '+this.salsa;
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
							this._router.navigate(['/comanda/', this.idEncargo, 'nou-plat', 'Menú', 'ComboC']);
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
