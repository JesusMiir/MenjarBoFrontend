import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { PlatoService } from '../../../../services/plato.service';
import { Categoria } from '../../../../models/categoria';

@Component({
  selector: 'app-plato-todos',
  templateUrl: './plato-todos.component.html',
  styleUrls: ['./plato-todos.component.css'],
  providers: [RestauranteService, PlatoService]
})
export class PlatoTodosComponent implements OnInit {

  public page_title: string;
  public platos;
  public token;
  public identity;
  public restauranteValidacion;

  constructor(
  	  private _route: ActivatedRoute,
      private _router: Router,
      private _restauranteService: RestauranteService,
      private _platoService: PlatoService
  	) { 
  	this.page_title = "Plats";
  	this.token = this._restauranteService.getToken();
    this.getPlatos();
    this.identity = this._restauranteService.getIdentity();
    this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
  }

  ngOnInit() {
    if(this.identity == null || this.restauranteValidacion == null){
        this._router.navigate(['/restaurant/login']);
    }
  }

  getPlatos() {
    this._platoService.getPlatos(this.token, null).subscribe(
      response => {
        if(response.status == 'success') {
          this.platos = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
