import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { PlatoService } from '../../../../services/plato.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-escoger-categoria',
  templateUrl: './escoger-categoria.component.html',
  styleUrls: ['./escoger-categoria.component.css'],
  providers: [RestauranteService, CategoriaService]
})
export class EscogerCategoriaComponent implements OnInit {

	public page_title: string;
	public categorias;
	public status;
	public encargoId;
	public nombreCategoria: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _categoriaService: CategoriaService
	) { 
		this.page_title = "Tria La Categoria Del Plat";
		this.nombreCategoria = '';
		this.encargoId = parseInt(this._route.snapshot.paramMap.get('id'));
	}

	ngOnInit() {
		this.getCategorias();
	}

	getCategorias() {
	    this._categoriaService.getCategoriasInfo().subscribe(
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
