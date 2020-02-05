import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { PlatoService } from '../../../../services/plato.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { Plato } from '../../../../models/plato';
import { Categoria } from '../../../../models/categoria';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-plato-informacion',
  templateUrl: './plato-informacion.component.html',
  styleUrls: ['./plato-informacion.component.css'],
  providers: [RestauranteService, PlatoService, CategoriaService]
})
export class PlatoInformacionComponent implements OnInit {

	public page_title: string;
  	public identity;
  	public token;
  	public plato: Plato;
  	public categorias;
  	public categoriaSeleccionada: Categoria;
  	public status;
  	public id;
  	public nombreCategoria;
  	public restauranteValidacion;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _platoService: PlatoService,
		private _categoriaService: CategoriaService
	) { 
		this.page_title = this._route.snapshot.paramMap.get('nombre');
		this.id = parseInt(this._route.snapshot.paramMap.get('id'));
		this.identity = this._restauranteService.getIdentity();
		this.token = this._restauranteService.getToken();
		this.categoriaSeleccionada = new Categoria(null, this.identity.id, '', '');
		this.plato = new Plato(this.id, null, '', '', '', null);
		this.nombreCategoria = '';
		this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
	}

	ngOnInit() {
		if(this.identity == null || this.restauranteValidacion == null){
            this._router.navigate(['/restaurant/login']);
      	}
      	else {
      		this.getPlato();
			this.getCategoria();
			this.getCategorias();
      	}
	}


	getPlato() {
		this._platoService.getPlato(this.id).subscribe(
  		response => {
	  			if(response.status == 'success') {
		  			this.plato.id = response.msg.id;
		  			this.plato.idCategoria = response.msg.categoria.id;
		  			this.plato.nombre = response.msg.nombre;
		  			this.plato.descripcion = response.msg.descripcion;
		  			this.plato.precio = response.msg.precio;
		        	this.page_title = this.plato.nombre;
		        	this.getCategoria();
		  		}
		  	},
	  		error => {
	  			console.log(<any>error);
	  		}
  		);
	}


	getCategoria() {
	    this._categoriaService.getCategoria(this.token, this.plato.idCategoria).subscribe(
	      response => {
	        if(response.status == 'success') {
	          this.categoriaSeleccionada.id = response.msg.id;
	          this.categoriaSeleccionada.idRestaurante = response.msg.restaurante.id;;
	          this.categoriaSeleccionada.nombre = response.msg.nombre;
	          this.categoriaSeleccionada.imagen = response.msg.image;
	          this.plato.nombreCategoria = response.msg.nombre;
	          this.nombreCategoria = this.plato.nombreCategoria;
	        }
	      },
	      error => {
	        console.log(error);
	      }
	    );
	  }

	getCategorias() {
	    this._categoriaService.getCategorias(this.token).subscribe(
	      response => {
	        if(response.status == 'success') {
	          this.categorias = response.data;
	          
	        }
	      },
	      error => {
	        console.log(error);
	      }
	    );
	  }

	onSubmit(form) {
		this.plato.nombreCategoria = this.nombreCategoria;
		this._platoService.update(this.token, this.plato, this.plato.id).subscribe(
			response => {
				if(response.status == 'success') {
					this.plato = response.plato;
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
