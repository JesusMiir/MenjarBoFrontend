import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { global } from './global';

@Injectable()
export class PlatoService {

	public url: string;
	public identity;
	public token;
	public validacionRestaurante;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	
	create(plato):Observable<any> {
		let json = JSON.stringify(plato);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/plato/nuevo', params, {headers: headers});
	}

	update(token, plato, id): Observable<any> {
		let json = JSON.stringify(plato);
		console.log(json);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url+'/plato/editar/'+id, params, {headers: headers});
	}
	
	getPlato(id):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/plato/informacion/' + id, {headers: headers});
	}
	

	getPlatos(token, categoria):Observable<any> {
		let params = 'authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		if (categoria != null) return this._http.post(this.url + '/plato/lista/' + categoria, params, {headers: headers});
		else return this._http.post(this.url + '/plato/lista', params, {headers: headers});
	}

	getPlatosInfo(categoria):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/plato/lista-informacion/' + categoria, {headers: headers});
	}

}