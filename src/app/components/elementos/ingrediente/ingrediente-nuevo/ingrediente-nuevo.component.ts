import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { IngredienteService } from '../../../../services/ingrediente.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { Ingrediente } from '../../../../models/ingrediente';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-ingrediente-nuevo',
  templateUrl: './ingrediente-nuevo.component.html',
  styleUrls: ['./ingrediente-nuevo.component.css'],
  providers: [RestauranteService, IngredienteService, CategoriaService]
})
export class IngredienteNuevoComponent implements OnInit {

  	public page_title;
  	public status;
  	public ingrediente;
  	public identity;
  	public token;
    public restauranteValidacion;
    public categorias;

  	constructor(
  		private _route: ActivatedRoute,
		  private _router: Router,
		  private _restauranteService: RestauranteService,
		  private _ingredienteService: IngredienteService,
      private _categoriaService: CategoriaService
  	) { 
  		this.page_title = "Crear Ingrediente";
  		this.identity = this._restauranteService.getIdentity();
		  this.token = this._restauranteService.getToken();
		  this.ingrediente = new Ingrediente(null, this.identity.id, null, '', null);
      this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
  	}

  	ngOnInit() {
      if(this.identity == null || this.restauranteValidacion == null){
            this._router.navigate(['/restaurant/login']);
      }
      this.getCategorias();
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
       this._ingredienteService.create(this.token, this.ingrediente).subscribe(
        response => {
          if(response.status == 'success') {
            this.ingrediente = response.ingrediente;
            this.status = 'success';
            this._router.navigate(['/ingredient/tots']);
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
