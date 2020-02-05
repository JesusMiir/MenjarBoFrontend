import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { Categoria } from '../../../../models/categoria';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.css'],
  providers: [RestauranteService, CategoriaService]
})
export class CategoriaEditarComponent implements OnInit {

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
		this.page_title = "Editar Categoria - " + this._route.snapshot.paramMap.get('nombre');
		this.identity = this._restauranteService.getIdentity();
		this.token = this._restauranteService.getToken();
		this.categoria = new Categoria(null, this.identity.id, '', '');
		this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
	}

	ngOnInit() {
		if(this.identity == null || this.restauranteValidacion == null){
      		this._router.navigate(['/restaurant/login']);
    	}
    	else {
    		this._categoriaService.getCategoria(this.token, this._route.snapshot.paramMap.get('id')).subscribe(
				response => {
		  			if(response.status == 'success') {
			  			this.categoria.id = response.msg.id;
			  			this.categoria.nombre = response.msg.nombre;
			  			this.categoria.imagen = response.msg.imagen;
			  		}
			  	},
		  		error => {
		  			console.log(<any>error);
		  		}
		  	);
    	}
	}

	onSubmit(form) {
		this._categoriaService.editar(this.token, this.categoria, this.categoria.id).subscribe(
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
