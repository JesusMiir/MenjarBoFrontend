import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { MenuService } from '../../../../services/menu.service';
import { Menu } from '../../../../models/menu';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-menu-nuevo',
  templateUrl: './menu-nuevo.component.html',
  styleUrls: ['./menu-nuevo.component.css'],
  providers: [RestauranteService, MenuService]
})
export class MenuNuevoComponent implements OnInit {

  public page_title;
  public status;
  public menu;
  public identity;
  public token;
  public restauranteValidacion;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _restauranteService: RestauranteService,
      private _menuService: MenuService
  ) { 
      this.page_title = "Crear Menú";
      this.identity = this._restauranteService.getIdentity();
      this.token = this._restauranteService.getToken();
      this.menu = new Menu(null, this.identity.id, '', '', '', '', '', null, 0, 0);
      this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
  }

  ngOnInit() {
      if(this.identity == null || this.restauranteValidacion == null){
          this._router.navigate(['/restaurant/login']);
      }
  }

  onSubmit(form) {
       this._menuService.create(this.token, this.menu).subscribe(
        response => {
          if(response.status == 'success') {
            this.menu = response.menu;
            this.status = 'success';
            this._router.navigate(['/menu/tots']);
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
