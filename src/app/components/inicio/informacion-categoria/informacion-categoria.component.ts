import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../services/restaurante.service';
import { CategoriaService } from '../../../services/categoria.service';
import { PlatoService } from '../../../services/plato.service';
import { Categoria } from '../../../models/categoria';
import { Plato } from '../../../models/plato';

@Component({
  selector: 'app-informacion-categoria',
  templateUrl: './informacion-categoria.component.html',
  styleUrls: ['./informacion-categoria.component.css'],
  providers: [RestauranteService, CategoriaService, PlatoService]
})
export class InformacionCategoriaComponent implements OnInit {

  public page_title: string;
  public categoria;
  public id;
  public token;
  public platos;


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
  }

  ngOnInit() {
  	this.getCategoria();
  }

  getCategoria() {
  	this._categoriaService.getCategoriaInfo(this.id).subscribe(
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
    this._platoService.getPlatosInfo(this.categoria.nombre).subscribe(
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
