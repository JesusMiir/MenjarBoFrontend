import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { MenuService } from '../../../../services/menu.service';
import { Menu } from '../../../../models/menu';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-menu-informacion',
  templateUrl: './menu-informacion.component.html',
  styleUrls: ['./menu-informacion.component.css'],
  providers: [RestauranteService, MenuService]
})
export class MenuInformacionComponent implements OnInit {

	public page_title;
	public menu;
	public status;
	public token;
	public id;
	public identity;
	public restauranteValidacion;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _menuService: MenuService
	) { 
		this.page_title = this._route.snapshot.paramMap.get('nombre');;
		this.token = this._restauranteService.getToken();
		this.id = this._route.snapshot.paramMap.get('id');
		this.menu = new Menu(this.id, null, '', '', '', '', '', null, null, null);
		this.identity = this._restauranteService.getIdentity();
    	this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
	}

	ngOnInit() {
		if(this.identity == null || this.restauranteValidacion == null){
            this._router.navigate(['/restaurant/login']);
      	}
      	else {
      		this.getMenu();
      	}
	}

	getMenu() {
		this._menuService.getMenu(this.token, this.menu.id).subscribe(
			response => {
				if(response.status == 'success') {
					this.menu.id = response.msg.id;
					this.menu.idRestaurante = response.msg.restaurante.id;
					this.menu.nombre = response.msg.nombre;
					this.menu.nombrePrimero = response.msg.nombreprimero;
					this.menu.descripcionPrimero = response.msg.descripcionprimero;
					this.menu.nombreSegundo = response.msg.nombresegundo;
					this.menu.descripcionSegundo = response.msg.descripcionsegundo;
					this.menu.precio = response.msg.precio;
					this.menu.contadorActual = response.msg.contadoractual;
					this.menu.contadorGeneral = response.msg.contadorgeneral;
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

	onSubmit(form) {
		this._menuService.editar(this.token, this.menu, this.menu.id).subscribe(
			response => {
				if(response.status == 'success') {
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
