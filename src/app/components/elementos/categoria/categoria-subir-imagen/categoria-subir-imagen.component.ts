import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { Categoria } from '../../../../models/categoria';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-categoria-subir-imagen',
  templateUrl: './categoria-subir-imagen.component.html',
  styleUrls: ['./categoria-subir-imagen.component.css'],
  providers: [RestauranteService, CategoriaService]
})
export class CategoriaSubirImagenComponent implements OnInit {

	public page_title: string;
  	public identity;
  	public token;
  	public categoria: Categoria;
  	public status;
  	public id;
  	public restauranteValidacion;
  	public afuConfig;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _categoriaService: CategoriaService
	) { 
		this.page_title = "Subir Imagen Categoría";
		this.identity = this._restauranteService.getIdentity();
		this.token = this._restauranteService.getToken();
		this.categoria = new Categoria(null, this.identity.id, '', '');
		this.id = parseInt(this._route.snapshot.paramMap.get('id'));
		this.setAfuConfig();
		this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
	}
	
	ngOnInit() {
		if(this.identity == null || this.restauranteValidacion == null){
          this._router.navigate(['/restaurant/login']);
    	}
	}

	imagenUpload(datos) {
		console.log(datos);
		/*
		let data = JSON.parse(datos.response);
		this.categoria.imagen = data.image;
		console.log(this.categoria.imagen);
		*/
	}

	setAfuConfig() {
		this.afuConfig = {
		    multiple: false,
		    formatsAllowed: ".jpg, .png, .gif, jpeg",
		    maxSize: "50",
		    uploadAPI:  {
		      url: global.url+'/categoria/subir-imagen/'+this.id,
		      headers: {
			     "Authorization" : this._restauranteService.getToken()
		      },
		    },
		    theme: "attachPin",
		    hideProgressBar: false,
		    hideResetBtn: true,
		    hideSelectBtn: false,
		    attachPinText: 'Seleccionar la imatge'
		}
	}
	
}
