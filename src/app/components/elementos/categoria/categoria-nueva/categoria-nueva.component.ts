import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { Categoria } from '../../../../models/categoria';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-categoria-nueva',
  templateUrl: './categoria-nueva.component.html',
  styleUrls: ['./categoria-nueva.component.css'],
  providers: [RestauranteService, CategoriaService]
})
export class CategoriaNuevaComponent implements OnInit {

  	public page_title: string;
  	public identity;
  	public token;
  	public categoria: Categoria;
  	public status;
 	public restauranteValidacion;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _categoriaService: CategoriaService
	) { 
		this.page_title = "Crear Nova Categoria";
		this.identity = this._restauranteService.getIdentity();
		this.token = this._restauranteService.getToken();
		this.categoria = new Categoria(null, this.identity.id, '', '');
		this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
	}

	ngOnInit() {
		if(this.identity == null || this.restauranteValidacion == null){
          this._router.navigate(['/restaurant/login']);
    	}
	}

	onSubmit(form) {
		this._categoriaService.create(this.token, this.categoria).subscribe(
			response => {
				if(response.status == 'success') {
					this.categoria = response.categoria;
					this.status = 'success';
					this._router.navigate(['/categoria/totes']);
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
