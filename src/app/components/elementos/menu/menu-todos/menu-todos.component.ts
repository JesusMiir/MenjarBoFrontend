import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { MenuService } from '../../../../services/menu.service';
import { Menu } from '../../../../models/menu';

@Component({
  selector: 'app-menu-todos',
  templateUrl: './menu-todos.component.html',
  styleUrls: ['./menu-todos.component.css'],
  providers: [RestauranteService, MenuService]
})
export class MenuTodosComponent implements OnInit {

	public page_title;
	public menus;
	public token;
	public identity;
	public restauranteValidacion;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _menuService: MenuService
	) { 
		this.page_title = "Menús";
		this.token = this._restauranteService.getToken();
		this.identity = this._restauranteService.getIdentity();
      	this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
	}

	ngOnInit() {
		if(this.identity == null || this.restauranteValidacion == null){
          this._router.navigate(['/restaurant/login']);
      	}
      	else {
			this.getMenus();
		}
	}

	getMenus() {
		this._menuService.getMenus(this.token).subscribe(
			response => {
				if(response.status == 'success') {
				  this.menus = response.data;
				  console.log(this.menus);
				}
			},
			error => {
				console.log(error);
			}
		);
	}

}
