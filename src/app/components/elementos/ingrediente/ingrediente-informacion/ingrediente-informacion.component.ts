import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { IngredienteService } from '../../../../services/ingrediente.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { Ingrediente } from '../../../../models/ingrediente';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-ingrediente-informacion',
  templateUrl: './ingrediente-informacion.component.html',
  styleUrls: ['./ingrediente-informacion.component.css'],
  providers: [RestauranteService, IngredienteService, CategoriaService]
})
export class IngredienteInformacionComponent implements OnInit {

	public page_title;
	public ingrediente;
	public status;
	public token;
	public id;
	public identity;
  	public restauranteValidacion;
  	public categorias;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _ingredienteService: IngredienteService,
		private _categoriaService: CategoriaService
	) { 
		this.page_title = this._route.snapshot.paramMap.get('nombre');;
		this.token = this._restauranteService.getToken();
		this.id = this._route.snapshot.paramMap.get('id');
		this.ingrediente = new Ingrediente(this.id, null, null, '', null);
		this.identity = this._restauranteService.getIdentity();
    	this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
	}

	ngOnInit() {
		if(this.identity == null || this.restauranteValidacion == null){
          	this._router.navigate(['/restaurant/login']);
    	}
    	else {
    		this.getIngrediente();
    		this.getCategorias();
    	}
	}

	getIngrediente() {
		this._ingredienteService.getIngrediente(this.token, this.ingrediente.id).subscribe(
			response => {
				if(response.status == 'success') {
					this.ingrediente.id = response.msg.id;
					this.ingrediente.idRestaurante = response.msg.restaurante.id;
					this.ingrediente.nombre = response.msg.nombre;
					this.ingrediente.descripcion = response.msg.descripcion;
					this.ingrediente.precio = response.msg.precio;
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

	onSubmit(form) {
		this._ingredienteService.editar(this.token, this.ingrediente, this.ingrediente.id).subscribe(
			response => {
				if(response.status == 'success') {
					this.ingrediente = response.categoria;
					this.status = 'success';
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
