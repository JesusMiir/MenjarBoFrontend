import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	public page_title;
	public id;
	public idCategoria;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
	) { 
		this.page_title = 'Menú';
		this.id = this._route.snapshot.paramMap.get('id');
		this.idCategoria = this._route.snapshot.paramMap.get('idCategoria');
	}

	ngOnInit() {
	}

	escogerMenu(opcion) {
		if (opcion == 'A' && this.idCategoria != null) {
			this._router.navigate(['comanda/', this.id, 'nou-plat', 'Menú', 'ComboA']);
		}
		else if (opcion == 'B' && this.idCategoria != null) {
			this._router.navigate(['comanda/', this.id, 'nou-plat', 'Menú', 'ComboB']);
		} 
		else if (opcion == 'C' && this.idCategoria != null) {
			this._router.navigate(['comanda/', this.id, 'nou-plat', 'Menú', 'ComboC']);
		}
	}

}
