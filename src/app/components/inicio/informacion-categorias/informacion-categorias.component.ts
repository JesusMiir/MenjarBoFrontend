import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../services/restaurante.service';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria';


@Component({
  selector: 'app-informacion-categorias',
  templateUrl: './informacion-categorias.component.html',
  styleUrls: ['./informacion-categorias.component.css'],
  providers: [RestauranteService, CategoriaService]
})
export class InformacionCategoriasComponent implements OnInit {

  public page_title: string;
  public categorias;
  public token;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _restauranteService: RestauranteService,
      private _categoriaService: CategoriaService
    ) { 
    this.page_title = "La Carta";
    this.token = this._restauranteService.getToken();

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
