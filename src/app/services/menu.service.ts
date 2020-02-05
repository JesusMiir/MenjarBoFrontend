import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';
import { global } from './global';

@Injectable()
export class MenuService {

	public url: string;
	public identity;
	public token;
	public validacionRestaurante;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	
	create(token, menu):Observable<any> {
		let json = JSON.stringify(menu);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/menu/nuevo', params, {headers: headers});
	}

	editar(token, menu, id):Observable<any> {
		let json = JSON.stringify(menu);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/menu/editar/' + id, params, {headers: headers});
	}


	getMenu(token, id):Observable<any> {
		let params = 'authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/menu/informacion/' + id, params, {headers: headers});
	}
	

	getMenus(token):Observable<any> {
		let params = 'authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/menu/lista', params, {headers: headers});
	}
}