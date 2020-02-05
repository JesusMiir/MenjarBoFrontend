import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { IngredienteService } from '../../../../services/ingrediente.service';
import { Ingrediente } from '../../../../models/ingrediente';

@Component({
  selector: 'app-ingrediente-todos',
  templateUrl: './ingrediente-todos.component.html',
  styleUrls: ['./ingrediente-todos.component.css'],
  providers: [RestauranteService, IngredienteService]
})
export class IngredienteTodosComponent implements OnInit {

	public page_title;
	public ingredientes;
	public token;
	public identity;
  	public restauranteValidacion;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _ingredienteService: IngredienteService
	) { 
		this.page_title = "Ingredientes";
		this.token = this._restauranteService.getToken();
		this.identity = this._restauranteService.getIdentity();
    	this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
	}

	ngOnInit() {
		if(this.identity == null || this.restauranteValidacion == null){
            this._router.navigate(['/restaurant/login']);
      	}
		else {
			this.getIngredientes();
		}
	}

	getIngredientes() {
		this._ingredienteService.getIngredientes().subscribe(
			response => {
				if(response.status == 'success') {
				  this.ingredientes = response.data;
				  console.log(response);
				}
			},
			error => {
				console.log(error);
			}
		);
	}

}
