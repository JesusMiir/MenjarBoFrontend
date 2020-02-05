import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { Categoria } from '../../../../models/categoria';

@Component({
  selector: 'app-categoria-todas',
  templateUrl: './categoria-todas.component.html',
  styleUrls: ['./categoria-todas.component.css'],
  providers: [RestauranteService, CategoriaService]
})
export class CategoriaTodasComponent implements OnInit {

  public page_title: string;
  public categorias;
  public token;
  public identity;
  public restauranteValidacion;

  constructor(
  		private _route: ActivatedRoute,
      private _router: Router,
      private _restauranteService: RestauranteService,
      private _categoriaService: CategoriaService
  	) { 
  	this.page_title = "Categories";
    this.token = this._restauranteService.getToken();
    this.identity = this._restauranteService.getIdentity();
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
