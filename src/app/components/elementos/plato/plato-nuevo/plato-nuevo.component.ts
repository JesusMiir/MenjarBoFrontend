import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { PlatoService } from '../../../../services/plato.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { Plato } from '../../../../models/plato';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-plato-nuevo',
  templateUrl: './plato-nuevo.component.html',
  styleUrls: ['./plato-nuevo.component.css'],
  providers: [RestauranteService, PlatoService, CategoriaService]
})
export class PlatoNuevoComponent implements OnInit {

	public page_title: string;
  	public identity;
  	public token;
  	public plato: Plato;
  	public categorias;
  	public status;
  	public restauranteValidacion;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _platoService: PlatoService,
		private _categoriaService: CategoriaService
	) { 
		this.page_title = "Crear Nuevo Plato";
		this.identity = this._restauranteService.getIdentity();
		this.token = this._restauranteService.getToken();
		this.plato = new Plato(null, null, '',  '', '', null);
		this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
	}
	
	ngOnInit() {
		if(this.identity == null || this.restauranteValidacion == null){
            this._router.navigate(['/restaurant/login']);
      	}
      	else {
			this.getCategorias();
		}
	}
	
	onSubmit(form) {
		console.log(this.plato);
		this._platoService.create(this.plato).subscribe(
			response => {
				if(response.status == 'success') {
					this.plato = response.categoria;
					this.status = 'success';
					this._router.navigate(['/plat/tots']);
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

	getCategorias() {
	    this._categoriaService.getCategorias(this.token).subscribe(
	      response => {
	        if(response.status == 'success') {
	          this.categorias = response.data;
	          console.log(this.categorias);
	        }
	      },
	      error => {
	        console.log(error);
	      }
	    );
	  }

}
