import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { PlatoService } from '../../../../services/plato.service';
import { Categoria } from '../../../../models/categoria';
import { Plato } from '../../../../models/plato';

@Component({
  selector: 'app-categoria-informacion',
  templateUrl: './categoria-informacion.component.html',
  styleUrls: ['./categoria-informacion.component.css'],
  providers: [RestauranteService, CategoriaService, PlatoService]
})
export class CategoriaInformacionComponent implements OnInit {

  public page_title: string;
  public categoria;
  public id;
  public token;
  public platos;
  public identity;
  public restauranteValidacion;


  constructor(
  	  private _route: ActivatedRoute,
      private _router: Router,
      private _restauranteService: RestauranteService,
      private _categoriaService: CategoriaService,
      private _platoService: PlatoService
  	) { 
  	this.page_title = this._route.snapshot.paramMap.get('nombre');
    this.token = this._restauranteService.getToken();
    this.id = parseInt(this._route.snapshot.paramMap.get('id'));
    this.categoria = new Categoria(this.id, null, '', '');
    this.identity = this._restauranteService.getIdentity();
    this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
  }

  ngOnInit() {
    if(this.identity == null || this.restauranteValidacion == null){
          this._router.navigate(['/restaurant/login']);
    }
    else {
      this.getCategoria();
    }
  }

  getCategoria() {
  	this._categoriaService.getCategoria(this.token, this.id).subscribe(
  		response => {
  			if(response.status == 'success') {
  				this.categoria.id = response.msg.id;
  				this.categoria.idRestaurante = response.msg.restaurante.id;
  				this.categoria.nombre = response.msg.nombre;
  				this.categoria.imagen = response.msg.image;
          this.page_title = this.categoria.nombre;
          this.getPlatos(); 
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getPlatos() {
    console.log(this.categoria.nombre);
    this._platoService.getPlatos(this.token, this.categoria.nombre).subscribe(
      response => {
        if(response.status == 'success') {
          this.platos = response.data;
          console.log(this.platos);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
