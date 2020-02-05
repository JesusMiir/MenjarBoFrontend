import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente';
import { global } from './global';

@Injectable()
export class IngredienteService {

	public url: string;
	public identity;
	public token;
	public validacionRestaurante;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	create(token, ingrediente):Observable<any> {
		let json = JSON.stringify(ingrediente);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/ingrediente/nuevo', params, {headers: headers});
	}

	editar(token, categoria, id):Observable<any> {
		let json = JSON.stringify(categoria);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/ingrediente/editar/' + id, params, {headers: headers});
	}

	getIngrediente(token, id):Observable<any> {
		let params = 'authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/ingrediente/informacion/' + id, params, {headers: headers});
	}
	

	getIngredientes():Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/ingrediente/lista', {headers: headers});
	}

	getIngredientesCategoria(idCategoria):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/ingrediente/lista-categoria/' + idCategoria, {headers: headers});
	}

}